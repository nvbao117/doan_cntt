from pydantic import BaseModel
class ChatRequest(BaseModel):
    message: str
    thread_id: str = "1"  # Để hỗ trợ nhớ ngữ cảnh chat
class ChatResponse(BaseModel):
    reply: str