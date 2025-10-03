from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Request schemas
class UserRegistrationRequest(BaseModel):
    """User registration request"""
    name: str = Field(..., min_length=2, max_length=100, description="Full name of the user")
    registration_number: str = Field(..., min_length=5, max_length=50, description="University registration number")
    email: Optional[EmailStr] = Field(None, description="Email address (optional)")
    password: str = Field(..., min_length=6, max_length=100, description="User password")
    device_id: str = Field(..., description="Unique device identifier")
    device_name: Optional[str] = Field(None, description="Device name/model")
    device_type: str = Field(..., description="Device type (android, ios, web)")

class UserLoginRequest(BaseModel):
    """User login request"""
    registration_number: str = Field(..., description="University registration number")
    password: str = Field(..., description="User password")
    device_id: str = Field(..., description="Unique device identifier")
    device_name: Optional[str] = Field(None, description="Device name/model")
    device_type: str = Field(..., description="Device type (android, ios, web)")

class RefreshTokenRequest(BaseModel):
    """Refresh token request"""
    refresh_token: str = Field(..., description="Refresh token")

class LogoutRequest(BaseModel):
    """User logout request"""
    device_id: str = Field(..., description="Device identifier to logout")

# Response schemas
class UserRegistrationResponse(BaseModel):
    """User registration response"""
    success: bool
    message: str
    user_id: Optional[str] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None

class UserLoginResponse(BaseModel):
    """User login response"""
    success: bool
    message: str
    user: Optional["UserResponse"] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    device_binding_info: Optional["DeviceBindingInfo"] = None

class UserResponse(BaseModel):
    """User information response"""
    id: str
    name: str
    registration_number: str
    email: Optional[str]
    is_active: bool
    is_activated: bool
    created_at: datetime
    updated_at: datetime

class DeviceBindingInfo(BaseModel):
    """Device binding information"""
    previous_device_logged_out: bool
    previous_device_info: Optional[str] = None
    message: str

class TokenResponse(BaseModel):
    """Token response"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds

class LogoutResponse(BaseModel):
    """Logout response"""
    success: bool
    message: str

class ErrorResponse(BaseModel):
    """Error response"""
    success: bool = False
    error: str
    message: str
    details: Optional[dict] = None

# Update forward references
UserResponse.model_rebuild()
UserLoginResponse.model_rebuild()
