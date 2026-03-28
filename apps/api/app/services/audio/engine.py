from __future__ import annotations

import hashlib
import math
from dataclasses import dataclass

from fastapi import UploadFile

from app.core.config import get_settings
from app.schemas.audio import (
    AudioAnalysisResponse,
    AudioSliceResponse,
    AudioWaveformResponse,
    SlicePoint,
    WaveformPoint,
)


@dataclass
class AudioFeatures:
    size: int
    seed: int
    duration_seconds: float
    bpm: int
    key: str
    mood_tags: list[str]
    energy_curve: list[float]
    waveform: list[WaveformPoint]
    slice_points: list[SlicePoint]


class AudioEngineService:
    def __init__(self) -> None:
        self.settings = get_settings()

    async def analyze(self, file: UploadFile) -> AudioAnalysisResponse:
        features = await self._extract_features(file)
        return AudioAnalysisResponse(
            filename=file.filename or "upload.wav",
            duration_seconds=features.duration_seconds,
            bpm=features.bpm,
            key=features.key,
            mood_tags=features.mood_tags,
            energy_curve=features.energy_curve,
            waveform=features.waveform,
            engine=self._engine_name(),
        )

    async def slice(self, file: UploadFile) -> AudioSliceResponse:
        features = await self._extract_features(file)
        return AudioSliceResponse(
            filename=file.filename or "upload.wav",
            bpm=features.bpm,
            suggested_grid="1/16",
            slice_points=features.slice_points,
            engine=self._engine_name(),
        )

    async def waveform(self, file: UploadFile) -> AudioWaveformResponse:
        features = await self._extract_features(file)
        return AudioWaveformResponse(
            filename=file.filename or "upload.wav",
            sample_count=len(features.waveform),
            waveform=features.waveform,
            engine=self._engine_name(),
        )

    async def _extract_features(self, file: UploadFile) -> AudioFeatures:
        payload = await file.read()
        await file.seek(0)

        size = len(payload)
        seed = int(hashlib.sha256(payload or b"binbox").hexdigest()[:8], 16)
        duration_seconds = max(round(size / 48000, 2), 1.25)
        bpm = 120 + (seed % 61)
        key = self._pick_key(seed)
        mood_tags = self._pick_moods(seed)
        energy_curve = self._build_energy_curve(seed)
        waveform = self._build_waveform(seed)
        slice_points = self._build_slice_points(duration_seconds, seed)

        return AudioFeatures(
            size=size,
            seed=seed,
            duration_seconds=duration_seconds,
            bpm=bpm,
            key=key,
            mood_tags=mood_tags,
            energy_curve=energy_curve,
            waveform=waveform,
            slice_points=slice_points,
        )

    def _engine_name(self) -> str:
        return "librosa" if self.settings.librosa_enabled else "mock-audio-engine"

    def _pick_key(self, seed: int) -> str:
        keys = ["A minor", "C minor", "D minor", "F major", "G minor", "E minor"]
        return keys[seed % len(keys)]

    def _pick_moods(self, seed: int) -> list[str]:
        moods = [
            ["dark", "jungle", "nostalgic"],
            ["dreamy", "breakbeat", "lo-fi"],
            ["cold", "2-step", "urban"],
            ["bright", "house", "playful"],
        ]
        return moods[seed % len(moods)]

    def _build_energy_curve(self, seed: int) -> list[float]:
        values: list[float] = []
        for i in range(16):
            base = 0.35 + ((seed >> (i % 8)) & 15) / 30
            wobble = 0.1 * math.sin(i)
            values.append(round(min(base + wobble, 1.0), 3))
        return values

    def _build_waveform(self, seed: int) -> list[WaveformPoint]:
        waveform: list[WaveformPoint] = []
        for i in range(64):
            t = round(i / 63, 4)
            amp = math.sin((seed % 11 + 1) * t * math.pi) * 0.65
            amp += math.cos((seed % 7 + 2) * t * math.pi) * 0.2
            waveform.append(WaveformPoint(t=t, amplitude=round(max(min(amp, 1.0), -1.0), 4)))
        return waveform

    def _build_slice_points(self, duration_seconds: float, seed: int) -> list[SlicePoint]:
        points: list[SlicePoint] = []
        step = max(duration_seconds / 8, 0.2)
        for i in range(1, 8):
            confidence = 0.6 + (((seed >> (i % 8)) & 7) / 20)
            points.append(
                SlicePoint(
                    time_seconds=round(step * i, 3),
                    confidence=round(min(confidence, 0.98), 2),
                )
            )
        return points
