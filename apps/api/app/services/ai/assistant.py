from app.core.config import get_settings
from app.schemas.ai import (
    ChordSuggestionRequest,
    ChordSuggestionResponse,
    DescribeTrackRequest,
    DescribeTrackResponse,
    TrackIdeaRequest,
    TrackIdeaResponse,
)


class AICreationService:
    def __init__(self) -> None:
        self.settings = get_settings()

    def generate_chords(self, payload: ChordSuggestionRequest) -> ChordSuggestionResponse:
        key_root = payload.key or "A minor"
        mood = payload.mood.lower()
        if "dark" in mood or "jungle" in mood:
            progression = [f"{key_root}", "Fmaj7", "G", "Em"]
            rationale = "Leans minor and suspended to fit darker breakbeat palettes."
        else:
            progression = [f"{key_root}", "C", "G", "D"]
            rationale = "Keeps the loop bright and direct for sketching melodic ideas."
        return ChordSuggestionResponse(progression=progression, rationale=rationale, engine=self._engine_name())

    def describe_track(self, payload: DescribeTrackRequest) -> DescribeTrackResponse:
        bpm_text = f"{payload.bpm} BPM" if payload.bpm else "mid-tempo"
        key_text = payload.key or "an open tonal center"
        mood_text = ", ".join(payload.mood_tags) if payload.mood_tags else "textured and nostalgic"
        description = (
            f"{payload.title} sits around {bpm_text} in {key_text}, with a palette that feels "
            f"{mood_text}. It is structured for binbox's 90s digital nostalgia direction."
        )
        short_blurb = f"{payload.title}: {mood_text}, {bpm_text}, built for browser-era rhythm experiments."
        return DescribeTrackResponse(description=description, short_blurb=short_blurb, engine=self._engine_name())

    def generate_idea(self, payload: TrackIdeaRequest) -> TrackIdeaResponse:
        refs = ", ".join(payload.references) if payload.references else "pirate radio, tracker interfaces, broken samplers"
        mood = payload.mood or "nostalgic tension"
        title = f"{payload.style.title()} Memory Sketch"
        concept = (
            f"Build a {payload.style} piece around {mood}, using references from {refs}. "
            "Start with a degraded break loop, then layer harmonic fragments and spoken textures."
        )
        arrangement_notes = [
            "Open with filtered noise and a narrow-band pad.",
            "Introduce drums after an 8-bar tension ramp.",
            "Reserve the widest stereo material for the final section.",
        ]
        return TrackIdeaResponse(
            title=title,
            concept=concept,
            arrangement_notes=arrangement_notes,
            engine=self._engine_name(),
        )

    def _engine_name(self) -> str:
        return "openai" if self.settings.openai_api_key else "prompt-template"
