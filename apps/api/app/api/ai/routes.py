from fastapi import APIRouter

from app.schemas.ai import (
    ChordSuggestionRequest,
    ChordSuggestionResponse,
    DescribeTrackRequest,
    DescribeTrackResponse,
    TrackIdeaRequest,
    TrackIdeaResponse,
)
from app.services.ai.assistant import AICreationService

router = APIRouter(prefix="/ai", tags=["ai"])

service = AICreationService()


@router.post("/chords", response_model=ChordSuggestionResponse)
def generate_chords(payload: ChordSuggestionRequest) -> ChordSuggestionResponse:
    return service.generate_chords(payload)


@router.post("/describe", response_model=DescribeTrackResponse)
def describe_track(payload: DescribeTrackRequest) -> DescribeTrackResponse:
    return service.describe_track(payload)


@router.post("/idea", response_model=TrackIdeaResponse)
def generate_track_idea(payload: TrackIdeaRequest) -> TrackIdeaResponse:
    return service.generate_idea(payload)
