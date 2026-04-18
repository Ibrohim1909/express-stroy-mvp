
import React, { useState } from 'react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../constants';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingBag, 
  Settings, 
  TrendingUp, 
  Users, 
  AlertCircle,
  Edit,
  Trash2,
  ChevronRight,
  Search
} from 'lucide-react';

interface SellerPanelProps {
  lang: Language;
  theme: 'light' | 'dark';
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

type SellerView = 'dashboard' | 'products' | 'add_product' | 'orders' | 'settings';

const SellerPanel: React.FC<SellerPanelProps> = ({ 
  lang, 
  theme, 
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const [activeView, setActiveView] = useState<SellerView>('dashboard');
  const t = TRANSLATIONS[lang];
  
  // Mock stats
  const stats = [
    { label: lang === 'ru' ? 'Продажи (мес)' : 'Sotuvlar (oy)', value: '12.4M UZS', icon: TrendingUp, color: 'text-green-500' },
    { label: lang === 'ru' ? 'Активные товары' : 'Faol tovarlar', value: products.length.toString(), icon: Package, color: 'text-blue-500' },
    { label: lang === 'ru' ? 'Новые заказы' : 'Yangi buyurtmalar', value: '8', icon: ShoppingBag, color: 'text-orange-500' },
    { label: lang === 'ru' ? 'Клиенты' : 'Mijozlar', value: '142', icon: Users, color: 'text-purple-500' },
  ];

  const sellerProducts = products.filter(p => p.sellerId === 's1'); // Assuming current user is s1 for demo

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border transition-all hover:shadow-md ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-yellow-500" />
            {lang === 'ru' ? 'График продаж' : 'Sotuvlar grafigi'}
          </h3>
          <div className="h-48 flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'}`} 
                  style={{ height: `${h}%` }}
                >
                  {h > 70 && <div className="w-full h-1/2 bg-yellow-400 rounded-t-lg" />}
                </div>
                <span className="text-[9px] font-bold text-gray-500">П{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            {lang === 'ru' ? 'Низкий запас' : 'Kam qolgan tovarlar'}
          </h3>
          <div className="space-y-4">
            {sellerProducts.filter(p => p.stock < 50).map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold">{p.name[lang]}</p>
                    <p className="text-[10px] text-red-500 font-bold">{lang === 'ru' ? 'Осталось:' : 'Qoldi:'} {p.stock}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-white shadow-sm text-black hover:bg-gray-50">
                  <PlusCircle size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
          <ShoppingBag size={16} className="text-purple-500" />
          {lang === 'ru' ? 'Последние заказы' : 'Oxirgi buyurtmalar'}
        </h3>
        <div className="space-y-3">
          {[
            { id: '#ORD-7721', customer: 'Алишер У.', total: '1.2M', status: 'pending', date: '10 мин назад' },
            { id: '#ORD-7720', customer: 'Сардор Б.', total: '450K', status: 'paid', date: '1 час назад' },
            { id: '#ORD-7719', customer: 'Малика К.', total: '2.8M', status: 'delivered', date: '3 часа назад' },
          ].map((order, idx) => (
            <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] ${theme === 'dark' ? 'bg-zinc-700' : 'bg-white shadow-sm'}`}>
                  {order.customer[0]}
                </div>
                <div>
                  <p className="text-xs font-black">{order.id}</p>
                  <p className="text-[10px] text-gray-500 font-bold">{order.customer} • {order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black">{order.total} UZS</p>
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                  order.status === 'pending' ? 'bg-orange-500/10 text-orange-500' : 
                  order.status === 'paid' ? 'bg-blue-500/10 text-blue-500' : 
                  'bg-green-500/10 text-green-500'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border w-full sm:max-w-md ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder={lang === 'ru' ? 'Поиск по вашим товарам...' : 'Tovarlaringizdan qidirish...'}
            className="bg-transparent border-none outline-none text-xs font-bold w-full"
          />
        </div>
        <button 
          onClick={() => setActiveView('add_product')}
          className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-95 w-full sm:w-auto justify-center"
        >
          <PlusCircle size={16} />
          {lang === 'ru' ? 'Добавить товар' : 'Tovar qo\'shish'}
        </button>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b ${theme === 'dark' ? 'border-zinc-800 bg-zinc-800/50' : 'border-gray-100 bg-gray-50/50'}`}>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{lang === 'ru' ? 'Товар' : 'Tovar'}</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{lang === 'ru' ? 'Категория' : 'Kategoriya'}</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{lang === 'ru' ? 'Цена' : 'Narx'}</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">{lang === 'ru' ? 'Склад' : 'Ombor'}</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">{lang === 'ru' ? 'Действия' : 'Amallar'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {sellerProducts.map(p => (
              <tr key={p.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800/30' : 'hover:bg-gray-50/50'}`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-zinc-800" />
                    <div>
                      <p className="text-xs font-black">{p.name[lang]}</p>
                      <p className="text-[10px] text-gray-500 font-bold">ID: {p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'}`}>
                    {p.category}
                  </span>
                </td>
                <td className="p-4">
                  <p className="text-xs font-black">{p.priceRetail.toLocaleString()} UZS</p>
                  <p className="text-[10px] text-yellow-500 font-bold">{p.priceWholesale.toLocaleString()} (Опт)</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-16 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                      <div 
                        className={`h-full rounded-full ${p.stock < 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${Math.min(100, (p.stock / 200) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold">{p.stock}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
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
    { id: 'dashboard', label: lang === 'ru' ? 'Дашборд' : 'Boshqaruv', icon: LayoutDashboard },
    { id: 'products', label: lang === 'ru' ? 'Мои товары' : 'Mening tovarlarim', icon: Package },
    { id: 'orders', label: lang === 'ru' ? 'Заказы' : 'Buyurtmalar', icon: ShoppingBag },
    { id: 'settings', label: lang === 'ru' ? 'Настройки' : 'Sozlamalar', icon: Settings },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 space-y-2">
        <div className={`p-6 rounded-2xl border mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-black font-black text-xl">
              S
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest">StroyMarket LLC</p>
              <p className="text-[10px] text-gray-500 font-bold">{lang === 'ru' ? 'Продавец' : 'Sotuvchi'}</p>
            </div>
          </div>
          <div className={`h-1 w-full rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <div className="h-full bg-yellow-400 w-3/4" />
          </div>
          <p className="text-[9px] font-bold text-gray-500 mt-2 uppercase tracking-tighter">Рейтинг: 4.8/5.0</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as SellerView)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all group ${
                activeView === item.id 
                  ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') 
                  : (theme === 'dark' ? 'text-zinc-500 hover:bg-zinc-900 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-black')
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              <ChevronRight size={14} className={`transition-transform ${activeView === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-8">
          <h2 className={`text-2xl font-black tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {menuItems.find(i => i.id === activeView)?.label}
          </h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
            {lang === 'ru' ? 'Управление вашим бизнесом на StroyExpress' : 'StroyExpress dagi biznesingizni boshqarish'}
          </p>
        </header>

        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'products' && renderProducts()}
        {(activeView === 'orders' || activeView === 'settings' || activeView === 'add_product') && (
          <div className={`p-12 rounded-3xl border border-dashed text-center ${theme === 'dark' ? 'border-zinc-800 text-zinc-600' : 'border-gray-200 text-gray-400'}`}>
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xs font-black uppercase tracking-widest">
              {lang === 'ru' ? 'Раздел в разработке' : 'Bo\'lim ishlab chiqilmoqda'}
            </p>
            <button 
              onClick={() => setActiveView('dashboard')}
              className="mt-4 text-[10px] font-bold text-yellow-500 hover:underline uppercase"
            >
              {lang === 'ru' ? 'Вернуться на дашборд' : 'Boshqaruvga qaytish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerPanel;
