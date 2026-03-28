from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "binbox-api"
    app_version: str = "0.1.0"
    environment: Literal["development", "staging", "production"] = "development"
    api_v1_prefix: str = "/api"
    log_level: str = "INFO"

    database_url: str = Field(
        default="postgresql+psycopg2://postgres:postgres@localhost:5432/binbox"
    )
    sqlalchemy_echo: bool = False

    openai_api_key: str | None = None
    openai_model: str = "gpt-4.1-mini"

    librosa_enabled: bool = False
    audio_max_upload_bytes: int = 25 * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings()
