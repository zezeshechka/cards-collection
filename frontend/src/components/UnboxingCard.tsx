import { useState, useRef, useCallback } from 'react';

export interface UnboxingCardData {
  name: string;
  statusId: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  image: string;
  lore: string;
  accent: string;
}

const RARITY_STYLES: Record<string, { badge: string; border: string }> = {
  legendary: {
    badge: 'bg-amber-500/20 border-2 border-amber-500/60 text-amber-300 shadow-amber-500/30',
    border: 'border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.3)]',
  },
  epic: {
    badge: 'bg-purple-500/20 border-2 border-purple-500/60 text-purple-300 shadow-purple-500/30',
    border: 'border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.3)]',
  },
  rare: {
    badge: 'bg-indigo-500/20 border-2 border-indigo-500/60 text-indigo-300 shadow-indigo-500/30',
    border: 'border-indigo-500/60 shadow-[0_0_35px_rgba(99,102,241,0.3)]',
  },
  common: {
    badge: 'bg-gray-700/40 border-2 border-gray-600 text-gray-300 shadow-gray-700/30',
    border: 'border-gray-700 shadow-[0_0_35px_rgba(107,114,128,0.3)]',
  },
  mythic: {
    badge: 'bg-rose-500/20 border-2 border-rose-500/60 text-rose-300 shadow-rose-500/30',
    border: 'border-rose-500/60 shadow-[0_0_35px_rgba(244,63,94,0.3)]',
  },
};

interface Props {
  card: UnboxingCardData;
}

export default function UnboxingCard({ card }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const style = RARITY_STYLES[card.rarity] || RARITY_STYLES.common;

  // Двигаем карту и блик НАПРЯМУЮ через DOM — без ререндеров
  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (isFlipped || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotX = -((y - cy) / cy) * 20;
      const rotY = ((x - cx) / cx) * 20;

      // Прямое изменение transform без ререндера
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Двигаем фон блика напрямую
      if (sheenRef.current) {
        sheenRef.current.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
        sheenRef.current.style.opacity = '0.9';
      }
    },
    [isFlipped]
  );

  const handleReset = useCallback(() => {
    if (isFlipped) return;
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0.7';
    }
  }, [isFlipped]);

  const handleFlip = () => {
    setIsFlipped((v) => !v);
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      className="relative w-72 h-[420px] my-2 cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={handleFlip}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={handleReset}
      onTouchMove={(e) =>
        e.touches[0] && handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
      onTouchEnd={handleReset}
    >
      {/* ==== GLOW позади карты (по редкости) ==== */}
      <div
        className="absolute rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none"
        style={{
          inset: '-30px',
          backgroundColor: card.accent,
        }}
      />

      {/* ==== Враппер 3D ==== */}
      <div
        ref={cardRef}
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <div
          ref={wrapperRef}
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateX(0deg) rotateY(0deg)',
            transition: 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          {/* ---- FRONT ---- */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-2 overflow-hidden flex flex-col justify-between p-5 ${style.border}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Holographic sheen */}
            <div
              ref={sheenRef}
              className="absolute inset-0 holo-sheen pointer-events-none z-20"
              style={{
                backgroundPosition: '50% 50%',
                opacity: 0.7,
              }}
            />

            <div className="flex justify-between items-center relative z-10">
              <div
                className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg font-mono ${style.badge}`}
              >
                {card.statusId}
              </div>
              <div className="w-7 h-7 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-amber-400 text-xs">
                ⭐
              </div>
            </div>

            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/10 bg-gray-950 shadow-inner my-2 flex items-center justify-center z-10">
              <img
                src={card.image}
                alt={card.name}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/400x400/111827/f59e0b?text=ARTWORK';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />
            </div>

            <div className="relative z-10 text-center py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
              <h4 className="font-extrabold text-base text-white tracking-wider truncate px-2 font-mono">
                {card.name}
              </h4>
            </div>

            <div className="text-center relative z-10 pt-1">
              <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <span className="text-amber-400">↻</span> Нажмите, чтобы перевернуть
              </span>
            </div>
          </div>

          {/* ---- BACK ---- */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-2 border-amber-500/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

            <div className="flex justify-between items-center relative z-10">
              <span className="text-xs text-amber-400 font-bold font-mono">
                LORE & PROVENANCE
              </span>
              <span className="text-amber-400 text-sm">🔒</span>
            </div>

            <div className="relative z-10 my-auto text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-amber-300 text-xl shadow-lg">
                🛡️
              </div>
              <h5 className="font-bold text-sm text-white font-mono">Паспорт актива</h5>
              <p className="text-xs text-gray-400 leading-relaxed px-2">{card.lore}</p>
            </div>

            <div className="text-center relative z-10 pt-3 border-t border-gray-800">
              <span className="text-[10px] text-gray-500 font-mono">
                Telegram Mini App Verified Asset
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}