from fastapi import APIRouter, HTTPException

from app.schemas.content import ArchiveItem, ArchiveItemDetail
from app.services.content.archive_service import ArchiveService

router = APIRouter(prefix="/archive", tags=["archive"])

service = ArchiveService()


@router.get("", response_model=list[ArchiveItem])
def list_archive_items() -> list[ArchiveItem]:
    return service.list_items()


@router.get("/{slug}", response_model=ArchiveItemDetail)
def get_archive_item(slug: str) -> ArchiveItemDetail:
    item = service.get_by_slug(slug)
    if item is None:
        raise HTTPException(status_code=404, detail="Archive item not found")
    return item
