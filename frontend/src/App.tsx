import { useState } from 'react';
import Card4K, { type Rarity } from './components/Card4K';
import PackOpening from './components/PackOpening';
import Market from './components/Market';
import Profile from './components/Profile';
import { CARDS } from './data/cards';
import { Sparkles, Coins, Search, ArrowLeft } from 'lucide-react';

type Tab = 'market' | 'collection' | 'profile';

export default function App() {
  const [tab, setTab] = useState<Tab>('market');
  const [coins, setCoins] = useState(3000);
  const [searchQuery, setSearchQuery] = useState('');
  const [rarityFilter, setRarityFilter] = useState<'all' | Rarity>('all');

  // Состояние распаковки — когда выбрали бустер в Маркете
  const [openingPack, setOpeningPack] = useState<{ id: string; name: string; price: number } | null>(null);

  const filtered = CARDS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRarity = rarityFilter === 'all' || c.rarity === rarityFilter;
    return matchSearch && matchRarity;
  });

  const handleAddCoins = () => {
    setCoins((c) => c + 500);
  };

  const handleBuyPack = (packId: string, packName: string, price: number) => {
    if (coins < price) {
      alert('Недостаточно монет!');
      return;
    }
    setOpeningPack({ id: packId, name: packName, price });
  };

  const handleSpend = (amount: number) => {
    setCoins((c) => Math.max(0, c - amount));
  };

  const closeOpening = () => {
    setOpeningPack(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#07060e] text-white font-sans overflow-hidden">

      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600 opacity-40 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-cyan-600 opacity-30 blur-[120px]" />
      </div>

      {/* Main container */}
      <div className="w-full max-w-md h-[100dvh] bg-[#0c0d14]/85 backdrop-blur-3xl relative flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden sm:rounded-[2.5rem] sm:h-[860px] sm:border border-purple-500/20 z-10">

        {/* Header */}
        <header className="flex justify-between items-center px-4 py-3 bg-[#07060e]/80 backdrop-blur-md border-b border-purple-500/20 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-purple-600 p-0.5 shadow-[0_0_25px_rgba(250,204,21,0.4)]">
              <div className="w-full h-full bg-[#07060e] rounded-[10px] flex items-center justify-center">
                <Sparkles size={18} className="text-yellow-400" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-wider text-white">CYBER VAULT</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-medium text-green-400 uppercase tracking-wider">TG Mini App Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#1a1738] border border-purple-500/30 rounded-full py-1.5 px-3">
            <Coins size={14} className="text-yellow-400" />
            <span className="font-bold text-sm">{coins.toLocaleString('ru-RU')}</span>
            <button
              onClick={handleAddCoins}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-950 font-black flex items-center justify-center text-xs hover:scale-110 active:scale-95 transition-transform"
            >
              +
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">

          {/* MARKET TAB */}
          {tab === 'market' && !openingPack && (
            <div className="p-4">
              <Market coins={coins} onAddCoins={handleAddCoins} onBuyPack={handleBuyPack} />
            </div>
          )}

          {/* PACK OPENING (перекрывает маркет когда открыт) */}
          {tab === 'market' && openingPack && (
            <div className="p-4">
              <button
                onClick={closeOpening}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft size={14} />
                Назад в Маркет
              </button>
              <PackOpening coins={coins} onSpend={handleSpend} />
            </div>
          )}

          {/* COLLECTION TAB */}
          {tab === 'collection' && (
            <div className="p-4">
              <div className="mb-4">
                <h2 className="text-xl font-extrabold tracking-tight">Инвентарь Карт</h2>
                <p className="text-xs text-gray-400 mt-0.5">Ультра-четкие цифровые артефакты</p>
              </div>

              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск карты..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <select
                  value={rarityFilter}
                  onChange={(e) => setRarityFilter(e.target.value as 'all' | Rarity)}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="all">Все ранги</option>
                  <option value="common">Обычные</option>
                  <option value="rare">Редкие</option>
                  <option value="epic">Эпические</option>
                  <option value="legendary">Легендарные</option>
                  <option value="mythic">Мифические</option>
                </select>
              </div>

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
              <Profile coins={coins} totalCards={CARDS.length} />
            </div>
          )}

        </main>

        {/* Bottom nav */}
        <nav className="absolute bottom-0 w-full bg-[#07060e]/90 backdrop-blur-2xl border-t border-purple-500/20 pb-safe flex justify-around p-2.5 z-20">
          <button
            onClick={() => { setTab('market'); setOpeningPack(null); }}
            className={`flex flex-col items-center justify-center w-full py-2 rounded-2xl transition-all ${
              tab === 'market' ? 'text-purple-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">🏪</span>
            <span className="text-[10px] mt-1 font-bold">Маркет</span>
          </button>
          <button
            onClick={() => { setTab('collection'); setOpeningPack(null); }}
            className={`flex flex-col items-center justify-center w-full py-2 rounded-2xl transition-all ${
              tab === 'collection' ? 'text-purple-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">📦</span>
            <span className="text-[10px] mt-1 font-bold">Коллекция</span>
          </button>
          <button
            onClick={() => { setTab('profile'); setOpeningPack(null); }}
            className={`flex flex-col items-center justify-center w-full py-2 rounded-2xl transition-all ${
              tab === 'profile' ? 'text-purple-400 bg-white/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-lg">👤</span>
            <span className="text-[10px] mt-1 font-bold">Профиль</span>
          </button>
        </nav>

      </div>
    </div>
  );
}