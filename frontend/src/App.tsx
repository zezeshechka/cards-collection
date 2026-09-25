import { useState } from 'react';
import Card4K, { type Rarity } from './components/Card4K';
import PackOpening from './components/PackOpening';
import { CARDS } from './data/cards';
import { Sparkles, Coins, Search } from 'lucide-react';

type Tab = 'market' | 'collection' | 'profile';

function App() {
  const [tab, setTab] = useState<Tab>('market');
  const [coins, setCoins] = useState(2450);
  const [searchQuery, setSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState<'all' | Rarity>('all');

  const filtered = CARDS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRarity = rarityFilter === 'all' || c.rarity === rarityFilter;
    return matchSearch && matchRarity;
  });

  const handleSpend = (amount: number) => {
    setCoins((c) => Math.max(0, c - amount));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#030712] text-white font-sans overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-600 opacity-40 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-indigo-600 opacity-40 blur-[120px]" />
      </div>

      {/* Main container */}
      <div className="w-full max-w-md h-[100dvh] bg-[#0c0d14]/85 backdrop-blur-3xl relative flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden sm:rounded-[2.5rem] sm:h-[860px] sm:border border-white/10 z-10">

        {/* Header */}
        <header className="flex justify-between items-center px-4 py-3 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles size={18} className="text-gray-950" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wide text-white font-mono">CYBER VAULT</div>
              <div className="text-[10px] text-amber-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                TG Mini App Active
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-900/90 border border-gray-800 px-3 py-1.5 rounded-full">
            <Coins size={14} className="text-amber-400" />
            <span className="font-mono font-bold text-sm">{coins.toLocaleString()}</span>
            <button
              onClick={() => setCoins((c) => c + 500)}
              className="text-xs bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1 transition"
            >
              +
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {/* MARKET TAB — распаковка */}
          {tab === 'market' && (
            <div className="p-4">
              <PackOpening coins={coins} onSpend={handleSpend} />
            </div>
          )}

          {/* COLLECTION TAB */}
          {tab === 'collection' && (
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-xl font-extrabold tracking-tight font-mono">Инвентарь Карт</h2>
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
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <select
                  value={rarityFilter}
                  onChange={(e) => setRarityFilter(e.target.value as 'all' | Rarity)}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="all">Все ранги</option>
                  <option value="common">Обычные</option>
                  <option value="rare">Редкие</option>
                  <option value="epic">Эпические</option>
                  <option value="legendary">Легендарные</option>
                  <option value="mythic">Мифические</option>
                </select>
              </div>

              {/* Grid */}
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
          )}

          {/* PROFILE TAB */}
          {tab === 'profile' && (
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-xl font-extrabold tracking-tight font-mono">Профиль игрока</h2>
                <p className="text-xs text-gray-400 mt-0.5">Статистика коллекционера</p>
              </div>

              {/* Profile card */}
              <div className="bg-gradient-to-br from-amber-950/60 via-gray-900 to-black rounded-3xl p-6 border border-amber-500/30 shadow-xl mb-4">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-3xl shadow-lg">
                    🎮
                  </div>
                  <div>
                    <div className="text-lg font-black font-mono text-white">Захар</div>
                    <div className="text-xs text-gray-400">@zezeshechka</div>
                    <div className="text-[10px] text-amber-400 mt-0.5">
                      ID: 8804303386
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Монеты</div>
                    <div className="font-mono font-bold text-amber-400 text-lg">
                      {coins.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Карт</div>
                    <div className="font-mono font-bold text-emerald-400 text-lg">
                      {CARDS.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-4 border border-white/5">
                <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  Достижения
                </h3>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex justify-between items-center bg-white/[0.02] px-3 py-2 rounded-xl">
                    <span>🎴 Первая карта</span>
                    <span className="text-emerald-400">✓</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/[0.02] px-3 py-2 rounded-xl">
                    <span>🔥 10 бустеров открыто</span>
                    <span className="text-gray-500">0/10</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/[0.02] px-3 py-2 rounded-xl">
                    <span>👑 Легендарная карта</span>
                    <span className="text-gray-500">0/1</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Bottom nav */}
        <nav className="absolute bottom-0 w-full bg-[#030712]/90 backdrop-blur-2xl border-t border-white/10 pb-safe flex justify-around p-2.5 z-20">
          <button
            onClick={() => setTab('market')}
            className={`flex flex-col items-center justify-center w-full py-2 rounded-2xl transition-all ${
              tab === 'market' ? 'text-amber-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">🏪</span>
            <span className="text-[10px] mt-1 font-mono">Маркет</span>
          </button>
          <button
            onClick={() => setTab('collection')}
            className={`flex flex-col items-center justify-center w-full py-2 rounded-2xl transition-all ${
              tab === 'collection' ? 'text-amber-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">📦</span>
            <span className="text-[10px] mt-1 font-mono">Коллекция</span>
          </button>
          <button
            onClick={() => setTab('profile')}
            className={`flex flex-col items-center justify-center w-full py-2 rounded-2xl transition-all ${
              tab === 'profile' ? 'text-amber-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">👤</span>
            <span className="text-[10px] mt-1 font-mono">Профиль</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;