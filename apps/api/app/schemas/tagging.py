from pydantic import BaseModel, Field


class TagAnalyzeRequest(BaseModel):
    title: str
    description: str | None = None
    body: str | None = None


class TagAnalyzeResponse(BaseModel):
    tags: list[str] = Field(default_factory=list)
    summary: str
