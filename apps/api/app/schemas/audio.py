from pydantic import BaseModel, Field


class WaveformPoint(BaseModel):
    t: float
    amplitude: float


class AudioAnalysisResponse(BaseModel):
    filename: str
    duration_seconds: float
    bpm: int
    key: str
    mood_tags: list[str] = Field(default_factory=list)
    energy_curve: list[float] = Field(default_factory=list)
    waveform: list[WaveformPoint] = Field(default_factory=list)
    engine: str


class SlicePoint(BaseModel):
    time_seconds: float
    confidence: float


class AudioSliceResponse(BaseModel):
    filename: str
    bpm: int
    suggested_grid: str
    slice_points: list[SlicePoint] = Field(default_factory=list)
    engine: str


class AudioWaveformResponse(BaseModel):
    filename: str
    sample_count: int
    waveform: list[WaveformPoint] = Field(default_factory=list)
    engine: str
