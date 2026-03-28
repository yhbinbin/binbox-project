from app.repositories.content_repository import ContentRepository
from app.schemas.content import ProductListResponse


class StoreService:
    def __init__(self, repository: ContentRepository | None = None) -> None:
        self.repository = repository or ContentRepository()

    def list_products(self) -> ProductListResponse:
        items = self.repository.list_products()
        return ProductListResponse(items=items, total=len(items))
