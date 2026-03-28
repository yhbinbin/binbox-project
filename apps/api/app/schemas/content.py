from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, Field

from app.schemas.common import ORMModel


class ArchiveItem(BaseModel):
    slug: str
    title: str
    date: date
    tags: list[str] = Field(default_factory=list)
    description: str
    locale: str = "en"


class ArchiveItemDetail(ArchiveItem):
    body: str
    related_slugs: list[str] = Field(default_factory=list)


class ProductSummary(ORMModel):
    id: int
    slug: str
    title: str
    description: str | None = None
    type: str
    price: Decimal
    cover_image: str | None = None
    status: str
    buy_enabled: bool


class ProductListResponse(BaseModel):
    items: list[ProductSummary]
    total: int


class MusicTrackAnalysis(BaseModel):
    title: str
    bpm: int
    key: str
    mood_tags: list[str] = Field(default_factory=list)
    description: str
    analyzed_at: datetime
