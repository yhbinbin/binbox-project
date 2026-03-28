from fastapi import APIRouter

from app.schemas.recommendation import RecommendationRequest, RecommendationResponse
from app.services.recommendations.recommendation_service import RecommendationService

router = APIRouter(tags=["recommendations"])

service = RecommendationService()


@router.post("/recommend", response_model=RecommendationResponse)
def recommend(payload: RecommendationRequest) -> RecommendationResponse:
    return service.recommend(payload)
