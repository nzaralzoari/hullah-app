import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, Heart, Search, Menu, X, Instagram, 
  MessageCircle, Globe, User, Check, ShieldCheck, 
  Truck, ArrowRight, ChevronRight, Phone
} from "lucide-react";

// Currencies definition & conversion rates (Base: YER)
const CURRENCIES = {
  YER: { symbol: 'ر.ي', rate: 1, name: 'ريال يمني' },
  SAR: { symbol: 'ر.س', rate: 0.0015, name: 'ريال سعودي' },
  USD: { symbol: '$', rate: 0.0004, name: 'دولار أمريكي' }
};

const INITIAL_PRODUCTS = [
  { id: 1, name: "HULLAH Essential Hoodie", category: "Oversized Hoodies", priceYER: 80000, isBestSeller: true, colors: ["#0D0D0D", "#18181B"] },
  { id: 2, name: "Identity Heavyweight Tee", category: "Graphic Tees", priceYER: 38000, isNew: true, colors: ["#18181B", "#F4F4F5"] },
  { id: 3, name: "Signature Oversized Crewneck", category: "Oversized Hoodies", priceYER: 65000, colors: ["#0D0D0D"] },
  { id: 4, name: "Custom Print Tote Bag", category: "Tote Bags", priceYER: 24000, colors: ["#18181B"] },
];

