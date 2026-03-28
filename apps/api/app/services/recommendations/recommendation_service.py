from app.repositories.content_repository import ContentRepository
from app.schemas.recommendation import RecommendationItem, RecommendationRequest, RecommendationResponse


class RecommendationService:
    def __init__(self, repository: ContentRepository | None = None) -> None:
        self.repository = repository or ContentRepository()

    def recommend(self, payload: RecommendationRequest) -> RecommendationResponse:
        archive = self.repository.list_archive_items()
        products = self.repository.list_products()
        requested_tags = {tag.lower() for tag in payload.tags}
        mood = (payload.mood or "").lower()

        scored: list[RecommendationItem] = []

        for item in archive:
            tag_overlap = len(requested_tags.intersection({tag.lower() for tag in item.tags}))
            mood_bonus = 0.2 if mood and mood in item.description.lower() else 0.0
            score = round(tag_overlap + mood_bonus + 0.5, 2)
            scored.append(
                RecommendationItem(
                    slug=item.slug,
                    title=item.title,
                    kind="archive",
                    score=score,
                    reason="Related editorial content based on shared tags and mood.",
                )
            )

        for item in products:
            text = f"{item.title} {item.description or ''}".lower()
            tag_overlap = sum(1 for tag in requested_tags if tag in text)
            bpm_bonus = 0.2 if payload.bpm and 160 <= payload.bpm <= 170 and "jungle" in text else 0.0
            score = round(tag_overlap + bpm_bonus + 0.4, 2)
            scored.append(
                RecommendationItem(
                    slug=item.slug,
                    title=item.title,
                    kind="product",
                    score=score,
                    reason="Relevant store item inferred from stylistic metadata.",
                )
            )

        items = sorted(scored, key=lambda item: item.score, reverse=True)[: payload.limit]
        return RecommendationResponse(items=items)
