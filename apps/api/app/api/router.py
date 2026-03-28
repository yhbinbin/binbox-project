from fastapi import APIRouter

from app.api.ai.routes import router as ai_router
from app.api.archive.routes import router as archive_router
from app.api.audio.routes import router as audio_router
from app.api.health import router as health_router
from app.api.recommendations.routes import router as recommendations_router
from app.api.store.routes import router as store_router
from app.api.tags.routes import router as tags_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(archive_router)
api_router.include_router(store_router)
api_router.include_router(audio_router)
api_router.include_router(ai_router)
api_router.include_router(recommendations_router)
api_router.include_router(tags_router)
