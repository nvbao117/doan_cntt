from sqlalchemy import Column, String, Boolean, DateTime, Text, Date, Integer
from backend.src.models.base import ProficiencyLevel
from backend.src.db.base import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer,primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable= False, index=True)
    password_hash=Column(String(255), nullable=False)
    full_name = Column(String(255)) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())    
    last_login = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=True) 
