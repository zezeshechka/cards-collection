import { Gift, Crown, Flame, ShoppingBag, Box, Gem, Cpu, Vault } from 'lucide-react';

interface Pack {
  id: string;
  name: string;
  price: number;
  rarity: 'rare' | 'mythic' | 'epic' | 'secure';
  icon: React.ReactNode;
  subtitle: string;
}

interface Props {
  coins: number;
  onAddCoins: () => void;
  onBuyPack: (packId: string, packName: string, price: number) => void;
}

const SMALL_PACKS: Pack[] = [
  {
    id: 'cyber_box_v1',
    name: 'Cyber Box v.1',
    price: 300,
    rarity: 'rare',
    icon: <Box size={28} />,
    subtitle: 'Шанс элиты: 15%',
  },
  {
    id: 'quantum_crystal',
    name: 'Quantum Crystal',
    price: 1200,
    rarity: 'mythic',
    icon: <Gem size={28} />,
    subtitle: 'Шанс легендарки: 45%',
  },
  {
    id: 'neural_core',
    name: 'Neural Core',
    price: 550,
    rarity: 'epic',
    icon: <Cpu size={28} />,
    subtitle: 'Шанс ультиматума: 25%',
  },
  {
    id: 'vault_safe',
    name: 'Vault Safe',
    price: 900,
    rarity: 'secure',
    icon: <Vault size={28} />,
    subtitle: 'Двойной дроп',
  },
];

const RARITY_CONFIG: Record<string, { badge: string; border: string; iconColor: string }> = {
  rare: {
    badge: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
    border: 'border-blue-500/30 hover:border-blue-400/80',
    iconColor: 'text-blue-300',
  },
  mythic: {
    badge: 'bg-pink-500/20 border-pink-500/40 text-pink-300',
    border: 'border-pink-500/30 hover:border-pink-400/80',
    iconColor: 'text-pink-300',
  },
  epic: {
    badge: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
    border: 'border-cyan-500/30 hover:border-cyan-400/80',
    iconColor: 'text-cyan-300',
  },
  secure: {
    badge: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
    border: 'border-yellow-500/30 hover:border-yellow-400/80',
    iconColor: 'text-yellow-300',
  },
};

export default function Market({ coins, onAddCoins, onBuyPack }: Props) {
  return (
    <div className="w-full space-y-6">

      {/* BALANCE BAR — для быстрого пополнения */}
      <div className="flex items-center justify-between bg-[#1a1738] border border-purple-500/30 rounded-2xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Баланс:</span>
          <span className="font-bold text-lg text-yellow-400">{coins.toLocaleString('ru-RU')} 🪙</span>
        </div>
        <button
          onClick={onAddCoins}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-950 font-black text-xs hover:scale-105 active:scale-95 transition-transform"
        >
          + Пополнить
        </button>
      </div>

      {/* BANNER */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-purple-900/40 via-indigo-950/60 to-cyan-950/40 border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/40">
              Сезон 3 • Кибер Маркет
            </span>
            <h2 className="text-base font-black text-white mt-1 uppercase tracking-tight">
              Коллекционные упаковки
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Выберите запакованный бустер для мгновенного вскрытия.
            </p>
          </div>
          <Gift size={32} className="text-yellow-400 animate-bounce" />
        </div>
      </div>

      {/* FEATURED PACK */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-xs text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
            <Flame size={14} className="text-yellow-400" />
            <span>Главный лот витрины</span>
          </h3>
          <span className="text-[10px] text-cyan-400 font-mono">Людской спрос: 94%</span>
        </div>

        <div className="rounded-3xl p-5 border-2 border-purple-500/60 bg-gradient-to-br from-[#1e1b4b] via-[#311042] to-[#0f172a] shadow-[0_0_40px_rgba(168,85,247,0.5)] relative overflow-hidden">
          {/* Holographic ribbon */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 font-black text-[10px] tracking-wider uppercase shadow-[0_0_25px_rgba(250,204,21,0.4)] flex items-center gap-1">
            <Crown size={12} />
            <span>LEGENDARY PACK</span>
          </div>

          {/* Pack visual */}
          <div className="relative z-10 my-3 flex flex-col items-center text-center">
            <div className="w-24 h-36 rounded-2xl bg-gradient-to-tr from-purple-800 via-indigo-900 to-pink-900 border-2 border-cyan-400/60 shadow-2xl flex flex-col items-center justify-between p-3 relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:10px_10px] opacity-25" />
              <div className="text-[9px] font-mono tracking-widest text-cyan-300 relative z-10">SERIES X-01</div>
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] relative z-10">
                <Crown size={22} className="text-cyan-200" />
              </div>
              <div className="text-[10px] font-extrabold text-white tracking-widest relative z-10">CYBER VAULT</div>
            </div>

            <h4 className="text-base font-black text-white mt-3 uppercase tracking-wider">
              Neon Genesis Booster Pack
            </h4>
            <p className="text-xs text-purple-200/80 mt-1 max-w-[260px]">
              Содержит 5 уникальных кибер-карточек, включая гарантированную редкую или эпическую.
            </p>
          </div>

          {/* Price & Buy */}
          <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase">Стоимость упаковки</span>
              <span className="text-lg font-black text-yellow-400">750 🪙</span>
            </div>
            <button
              onClick={() => onBuyPack('neon_genesis', 'Neon Genesis Booster Pack', 750)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 font-black text-xs text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag size={14} />
              <span>КУПИТЬ И ВСКРЫТЬ</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID OF SMALL PACKS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-xs text-gray-300 uppercase tracking-widest">
            Коллекционные боксы на витрине
          </h3>
          <span className="text-xs text-purple-400 font-medium">{SMALL_PACKS.length} доступно</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SMALL_PACKS.map((pack) => {
            const cfg = RARITY_CONFIG[pack.rarity];
            return (
              <div
                key={pack.id}
                className={`rounded-2xl p-3.5 flex flex-col justify-between border bg-gradient-to-br from-[#1e1b3c]/60 to-[#0f0e1e]/85 backdrop-blur-sm transition-all relative overflow-hidden group ${cfg.border}`}
              >
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded border text-[9px] font-bold uppercase ${cfg.badge}`}>
                  {pack.rarity}
                </div>

                <div className="flex flex-col items-center my-2">
                  <div className={`w-16 h-24 rounded-xl bg-gradient-to-br from-[#1e1b4b] to-[#311042] border flex flex-col items-center justify-center p-2 shadow-lg group-hover:scale-105 transition-transform ${cfg.iconColor}`}>
                    {pack.icon}
                  </div>
                  <h4 className="font-extrabold text-xs text-white mt-2 text-center">{pack.name}</h4>
                  <p className="text-[9px] text-gray-400 text-center">{pack.subtitle}</p>
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-black text-yellow-400">{pack.price.toLocaleString('ru-RU')} 🪙</span>
                  <button
                    onClick={() => onBuyPack(pack.id, pack.name, pack.price)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all active:scale-95"
                  >
                    Купить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}