
import React, { useState, useEffect } from 'react';
import { Language, Product, CartItem } from './types';
import { TRANSLATIONS, MOCK_PRODUCTS } from './constants';
import MarketplaceView from './components/MarketplaceView';
import ArchitectView from './components/ArchitectView';
import SellerPanel from './components/SellerPanel';
import AdminPanel from './components/AdminPanel';
import CourierView from './components/CourierView';
import { Layout, AppWindow, Database, Moon, Sun, Store, ShieldCheck, Truck } from 'lucide-react';

export type ViewState = 'home' | 'categories' | 'cart' | 'profile' | 'fav_list' | 'chat';
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('se_lang') as Language) || 'ru';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('se_theme') as Theme) || 'light';
  });
  const [mode, setMode] = useState<'app' | 'architect' | 'seller' | 'admin' | 'courier'>('app');
  
  const [view, setView] = useState<ViewState>(() => {
    return (localStorage.getItem('se_view') as ViewState) || 'home';
  });
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('se_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('se_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('se_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('se_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('se_view', view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem('se_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('se_products', JSON.stringify(products));
  }, [products]);

  const t = TRANSLATIONS[lang];

  const handleToggleFavorite = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const handleUpdateCart = (newCartItems: CartItem[]) => {
    // Логика мерджа: если добавляется новый элемент, проверяем нет ли уже такого в корзине
    // В данном приложении MarketplaceView передает весь массив, но мы обеспечим уникальность
    setCart(newCartItems);
  };

  const onAddToCart = (product: Product, isWholesale: boolean, quantity: number) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id && item.isWholesale === isWholesale);
      if (existingItemIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }
      return [...prev, { ...product, quantity, isWholesale }];
    });
  };

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleUpdateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleApproveProduct = (id: string) => {
    console.log('Approved product:', id);
  };

  const handleRejectProduct = (id: string) => {
    console.log('Rejected product:', id);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`border-b px-4 py-2 sticky top-0 z-[100] shadow-sm flex items-center justify-between backdrop-blur-md transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-gray-200'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setMode('app'); setView('home'); }}>
            <div className="bg-yellow-400 p-1.5 rounded-lg">
              <Layout size={18} className="text-black" />
            </div>
            <span className={`font-black text-base hidden sm:block tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-black'}`}>StroyExpress</span>
          </div>
          
          <div className={`hidden lg:flex p-1 rounded-xl transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <button 
              onClick={() => setMode('app')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === 'app' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white shadow-sm text-black') : 'text-gray-500 hover:text-gray-400'}`}
            >
              <AppWindow size={14} />
              {t.appMode.toUpperCase()}
            </button>
            <button 
              onClick={() => setMode('seller')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === 'seller' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white shadow-sm text-black') : 'text-gray-500 hover:text-gray-400'}`}
            >
              <Store size={14} />
              {t.sellerMode.toUpperCase()}
            </button>
            <button 
              onClick={() => setMode('admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === 'admin' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white shadow-sm text-black') : 'text-gray-500 hover:text-gray-400'}`}
            >
              <ShieldCheck size={14} />
              {t.adminMode.toUpperCase()}
            </button>
            <button 
              onClick={() => setMode('courier')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === 'courier' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white shadow-sm text-black') : 'text-gray-500 hover:text-gray-400'}`}
            >
              <Truck size={14} />
              {t.courierMode.toUpperCase()}
            </button>
            <button 
              onClick={() => setMode('architect')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${mode === 'architect' ? (theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white shadow-sm text-black') : 'text-gray-500 hover:text-gray-400'}`}
            >
              <Database size={14} />
              {t.schemaMode.toUpperCase()}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all active:scale-90 ${theme === 'dark' ? 'bg-zinc-800 text-yellow-400' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className={`flex p-0.5 rounded-xl border transition-colors duration-300 overflow-hidden ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-200'}`}>
            <button 
              onClick={() => setLang('ru')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'ru' ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') : 'text-gray-500 hover:bg-zinc-700 hover:text-white'}`}
            >
              RU
            </button>
            <button 
              onClick={() => setLang('uz')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'uz' ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') : 'text-gray-500 hover:bg-zinc-700 hover:text-white'}`}
            >
              UZ
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {mode === 'app' ? (
          <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-12">
             <div className="mb-6 text-center">
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black mb-2 tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>StroyExpress</h2>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold leading-relaxed uppercase tracking-widest">
                  {lang === 'ru' ? 'Твой надежный склад материалов' : 'Sizning ishonchli materiallar omboringiz'}
                </p>
             </div>
             <MarketplaceView 
               lang={lang} 
               products={products}
               cart={cart}
               view={view}
               setView={setView}
               theme={theme}
               categoryFilter={categoryFilter}
               setCategoryFilter={setCategoryFilter}
               onToggleFavorite={handleToggleFavorite}
               onUpdateCart={handleUpdateCart}
               onAddToCart={onAddToCart}
             />
          </div>
        ) : mode === 'seller' ? (
          <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-12">
            <SellerPanel 
              lang={lang}
              theme={theme}
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        ) : mode === 'admin' ? (
          <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-12">
            <AdminPanel 
              lang={lang}
              theme={theme}
              products={products}
              onApproveProduct={handleApproveProduct}
              onRejectProduct={handleRejectProduct}
            />
          </div>
        ) : mode === 'courier' ? (
          <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-12">
            <CourierView 
              lang={lang}
              theme={theme}
            />
          </div>
        ) : (
          <ArchitectView />
        )}
      </main>

      <footer className={`border-t py-12 text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-900 text-zinc-600' : 'bg-white border-gray-100 text-gray-400'}`}>
        <p className="text-[9px] font-black uppercase tracking-[0.2em]">
          StroyExpress Systems Architecture 2024
        </p>
      </footer>
    </div>
  );
};

export default App;
