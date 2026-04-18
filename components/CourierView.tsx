
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageSquare,
  ChevronRight,
  Package,
  Map as MapIcon,
  List,
  History
} from 'lucide-react';

interface CourierViewProps {
  lang: Language;
  theme: 'light' | 'dark';
}

type CourierTab = 'available' | 'active' | 'history';

const CourierView: React.FC<CourierViewProps> = ({ lang, theme }) => {
  const [activeTab, setActiveTab] = useState<CourierTab>('available');
  const t = TRANSLATIONS[lang];

  const mockOrders = [
    { 
      id: '#DEL-1024', 
      address: 'ул. Амира Темура, 107', 
      customer: 'Азиз Р.', 
      items: 'Цемент М450 (10 мешков)', 
      distance: '2.4 км', 
      reward: '45,000 UZS',
      status: 'available'
    },
    { 
      id: '#DEL-1025', 
      address: 'Массив Чиланзар, 5-й квартал', 
      customer: 'Елена С.', 
      items: 'Краска (5 банок), Кисти', 
      distance: '5.1 км', 
      reward: '65,000 UZS',
      status: 'active'
    },
    { 
      id: '#DEL-1026', 
      address: 'Юнусабад, 13-й квартал', 
      customer: 'Бобур М.', 
      items: 'Дрель Makita, Набор сверл', 
      distance: '1.8 км', 
      reward: '35,000 UZS',
      status: 'available'
    }
  ];

  const renderAvailable = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {mockOrders.filter(o => o.status === 'available').map(order => (
        <div key={order.id} className={`p-6 rounded-3xl border transition-all hover:scale-[1.01] ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[9px] font-black bg-yellow-400 text-black px-2 py-0.5 rounded-full uppercase tracking-widest mb-2 inline-block">
                {lang === 'ru' ? 'Новый заказ' : 'Yangi buyurtma'}
              </span>
              <h3 className="text-lg font-black tracking-tighter">{order.id}</h3>
            </div>
            <p className="text-lg font-black text-green-500">{order.reward}</p>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs font-bold">{order.address}</p>
            </div>
            <div className="flex items-start gap-3">
              <Package size={16} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500 font-medium">{order.items}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-gray-400" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{order.distance}</span>
            </div>
            <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
              {lang === 'ru' ? 'Принять' : 'Qabul qilish'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActive = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`p-8 rounded-[40px] border relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-lg'}`}>
        {/* Map Placeholder */}
        <div className={`absolute inset-0 opacity-10 pointer-events-none ${theme === 'dark' ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)]' : 'bg-[radial-gradient(#000000_1px,transparent_1px)]'}`} style={{ backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">В пути</p>
                <h3 className="text-xl font-black tracking-tighter">#DEL-1025</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-black">12 мин</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Осталось</p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <div className="w-0.5 h-10 bg-zinc-800" />
                <MapPin size={16} className="text-red-500" />
              </div>
              <div className="flex-1 space-y-8">
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Откуда</p>
                  <p className="text-xs font-bold">Склад StroyExpress #4, Юнусабад</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Куда</p>
                  <p className="text-xs font-bold">Массив Чиланзар, 5-й квартал, д. 12</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className={`flex items-center justify-center gap-2 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <Phone size={14} />
              Позвонить
            </button>
            <button className={`flex items-center justify-center gap-2 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <MessageSquare size={14} />
              Чат
            </button>
            <button className="col-span-2 flex items-center justify-center gap-2 bg-green-500 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 active:scale-[0.98]">
              <CheckCircle2 size={18} />
              Доставлено
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: lang === 'ru' ? 'За сегодня' : 'Bugun', value: '12', icon: Truck, color: 'text-blue-500' },
          { label: lang === 'ru' ? 'Заработок' : 'Daromad', value: '420K', icon: Clock, color: 'text-green-500' },
          { label: lang === 'ru' ? 'Рейтинг' : 'Reyting', value: '4.95', icon: CheckCircle2, color: 'text-yellow-500' },
        ].map((stat, idx) => (
          <div key={idx} className={`p-4 rounded-3xl border text-center ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
            <stat.icon size={16} className={`${stat.color} mx-auto mb-2`} />
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={`flex p-1 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200'}`}>
        {[
          { id: 'available', label: lang === 'ru' ? 'Доступные' : 'Mavjud', icon: List },
          { id: 'active', label: lang === 'ru' ? 'Активный' : 'Faol', icon: Navigation },
          { id: 'history', label: lang === 'ru' ? 'История' : 'Tarix', icon: History },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as CourierTab)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? (theme === 'dark' ? 'bg-white text-black shadow-lg' : 'bg-black text-white shadow-lg') 
                : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <tab.icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'available' && renderAvailable()}
        {activeTab === 'active' && renderActive()}
        {activeTab === 'history' && (
          <div className={`p-20 rounded-[40px] border border-dashed text-center ${theme === 'dark' ? 'border-zinc-800 text-zinc-700' : 'border-gray-200 text-gray-300'}`}>
            <History size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-xs font-black uppercase tracking-widest">История пуста</p>
          </div>
        )}
      </div>

      {/* Status Toggle */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full border shadow-2xl flex items-center gap-4 backdrop-blur-xl z-[200] ${theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-gray-200'}`}>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest">На линии</span>
        <div className={`w-10 h-5 rounded-full relative cursor-pointer ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
          <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
};

export default CourierView;
