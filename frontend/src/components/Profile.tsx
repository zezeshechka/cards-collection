import { Shield, Bell, Languages, Boxes } from 'lucide-react';

interface Props {
  coins: number;
  totalCards: number;
}

export default function Profile({ coins, totalCards }: Props) {
  return (
    <div className="w-full space-y-4">

      {/* PROFILE HERO CARD */}
      <div className="rounded-3xl p-5 border border-purple-500/30 bg-gradient-to-br from-[#1e1b3c]/80 to-[#0f0e1e]/90 backdrop-blur-sm text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-yellow-400 via-purple-600 to-cyan-400 p-1 mb-3 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            <div className="w-full h-full bg-[#07060e] rounded-xl flex items-center justify-center text-2xl font-black text-white">
              CV
            </div>
          </div>

          <h2 className="text-base font-black text-white">Cyber Operator #7792</h2>
          <p className="text-xs text-purple-400 mt-0.5">
            Уровень доступа: <span className="text-white font-bold">Elite II</span>
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-4 border-t border-white/10 text-center">
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Карты</div>
              <div className="text-sm font-black text-white mt-0.5">{totalCards}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Монеты</div>
              <div className="text-sm font-black text-yellow-400 mt-0.5">
                {coins.toLocaleString('ru-RU')}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Ранг</div>
              <div className="text-sm font-black text-cyan-400 mt-0.5">#142</div>
            </div>
          </div>

        </div>
      </div>

      {/* SETTINGS LIST */}
      <div className="rounded-2xl p-4 space-y-3 border border-white/10 bg-[#121124]/75 backdrop-blur-md">
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Shield size={16} className="text-purple-400" />
            <span className="text-xs font-semibold text-gray-200">Безопасность кошелька</span>
          </div>
          <span className="text-xs text-green-400 font-bold">Защищен</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-cyan-400" />
            <span className="text-xs font-semibold text-gray-200">Уведомления о дропах</span>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="accent-purple-500 w-4 h-4 rounded"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Languages size={16} className="text-yellow-400" />
            <span className="text-xs font-semibold text-gray-200">Язык интерфейса</span>
          </div>
          <span className="text-xs text-gray-400">Русский</span>
        </div>
      </div>

      {/* INVENTORY SUMMARY */}
      <div className="rounded-2xl p-4 border border-white/10 bg-[#121124]/75 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-3">
          <Boxes size={16} className="text-cyan-400" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Инвентарь
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">Карт в коллекции</span>
          <span className="text-sm font-black text-white">{totalCards}</span>
        </div>
      </div>

    </div>
  );
}