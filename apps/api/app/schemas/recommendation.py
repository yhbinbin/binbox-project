from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    tags: list[str] = Field(default_factory=list)
    bpm: int | None = None
    mood: str | None = None
    limit: int = 5


class RecommendationItem(BaseModel):
    slug: str
    title: str
    kind: str
    score: float
    reason: str


class RecommendationResponse(BaseModel):
    items: list[RecommendationItem] = Field(default_factory=list)
