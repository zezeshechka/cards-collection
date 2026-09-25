"""
Главный файл приложения.
Запускает FastAPI + Telegram-бота одновременно.
"""
import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router as api_router
from app.bot import bot, start_bot_polling
from app.config import settings
from app.db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Что происходит при старте и остановке сервера.
    """
    # === СТАРТ ===
    print("🚀 Запуск Cards Collection API...")

    # 1. Создаём таблицы в БД
    await init_db()
    print("✅ База данных готова")

    # 2. Запускаем бота в фоне (не блокируем FastAPI)
    bot_task = asyncio.create_task(start_bot_polling())
    print("✅ Бот запущен (polling)")

    yield  # здесь сервер работает

    # === ОСТАНОВКА ===
    print("🛑 Останавливаю...")
    bot_task.cancel()
    await bot.session.close()


# Создаём приложение
app = FastAPI(
    title="Cards Collection API",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — чтобы фронтенд мог обращаться к API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # локально; потом заменим на Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем API-роутер
app.include_router(api_router)


@app.get("/")
async def root():
    """Корневой эндпоинт — проверка что сервер жив."""
    return {
        "status": "ok",
        "app": "Cards Collection",
        "version": "0.1.0",
        "docs": "/docs",
    }
@app.get("/ping")
async def ping():
    """Лёгкий пинг для cron-job.org (пустой ответ)."""
    return {"p": 1}