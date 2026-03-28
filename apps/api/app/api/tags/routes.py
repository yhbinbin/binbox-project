from fastapi import APIRouter

from app.schemas.tagging import TagAnalyzeRequest, TagAnalyzeResponse
from app.services.tags.tag_service import TagAnalysisService

router = APIRouter(prefix="/tags", tags=["tags"])

service = TagAnalysisService()


@router.post("/analyze", response_model=TagAnalyzeResponse)
def analyze_tags(payload: TagAnalyzeRequest) -> TagAnalyzeResponse:
    return service.analyze(payload)
