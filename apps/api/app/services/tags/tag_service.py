from app.schemas.tagging import TagAnalyzeRequest, TagAnalyzeResponse


class TagAnalysisService:
    def analyze(self, payload: TagAnalyzeRequest) -> TagAnalyzeResponse:
        corpus = " ".join(
            part for part in [payload.title, payload.description or "", payload.body or ""] if part
        ).lower()
        keywords = {
            "jungle": ["jungle", "amen", "break"],
            "web-audio": ["web audio", "browser", "tone.js"],
            "tutorial": ["how to", "workflow", "tutorial"],
            "nostalgia": ["90s", "nostalgia", "retro"],
            "sound-design": ["texture", "sound design", "sample"],
        }

        tags = [tag for tag, matches in keywords.items() if any(term in corpus for term in matches)]
        if not tags:
            tags = ["music", "experimental"]

        summary = f"Detected {len(tags)} topical tags from the supplied text."
        return TagAnalyzeResponse(tags=tags, summary=summary)
