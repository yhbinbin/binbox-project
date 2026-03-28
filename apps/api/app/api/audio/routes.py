from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import get_settings
from app.schemas.audio import AudioAnalysisResponse, AudioSliceResponse, AudioWaveformResponse
from app.services.audio.engine import AudioEngineService

router = APIRouter(prefix="/audio", tags=["audio"])

service = AudioEngineService()


def _ensure_file_size(file: UploadFile) -> None:
    max_bytes = get_settings().audio_max_upload_bytes
    size = getattr(file, "size", None)
    if size is not None and size > max_bytes:
        raise HTTPException(status_code=413, detail="Uploaded audio file is too large")


@router.post("/analyze", response_model=AudioAnalysisResponse)
async def analyze_audio(file: UploadFile = File(...)) -> AudioAnalysisResponse:
    _ensure_file_size(file)
    return await service.analyze(file)


@router.post("/slice", response_model=AudioSliceResponse)
async def slice_audio(file: UploadFile = File(...)) -> AudioSliceResponse:
    _ensure_file_size(file)
    return await service.slice(file)


@router.post("/waveform", response_model=AudioWaveformResponse)
async def waveform_audio(file: UploadFile = File(...)) -> AudioWaveformResponse:
    _ensure_file_size(file)
    return await service.waveform(file)
