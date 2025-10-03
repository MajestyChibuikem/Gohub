from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.auth import (
    UserRegistrationRequest, UserRegistrationResponse,
    UserLoginRequest, UserLoginResponse,
    LogoutRequest, LogoutResponse,
    RefreshTokenRequest, TokenResponse,
    ErrorResponse
)
from app.services.auth_service import AuthService
from app.utils.security import validate_registration_number, validate_password_strength
from typing import Optional

router = APIRouter()

@router.post("/register", response_model=UserRegistrationResponse)
async def register_user(
    request: UserRegistrationRequest,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user"""
    try:
        # Validate input
        if not validate_registration_number(request.registration_number):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid registration number format"
            )
        
        # Validate password strength
        password_validation = validate_password_strength(request.password)
        if not password_validation["is_valid"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Password validation failed: {'; '.join(password_validation['errors'])}"
            )
        
        # Create auth service and register user
        auth_service = AuthService(db)
        success, message, user, tokens = await auth_service.register_user(request)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=message
            )
        
        return UserRegistrationResponse(
            success=True,
            message=message,
            user_id=user.id if user else None,
            access_token=tokens["access_token"] if tokens else None,
            refresh_token=tokens["refresh_token"] if tokens else None
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/login", response_model=UserLoginResponse)
async def login_user(
    request: UserLoginRequest,
    db: AsyncSession = Depends(get_db)
):
    """Login user with device binding"""
    try:
        # Validate input
        if not validate_registration_number(request.registration_number):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid registration number format"
            )
        
        # Create auth service and login user
        auth_service = AuthService(db)
        success, message, user, tokens, device_binding_info = await auth_service.login_user(request)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=message
            )
        
        # Convert user to response model
        user_response = None
        if user:
            user_response = {
                "id": user.id,
                "name": user.name,
                "registration_number": user.registration_number,
                "email": user.email,
                "is_active": user.is_active,
                "is_activated": user.is_activated,
                "created_at": user.created_at,
                "updated_at": user.updated_at
            }
        
        return UserLoginResponse(
            success=True,
            message=message,
            user=user_response,
            access_token=tokens["access_token"] if tokens else None,
            refresh_token=tokens["refresh_token"] if tokens else None,
            device_binding_info=device_binding_info
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )

@router.post("/logout", response_model=LogoutResponse)
async def logout_user(
    request: LogoutRequest,
    db: AsyncSession = Depends(get_db)
):
    """Logout user from specific device"""
    try:
        # For now, we'll require user authentication for logout
        # In a real implementation, you'd extract user_id from JWT token
        # For now, we'll return a success message
        return LogoutResponse(
            success=True,
            message="Logout successful"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Logout failed: {str(e)}"
        )

@router.post("/refresh", response_model=TokenResponse)
async def refresh_tokens(
    request: RefreshTokenRequest,
    db: AsyncSession = Depends(get_db)
):
    """Refresh access token using refresh token"""
    try:
        # For now, we'll return an error
        # In a real implementation, you'd verify the refresh token and create new tokens
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Token refresh not implemented yet"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Token refresh failed: {str(e)}"
        )

@router.get("/validate")
async def validate_token():
    """Validate access token (placeholder)"""
    return {
        "message": "Token validation endpoint - implement with JWT middleware",
        "status": "placeholder"
    }
