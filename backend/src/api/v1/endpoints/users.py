from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.src.db.session import get_db
from backend.src.schemas.user import UserResponse, UserUpdate
from backend.src.service import user_service
from backend.src.core.security import get_current_user

router = APIRouter(tags=["Users"])

@router.patch("/me", response_model=UserResponse)
def update_current_user(
    user_update: UserUpdate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    updated_user = user_service.update_user(
        db,
        current_user.user_id,
        user_update
    )
    return updated_user


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get user by ID (admin only)."""
    user = user_service.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/me")
def deactivate_current_user(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_service.deactivate_user(db, current_user.user_id)
    return {"message": "Account deactivated successfully"}