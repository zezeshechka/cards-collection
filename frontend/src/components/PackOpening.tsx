import { useState, useRef, useEffect, useCallback } from 'react';
import UnboxingCard, { type UnboxingCardData } from './UnboxingCard';

// ---- Карты для распаковки (потом заменим на API) ----
const CARDS_POOL: UnboxingCardData[] = [
  {
    name: 'CHRONOS DRAGON',
    statusId: 'LEGENDARY • #0042',
    rarity: 'legendary',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    lore: 'Легендарный страж времени. Квантовый артефакт бесконечной ценности.',
    accent: '#f59e0b',
  },
  {
    name: 'NEON VALKYRIE',
    statusId: 'EPIC • #0189',
    rarity: 'epic',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop',
    lore: 'Ангел цифрового пространства. Высоко ценится коллекционерами кибер-арта.',
    accent: '#a855f7',
  },
  {
    name: 'QUANTUM RONIN',
    statusId: 'RARE • #0742',
    rarity: 'rare',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop',
    lore: 'Самурай цифровых пустошей. Надежно зашифрован в блокчейне.',
    accent: '#6366f1',
  },
  {
    name: 'SEC-DRONE MK.II',
    statusId: 'COMMON • #8912',
    rarity: 'common',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=600&auto=format&fit=crop',
    lore: 'Массовая модель автономного стража городских секторов.',
    accent: '#9ca3af',
  },
];

const PACK_COST = 150;

