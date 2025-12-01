from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime, Boolean, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.src.db.base import Base
from backend.src.models.base import MessageRole

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    session_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    
    start_timestamp = Column(DateTime(timezone=True), server_default=func.now())
    end_timestamp = Column(DateTime(timezone=True))
    metadata_info = Column(JSON, name="metadata") # Renamed to metadata_info to avoid conflict, mapped to 'metadata' if needed or just use metadata_info
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session")

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    message_id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.session_id"))
    
    sender_type = Column(Enum(MessageRole))
    message_timestamp = Column(DateTime(timezone=True), server_default=func.now())
    message_text = Column(Text)
    is_feedback = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    session = relationship("ChatSession", back_populates="messages")