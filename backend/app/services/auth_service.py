from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, and_
from sqlalchemy.orm import selectinload
from app.database import User, ApprovedRegistration, UserSession, DeviceLog
from app.schemas.auth import UserRegistrationRequest, UserLoginRequest
from app.utils.security import hash_password, verify_password, create_tokens
from app.utils.config import settings
from datetime import datetime, timedelta
import uuid
from typing import Optional, Tuple

class AuthService:
    """Authentication service for user management"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def register_user(self, request: UserRegistrationRequest) -> Tuple[bool, str, Optional[User], Optional[dict]]:
        """Register a new user"""
        try:
            # Check if registration number is approved
            approved_reg = await self._get_approved_registration(request.registration_number)
            if not approved_reg:
                return False, "Registration number not found in approved list", None, None
            
            if not approved_reg.is_paid:
                return False, "Registration number not yet paid", None, None
            
            # Check if user already exists
            existing_user = await self._get_user_by_registration(request.registration_number)
            if existing_user:
                return False, "User already registered with this registration number", None, None
            
            # Check if email is already taken (if provided)
            if request.email:
                existing_email = await self._get_user_by_email(request.email)
                if existing_email:
                    return False, "Email already registered", None, None
            
            # Create new user
            user = User(
                id=str(uuid.uuid4()),
                name=request.name,
                email=request.email,
                registration_number=request.registration_number,
                password_hash=hash_password(request.password),
                is_active=True,
                is_activated=True,  # Auto-activate approved registrations
                approved_registration_id=approved_reg.id
            )
            
            self.db.add(user)
            await self.db.commit()
            await self.db.refresh(user)
            
            # Create session for the new device
            tokens = create_tokens(user.id)
            session = await self._create_user_session(user.id, request, tokens)
            
            return True, "User registered successfully", user, tokens
            
        except Exception as e:
            await self.db.rollback()
            return False, f"Registration failed: {str(e)}", None, None
    
    async def login_user(self, request: UserLoginRequest) -> Tuple[bool, str, Optional[User], Optional[dict], Optional[dict]]:
        """Login user with device binding"""
        try:
            # Get user by registration number
            user = await self._get_user_by_registration(request.registration_number)
            if not user:
                return False, "Invalid registration number or password", None, None, None
            
            # Verify password
            if not verify_password(request.password, user.password_hash):
                return False, "Invalid registration number or password", None, None, None
            
            # Check if user is active
            if not user.is_active:
                return False, "Account is deactivated", None, None, None
            
            # Check if user is activated
            if not user.is_activated:
                return False, "Account pending activation", None, None, None
            
            # Handle device binding
            device_binding_info = await self._handle_device_binding(user.id, request)
            
            # Create new session
            tokens = create_tokens(user.id)
            session = await self._create_user_session(user.id, request, tokens)
            
            # Log device login
            await self._log_device_action(user.id, request, "login")
            
            return True, "Login successful", user, tokens, device_binding_info
            
        except Exception as e:
            return False, f"Login failed: {str(e)}", None, None, None
    
    async def logout_user(self, user_id: str, device_id: str) -> Tuple[bool, str]:
        """Logout user from specific device"""
        try:
            # Deactivate session for this device
            await self.db.execute(
                update(UserSession)
                .where(and_(UserSession.user_id == user_id, UserSession.device_id == device_id))
                .values(is_active=False)
            )
            
            # Log device logout
            await self._log_device_action(user_id, {"device_id": device_id}, "logout")
            
            await self.db.commit()
            return True, "Logout successful"
            
        except Exception as e:
            await self.db.rollback()
            return False, f"Logout failed: {str(e)}"
    
    async def refresh_tokens(self, refresh_token: str) -> Tuple[bool, str, Optional[dict]]:
        """Refresh access token using refresh token"""
        try:
            # Verify refresh token and get user
            # This is a simplified version - you'd implement proper JWT verification
            # For now, we'll return an error
            return False, "Token refresh not implemented yet", None
            
        except Exception as e:
            return False, f"Token refresh failed: {str(e)}", None
    
    async def _get_approved_registration(self, registration_number: str) -> Optional[ApprovedRegistration]:
        """Get approved registration by number"""
        result = await self.db.execute(
            select(ApprovedRegistration)
            .where(ApprovedRegistration.registration_number == registration_number)
        )
        return result.scalar_one_or_none()
    
    async def _get_user_by_registration(self, registration_number: str) -> Optional[User]:
        """Get user by registration number"""
        result = await self.db.execute(
            select(User)
            .where(User.registration_number == registration_number)
        )
        return result.scalar_one_or_none()
    
    async def _get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        result = await self.db.execute(
            select(User)
            .where(User.email == email)
        )
        return result.scalar_one_or_none()
    
    async def _handle_device_binding(self, user_id: str, request: UserLoginRequest) -> dict:
        """Handle device binding - one device per user"""
        try:
            # Get current active session for this user
            current_session = await self.db.execute(
                select(UserSession)
                .where(and_(UserSession.user_id == user_id, UserSession.is_active == True))
            )
            current_session = current_session.scalar_one_or_none()
            
            if current_session:
                # If different device, logout the previous device
                if current_session.device_id != request.device_id:
                    await self.db.execute(
                        update(UserSession)
                        .where(UserSession.id == current_session.id)
                        .values(is_active=False)
                    )
                    
                    # Log device change
                    await self._log_device_action(user_id, request, "device_change")
                    
                    return {
                        "previous_device_logged_out": True,
                        "previous_device_info": f"Device: {current_session.device_name or 'Unknown'}",
                        "message": "Previous device logged out automatically"
                    }
                else:
                    # Same device, just update session
                    return {
                        "previous_device_logged_out": False,
                        "previous_device_info": None,
                        "message": "Same device login"
                    }
            else:
                # First login for this user
                return {
                    "previous_device_logged_out": False,
                    "previous_device_info": None,
                    "message": "First login"
                }
                
        except Exception as e:
            return {
                "previous_device_logged_out": False,
                "previous_device_info": None,
                "message": f"Device binding error: {str(e)}"
            }
    
    async def _create_user_session(self, user_id: str, request: UserLoginRequest, tokens: dict) -> UserSession:
        """Create new user session"""
        session = UserSession(
            id=str(uuid.uuid4()),
            user_id=user_id,
            device_id=request.device_id,
            device_name=request.device_name,
            device_type=request.device_type,
            access_token=tokens["access_token"],
            refresh_token=tokens["refresh_token"],
            is_active=True,
            expires_at=datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        )
        
        self.db.add(session)
        await self.db.commit()
        await self.db.refresh(session)
        return session
    
    async def _log_device_action(self, user_id: str, request: dict, action: str):
        """Log device action for audit trail"""
        device_log = DeviceLog(
            user_id=user_id,
            device_id=request.get("device_id"),
            device_name=request.get("device_name"),
            device_type=request.get("device_type"),
            action=action,
            ip_address=None,  # You can add IP tracking later
            user_agent=None   # You can add user agent tracking later
        )
        
        self.db.add(device_log)
        await self.db.commit()
