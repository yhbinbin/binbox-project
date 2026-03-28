from app.repositories.content_repository import ContentRepository
from app.schemas.content import ArchiveItem, ArchiveItemDetail


class ArchiveService:
    def __init__(self, repository: ContentRepository | None = None) -> None:
        self.repository = repository or ContentRepository()

    def list_items(self) -> list[ArchiveItem]:
        items = self.repository.list_archive_items()
        return [
            ArchiveItem(
                slug=item.slug,
                title=item.title,
                date=item.date,
                tags=item.tags,
                description=item.description,
                locale=item.locale,
            )
            for item in items
        ]

    def get_by_slug(self, slug: str) -> ArchiveItemDetail | None:
        return next((item for item in self.repository.list_archive_items() if item.slug == slug), None)
