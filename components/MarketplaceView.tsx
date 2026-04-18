
import React, { useState, useEffect, useRef } from 'react';
import { Language, Product, CartItem } from '../types';
import { TRANSLATIONS } from '../constants';
import { ShoppingCart, Search, User, Home, Heart, MessageCircle, Star, Zap, LayoutGrid, LifeBuoy, Hammer, Plug, PaintBucket, BrickWall, ArrowLeft, Store, Headset, Send, Paperclip, CheckCheck, ChevronRight, Copy, Plus } from 'lucide-react';
import ProductModal from './ProductModal';
import { ViewState, Theme } from '../App';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: 'support' | 'shop';
  avatar?: string;
}

interface Props {
  lang: Language;
  products: Product[];
  cart: CartItem[];
  view: ViewState;
  setView: (v: ViewState) => void;
  theme: Theme;
  categoryFilter: string | null;
  setCategoryFilter: (c: string | null) => void;
  onToggleFavorite: (id: string) => void;
  onUpdateCart: (cart: CartItem[]) => void;
  onAddToCart?: (product: Product, isWholesale: boolean, quantity: number) => void;
}

const MarketplaceView: React.FC<Props> = ({ 
  lang, products, cart, view, setView, theme, 
  categoryFilter, setCategoryFilter, onToggleFavorite, onUpdateCart, onAddToCart 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeChatTab, setActiveChatTab] = useState<'support' | 'shops'>('support');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: lang === 'ru' ? 'Здравствуйте! Чем могу помочь?' : 'Salom! Qanday yordam bera olaman?', sender: 'other', time: '10:00' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (activeChatId && view === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeChatId, view]);

  const mockChats: Chat[] = [
    { id: 'support_1', name: t.techSupport, lastMessage: 'Ваш тикет №452 закрыт', time: '12:45', unread: 1, type: 'support' },
    { id: 'shop_1', name: 'Artel Official', lastMessage: 'Товар в наличии', time: 'Вчера', unread: 0, type: 'shop' },
    { id: 'shop_2', name: 'Knauf Uzbekistan', lastMessage: 'Скидка на опт 5%', time: '10.03', unread: 0, type: 'shop' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    const matchesSearch = p.name[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favoriteProducts = products.filter(p => p.isFavorite);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: lang === 'ru' ? 'Принято, менеджер скоро свяжется с вами.' : 'Qabul qilindi, menejer tez orada siz bilan bog\'lanadi.',
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const onOpenChatWithSeller = (sellerId: string) => {
    setView('chat');
    setActiveChatTab('shops');
    setActiveChatId('shop_1');
    setSelectedProduct(null);
  };

  const renderProductCard = (product: Product) => (
    <div 
      key={product.id} 
      onClick={() => setSelectedProduct(product)}
      className={`group rounded-3xl overflow-hidden border cursor-pointer transition-all active:scale-[0.97] ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      <div className="relative aspect-square">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name[lang]} />
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            product.isFavorite ? 'bg-red-500 text-white' : 'bg-white/70 text-gray-900'
          }`}
        >
          <Heart size={16} fill={product.isFavorite ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-2 left-2">
          <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-tighter shadow-sm">
            Опт от {product.wholesaleMinQty} шт
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex flex-col mb-1.5">
          <div className={`text-sm font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {product.priceRetail.toLocaleString()} <span className="text-[10px] font-bold">UZS</span>
          </div>
          <div className="bg-yellow-100 text-yellow-800 text-[8px] font-black w-fit px-1.5 py-0.5 rounded-md mt-1">
            {(Math.round(product.priceRetail / 12)).toLocaleString()} UZS / мес
          </div>
        </div>
        <h3 className={`text-[11px] font-bold leading-tight mb-2 line-clamp-2 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.name[lang]}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            <Star size={10} className="text-yellow-400" fill="currentColor" />
            <span className="text-[10px] font-bold text-gray-400">{product.rating}</span>
          </div>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product, false, 1);
            }}
            className={`p-1.5 rounded-lg border active:bg-yellow-400 active:text-black transition-colors ${theme === 'dark' ? 'border-zinc-800 bg-zinc-800' : 'border-gray-100 bg-gray-50'}`}
          >
            <Plus size={14} className="text-gray-400 group-active:text-black" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderChatView = () => {
    if (activeChatId) {
      const currentChat = mockChats.find(c => c.id === activeChatId);
      return (
        <div className={`flex flex-col h-[75vh] rounded-[32px] overflow-hidden border transition-all duration-300 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-2xl'}`}>
          <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-gray-50 bg-gray-50/50'}`}>
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveChatId(null)} className={`p-2 rounded-xl transition-all active:scale-90 ${theme === 'dark' ? 'text-white hover:bg-zinc-800' : 'text-black hover:bg-gray-100'}`}>
                <ArrowLeft size={20} />
              </button>
              <div>
                <h3 className="font-bold text-sm tracking-tight">{currentChat?.name}</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-gray-400 font-medium">{t.supportOnline}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm relative ${
                  msg.sender === 'me' 
                    ? 'bg-yellow-400 text-black rounded-tr-none' 
                    : (theme === 'dark' ? 'bg-zinc-800 text-white rounded-tl-none' : 'bg-gray-100 text-black rounded-tl-none')
                }`}>
                  <p className="text-[13px] font-medium leading-relaxed">{msg.text}</p>
                  <div className="text-[8px] mt-1 opacity-50 font-bold text-right">{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className={`p-4 border-t flex items-center gap-2 ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-gray-50 bg-white'}`}>
            <input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={lang === 'ru' ? 'Сообщение...' : 'Xabar...'}
              className={`flex-1 bg-transparent py-3 px-4 rounded-xl font-medium text-sm outline-none border transition-all ${
                theme === 'dark' ? 'border-zinc-800 focus:border-yellow-400 text-white' : 'border-gray-100 focus:border-yellow-400'
              }`}
            />
            <button onClick={handleSendMessage} className="p-3 bg-yellow-400 text-black rounded-xl active:scale-95 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className={`flex p-1 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-100'}`}>
          <button 
            onClick={() => setActiveChatTab('support')}
            className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase transition-all ${
              activeChatTab === 'support' ? (theme === 'dark' ? 'bg-zinc-800 text-white shadow-lg' : 'bg-white text-black shadow-sm') : 'text-gray-400'
            }`}
          >
            {t.techSupport}
          </button>
          <button 
            onClick={() => setActiveChatTab('shops')}
            className={`flex-1 py-3 rounded-xl text-[11px] font-bold uppercase transition-all ${
              activeChatTab === 'shops' ? (theme === 'dark' ? 'bg-zinc-800 text-white shadow-lg' : 'bg-white text-black shadow-sm') : 'text-gray-400'
            }`}
          >
            {lang === 'ru' ? 'Магазины' : 'Do\'konlar'}
          </button>
        </div>

        <div className="space-y-2">
          {mockChats.filter(c => activeChatTab === 'support' ? c.type === 'support' : c.type === 'shop').map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] ${
                theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-50 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                  {chat.type === 'support' ? <LifeBuoy size={24} className="text-yellow-400" /> : <Store size={24} className="text-blue-500" />}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-0.5">{chat.name}</h3>
                  <p className="text-xs text-gray-400 truncate max-w-[150px]">{chat.lastMessage}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-32 px-1">
      {view === 'home' && (
        <>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              className={`w-full py-4 pl-12 pr-4 rounded-2xl text-sm font-medium outline-none border transition-all ${
                theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white focus:border-yellow-400' : 'bg-gray-100 border-gray-100 focus:bg-white focus:border-yellow-400'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'materials', icon: BrickWall, label: t.materials },
              { id: 'tools', icon: Hammer, label: t.tools },
              { id: 'electrical', icon: Plug, label: t.electrical },
              { id: 'finishing', icon: PaintBucket, label: t.finishing }
            ].map(cat => (
              <button 
                key={cat.id}
                onClick={() => setCategoryFilter(categoryFilter === cat.id ? null : cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all whitespace-nowrap text-[11px] font-bold uppercase tracking-tight ${
                  categoryFilter === cat.id 
                    ? 'bg-yellow-400 border-yellow-400 text-black shadow-lg' 
                    : (theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-gray-400' : 'bg-white border-gray-100 text-gray-500')
                }`}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map(product => renderProductCard(product))}
          </div>
        </>
      )}

      {view === 'chat' && renderChatView()}

      {view === 'fav_list' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('home')} className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold uppercase tracking-tight">{t.favorites}</h2>
          </div>
          
          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {favoriteProducts.map(product => renderProductCard(product))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">{t.emptyCart}</p>
            </div>
          )}
        </div>
      )}

      {view === 'cart' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView('home')} className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-black uppercase tracking-tight">{t.yourOrder}</h2>
          </div>

          {cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.isWholesale}-${idx}`} 
                  onClick={() => setSelectedProduct(item)}
                  className={`p-4 rounded-3xl border flex items-center gap-4 cursor-pointer transition-all active:scale-[0.98] ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                  <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                  <div className="flex-1">
                    <h3 className="font-bold text-xs uppercase mb-1">{item.name[lang]}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-lg">x{item.quantity}</span>
                      <span className="text-[10px] font-black text-yellow-500 uppercase">{item.isWholesale ? t.wholesale : t.retail}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black">{(item.quantity * (item.isWholesale ? item.priceWholesale : item.priceRetail)).toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div className={`mt-8 p-6 rounded-[40px] ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-black text-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase opacity-60">{t.total}</span>
                  <div className="text-2xl font-black">
                    {cart.reduce((acc, item) => acc + (item.quantity * (item.isWholesale ? item.priceWholesale : item.priceRetail)), 0).toLocaleString()} <span className="text-xs font-bold">UZS</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-yellow-400 text-black rounded-2xl font-black uppercase tracking-widest text-[11px] active:scale-95 transition-all shadow-xl shadow-yellow-400/20">
                  {t.checkout}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 opacity-30">
               <ShoppingCart size={64} className="mx-auto mb-4" />
               <p className="font-bold uppercase text-[10px] tracking-[0.3em]">{t.emptyCart}</p>
            </div>
          )}
        </div>
      )}

      {view === 'profile' && (
        <div className="max-w-xl mx-auto space-y-6 animate-in fade-in">
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-yellow-400 rounded-[32px] mx-auto mb-4 flex items-center justify-center shadow-xl">
              <User size={48} className="text-black" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Alisher Karimov</h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">ID: 7700 • SILVER STATUS</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
             {[
               { icon: Home, label: t.home, action: () => setView('home') },
               { icon: Heart, label: t.favorites, action: () => setView('fav_list') },
               { icon: LifeBuoy, label: t.partnerProgram },
               { icon: User, label: t.settings }
             ].map((item, idx) => (
               <button 
                 key={idx}
                 onClick={item.action}
                 className={`flex items-center justify-between p-5 rounded-3xl border transition-all active:scale-[0.98] ${
                   theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'
                 }`}
               >
                 <div className="flex items-center gap-4">
                   <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                     <item.icon size={18} className="text-yellow-400" />
                   </div>
                   <span className="font-bold text-xs uppercase tracking-tight">{item.label}</span>
                 </div>
                 <ChevronRight size={16} className="text-gray-300" />
               </button>
             ))}
          </div>

          <div className={`p-6 rounded-[32px] border-2 border-dashed transition-all ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50 text-gray-400' : 'border-yellow-100 bg-yellow-50 text-yellow-800'}`}>
             <h3 className="font-black text-[10px] uppercase tracking-widest mb-2">{t.partnerProgram}</h3>
             <p className="text-[10px] font-medium leading-relaxed mb-4">{t.referralText}</p>
             <div className="flex items-center justify-between bg-white dark:bg-zinc-800 p-3 rounded-xl border border-inherit">
               <code className="font-black text-sm tracking-widest">STROY777</code>
               <button className="text-[10px] font-black uppercase text-yellow-500">
                 {t.copyCode}
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Мобильное меню */}
      <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-md:max-w-md p-3 rounded-3xl flex items-center justify-around z-[150] shadow-2xl backdrop-blur-xl border transition-all duration-300 ${
        theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800 shadow-black' : 'bg-white/95 border-gray-100'
      }`}>
        {[
          { id: 'home', icon: Home, label: t.home },
          { id: 'chat', icon: MessageCircle, label: 'Чат' },
          { id: 'cart', icon: ShoppingCart, label: 'Savat', badge: cart.length },
          { id: 'profile', icon: User, label: 'Profil' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => {
              setView(item.id as ViewState);
              if (item.id === 'chat') {
                setActiveChatId(null);
              }
            }}
            className={`relative p-3 rounded-2xl transition-all active:scale-75 ${
              view === item.id 
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon size={22} />
            {item.badge > 0 ? (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
                {item.badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          lang={lang} 
          theme={theme}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, isW, q) => {
            if (onAddToCart) {
              onAddToCart(p, isW, q);
            }
            setView('cart'); // Автоматический переход в корзину при добавлении
          }}
          onAskSeller={onOpenChatWithSeller}
        />
      )}
    </div>
  );
};

export default MarketplaceView;
