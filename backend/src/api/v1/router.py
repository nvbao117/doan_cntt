from fastapi import APIRouter

from backend.src.api.v1.endpoints import users
from backend.src.api.v1.endpoints import auth
from backend.src.api.v1.endpoints import chat


router = APIRouter()
router.include_router(auth.router, prefix="/auth")
router.include_router(chat.router, prefix="/chat")
router.include_router(users.router, prefix="/users")