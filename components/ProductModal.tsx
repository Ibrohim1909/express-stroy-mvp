
import React, { useState, useEffect } from 'react';
import { Product, Language, Review } from '../types';
import { TRANSLATIONS } from '../constants';
import { X, Star, Minus, Plus, MessageCircle, CheckCircle, Info, ShieldCheck, Zap, ShoppingCart } from 'lucide-react';
import { Theme } from '../App';

interface Props {
  product: Product;
  lang: Language;
  theme: Theme;
  onClose: () => void;
  onAddToCart: (p: Product, isWholesale: boolean, qty: number) => void;
  onAskSeller?: (sellerId: string) => void;
}

const ProductModal: React.FC<Props> = ({ product, lang, theme, onClose, onAddToCart, onAskSeller }) => {
  const [qty, setQty] = useState(1);
  const [isWholesale, setIsWholesale] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow || 'auto'; };
  }, []);

  const handleQtyChange = (delta: number) => {
    // Теперь разрешаем 0
    const newQty = Math.max(0, Math.min(qty + delta, product.stock));
    setQty(newQty);
    setIsWholesale(newQty >= product.wholesaleMinQty);
  };

  const handleManualQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      const clamped = Math.max(0, Math.min(val, product.stock));
      setQty(clamped);
      setIsWholesale(clamped >= product.wholesaleMinQty);
    } else if (e.target.value === '') {
      setQty(0);
    }
  };

  const handleBlur = () => {
    // Больше не сбрасываем в 1, разрешаем 0
  };

  const onAddClick = () => {
    // Если количество 0, то либо ничего не делаем, либо удаляем (в зависимости от логики)
    // В данном случае просто добавим 0 или больше
    onAddToCart(product, isWholesale, qty);
    onClose();
  };

  const mockReviews: Review[] = [
    {
      id: 'r1',
      userId: 'u101',
      userName: lang === 'ru' ? 'Азиз Ибрагимов' : 'Aziz Ibragimov',
      rating: 5,
      date: '15.03.2024',
      isVerified: true,
      pros: lang === 'ru' ? 'Качественный материал, прочный.' : 'Sifatli material, mustahkam.',
      cons: lang === 'ru' ? 'Тяжелый' : 'Og\'ir',
      comment: lang === 'ru' ? 'Брал для фундамента, все отлично. Доставили быстро.' : 'Fundament uchun oldim, hammasi joyida. Tez yetkazishdi.'
    },
    {
      id: 'r2',
      userId: 'u102',
      userName: lang === 'ru' ? 'Мария' : 'Mariya',
      rating: 4,
      date: '10.03.2024',
      isVerified: true,
      pros: lang === 'ru' ? 'Хорошая цена для опта' : 'Ulgurji narx yaxshi',
      cons: '-',
      comment: lang === 'ru' ? 'Соответствует описанию.' : 'Tavsifga mos keladi.'
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 p-0 sm:p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className={`w-full max-w-2xl max-h-[95vh] rounded-t-[40px] sm:rounded-[40px] overflow-hidden flex flex-col shadow-2xl relative z-10 animate-in slide-in-from-bottom-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        
        <button onClick={onClose} className={`absolute top-4 right-4 z-[210] p-2 backdrop-blur-sm rounded-full shadow transition-all active:scale-90 ${theme === 'dark' ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-gray-100/80 text-black hover:bg-white'}`}>
          <X size={20} />
        </button>

        <div className="overflow-y-auto flex-1 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square sm:aspect-auto sm:h-full">
              <img src={product.image} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                <button 
                  onClick={() => onAskSeller && onAskSeller(product.sellerId)}
                  className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-black text-[10px] uppercase shadow-2xl flex items-center gap-2 active:scale-95 transition-all"
                >
                  <MessageCircle size={16} /> {t.askSeller}
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-lg tracking-widest ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>{product.category}</span>
                  {product.rating >= 4.8 && (
                    <span className="text-[8px] font-black uppercase bg-yellow-400 text-black px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <ShieldCheck size={10} /> TOP
                    </span>
                  )}
                </div>
                <h2 className={`text-2xl font-black uppercase tracking-tighter mb-2 leading-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name[lang]}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : (theme === 'dark' ? "text-zinc-700" : "text-gray-200")} />
                    ))}
                  </div>
                  <span className={`font-black text-xs transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.rating}</span>
                  <span className="text-zinc-600 text-xs">|</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{product.totalReviews} {t.reviews}</span>
                </div>
              </div>

              <div className={`flex gap-6 border-b mb-6 transition-colors duration-300 ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-100'}`}>
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 text-[11px] font-black uppercase transition-all relative ${activeTab === 'specs' ? (theme === 'dark' ? 'text-white' : 'text-black') : 'text-gray-400'}`}
                >
                  {t.allSpecs}
                  {activeTab === 'specs' && <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 text-[11px] font-black uppercase transition-all relative ${activeTab === 'reviews' ? (theme === 'dark' ? 'text-white' : 'text-black') : 'text-gray-400'}`}
                >
                  {t.reviews}
                  {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full"></div>}
                </button>
              </div>

              <div className="flex-1 min-h-[150px] mb-6">
                {activeTab === 'specs' ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      {product.attributes.map(attr => (
                        <div key={attr.key} className={`p-3 rounded-2xl border transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                          <span className="text-[8px] font-black uppercase text-gray-400 block mb-1">{attr.label[lang]}</span>
                          <span className={`font-black text-xs transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{attr.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[250px] overflow-y-auto scrollbar-hide">
                    {mockReviews.map(r => (
                      <div key={r.id} className={`p-4 rounded-3xl border transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={`font-black uppercase text-[10px] block transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{r.userName}</span>
                            <span className="text-[8px] font-bold text-gray-400">{r.date}</span>
                          </div>
                        </div>
                        <div className="flex text-yellow-400 gap-0.5 mb-2">
                          {[...Array(r.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                        <p className={`text-[10px] leading-relaxed font-medium italic ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-800'}`}>"{r.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={`p-5 rounded-[32px] mb-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => handleQtyChange(-1)} 
                      disabled={qty < 1} 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm disabled:opacity-30 active:scale-90 transition-all ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white text-black'}`}
                    >
                      <Minus size={20} />
                    </button>
                    
                    <input 
                      type="number"
                      inputMode="numeric"
                      value={qty === 0 && qty !== 0 ? '' : qty}
                      onChange={handleManualQtyChange}
                      onBlur={handleBlur}
                      className={`text-2xl font-black w-16 text-center bg-transparent outline-none border-none transition-colors duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    />

                    <button 
                      onClick={() => handleQtyChange(1)} 
                      disabled={qty >= product.stock} 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm disabled:opacity-30 active:scale-90 transition-all ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white text-black'}`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {Math.round((isWholesale ? product.priceWholesale : product.priceRetail) * qty).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-2">
                <button 
                  onClick={() => { setIsWholesale(false); setQty(1); }}
                  className={`p-4 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${!isWholesale ? 'border-black bg-black text-white shadow-xl' : (theme === 'dark' ? 'border-zinc-800 bg-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300')}`}
                >
                  <div className="text-[8px] font-black uppercase tracking-widest mb-1">{t.retail}</div>
                  <div className="font-black text-sm">{product.priceRetail.toLocaleString()}</div>
                </button>
                <button 
                  onClick={() => { setIsWholesale(true); setQty(product.wholesaleMinQty); }}
                  className={`p-4 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${isWholesale ? 'border-yellow-400 bg-yellow-400 text-black shadow-xl' : (theme === 'dark' ? 'border-zinc-800 bg-zinc-800 text-zinc-500 hover:border-zinc-700' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300')}`}
                >
                  <div className="text-[8px] font-black uppercase tracking-widest mb-1">{t.wholesale} ({product.wholesaleMinQty}+)</div>
                  <div className="font-black text-sm">{product.priceWholesale.toLocaleString()}</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
           <button 
             onClick={onAddClick}
             className="w-full py-5 bg-yellow-400 text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 hover:bg-yellow-500"
           >
             <ShoppingCart size={18} />
             {t.addToCart}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
