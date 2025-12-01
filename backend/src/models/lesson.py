from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.src.db.base import Base
from backend.src.models.base import LessonStatus

class Language(Base):
    __tablename__ = "languages"
    
    language_id = Column(Integer, primary_key=True, autoincrement=True)
    language_code = Column(String(10), unique=True, nullable=False) # en, vi
    language_name = Column(String(50), nullable=False) # English, Vietnamese
    
    lessons = relationship("Lesson", back_populates="language")

class Lesson(Base):
    __tablename__ = "lessons"

    lesson_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    difficulty_level = Column(Integer) # 1-5
    topic = Column(String(255)) # Travel, Business
    category = Column(String(255)) # reading, writing, grammar...
    summary = Column(Text)
    learning_goal = Column(Text)
    useful_phrases = Column(Text)
    
    prerequisite_lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"), nullable=True)
    language_id = Column(Integer, ForeignKey("languages.language_id"))
    
    status = Column(Enum(LessonStatus), default=LessonStatus.draft)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    language = relationship("Language", back_populates="lessons")
    prerequisite = relationship("Lesson", remote_side=[lesson_id], backref="dependent_lessons")
    
    vocabulary_items = relationship("VocabularyItem", back_populates="lesson")
    grammar_topic = relationship("GrammarTopic", uselist=False, back_populates="lesson")
    reading_article = relationship("ReadingArticle", uselist=False, back_populates="lesson")
    speaking_lesson = relationship("SpeakingLesson", uselist=False, back_populates="lesson")
    writing_task = relationship("WritingTask", uselist=False, back_populates="lesson")
    
    quizzes = relationship("Quiz", back_populates="lesson")
    media_assets = relationship("MediaAsset", back_populates="lesson")

class VocabularyItem(Base):
    __tablename__ = "vocabulary_items"
    
    vocabulary_id = Column(Integer, primary_key=True, autoincrement=True)
    word = Column(String(255), nullable=False)
    definition = Column(Text)
    example_sentence = Column(Text)
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"))
    
    lesson = relationship("Lesson", back_populates="vocabulary_items")

# --- Lesson Content Sub-tables (1:1) ---

class ReadingArticle(Base):
    __tablename__ = "reading_articles"
    
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"), primary_key=True)
    content_text = Column(Text)
    word_count = Column(Integer)
    
    lesson = relationship("Lesson", back_populates="reading_article")

class WritingTask(Base):
    __tablename__ = "writing_tasks"
    
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"), primary_key=True)
    prompt_text = Column(Text)
    sample_response = Column(Text)
    structure_guidance = Column(Text)
    response_format = Column(String(100))
    min_word_limit = Column(Integer)
    max_word_limit = Column(Integer)
    
    lesson = relationship("Lesson", back_populates="writing_task")

class GrammarTopic(Base):
    __tablename__ = "grammar_topics"
    
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"), primary_key=True)
    content_text = Column(Text)
    explanation_text = Column(Text)
    
    lesson = relationship("Lesson", back_populates="grammar_topic")

class SpeakingLesson(Base):
    __tablename__ = "speaking_lessons"
    
    lesson_id = Column(Integer, ForeignKey("lessons.lesson_id"), primary_key=True)
    content_text = Column(Text)
    pronunciation_guidance = Column(Text)
    
    lesson = relationship("Lesson", back_populates="speaking_lesson")