from fastapi import APIRouter

from app.schemas.content import ProductListResponse
from app.services.content.store_service import StoreService

router = APIRouter(prefix="/store", tags=["store"])

service = StoreService()


@router.get("", response_model=ProductListResponse)
def list_products() -> ProductListResponse:
    return service.list_products()
