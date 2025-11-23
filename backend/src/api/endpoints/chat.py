from fastapi import APIRouter, HTTPException
from src.schemas import ChatRequest,ChatResponse
from src.service import process_chat

router = APIRouter()

@router.post("/chat",response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        reply_text = await process_chat(request.message,request.thread_id)
        return ChatResponse(reply=reply_text)
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    