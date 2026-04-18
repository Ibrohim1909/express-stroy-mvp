
import React, { useState } from 'react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  ShieldCheck, 
  Users, 
  PackageSearch, 
  BarChart3, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  Lock,
  Unlock
} from 'lucide-react';

interface AdminPanelProps {
  lang: Language;
  theme: 'light' | 'dark';
  products: Product[];
  onApproveProduct: (id: string) => void;
  onRejectProduct: (id: string) => void;
}

type AdminView = 'overview' | 'moderation' | 'users' | 'settings';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  lang, 
  theme, 
  products,
  onApproveProduct,
  onRejectProduct
}) => {
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const t = TRANSLATIONS[lang];

  // Mock Global Stats
  const globalStats = [
    { label: lang === 'ru' ? 'Оборот (24ч)' : 'Aylanma (24s)', value: '840M UZS', trend: '+5.2%', up: true },
    { label: lang === 'ru' ? 'Всего пользователей' : 'Jami foydalanuvchilar', value: '12,402', trend: '+120', up: true },
    { label: lang === 'ru' ? 'Активных товаров' : 'Faol tovarlar', value: '4,520', trend: '-12', up: false },
    { label: lang === 'ru' ? 'На модерации' : 'Moderatsiyada', value: '42', trend: '+5', up: true },
  ];

  // Mock Users
  const mockUsers = [
    { id: 'u1', name: 'Иван Иванов', email: 'ivan@stroy.uz', role: 'Seller', status: 'active', joined: '12.03.2024' },
    { id: 'u2', name: 'Малика Ахмедова', email: 'malika@mail.ru', role: 'Buyer', status: 'active', joined: '15.03.2024' },
    { id: 'u3', name: 'Джамшид Каримов', email: 'jam@stroy.uz', role: 'Seller', status: 'suspended', joined: '01.02.2024' },
  ];

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className={`text-2xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
              <span className={`text-[10px] font-black flex items-center gap-1 px-2 py-0.5 rounded-full ${stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-500" />
              {lang === 'ru' ? 'Активность платформы' : 'Platforma faolligi'}
            </h3>
            <select className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border outline-none ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
              <option>{lang === 'ru' ? 'За неделю' : 'Haftalik'}</option>
              <option>{lang === 'ru' ? 'За месяц' : 'Oylik'}</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-3 px-2">
            {[30, 50, 40, 80, 60, 95, 70, 85, 45, 60, 75, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className={`w-full rounded-t-xl transition-all duration-700 group-hover:opacity-80 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`} 
                  style={{ height: `${h}%` }}
                >
                  {h > 80 && <div className="w-full h-1/3 bg-blue-500 rounded-t-xl" />}
                </div>
                <span className="text-[8px] font-bold text-gray-500">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
            <ShieldCheck size={18} className="text-yellow-500" />
            {lang === 'ru' ? 'Лог безопасности' : 'Xavfsizlik logi'}
          </h3>
          <div className="space-y-6">
            {[
              { event: 'New Admin Login', time: '2 min ago', user: 'Admin_01', color: 'text-blue-500' },
              { event: 'Seller Suspended', time: '15 min ago', user: 'Mod_Karim', color: 'text-red-500' },
              { event: 'Bulk Price Update', time: '1 hour ago', user: 'System', color: 'text-green-500' },
              { event: 'API Access Revoked', time: '3 hours ago', user: 'Security', color: 'text-orange-500' },
            ].map((log, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-1 h-8 rounded-full ${log.color.replace('text', 'bg')}`} />
                <div>
                  <p className="text-xs font-black">{log.event}</p>
                  <p className="text-[10px] text-gray-500 font-bold">{log.user} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderModeration = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border w-full max-w-md ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder={lang === 'ru' ? 'Поиск товаров на модерации...' : 'Moderatsiyadagi tovarlarni qidirish...'}
            className="bg-transparent border-none outline-none text-xs font-bold w-full"
          />
        </div>
        <button className={`p-3 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800' : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'}`}>
          <Filter size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.slice(0, 6).map((p) => (
          <div key={p.id} className={`group rounded-3xl border overflow-hidden transition-all hover:shadow-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="relative h-48">
              <img src={p.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Pending
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-sm font-black mb-1">{p.name[lang]}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Seller ID: {p.sellerId}</p>
                </div>
                <p className="text-xs font-black text-blue-500">{p.priceRetail.toLocaleString()} UZS</p>
              </div>
              <div className="flex gap-2 mt-6">
                <button 
                  onClick={() => onApproveProduct(p.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all active:scale-95"
                >
                  <CheckCircle2 size={14} />
                  Approve
                </button>
                <button 
                  onClick={() => onRejectProduct(p.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                >
                  <XCircle size={14} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border w-full sm:max-w-md ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder={lang === 'ru' ? 'Поиск пользователей...' : 'Foydalanuvchilarni qidirish...'}
            className="bg-transparent border-none outline-none text-xs font-bold w-full"
          />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 w-full sm:w-auto justify-center">
          <UserPlus size={16} />
          {lang === 'ru' ? 'Добавить админа' : 'Admin qo\'shish'}
        </button>
      </div>

      <div className={`rounded-3xl border overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-800/50' : 'border-gray-100 bg-gray-50/50'}`}>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">User</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Role</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Joined</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {mockUsers.map(user => (
              <tr key={user.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800/30' : 'hover:bg-gray-50/50'}`}>
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-black">{user.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    user.role === 'Seller' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{user.status}</span>
                  </div>
                </td>
                <td className="p-6 text-[10px] font-bold text-gray-500">{user.joined}</td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      {user.status === 'active' ? <Lock size={14} /> : <Unlock size={14} />}
                    </button>
                    <button className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const menuItems = [
    { id: 'overview', label: lang === 'ru' ? 'Обзор' : 'Umumiy', icon: BarChart3 },
    { id: 'moderation', label: lang === 'ru' ? 'Модерация' : 'Moderatsiya', icon: PackageSearch },
    { id: 'users', label: lang === 'ru' ? 'Пользователи' : 'Foydalanuvchilar', icon: Users },
    { id: 'settings', label: lang === 'ru' ? 'Настройки' : 'Sozlamalar', icon: Settings },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 space-y-3">
        <div className={`p-8 rounded-3xl border mb-8 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest">Admin Root</p>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Superuser</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-500">
              <span>Server Load</span>
              <span className="text-green-500">Normal</span>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <div className="h-full bg-green-500 w-1/3" />
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as AdminView)}
              className={`w-full flex items-center justify-between p-5 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all group ${
                activeView === item.id 
                  ? (theme === 'dark' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-black text-white shadow-xl shadow-black/20') 
                  : (theme === 'dark' ? 'text-zinc-500 hover:bg-zinc-900 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-black')
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} />
                {item.label}
              </div>
              {activeView === 'moderation' && (
                <span className="bg-red-500 text-white text-[8px] px-2 py-0.5 rounded-full">42</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className={`text-3xl font-black tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {menuItems.find(i => i.id === activeView)?.label}
            </h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
              {lang === 'ru' ? 'Панель управления StroyExpress Core' : 'StroyExpress Core boshqaruv paneli'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`hidden sm:flex flex-col items-end ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`}>
              <p className="text-[9px] font-black uppercase tracking-widest">System Status</p>
              <p className="text-[10px] font-bold text-green-500 uppercase">All Systems Operational</p>
            </div>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <Settings size={18} className="text-gray-500" />
            </div>
          </div>
        </header>

        {activeView === 'overview' && renderOverview()}
        {activeView === 'moderation' && renderModeration()}
        {activeView === 'users' && renderUsers()}
        {activeView === 'settings' && (
          <div className={`p-20 rounded-[40px] border border-dashed text-center ${theme === 'dark' ? 'border-zinc-800 text-zinc-700' : 'border-gray-200 text-gray-300'}`}>
            <ShieldCheck size={64} className="mx-auto mb-6 opacity-10" />
            <p className="text-sm font-black uppercase tracking-[0.3em]">
              {lang === 'ru' ? 'Конфигурация ядра' : 'Yadro konfiguratsiyasi'}
            </p>
            <p className="text-[10px] font-bold mt-2 opacity-50 uppercase">
              {lang === 'ru' ? 'Доступ ограничен уровнем доступа 0' : 'Kirish 0-darajali ruxsat bilan cheklangan'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
