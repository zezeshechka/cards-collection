"""
Telegram-бот. Обрабатывает /start и кнопки.
"""
from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    Message,
)

from app.config import settings


# Создаём бота и диспетчер
bot = Bot(token=settings.bot_token)
dp = Dispatcher()


def get_webapp_url() -> str:
    """URL Mini App. Пока не задеплоен — заглушка."""
    return "https://example.com"


def main_keyboard() -> InlineKeyboardMarkup:
    """Кнопка «Открыть коллекцию». Пока обычная ссылка."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🎴 Открыть коллекцию",
                    url=get_webapp_url(),
                )
            ]
        ]
    )


@dp.message(CommandStart())
async def cmd_start(message: Message):
    """Обработчик /start."""
    await message.answer(
        f"👋 Привет, {message.from_user.first_name}!\n\n"
        "Добро пожаловать в <b>Cards Collection</b>.\n"
        "Собирай редкие 4K-карточки, открывай бустеры и торгуй с друзьями.\n\n"
        "Нажми кнопку ниже, чтобы начать 👇",
        reply_markup=main_keyboard(),
        parse_mode="HTML",
    )


@dp.message(F.text == "/help")
async def cmd_help(message: Message):
    """Обработчик /help."""
    await message.answer(
        "<b>Как играть:</b>\n\n"
        "• Открой приложение кнопкой ниже\n"
        "• Открывай бустеры за 200 монет\n"
        "• Собирай карты разной редкости\n"
        "• В будущем — торговля с другими игроками\n\n"
        "Шансы: common — 52%, rare — 26%, epic — 14%, legendary — 6%, mythic — 2%",
        reply_markup=main_keyboard(),
        parse_mode="HTML",
    )


async def start_bot_polling():
    """Запускает бота в режиме polling (для локалки)."""
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)