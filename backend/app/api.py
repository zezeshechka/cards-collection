"""
API-эндпоинты для Mini App.
Все запросы проверяются через X-Init-Data (см. auth.py).
"""
import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user
from app.cards_data import (
    CARDS,
    PACK_COST,
    RARITY_CHANCES,
    get_card_by_id,
    get_cards_by_rarity,
)
from app.db import InventoryItem, User, async_session


router = APIRouter(prefix="/api", tags=["game"])


# ---- Зависимость: получить сессию БД ----
async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session


# ---- Утилита: найти/создать юзера ----
async def get_or_create_user(tg_user: dict, db: AsyncSession) -> User:
    tg_id = tg_user["id"]
    result = await db.execute(select(User).where(User.tg_id == tg_id))
    user = result.scalar_one_or_none()

    if user is None:
        user = User(
            tg_id=tg_id,
            username=tg_user.get("username"),
            first_name=tg_user.get("first_name"),
            coins=1000,
            energy=100,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    return user


# ============================================================
# ЭНДПОИНТЫ
# ============================================================

@router.get("/me")
async def get_me(
    tg_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Профиль игрока + инвентарь."""
    user = await get_or_create_user(tg_user, db)

    result = await db.execute(
        select(InventoryItem).where(InventoryItem.user_id == user.id)
    )
    items = result.scalars().all()

    inventory = {item.card_id: item.count for item in items}

    return {
        "user": {
            "id": user.id,
            "tg_id": user.tg_id,
            "username": user.username,
            "first_name": user.first_name,
            "coins": user.coins,
            "energy": user.energy,
        },
        "inventory": inventory,
    }


@router.get("/cards")
async def get_all_cards():
    """База всех карт (для отображения в UI)."""
    return {"cards": CARDS}


@router.get("/drop-rates")
async def get_drop_rates():
    """Шансы выпадения по редкостям."""
    return {
        "chances": RARITY_CHANCES,
        "pack_cost": PACK_COST,
    }


def _roll_rarity() -> str:
    """Крутит рулетку и возвращает выпавшую редкость."""
    roll = random.uniform(0, 100)
    cumulative = 0.0
    for rarity, chance in RARITY_CHANCES.items():
        cumulative += chance
        if roll <= cumulative:
            return rarity
    return "common"


@router.post("/gacha")
async def open_pack(
    tg_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Открыть бустер: списывает монеты, выдаёт карту."""
    user = await get_or_create_user(tg_user, db)

    if user.coins < PACK_COST:
        raise HTTPException(status_code=400, detail="Not enough coins")

    if user.energy < 10:
        raise HTTPException(status_code=400, detail="Not enough energy")

    # Списываем ресурсы
    user.coins -= PACK_COST
    user.energy -= 10

    # Крутим рулетку
    rarity = _roll_rarity()
    pool = get_cards_by_rarity(rarity)
    card = random.choice(pool)

    # Кладём в инвентарь
    result = await db.execute(
        select(InventoryItem).where(
            InventoryItem.user_id == user.id,
            InventoryItem.card_id == card["id"],
        )
    )
    item = result.scalar_one_or_none()

    if item is None:
        db.add(InventoryItem(
            user_id=user.id,
            card_id=card["id"],
            count=1,
        ))
    else:
        item.count += 1

    await db.commit()
    await db.refresh(user)

    return {
        "card": card,
        "user": {
            "coins": user.coins,
            "energy": user.energy,
        },
    }


@router.get("/market")
async def get_market():
    """Заглушка: список лотов P2P-маркета. Полноценно — на следующем шаге."""
    return {"lots": [], "message": "P2P market coming soon"}


@router.post("/market/sell")
async def sell_card(
    tg_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Заглушка: выставить карту на продажу. Полноценно — на следующем шаге."""
    return {"status": "not_implemented", "message": "Selling coming soon"}