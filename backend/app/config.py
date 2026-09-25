"""
Конфигурация приложения.
Читает переменные из .env файла.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Токен бота из @BotFather
    bot_token: str = "PASTE_YOUR_TOKEN_HERE"

    # URL твоего фронтенда (для CORS)
    # Пока локально, потом заменим на Vercel URL
    frontend_url: str = "http://localhost:5173"

    # Secret для подписи JWT-сессий
    # Сгенерируй любой случайный (хоть "abc123" для локалки)
    jwt_secret: str = "change-me-to-random-string"

    # Режим разработки
    debug: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()