import { useState, useRef, memo } from 'react';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface Card {
  id: string;
  name: string;
  rarity: Rarity;
  type: string;
  atk: number;
  def: number;
  luck: number;
  desc: string;
  icon: string;
  accent: string;
}

const RARITY_CONFIG: Record<Rarity, {
  name: string;
  border: string;
  text: string;
  bg: string;
  glowColor: string;
  badgeBg: string;
}> = {
  common: {
    name: 'Обычная',
    border: 'border-slate-500/40',
    text: 'text-slate-300',
    bg: 'from-slate-900/90 via-slate-950/90 to-black',
    glowColor: 'rgba(148, 163, 184, 0.25)',
    badgeBg: 'bg-slate-800/80 border-slate-600/50 text-slate-300',
  },
  rare: {
    name: 'Редкая',
    border: 'border-blue-500/60',
    text: 'text-blue-300',
    bg: 'from-blue-950/90 via-indigo-950/90 to-slate-950',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    badgeBg: 'bg-blue-950/80 border-blue-500/50 text-blue-300',
  },
  epic: {
    name: 'Эпическая',
    border: 'border-purple-500/60',
    text: 'text-purple-300',
    bg: 'from-purple-950/90 via-fuchsia-950/90 to-slate-950',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    badgeBg: 'bg-purple-950/80 border-purple-500/50 text-purple-300',
  },
  legendary: {
    name: 'Легендарная',
    border: 'border-amber-400/80',
    text: 'text-amber-200',
    bg: 'from-amber-950/90 via-yellow-950/90 to-black',
    glowColor: 'rgba(251, 191, 36, 0.7)',
    badgeBg: 'bg-amber-950/80 border-amber-400/60 text-amber-300',
  },
  mythic: {
    name: 'Мифическая',
    border: 'border-rose-400',
    text: 'text-rose-200',
    bg: 'from-rose-950/90 via-fuchsia-950/90 to-indigo-950',
    glowColor: 'rgba(244, 63, 94, 0.9)',
    badgeBg: 'bg-rose-950/90 border-rose-400/80 text-rose-200',
  },
};

interface Props {
  card: Card;
  count?: number;
  onClick?: () => void;
  size?: 'normal' | 'large';
}

const Card4K = memo(function Card4K({ card, count, onClick, size = 'normal' }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [foilX, setFoilX] = useState(50);
  const [foilY, setFoilY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const config = RARITY_CONFIG[card.rarity];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = -((mouseY / rect.height) * 30 - 15);
    const rY = (mouseX / rect.width) * 30 - 15;

    setRotateX(rX);
    setRotateY(rY);
    setFoilX((mouseX / rect.width) * 100);
    setFoilY((mouseY / rect.height) * 100);
  };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    // Проверяем, что палец внутри карточки
    if (touchX < 0 || touchX > rect.width || touchY < 0 || touchY > rect.height) return;

    const rX = -((touchY / rect.height) * 30 - 15);
    const rY = (touchX / rect.width) * 30 - 15;

    setRotateX(rX);
    setRotateY(rY);
    setFoilX((touchX / rect.width) * 100);
    setFoilY((touchY / rect.height) * 100);
    setIsHovered(true); // Включаем голографический блик
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setFoilX(50);
    setFoilY(50);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setFoilX(50);
    setFoilY(50);
  };

  const dimensions = size === 'large'
    ? 'w-full max-w-[280px] aspect-[2.5/3.6]'
    : 'w-full aspect-[2.5/3.5]';
    
  return (
    <div
      ref={cardRef}
      className={`relative ${dimensions} perspective-1000 cursor-pointer select-none`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out preserve-3d relative rounded-3xl"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl border-2 ${config.border} bg-gradient-to-b ${config.bg} p-4 flex flex-col justify-between overflow-hidden shadow-2xl`}
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: `0 20px 40px -15px ${config.glowColor}, inset 0 0 20px rgba(255,255,255,0.05)`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-20 opacity-75 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${foilX}% ${foilY}%, rgba(255,255,255,0.8) 0%, rgba(168,85,247,0.4) 30%, rgba(59,130,246,0.2) 60%, transparent 90%)`,
              }}
            />
          )}

          <div className="relative z-10 flex justify-between items-center w-full">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${config.badgeBg}`}>
              {config.name}
            </span>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest px-2 py-0.5 rounded-md bg-black/40 border border-white/10 uppercase">
              {card.type}
            </span>
          </div>

          <div className="relative z-10 my-auto flex flex-col items-center justify-center">
            <div
              className="absolute w-32 h-32 rounded-full blur-2xl opacity-40"
              style={{ backgroundColor: card.accent }}
            />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[inset_0_2px_6px_rgba(255,255,255,0.2)]">
              <span className="text-6xl drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
                {card.icon}
              </span>
            </div>
          </div>

          <div className="relative z-10 bg-black/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="font-extrabold text-sm text-white tracking-tight truncate mb-1">
              {card.name}
            </h3>
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 text-center">
              <div className="bg-white/5 rounded-xl py-1 border border-white/5">
                <div className="text-[9px] text-gray-400 uppercase font-bold">ATK</div>
                <div className="text-xs font-black text-rose-400">{card.atk}</div>
              </div>
              <div className="bg-white/5 rounded-xl py-1 border border-white/5">
                <div className="text-[9px] text-gray-400 uppercase font-bold">DEF</div>
                <div className="text-xs font-black text-blue-400">{card.def}</div>
              </div>
              <div className="bg-white/5 rounded-xl py-1 border border-white/5">
                <div className="text-[9px] text-gray-400 uppercase font-bold">LUCK</div>
                <div className="text-xs font-black text-amber-400">{card.luck}</div>
              </div>
            </div>
          </div>

          {count !== undefined && count > 1 && (
            <div className="absolute top-3 right-3 z-30 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full border border-white/30 shadow-2xl">
              x{count}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Card4K;