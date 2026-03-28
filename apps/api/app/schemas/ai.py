from pydantic import BaseModel, Field


class ChordSuggestionRequest(BaseModel):
    mood: str
    bpm: int | None = None
    key: str | None = None
    bars: int = 8


class ChordSuggestionResponse(BaseModel):
    progression: list[str] = Field(default_factory=list)
    rationale: str
    engine: str


class DescribeTrackRequest(BaseModel):
    title: str
    bpm: int | None = None
    key: str | None = None
    mood_tags: list[str] = Field(default_factory=list)


class DescribeTrackResponse(BaseModel):
    description: str
    short_blurb: str
    engine: str


class TrackIdeaRequest(BaseModel):
    style: str
    references: list[str] = Field(default_factory=list)
    mood: str | None = None


class TrackIdeaResponse(BaseModel):
    title: str
    concept: str
    arrangement_notes: list[str] = Field(default_factory=list)
    engine: str
