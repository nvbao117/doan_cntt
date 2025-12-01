from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime, Boolean, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.src.db.base import Base
from backend.src.models.base import QuestionType, QuizType, QuizStatus

class Quiz(Base):
    __tablename__ = "quizzes"

    quiz_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    difficulty_level = Column(Integer)
    quiz_type = Column(Enum(QuizType)) # multiple_choice | fill_in | matching
    content_type = Column(String(100)) # grammar, vocabulary, reading...
    status = Column(Enum(QuizStatus), default=QuizStatus.active)
    max_score = Column(Integer)
    duration_minutes = Column(Integer)
    start_timestamp = Column(DateTime(timezone=True))
    
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    lesson = relationship("Lesson", back_populates="quizzes")
    questions = relationship("Question", back_populates="quiz")
    attempts = relationship("UserQuizAttempt", back_populates="quiz")

class Question(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, autoincrement=True)
    question_text = Column(Text, nullable=False)
    question_type = Column(Enum(QuestionType)) # multiple_choice | short_answer | true_false
    point_value = Column(Integer, default=1)
    
    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    quiz = relationship("Quiz", back_populates="questions")
    answers = relationship("Answer", back_populates="question")
    media_assets = relationship("MediaAsset", back_populates="question")

class Answer(Base):
    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, autoincrement=True)
    answer_text = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    explanation_text = Column(Text)
    
    question_id = Column(Integer, ForeignKey("questions.question_id"))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    question = relationship("Question", back_populates="answers")

class UserQuizAttempt(Base):
    __tablename__ = "user_quiz_attempts"

    attempt_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    quiz_id = Column(Integer, ForeignKey("quizzes.quiz_id"))
    
    achieved_points = Column(Integer)
    start_timestamp = Column(DateTime(timezone=True))
    end_timestamp = Column(DateTime(timezone=True))
    last_active_timestamp = Column(DateTime(timezone=True))
    
    # Relationships
    user = relationship("User", back_populates="quiz_attempts")
    quiz = relationship("Quiz", back_populates="attempts")