export default function HullahApp() {
  const [currency, setCurrency] = useState('YER');
  const [isAdminView, setIsAdminView] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'auth', 'sizeGuide', 'shipping'
  const [formData, setFormData] = useState({ email: '', phone: '', altPhone: '', otp: '' });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [user, setUser] = useState(null);

  // Helper to format currency
  const formatPrice = (priceYER) => {
    const curr = CURRENCIES[currency];
    const amount = (priceYER * curr.rate).toLocaleString('en-US', { maximumFractionDigits: 2 });
    return `${amount} ${curr.symbol}`;
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      setIsOtpSent(true);
    } else {
      setUser({ phone: formData.phone, email: formData.email });
      setActiveModal(null);
      setIsOtpSent(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0D0D0D] text-[#F4F4F5] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Banner & Currency Selector */}
      <div className="bg-[#18181B] border-b border-white/10 text-xs py-2 px-4 flex justify-between items-center">
        <span className="text-gray-400">شحن سريع لكافة المحافظات اليمنية ودول الخليج 🚚</span>
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded border border-white/10">
            <Globe className="w-3 h-3 text-[#D4AF37]" />
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-[#D4AF37] focus:outline-none cursor-pointer font-bold"
            >
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code} className="bg-[#18181B] text-white">
                  {code} ({CURRENCIES[code].symbol})
                </option>
              ))}
            </select>
          </div>
          {/* Hidden Admin Toggle Access */}
          <button 
            onClick={() => setIsAdminView(!isAdminView)}
            className="text-gray-500 hover:text-[#D4AF37] transition-colors text-[10px]"
            title="تبديل الواجهة (لالمشرفين فقط)"
          >
            {isAdminView ? "← العودة للمتجر" : "إدارة"}
          </button>
        </div>
      </div>

      {!isAdminView ? (
        <>
          {/* Store Header */}
          <header className="sticky top-0 z-40 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="md:hidden text-white"><Menu className="w-6 h-6" /></button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tighter text-white">HULLH <span className="text-[#D4AF37]">|</span> حُـــلـــه</span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#collection" className="hover:text-[#D4AF37] transition-colors">المجموعات</a>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">عن العلامة</a>
                <button onClick={() => setActiveModal('shipping')} className="hover:text-[#D4AF37]">الشحن والتوصيل</button>
                <button onClick={() => setActiveModal('sizeGuide')} className="hover:text-[#D4AF37]">دليل المقاسات</button>
              </nav>

              {/* Header Actions */}
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveModal('auth')} className="flex items-center gap-1 text-sm hover:text-[#D4AF37]">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{user ? "حسابي" : "دخول"}</span>
                </button>
                <div className="relative cursor-pointer">
                  <ShoppingBag className="w-5 h-5 text-white hover:text-[#D4AF37]" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="relative py-24 px-4 max-w-7xl mx-auto text-center border-b border-white/5">
            <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-3 block">DROP 01 // URBAN ELEGANCE</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">ارتَدِ هَوِيَّتَكَ</h1>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
              تصاميم ستريت وير مخصصة، أقمشة ثقيلة عالية الجودة وطباعة سبلميشن دقيقة صنعت لتدوم.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#collection" className="bg-[#D4AF37] text-black px-8 py-3 rounded-md font-bold text-sm hover:bg-[#C5A059] transition-colors">
                استكشف التشكيلة
              </a>
            </div>
          </section>

          {/* Products Grid */}
          <section id="collection" className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span> المنتجات المتاحة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {INITIAL_PRODUCTS.map(product => (
                <div key={product.id} className="bg-[#18181B] border border-white/5 rounded-lg overflow-hidden group">
                  <div className="h-64 bg-black/40 flex items-center justify-center relative">
                    <span className="text-4xl font-black text-white/10 group-hover:scale-110 transition-transform">HULLH</span>
                    {product.isBestSeller && <span className="absolute top-3 right-3 bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-1 rounded">الأكثر مبيعاً</span>}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gray-400 block mb-1">{product.category}</span>
                    <h3 className="font-bold text-base mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[#D4AF37] font-bold text-lg">{formatPrice(product.priceYER)}</span>
                      <button 
                        onClick={() => setCart([...cart, product])}
                        className="bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white text-xs px-3 py-2 rounded transition-colors font-semibold"
                      >
                        إضافة للسلة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Story Section */}
          <section id="about" className="bg-[#18181B]/50 py-16 border-y border-white/5">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider block mb-2">العلامة التجارية</span>
              <h2 className="text-3xl font-black mb-6">الملابس كـتعبير عن الذات</h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                تأسست **حُـــلـــه** على فكرة واحدة — أن ما ترتديه يجب أن يعبر بصدق عن هويتك. كل هودي وتيشيرت وحقيبة مصنوعة من أقمشة ثقيلة وطباعة حرارية عالية الدقة، بلا حشو وبلا موضة سريعة.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#0D0D0D] border-t border-white/10 pt-12 pb-24 md:pb-12 text-gray-400 text-sm">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <span className="text-xl font-black text-white block mb-4">HULLH <span className="text-[#D4AF37]">|</span> حُـــلـــه</span>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">ارتَدِ هَوِيَّتَكَ. ملابس ستريت وير ثقيلة، مصنوعة لتدوم.</p>
                {/* Single Official Instagram Link */}
                <a 
                  href="https://www.instagram.com/hulllaah?igsi=M2J2YXl5eWNmYjdt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors text-xs border border-white/10 px-3 py-2 rounded"
                >
                  <Instagram className="w-4 h-4 text-[#D4AF37]" /> تابعنا على انستغرام
                </a>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">الدعم والخدمات</h4>
                <ul className="space-y-2 text-xs">
                  <li><button onClick={() => setActiveModal('shipping')} className="hover:text-white">الشحن والأرجاع</button></li>
                  <li><button onClick={() => setActiveModal('sizeGuide')} className="hover:text-white">دليل المقاسات</button></li>
                  <li><a href={`https://wa.me/967784315538?text=${encodeURIComponent("مرحباً حُـــلـــه، أريد الاستفسار عن طلب")}`} target="_blank" className="hover:text-[#D4AF37]">تتبع الطلب عبر الواتساب</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
                <p className="text-xs leading-relaxed mb-2">للاستفسارات والطلبات الخاصة عبر الواتساب:</p>
                <a 
                  href="https://wa.me/967784315538" 
                  target="_blank" 
                  className="text-[#D4AF37] font-bold text-sm dir-ltr inline-block hover:underline"
                >
                  +967 784 315 538
                </a>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 border-t border-white/5 pt-6 text-center text-xs text-gray-500">
              © 2026 HULLAH. جميع الحقوق محفوظة.
            </div>
          </footer>

          {/* Floating WhatsApp Button */}
          <a
            href={`https://wa.me/967784315538?text=${encodeURIComponent("مرحباً حُـــلـــه، لدي استفسار بشأن التشكيلة.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
            title="تحدث معنا عبر الواتساب"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
          </a>
        </>
      ) : (
        /* Isolated Admin View */
        <div className="p-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h1 className="text-2xl font-bold text-[#D4AF37]">لوحة تحكم حُـــلـــه (ADMIN)</h1>
            <button 
              onClick={() => setIsAdminView(false)}
              className="bg-white/10 px-4 py-2 rounded text-xs font-bold hover:bg-white/20"
            >
              الخروج من الإدارة
            </button>
          </div>
          <div className="bg-[#18181B] p-6 rounded-lg border border-white/5">
            <h2 className="text-lg font-bold mb-4">إدارة المنتجات والمخزون</h2>
            <p className="text-xs text-gray-400">لوحة تحكم معزولة تماماً ولا تظهر للزبائن.</p>
          </div>
        </div>
      )}

      {/* Auth Modal (Phone / Email with OTP & Extra Phone) */}
      {activeModal === 'auth' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181B] border border-white/10 rounded-lg p-6 max-w-md w-full relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 left-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            
            <h3 className="text-xl font-bold mb-4 text-[#D4AF37]">تسجيل الدخول / إنشاء حساب</h3>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isOtpSent ? (
                <>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">رقم الهاتف الأساسي (مطلوب)</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      placeholder="+967 770 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">رقم هاتف آخر (اختياري)</label>
                    <input 
                      type="tel" 
                      value={formData.altPhone}
                      onChange={e => setFormData({...formData, altPhone: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      placeholder="+967 730 000 000"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded text-sm hover:bg-[#C5A059]">
                    إرسال رمز التأكيد
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-300">تم إرسال كود التأكيد إلى هاتفك/بريدك. يرجى إدخاله لإنهاء التسجيل:</p>
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    value={formData.otp}
                    onChange={e => setFormData({...formData, otp: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-center tracking-widest text-lg text-white focus:outline-none focus:border-[#D4AF37]"
                    placeholder="123456"
                  />
                  <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded text-sm hover:bg-[#C5A059]">
                    تأكيد الحساب
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Info Modals (Size Guide & Shipping) */}
      {activeModal === 'sizeGuide' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181B] border border-white/10 rounded-lg p-6 max-w-md w-full relative text-sm">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 left-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold mb-4 text-[#D4AF37]">دليل المقاسات (Oversized Fit)</h3>
            <p className="text-gray-300 mb-4">قصاتنا مصممة بقصة واسعة ومريحة (Oversized). ننصحك باختيار مقاسك المعتاد للحصول على القصة العصرية.</p>
            <div className="border border-white/10 rounded overflow-hidden text-xs text-center">
              <div className="grid grid-cols-3 bg-black p-2 font-bold text-[#D4AF37]">
                <span>المقاس</span><span>العرض (سم)</span><span>الطول (سم)</span>
              </div>
              <div className="grid grid-cols-3 p-2 border-t border-white/5"><span>Medium</span><span>58</span><span>72</span></div>
              <div className="grid grid-cols-3 p-2 border-t border-white/5"><span>Large</span><span>61</span><span>75</span></div>
              <div className="grid grid-cols-3 p-2 border-t border-white/5"><span>X-Large</span><span>64</span><span>78</span></div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'shipping' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181B] border border-white/10 rounded-lg p-6 max-w-md w-full relative text-sm">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 left-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold mb-4 text-[#D4AF37]">الشحن والاسترجاع</h3>
            <ul className="space-y-3 text-gray-300 text-xs">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" /> التوصيل المحلي داخل صنعاء وبقية المحافظات يتم خلال 2-4 أيام عمل.
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" /> الشحن لدول الخليج متاح عبر شركات الشحن السريع.
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" /> الاستبدال مجاني في حال وجود أي خطأ في الطباعة أو المقاس.
              </li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
