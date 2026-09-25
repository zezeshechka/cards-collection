"""
Проверка Telegram initData.
Гарантирует, что запросы приходят именно от Telegram, а не от хакера.
"""
import hashlib
import hmac
import json
from urllib.parse import parse_qsl

from fastapi import Header, HTTPException

from app.config import settings


def validate_init_data(init_data: str) -> dict:
    """
    Проверяет подпись initData, которую Telegram передаёт Mini App.
    Возвращает данные пользователя, если подпись верна.
    """
    if not init_data:
        raise HTTPException(status_code=401, detail="initData is empty")

    # Парсим query-строку в список пар
    parsed = dict(parse_qsl(init_data, keep_blank_values=True))

    received_hash = parsed.pop("hash", None)
    if not received_hash:
        raise HTTPException(status_code=401, detail="hash missing")

    # Формируем data_check_string (все пары, кроме hash, отсортированные)
    data_check_string = "\n".join(
        f"{k}={v}" for k, v in sorted(parsed.items())
    )

    # Секретный ключ: HMAC-SHA256 от токена бота с ключом "WebAppData"
    secret_key = hmac.new(
        b"WebAppData",
        settings.bot_token.encode(),
        hashlib.sha256,
    ).digest()

    # Считаем ожидаемый hash
    calculated_hash = hmac.new(
        secret_key,
        data_check_string.encode(),
        hashlib.sha256,
    ).hexdigest()

    if calculated_hash != received_hash:
        raise HTTPException(status_code=401, detail="invalid signature")

    # Парсим user из JSON-строки
    user_json = parsed.get("user")
    if not user_json:
        raise HTTPException(status_code=401, detail="user missing")

    return json.loads(user_json)


async def get_current_user(
    x_init_data: str = Header(..., alias="X-Init-Data"),
) -> dict:
    """
    FastAPI-зависимость: вытаскивает юзера из заголовка X-Init-Data.
    Используется в эндпоинтах так: user: dict = Depends(get_current_user)
    """
    return validate_init_data(x_init_data)