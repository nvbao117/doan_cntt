from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, Date, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.src.db.base import Base
from backend.src.models.base import ProgressStatus

class UserProgress(Base):
    __tablename__ = "user_progress"

    progress_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"), nullable=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"), nullable=True)
    
    achieved_score = Column(Integer)
    progress_status = Column(Enum(ProgressStatus), default=ProgressStatus.not_started)
    last_access_timestamp = Column(DateTime(timezone=True))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="progress")

class DailyActivity(Base):
    __tablename__ = "daily_activities"

    activity_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    activity_date = Column(Date, default=func.current_date())
    minutes_spent = Column(Integer, default=0)
    activity_type = Column(String(100))
    achieved_score = Column(Integer, default=0) # Total or average score for the day
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="daily_activities")

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    log_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    activity_type = Column(String(100)) # start_lesson, complete_lesson, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # Start time
    end_timestamp = Column(DateTime(timezone=True))
    total_points = Column(Integer, default=0)
    details = Column(JSON)
    
    # Relationships
    user = relationship("User", back_populates="activity_logs")