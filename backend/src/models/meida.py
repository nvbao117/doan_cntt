from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from backend.src.db.base import Base
from backend.src.models.base import MediaType

class MediaAsset(Base):
    __tablename__ = "media_assets"

    media_id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String(500), nullable=False)
    media_type = Column(Enum(MediaType))
    description = Column(String(255))
    
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"), nullable=True)
    question_id = Column(Integer, ForeignKey("questions.question_id"), nullable=True)
    
    # Relationships
    lesson = relationship("Lesson", back_populates="media_assets")
    question = relationship("Question", back_populates="media_assets")