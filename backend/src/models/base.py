import enum

class ProficiencyLevel(enum.Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

class MessageRole(enum.Enum):
    user = "user"
    assistant = "assistant" # system (bot)
    system = "system"

class QuestionType(enum.Enum):
    multiple_choice = "multiple_choice"
    short_answer = "short_answer"
    true_false = "true_false"
    fill_in = "fill_in"
    matching = "matching"

class DifficultyLevel(enum.Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

# --- New Enums from ERD ---
class MediaType(enum.Enum):
    image = "image"
    audio = "audio"
    video = "video"

class LessonStatus(enum.Enum):
    draft = "draft"
    published = "published"
    archived = "archived"

class ProgressStatus(enum.Enum):
    not_started = "not_started"
    in_progress = "in_progress"
    completed = "completed"
    failed = "failed"

class QuizType(enum.Enum):
    multiple_choice = "multiple_choice"
    fill_in = "fill_in"
    matching = "matching"
    # Add others if needed like vocabulary, grammar based on context

class QuizStatus(enum.Enum):
    active = "active"
    inactive = "inactive"

class ContentType(enum.Enum):
    grammar = "grammar"
    vocabulary = "vocabulary"
    reading = "reading"
    speaking = "speaking"
    writing = "writing"
    mixed = "mixed"