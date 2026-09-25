"""
База данных: подключение, модели, сессии.
Локально используем SQLite, потом переключимся на Postgres.
"""
from datetime import datetime

from sqlalchemy import (
    BigInteger,
    DateTime,
    ForeignKey,
    Integer,
    String,
    func,
)
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


# ---- Подключение ----
# Локально — SQLite-файл в папке backend/
DATABASE_URL = "sqlite+aiosqlite:///./cards.db"

engine = create_async_engine(DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# ---- Базовый класс моделей ----
class Base(DeclarativeBase):
    pass


# ---- Модели ----
class User(Base):
    """Игрок. Создаётся при первом /start в боте."""
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    tg_id: Mapped[int] = mapped_column(BigInteger, unique=True, index=True)
    username: Mapped[str | None] = mapped_column(String(64), nullable=True)
    first_name: Mapped[str | None] = mapped_column(String(64), nullable=True)

    coins: Mapped[int] = mapped_column(Integer, default=1000)
    energy: Mapped[int] = mapped_column(Integer, default=100)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class InventoryItem(Base):
    """Сколько раз каждая карта есть у игрока."""
    __tablename__ = "inventory"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    card_id: Mapped[str] = mapped_column(String(32), index=True)
    count: Mapped[int] = mapped_column(Integer, default=1)

    acquired_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


# ---- Утилиты ----
async def init_db() -> None:
    """Создаёт все таблицы, если их ещё нет."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)