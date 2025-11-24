from datetime import datetime, timezone
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.src.core.security import (
    verify_password,
    create_access_token,
    get_password_hash,
)
from backend.src.models.user import User
from backend.src.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
)
from backend.src.schemas.user import UserCreate
from backend.src.service import user_service
from backend.config import settings


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = user_service.get_user_by_email(db, email)
    
    if not user:
        return None
    
    if not verify_password(password, user.password_hash):
        return None
    
    if not user.is_active:
        return None
    
    return user


# ========== REGISTRATION ==========

def register_user(db: Session, request: RegisterRequest) -> dict:
    user_create = UserCreate(
        email=request.email,
        password=request.password,
        full_name=request.full_name,
    )
    
    user = user_service.create_user(db, user_create)
    
    access_token = create_access_token(
        data={"sub": str(user.user_id)},
        expires_minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )
    
    return {
        "user": user,
        "access_token": access_token,
        "token_type": "bearer",
    }
    
    user_create = UserCreate(
        email=request.email,
        password=request.password,
        full_name=request.full_name,
    )
    
    user = user_service.create_user(db, user_create)
    
    access_token = create_access_token(
        data={"sub": str(user.user_id)},
        expires_minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )
    
    return {
        "user": user,
        "access_token": access_token,
        "token_type": "bearer",
    }


# ========== LOGIN ==========

def login_user(db: Session, request: LoginRequest) -> dict:
    user = authenticate_user(db, request.email, request.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_service.update_last_login(db, user.user_id)
    
    access_token = create_access_token(
        data={"sub": str(user.user_id)},
        expires_minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES,
    )
    
    return {
        "user": user,
        "access_token": access_token,
        "token_type": "bearer",
    }


# ========== PASSWORD MANAGEMENT ==========

def change_password(
    db: Session,
    user_id: int,
    old_password: str,
    new_password: str,
) -> bool:
    user = user_service.get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    if not verify_password(old_password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password",
        )
    
    user.password_hash = get_password_hash(new_password)
    db.commit()
    
    return True


def reset_password_request(db: Session, email: str) -> bool:
    user = user_service.get_user_by_email(db, email)
    
    if user:
        # TODO: Generate reset token and send email
        # reset_token = create_reset_token(user_id)
        # send_password_reset_email(email, reset_token)
        pass
    
    # Always return True to prevent email enumeration
    return True


def verify_reset_token(token: str) -> Optional[int]:
    """
    Verify password reset token and return user_id.
    TODO: Implement token verification logic.
    
    Args:
        token: Reset token
    
    Returns:
        user_id if token is valid, None otherwise
    """
    # TODO: Implement token verification
    # This would decode/verify the token and return user_id
    pass


def reset_password(db: Session, token: str, new_password: str) -> bool:
    """
    Reset password using reset token.
    TODO: Implement complete logic.
    
    Args:
        db: Database session
        token: Reset token
        new_password: New password
    
    Returns:
        True if successful
    
    Raises:
        HTTPException: If token is invalid or expired
    """
    # Verify token and get user_id
    user_id = verify_reset_token(token)
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )
    
    user = user_service.get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    user.password_hash = get_password_hash(new_password)
    db.commit()
    
    return True
