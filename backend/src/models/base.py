import enum

class ProficiencyLevel(enum.Enum):
    beginer="beginner"
    intermediate="intermediate"
    advanced="advanced"

class MessageRole(enum.Enum):
    user = "user"
    assistant = "assistant"
    system = "system"

class QuestionType(enum.Enum):
    multiple_choice = "multiple_choice"
    true_false = "true_false"
    short_answer = "short_answer"
    fill_blank = "fill_blank"

class DifficultyLevel(enum.Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"