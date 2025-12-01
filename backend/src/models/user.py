from sqlalchemy import Column, String, Boolean, DateTime, Integer, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.src.db.base import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255))
    birth_date = Column(Date)
    experience_level = Column(Integer) # 1=beginner, 2=intermediate
    total_points = Column(Integer, default=0)
    last_active_timestamp = Column(DateTime(timezone=True))
    
    role_id = Column(Integer, ForeignKey("roles.role_id"))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    # last_login removed or mapped to last_active_timestamp if preferred, keeping last_active_timestamp as requested

    # Relationships
    role = relationship("Role", back_populates="users")
    progress = relationship("UserProgress", back_populates="user")
    daily_activities = relationship("DailyActivity", back_populates="user")
    activity_logs = relationship("ActivityLog", back_populates="user")
    quiz_attempts = relationship("UserQuizAttempt", back_populates="user")
    chat_sessions = relationship("ChatSession", back_populates="user")