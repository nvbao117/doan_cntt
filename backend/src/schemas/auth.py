from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, ConfigDict

from backend.src.schemas.user import UserResponse


# ========== LOGIN & TOKEN SCHEMAS ==========

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    user: UserResponse
    
    model_config = ConfigDict(from_attributes=True)


# ========== REGISTRATION SCHEMAS ==========

class RegisterRequest(BaseModel):
    """Schema for user registration with optional profile."""
    email: EmailStr
    password: str = Field(
        ..., 
        min_length=6,   
        max_length=72,  
        description="User password"
    )
    full_name: str = Field(..., min_length=1, max_length=255)


class RegisterResponse(BaseModel):
    """Schema for registration response."""
    user: UserResponse
    access_token: str
    token_type: str = "bearer"
    
    model_config = ConfigDict(from_attributes=True)


# ========== PASSWORD MANAGEMENT ==========

class ChangePasswordRequest(BaseModel):
    old_password: str = Field(..., min_length=1)
    new_password: str = Field(..., min_length=6, max_length=72)


class ResetPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordConfirm(BaseModel):
    """Schema for password reset confirmation."""
    token: str
    new_password: str = Field(..., min_length=8, max_length=100)


# ========== RESPONSE MESSAGES ==========

class MessageResponse(BaseModel):
    """Generic message response schema."""
    message: str
    detail: Optional[str] = None