// ---- Частица для canvas ----
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  gravity: number;
  isConfetti: boolean;
  rotation: number;
  vRot: number;

  constructor(x: number, y: number, color: string, isConfetti = false) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isConfetti = isConfetti;
    this.size = isConfetti ? Math.random() * 10 + 5 : Math.random() * 4 + 1;
    const angle = Math.random() * Math.PI * 2;
    const speed = isConfetti ? Math.random() * 14 + 5 : Math.random() * 9 + 3;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = isConfetti ? 0.35 : 0.08;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.008;
    this.rotation = Math.random() * 360;
    this.vRot = (Math.random() - 0.5) * 12;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= this.decay;
    this.rotation += this.vRot;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    if (this.isConfetti) {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

interface Props {
  coins: number;
  onSpend: (cost: number) => void;
}

export default function PackOpening({ coins, onSpend }: Props) {
    const [stage, setStage] = useState<'pack' | 'reveal'>('pack');
  const [isShaking, setIsShaking] = useState(false);
  const [flash, setFlash] = useState(false);
  const [pulledCard, setPulledCard] = useState<UnboxingCardData | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const packRef = useRef<HTMLDivElement>(null);

  // ---- Canvas: частицы ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        arr[i].update();
        arr[i].draw(ctx);
        if (arr[i].alpha <= 0) arr.splice(i, 1);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const triggerExplosion = useCallback((x: number, y: number, count = 150) => {
    const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8', '#ffffff', '#fbbf24'];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesRef.current.push(new Particle(x, y, color, true));
    }
  }, []);

  // ---- Показать Toast ----
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // ---- Открыть бустер ----
  const startUnboxing = useCallback(() => {
    if (isBusy) return;
    if (coins < PACK_COST) {
      showToast('Недостаточно монет!');
      return;
    }
    setIsBusy(true);
    onSpend(PACK_COST);
    setIsShaking(true);

    // Взрыв в центре пака
    if (packRef.current) {
      const rect = packRef.current.getBoundingClientRect();
      triggerExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2, 150);
    }

    // Через 1.2 сек — вспышка и показ карты
    setTimeout(() => {
      setIsShaking(false);
      setFlash(true);

      setTimeout(() => {
        // Взвешенный рандом — 65% legendary, 23% epic, 12% rare
        const rand = Math.random();
        const card =
          rand < 0.65
            ? CARDS_POOL[0]
            : rand < 0.88
              ? CARDS_POOL[1]
              : CARDS_POOL[2];
        setPulledCard(card);
        setStage('reveal');

        // Взрыв на карте
        setTimeout(() => {
          const cardEl = document.querySelector('[data-unboxing-card]');
          if (cardEl) {
            const r = cardEl.getBoundingClientRect();
            triggerExplosion(r.left + r.width / 2, r.top + r.height / 2, 150);
          }
          setFlash(false);
          setIsBusy(false);
        }, 100);
      }, 350);
    }, 1200);
  }, [coins, isBusy, onSpend, triggerExplosion, showToast]);

  // ---- Сброс к паку ----
  const resetToPack = useCallback(() => {
    setStage('pack');
    setPulledCard(null);
  }, []);

  return (
    <>
      {/* Canvas поверх всего */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40 w-full h-full"
      />

      {/* Вспышка при открытии */}
      {flash && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none opacity-95 transition-opacity duration-700" />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-white px-4 py-2.5 rounded-2xl shadow-2xl z-50 text-xs font-semibold flex items-center gap-2">
          <span className="text-amber-400">ℹ️</span>
          <span>{toast}</span>
        </div>
      )}

      <div className="w-full flex flex-col items-center">

        {/* ---- STAGE 1: PACK ---- */}
        {stage === 'pack' && (
          <div className="w-full flex flex-col items-center transition-all duration-500">
            <div className="text-center mb-5">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase font-mono">
                ЭЛИТНЫЙ БУСТЕР #01
              </span>
              <h2 className="text-2xl font-black font-mono mt-2 text-white tracking-wide">
                РАСПАКОВКА КАРТЫ
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Откройте пачку, чтобы получить редкий цифровой актив
              </p>
            </div>

            {/* Pack */}
            <div
              ref={packRef}
              className="relative w-64 h-96 cursor-pointer group my-3"
              onClick={startUnboxing}
              style={{ perspective: '1200px' }}
            >
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 opacity-75 blur-xl animate-pulse" />

              <div
                className={`w-full h-full rounded-3xl bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-2 border-amber-500/60 shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  isShaking ? 'animate-shake' : 'animate-float-pack'
                }`}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="flex justify-between items-start relative z-10">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-500/30">
                    PACK #9912
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                    🔓
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center relative z-10 my-auto">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center shadow-xl mb-4 border border-white/20">
                    <span className="text-4xl">👑</span>
                  </div>
                  <h3 className="font-mono font-extrabold text-lg text-white tracking-wider">
                    MYSTERY VAULT
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 max-w-[180px]">
                    Содержит уникальную карту со статусом редкости и ID
                  </p>
                </div>

                <div className="relative z-10 text-center">
                  <div className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-950 font-mono font-extrabold text-xs shadow-lg flex items-center justify-center gap-2">
                    <span>НАЖМИТЕ ДЛЯ ОТКРЫТИЯ</span>
                    <span className="text-[10px]">›</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    Стоимость: <span className="text-amber-400 font-bold">{PACK_COST} монет</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={startUnboxing}
              className="mt-4 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-950 font-mono font-black text-sm shadow-xl transition active:scale-95 flex items-center gap-2"
            >
              🪄 РАСПАКОВАТЬ НАБОР
            </button>
          </div>
        )}

        {/* ---- STAGE 2: REVEAL ---- */}
        {stage === 'reveal' && pulledCard && (
          <div className="w-full flex flex-col items-center transition-opacity duration-500" data-unboxing-card>
            <h3 className="text-lg font-bold font-mono text-white mt-1 mb-2">
              Новый коллекционный предмет!
            </h3>

            <UnboxingCard card={pulledCard} />

            <div className="flex items-center gap-3 mt-4 w-full max-w-xs">
              <button
                onClick={resetToPack}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-mono font-bold text-xs transition"
              >
                ↺ ЕЩЕ РАЗ
              </button>
              <button
                onClick={() => showToast('Карта отправлена в чат!')}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-950 font-mono font-bold text-xs transition"
              >
                📤 ПОДЕЛИТЬСЯ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS-анимации (Shake + Float) */}
      <style>{`
        @keyframes custom-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-6px, 4px) rotate(-1.5deg); }
          40% { transform: translate(6px, -4px) rotate(1.5deg); }
          60% { transform: translate(-4px, -3px) rotate(-0.8deg); }
          80% { transform: translate(4px, 3px) rotate(0.8deg); }
        }
        .animate-shake { animation: custom-shake 0.35s ease-in-out infinite; }
        @keyframes float-pack {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-float-pack { animation: float-pack 3s ease-in-out infinite; }
      `}</style>
    </>
  );
}