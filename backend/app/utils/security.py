from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from app.utils.config import settings
import secrets

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def create_tokens(user_id: str) -> dict:
    """Create access and refresh tokens for a user"""
    # Access token expires in 30 minutes
    access_token_expires = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Refresh token expires in 7 days
    refresh_token_expires = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    # Create access token
    access_token_data = {
        "sub": user_id,
        "type": "access",
        "exp": access_token_expires,
        "iat": datetime.utcnow()
    }
    
    # Create refresh token
    refresh_token_data = {
        "sub": user_id,
        "type": "refresh",
        "exp": refresh_token_expires,
        "iat": datetime.utcnow(),
        "jti": secrets.token_urlsafe(32)  # JWT ID for refresh token
    }
    
    # Generate tokens
    access_token = jwt.encode(
        access_token_data,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    
    refresh_token = jwt.encode(
        refresh_token_data,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # seconds
        "refresh_expires_in": settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60  # seconds
    }

def verify_token(token: str, token_type: str = "access") -> dict:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        
        # Check token type
        if payload.get("type") != token_type:
            raise JWTError("Invalid token type")
        
        # Check if token is expired
        exp = payload.get("exp")
        if exp is None:
            raise JWTError("Token has no expiration")
        
        if datetime.utcnow() > datetime.fromtimestamp(exp):
            raise JWTError("Token has expired")
        
        return payload
        
    except JWTError as e:
        raise JWTError(f"Invalid token: {str(e)}")

def get_user_id_from_token(token: str) -> str:
    """Extract user ID from access token"""
    payload = verify_token(token, "access")
    return payload.get("sub")

def generate_device_id() -> str:
    """Generate a unique device identifier"""
    return secrets.token_urlsafe(32)

def validate_device_id(device_id: str) -> bool:
    """Validate device ID format"""
    # Basic validation - device ID should be at least 32 characters
    return len(device_id) >= 32 and device_id.isalnum()

def sanitize_input(input_string: str) -> str:
    """Sanitize user input to prevent injection attacks"""
    if not input_string:
        return ""
    
    # Remove potentially dangerous characters
    dangerous_chars = ["<", ">", '"', "'", "&", ";", "|", "`", "$", "(", ")", "{", "}"]
    sanitized = input_string
    
    for char in dangerous_chars:
        sanitized = sanitized.replace(char, "")
    
    return sanitized.strip()

def validate_registration_number(reg_number: str) -> bool:
    """Validate registration number format"""
    if not reg_number:
        return False
    
    # Basic validation - should be alphanumeric and reasonable length
    return (
        reg_number.isalnum() and
        5 <= len(reg_number) <= 50 and
        not reg_number.startswith("0")  # Usually registration numbers don't start with 0
    )

def validate_password_strength(password: str) -> dict:
    """Validate password strength"""
    errors = []
    warnings = []
    
    if len(password) < 6:
        errors.append("Password must be at least 6 characters long")
    elif len(password) < 8:
        warnings.append("Consider using a password at least 8 characters long")
    
    if not any(c.isupper() for c in password):
        warnings.append("Consider including uppercase letters")
    
    if not any(c.islower() for c in password):
        warnings.append("Consider including lowercase letters")
    
    if not any(c.isdigit() for c in password):
        warnings.append("Consider including numbers")
    
    if not any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
        warnings.append("Consider including special characters")
    
    return {
        "is_valid": len(errors) == 0,
        "errors": errors,
        "warnings": warnings,
        "score": max(0, 10 - len(errors) - len(warnings))
    }
