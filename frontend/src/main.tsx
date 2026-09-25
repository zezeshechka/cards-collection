import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ---- Инициализация Telegram WebApp ----
const tg = (window as any).Telegram?.WebApp;
if (tg) {
  tg.ready();                        // сообщить Telegram, что готов
  tg.expand();                       // развернуть на весь экран
  tg.disableVerticalSwipes();        // отключить закрытие свайпом вниз
  tg.setHeaderColor('#030712');      // цвет шапки
  tg.setBackgroundColor('#030712');  // цвет фона
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
