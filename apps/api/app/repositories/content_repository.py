from datetime import date
from decimal import Decimal

from app.schemas.content import ArchiveItemDetail, ProductSummary


class ContentRepository:
    def list_archive_items(self) -> list[ArchiveItemDetail]:
        return [
            ArchiveItemDetail(
                slug="2026-how-i-slice-jungle-breaks",
                title="How I Slice Jungle Breaks in Browser",
                date=date(2026, 3, 28),
                tags=["jungle", "web-audio", "tutorial"],
                description="A practical workflow for slicing and re-sequencing breaks in binbox.",
                locale="en",
                body="Background, method, examples, and reflection for browser-based break slicing.",
                related_slugs=["2026-breakbeat-generator-notes"],
            ),
            ArchiveItemDetail(
                slug="2026-breakbeat-generator-notes",
                title="Building a Breakbeat Generator with Memory of 90s Interfaces",
                date=date(2026, 3, 20),
                tags=["breakbeat", "design", "nostalgia"],
                description="Notes on turning constraint-driven rhythm systems into a playable interface.",
                locale="en",
                body="Design notes and implementation ideas for pattern generation and UI direction.",
                related_slugs=["2026-how-i-slice-jungle-breaks"],
            ),
        ]

    def list_products(self) -> list[ProductSummary]:
        return [
            ProductSummary(
                id=1,
                slug="binbox-jungle-foundations",
                title="Binbox Jungle Foundations",
                description="Sample pack with chopped breaks, pads, and low-bit FX.",
                type="sample-pack",
                price=Decimal("19.00"),
                cover_image="/images/store/jungle-foundations.jpg",
                status="ready",
                buy_enabled=False,
            ),
            ProductSummary(
                id=2,
                slug="binbox-break-tools-notes",
                title="Binbox Break Tools Notes",
                description="Process notes and downloadable patch ideas for break manipulation.",
                type="tutorial",
                price=Decimal("9.00"),
                cover_image="/images/store/break-tools-notes.jpg",
                status="concept",
                buy_enabled=False,
            ),
        ]
