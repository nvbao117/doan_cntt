from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.src.db import get_db
from backend.src.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    ChangePasswordRequest,
    MessageResponse,
)
from backend.src.service import auth_service
from backend.src.core.security import get_current_user

router = APIRouter(tags=["Authentication"])

@router.post("/register",response_model=TokenResponse)
def register(
    request: RegisterRequest,
    db: Session=Depends(get_db)  
):
    result = auth_service.register_user(db,request)
    return result

@router.post("/login", response_model=TokenResponse)
def login(
    request: LoginRequest,
    db: Session=Depends(get_db)
):
    result=auth_service.login_user(db,request)
    return result

@router.post("/change-password",response_model=MessageResponse)
def change_password(
    request: ChangePasswordRequest,
    current_user= Depends(get_current_user),
    db: Session=Depends(get_db)
):
    auth_service.change_password(
        db,
        current_user.user_id,
        request.old_password,
        request.new_password
    )
    return {"message": "Password changed successfully"}
