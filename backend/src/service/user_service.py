from datetime import datetime, timezone
from typing import Optional, List

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.src.core.security import get_password_hash
from backend.src.models.user import User
from backend.src.schemas.user import UserCreate, UserUpdate


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.user_id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def get_users(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    is_active: Optional[bool] = None
) -> List[User]:
    query = db.query(User)
    
    if is_active is not None:
        query = query.filter(User.is_active == is_active)
    
    return query.offset(skip).limit(limit).all()

def create_user(db: Session, user_create: UserCreate) -> User:
    existing_user = get_user_by_email(db, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    hashed_password = get_password_hash(user_create.password)
    
    db_user = User(
        email=user_create.email,
        password_hash=hashed_password,
        full_name=user_create.full_name,
        is_active=True,
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user



def update_user(
    db: Session, 
    user_id: int, 
    user_update: UserUpdate
) -> User:
    user = get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    update_data = user_update.model_dump(exclude_unset=True)
    
    if "password" in update_data:
        password = update_data.pop("password")
        update_data["password_hash"] = get_password_hash(password)
    
    if "email" in update_data and update_data["email"] != user.email:
        existing_user = get_user_by_email(db, update_data["email"])
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use",
            )
    
    for field, value in update_data.items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    
    return user


def update_last_login(db: Session, user_id: int) -> None:
    user = get_user_by_id(db, user_id)
    if user:
        user.last_login = datetime.now(timezone.utc)
        db.commit()

def deactivate_user(db: Session, user_id: int) -> User:
    user = get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    user.is_active = False
    db.commit()
    db.refresh(user)
    
    return user


def activate_user(db: Session, user_id: int) -> User:
    user = get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    user.is_active = True
    db.commit()
    db.refresh(user)
    
    return user


def delete_user(db: Session, user_id: int) -> bool:
    user = get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    db.delete(user)
    db.commit()
    
    return True



def is_user_active(db: Session, user_id: int) -> bool:
    user = get_user_by_id(db, user_id)
    return user.is_active if user else False


def count_users(db: Session, is_active: Optional[bool] = None) -> int:
    query = db.query(User)
    
    if is_active is not None:
        query = query.filter(User.is_active == is_active)
    
    return query.count()
