import { useState } from 'react';
import { Sparkles, Wallet, Zap, LayoutGrid, Search } from 'lucide-react';
import Card4K, { type Card, type Rarity } from './components/Card4K';
import { CARDS } from './data/cards';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState<'all' | Rarity>('all');

  const filtered = CARDS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRarity = rarityFilter === 'all' || c.rarity === rarityFilter;
    return matchSearch && matchRarity;
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#07080c] text-white font-sans overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-600/25 via-violet-600/10 to-transparent blur-[130px] animate-pulse" />
        <div className="absolute top-[35%] -right-[15%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-bl from-blue-600/20 via-fuchsia-600/15 to-transparent blur-[150px] animate-pulse" />
      </div>

      {/* Main container */}
      <div className="w-full max-w-md h-[100dvh] bg-[#0c0d14]/85 backdrop-blur-3xl relative flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden sm:rounded-[2.5rem] sm:h-[860px] sm:border border-white/10 z-10">
        {/* Header */}
        <header className="flex justify-between items-center px-5 py-4 bg-white/[0.02] backdrop-blur-xl border-b border-white/5 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Коллекция 4K</div>
              <div className="text-sm font-black text-white">
                {CARDS.length} <span className="text-xs text-gray-500 font-normal">карт</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <Zap size={14} className="text-cyan-400 mr-1.5" />
              <span className="font-black text-xs">100%</span>
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <Wallet size={14} className="text-amber-400 mr-1.5" />
              <span className="font-black text-sm tracking-wide">1250</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
          <div className="p-5">
            <div className="mb-4">
              <h2 className="text-xl font-extrabold tracking-tight">Инвентарь Карт</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ультра-четкие цифровые артефакты</p>
            </div>

            {/* Search + filter */}
            <div className="flex gap-2 mb-5">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск карты..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <select
                value={rarityFilter}
                onChange={(e) => setRarityFilter(e.target.value as any)}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Все ранги</option>
                <option value="common">Обычные</option>
                <option value="rare">Редкие</option>
                <option value="epic">Эпические</option>
                <option value="legendary">Легендарные</option>
                <option value="mythic">Мифические</option>
              </select>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {filtered.map((card) => (
                <Card4K key={card.id} card={card} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center text-gray-500 mt-12">
                <p>Ничего не найдено</p>
              </div>
            )}
          </div>
        </main>

        {/* Bottom nav */}
        <nav className="absolute bottom-0 w-full bg-[#0c0d14]/90 backdrop-blur-2xl border-t border-white/10 pb-safe flex justify-around p-2.5 z-20">
          <button className="flex flex-col items-center justify-center w-full py-2 rounded-2xl text-indigo-400 bg-white/10 shadow-inner">
            <LayoutGrid size={22} className="mb-1" />
            <span className="text-[10px] font-bold tracking-tight">Коллекция</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;