import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  X,
  Menu,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Printer,
  Gem,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  ArrowUpRight,
  Check,
  CreditCard,
  LayoutDashboard,
  Store,
  Package,
  ClipboardList,
  AlertTriangle,
  Users,
  Activity,
  Trash2,
  Pencil,
  Globe,
  DollarSign,
  Boxes,
  ShoppingCart,
  BellRing,
  Clock,
  PhoneCall,
} from "lucide-react";

/* ================================================================== */
/*  BRAND TOKENS                                                       */
/* ================================================================== */
const GOLD = "#C9A24B";
const GOLD_BRIGHT = "#D4AF37";
const LOW_STOCK_THRESHOLD = 10;

/* ================================================================== */
/*  MARK / WORDMARK                                                    */
/* ================================================================== */
function HullahMark({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="120" rx="26" fill="currentColor" />
      <path
        d="M40 0V44L70 24V0H40Z M70 120V76L40 96V120H70Z M40 44L70 24V56C70 68 63 74 55 78L40 88V44Z"
        fill="#0D0D0D"
      />
    </svg>
  );
}

function HullahWordmark({ className = "h-6" }) {
  return (
    <span className={`inline-flex items-center font-black tracking-[0.18em] uppercase ${className}`}>
      HULLA
      <span className="relative inline-block">
        H
        <span
          className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 opacity-60"
          style={{ background: GOLD }}
        />
      </span>
    </span>
  );
}

/* ================================================================== */
/*  I18N                                                                */
/* ================================================================== */
const DICT = {
  en: {
    announce: "HULLAH | DROP 01 LIVE NOW — FREE SHIPPING AVAILABLE",
    nav_home: "Home",
    nav_shop: "Shop All",
    nav_hoodies: "Hoodies",
    nav_tees: "T-Shirts",
    nav_access: "Accessories",
    nav_story: "Brand Story",
    hero_eyebrow: "WEAR YOUR IDENTITY",
    hero_title1: "DROP 01",
    hero_title2: "URBAN ELEGANCE",
    hero_desc:
      "Heavyweight fabrics. Precision print work. Silhouettes built for the street and cut for permanence.",
    cta_explore: "EXPLORE THE COLLECTION",
    cta_lookbook: "VIEW LOOKBOOK",
    feat_materials: "Premium Materials",
    feat_materials_sub: "100% Heavyweight Cotton",
    feat_print: "Precision Printing",
    feat_print_sub: "Sublimation & Screen Print",
    feat_delivery: "Fast Regional Delivery",
    feat_delivery_sub: "Tracked, 2–5 Day Dispatch",
    feat_secure: "Secure Payment",
    feat_secure_sub: "Encrypted Checkout & Support",
    shop_eyebrow: "THE COLLECTION",
    shop_title: "Shop Drop 01",
    add_to_cart: "ADD TO CART",
    quick_view: "QUICK VIEW",
    color: "COLOR",
    size: "SIZE",
    size_guide: "Size Guide",
    qty: "QTY",
    story_eyebrow: "THE BRAND",
    story_title: "Clothing as a Statement of Self",
    story_p1:
      "HULLAH was built on a single idea — that what you wear should say something true about who you are. Every hoodie, tee, and tote is engineered from heavyweight fabrics and finished with precision print work.",
    story_p2:
      "No filler pieces. No fast fashion cycles. Just considered silhouettes designed for people who treat getting dressed as an act of identity.",
    story_cta: "READ OUR FULL STORY",
    footer_tag: "Wear your identity. Heavyweight streetwear, cut for permanence.",
    footer_shop: "SHOP",
    footer_support: "SUPPORT",
    footer_shipping: "Shipping & Returns",
    footer_sizeguide: "Size Guide",
    footer_track: "Track Order",
    footer_contact: "Contact Us",
    footer_join: "JOIN THE INNER CIRCLE",
    footer_join_sub: "Early drop access, restocks, and members-only pricing.",
    footer_email_ph: "Email address",
    footer_join_btn: "JOIN",
    cart_title: "YOUR BAG",
    cart_empty: "Your bag is empty.",
    cart_continue: "CONTINUE SHOPPING",
    cart_subtotal: "Subtotal",
    cart_shipping: "Shipping",
    cart_free: "FREE",
    cart_total: "TOTAL",
    cart_checkout: "PROCEED TO CHECKOUT",
    promo_ph: "Promo code (try IDENTITY10)",
    promo_apply: "APPLY",
    checkout_title: "CHECKOUT",
    checkout_name: "Full Name",
    checkout_phone: "Phone Number",
    checkout_address: "Delivery Address",
    checkout_payment: "Payment Method",
    pay_cod: "Cash on Delivery",
    pay_card: "Credit / Debit Card",
    pay_wallet: "Digital Wallet",
    checkout_submit: "PLACE ORDER",
    checkout_back: "Back to bag",
    mode_store: "Customer Store",
    mode_admin: "Admin Dashboard",
    viewing_as: "Viewing as",
  },
  ar: {
    announce: "هُلّة | الإطلاق 01 متاح الآن — شحن مجاني",
    nav_home: "الرئيسية",
    nav_shop: "كل المنتجات",
    nav_hoodies: "هوديز",
    nav_tees: "تيشيرتات",
    nav_access: "إكسسوارات",
    nav_story: "قصة العلامة",
    hero_eyebrow: "ارتدِ هويتك",
    hero_title1: "الإطلاق 01",
    hero_title2: "أناقة حضرية",
    hero_desc: "أقمشة ثقيلة الوزن. طباعة عالية الدقة. تصاميم صُممت للشارع وصُنعت لتدوم.",
    cta_explore: "استكشف المجموعة",
    cta_lookbook: "عرض الكتالوج",
    feat_materials: "خامات فاخرة",
    feat_materials_sub: "قطن ثقيل 100%",
    feat_print: "طباعة دقيقة",
    feat_print_sub: "تسامي وطباعة شاشة حريرية",
    feat_delivery: "توصيل سريع",
    feat_delivery_sub: "شحن متتبَّع خلال 2-5 أيام",
    feat_secure: "دفع آمن",
    feat_secure_sub: "دفع مشفّر ودعم متكامل",
    shop_eyebrow: "المجموعة",
    shop_title: "تسوّق الإطلاق 01",
    add_to_cart: "أضف إلى السلة",
    quick_view: "عرض سريع",
    color: "اللون",
    size: "المقاس",
    size_guide: "دليل المقاسات",
    qty: "الكمية",
    story_eyebrow: "العلامة التجارية",
    story_title: "الملابس كتعبير عن الذات",
    story_p1:
      "تأسست هُلّة على فكرة واحدة — أن ما ترتديه يجب أن يعبّر بصدق عن هويتك. كل هودي وتيشيرت وحقيبة مصنوعة من أقمشة ثقيلة وطباعة عالية الدقة.",
    story_p2: "بلا قطع حشو، وبلا موضة سريعة. فقط تصاميم مدروسة لمن يعتبرون الملابس بيانًا للهوية.",
    story_cta: "اقرأ قصتنا كاملة",
    footer_tag: "ارتدِ هويتك. ملابس ستريت ثقيلة، مصنوعة لتدوم.",
    footer_shop: "المتجر",
    footer_support: "الدعم",
    footer_shipping: "الشحن والإرجاع",
    footer_sizeguide: "دليل المقاسات",
    footer_track: "تتبع الطلب",
    footer_contact: "تواصل معنا",
    footer_join: "انضم للدائرة الداخلية",
    footer_join_sub: "وصول مبكر للإطلاقات، وإعادة التوفير، وأسعار خاصة بالأعضاء.",
    footer_email_ph: "البريد الإلكتروني",
    footer_join_btn: "انضم",
    cart_title: "سلتك",
    cart_empty: "سلتك فارغة.",
    cart_continue: "متابعة التسوق",
    cart_subtotal: "المجموع الفرعي",
    cart_shipping: "الشحن",
    cart_free: "مجاني",
    cart_total: "الإجمالي",
    cart_checkout: "إتمام الشراء",
    promo_ph: "كود الخصم (جرّب IDENTITY10)",
    promo_apply: "تطبيق",
    checkout_title: "إتمام الطلب",
    checkout_name: "الاسم الكامل",
    checkout_phone: "رقم الهاتف",
    checkout_address: "عنوان التوصيل",
    checkout_payment: "طريقة الدفع",
    pay_cod: "الدفع عند الاستلام",
    pay_card: "بطاقة ائتمان / خصم",
    pay_wallet: "محفظة رقمية",
    checkout_submit: "تأكيد الطلب",
    checkout_back: "الرجوع للسلة",
    mode_store: "متجر العملاء",
    mode_admin: "لوحة الإدارة",
    viewing_as: "أنت تشاهد",
  },
};

const CATEGORY_LABELS = {
  All: { en: "All", ar: "الكل" },
  "Oversized Hoodies": { en: "Oversized Hoodies", ar: "هوديز واسع" },
  "Graphic Tees": { en: "Graphic Tees", ar: "تيشيرتات مطبوعة" },
  "Tote Bags": { en: "Tote Bags", ar: "حقائب توت" },
};

/* ================================================================== */
/*  MOCK CATALOG                                                       */
/* ================================================================== */
const SWATCHES = {
  onyx: { label: "Onyx Black", hex: "#111113" },
  bone: { label: "Bone White", hex: "#EDEAE2" },
  gold: { label: "Matte Gold", hex: "#C9A24B" },
  slate: { label: "Slate Grey", hex: "#4B4B52" },
  clay: { label: "Washed Clay", hex: "#8A6E5A" },
};

const INITIAL_PRODUCTS = [
  { id: "p1", name: "HULLAH Essential Hoodie", category: "Oversized Hoodies", price: 128, stock: 34, gradA: "from-[#1c1c1f] via-[#0d0d0d] to-[#050505]", gradB: "from-[#242019] via-[#141210] to-[#050505]", colors: ["onyx", "bone", "slate"], gsm: "400 GSM Heavyweight Fleece", print: "High-Density Sublimation Print", tag: "BESTSELLER", imageUrl: "" },
  { id: "p2", name: "Identity Heavyweight Tee", category: "Graphic Tees", price: 68, stock: 51, gradA: "from-[#232323] via-[#101010] to-[#050505]", gradB: "from-[#2a231a] via-[#141110] to-[#050505]", colors: ["onyx", "bone", "gold"], gsm: "260 GSM Combed Cotton", print: "Screen Printed Graphic", tag: "NEW", imageUrl: "" },
  { id: "p3", name: "Signature Oversized Crewneck", category: "Oversized Hoodies", price: 112, stock: 8, gradA: "from-[#1a1a1c] via-[#0c0c0c] to-[#050505]", gradB: "from-[#20201f] via-[#121210] to-[#050505]", colors: ["slate", "onyx"], gsm: "380 GSM French Terry", print: "Embroidered Wordmark", tag: null, imageUrl: "" },
  { id: "p4", name: "Custom Print Tote", category: "Tote Bags", price: 42, stock: 60, gradA: "from-[#201d18] via-[#12100d] to-[#050505]", gradB: "from-[#1c1c1e] via-[#0d0d0d] to-[#050505]", colors: ["clay", "onyx"], gsm: "16oz Canvas Duck", print: "Sublimated Identity Motif", tag: null, imageUrl: "" },
  { id: "p5", name: "Vantage Pullover Hoodie", category: "Oversized Hoodies", price: 134, stock: 5, gradA: "from-[#1e1e21] via-[#0e0e0e] to-[#050505]", gradB: "from-[#211c16] via-[#131009] to-[#050505]", colors: ["onyx", "gold", "bone"], gsm: "420 GSM Brushed Fleece", print: "Tonal Puff Print", tag: "LIMITED", imageUrl: "" },
  { id: "p6", name: "Wear Your Identity Tee", category: "Graphic Tees", price: 72, stock: 40, gradA: "from-[#1c1c1e] via-[#0d0d0d] to-[#050505]", gradB: "from-[#232120] via-[#131211] to-[#050505]", colors: ["bone", "onyx"], gsm: "260 GSM Combed Cotton", print: "High-Density Sublimation Print", tag: null, imageUrl: "" },
  { id: "p7", name: "Nightframe Zip Hoodie", category: "Oversized Hoodies", price: 148, stock: 3, gradA: "from-[#19191b] via-[#0b0b0b] to-[#050505]", gradB: "from-[#1e1a17] via-[#100d0a] to-[#050505]", colors: ["onyx", "slate"], gsm: "400 GSM Heavyweight Fleece", print: "Reflective Print Detail", tag: null, imageUrl: "" },
  { id: "p8", name: "Everyday Carry Tote", category: "Tote Bags", price: 38, stock: 22, gradA: "from-[#1d1b17] via-[#100e0b] to-[#050505]", gradB: "from-[#1a1a1c] via-[#0c0c0c] to-[#050505]", colors: ["onyx", "clay", "bone"], gsm: "16oz Canvas Duck", print: "Screen Printed Wordmark", tag: "NEW", imageUrl: "" },
];

const CATEGORIES = ["All", "Oversized Hoodies", "Graphic Tees", "Tote Bags"];
const SIZES = ["S", "M", "L", "XL", "XXL"];
const ORDER_STATUSES = ["New", "Processing", "Shipped", "Delivered", "Cancelled"];
const currency = (n) => `$${Number(n).toFixed(2)}`;

/* ================================================================== */
/*  SHARED STORE CONTEXT                                                */
/*  Single source of truth used by both the Customer Storefront and    */
/*  the Admin Dashboard so every action reflects instantly in both.    */
/* ================================================================== */
const StoreContext = createContext(null);
const useStore = () => useContext(StoreContext);

function StoreProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState("store"); // "store" | "admin"

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]); // {id, size, qty}
  const [wishlist, setWishlist] = useState(new Set());

  const [orders, setOrders] = useState([]); // {id, customer, items, total, status, createdAt}
  const [abandonedCarts, setAbandonedCarts] = useState([]); // {id, items, lastActive, sessionId}
  const [activityLog, setActivityLog] = useState([]); // {id, message, time, kind}

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  };

  const t = (key) => DICT[lang][key] ?? key;
  const catLabel = (cat) => CATEGORY_LABELS[cat]?.[lang] ?? cat;

  const logActivity = (message, kind = "info") => {
    setActivityLog((prev) => [
      { id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, message, time: new Date(), kind },
      ...prev,
    ].slice(0, 60));
  };

  /* ---------------- CART ---------------- */
  const sessionAbandonedRef = useRef(false);
  const abandonTimerRef = useRef(null);

  const resetAbandonTimer = () => {
    window.clearTimeout(abandonTimerRef.current);
    if (cart.length === 0) return;
    abandonTimerRef.current = window.setTimeout(() => {
      if (!sessionAbandonedRef.current && cart.length > 0) {
        sessionAbandonedRef.current = true;
        setAbandonedCarts((prev) => [
          {
            id: `ac-${Date.now()}`,
            items: cart.map((i) => ({ ...i })),
            lastActive: new Date(),
          },
          ...prev,
        ]);
        logActivity("Cart abandoned before checkout completed", "cart");
      }
    }, 25000); // 25s of inactivity simulates an abandoned session
  };

  useEffect(() => {
    resetAbandonTimer();
    if (cart.length > 0) sessionAbandonedRef.current = false;
    return () => window.clearTimeout(abandonTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const addToCart = (product, size = "M", qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.size === size);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { id: product.id, size, qty }];
    });
  };

  const updateCartQty = (id, size, delta) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.max(0, i.qty + delta) } : i)).filter((i) => i.qty > 0)
    );
  };

  const removeCartItem = (id, size) => setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));

  const toggleWishlist = (id) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const cartDetailed = cart.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((i) => i.product);
  const cartSubtotal = cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  /* ---------------- ORDERS / CHECKOUT ---------------- */
  const placeOrder = (customer) => {
    const items = cartDetailed.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      size: i.size,
      qty: i.qty,
      price: i.product.price,
    }));
    const total = cartSubtotal;
    const order = {
      id: `HUL-${1000 + orders.length + 1}`,
      customer,
      items,
      total,
      status: "New",
      createdAt: new Date(),
    };

    // decrement stock
    setProducts((prev) =>
      prev.map((p) => {
        const soldQty = items.filter((i) => i.id === p.id).reduce((s, i) => s + i.qty, 0);
        return soldQty > 0 ? { ...p, stock: Math.max(0, p.stock - soldQty) } : p;
      })
    );

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    sessionAbandonedRef.current = true; // this session is now converted, not abandoned
    logActivity(`New order ${order.id} placed by ${customer.name} — ${currency(total)}`, "order");
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    logActivity(`Order ${orderId} marked as ${status}`, "order");
  };

  const removeAbandonedCart = (id) => setAbandonedCarts((prev) => prev.filter((c) => c.id !== id));

  /* ---------------- INVENTORY ---------------- */
  const addProduct = (product) => {
    const id = `p-${Date.now()}`;
    setProducts((prev) => [
      {
        id,
        colors: ["onyx"],
        gradA: "from-[#1c1c1f] via-[#0d0d0d] to-[#050505]",
        gradB: "from-[#242019] via-[#141210] to-[#050505]",
        tag: "NEW",
        gsm: "—",
        print: "—",
        imageUrl: "",
        ...product,
      },
      ...prev,
    ]);
    logActivity(`Product added: ${product.name}`, "stock");
  };

  const updateProduct = (id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteProduct = (id) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    if (p) logActivity(`Product removed: ${p.name}`, "stock");
  };

  const adjustStock = (id, delta) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)));
    const p = products.find((x) => x.id === id);
    if (p) logActivity(`Stock adjusted for ${p.name}: ${delta > 0 ? "+" : ""}${delta}`, "stock");
  };

  const value = {
    lang, setLang, t, catLabel,
    mode, setMode,
    products, addProduct, updateProduct, deleteProduct, adjustStock,
    cart, cartDetailed, cartSubtotal, cartCount,
    addToCart, updateCartQty, removeCartItem,
    wishlist, toggleWishlist,
    orders, placeOrder, updateOrderStatus,
    abandonedCarts, removeAbandonedCart,
    activityLog, logActivity,
    toast, showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

/* ================================================================== */
/*  PRODUCT VISUAL                                                     */
/* ================================================================== */
function ProductVisual({ product, className = "" }) {
  const [hover, setHover] = useState(false);
  if (product.imageUrl) {
    return (
      <div className={`relative overflow-hidden rounded-sm bg-neutral-900 ${className}`}>
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        {product.tag && (
          <div className="absolute right-2 top-2 rounded-sm px-2 py-1 text-[10px] font-bold tracking-widest text-black" style={{ background: GOLD_BRIGHT }}>
            {product.tag}
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden rounded-sm ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradA} transition-opacity duration-500 ${hover ? "opacity-0" : "opacity-100"}`} />
      <div className={`absolute inset-0 bg-gradient-to-tl ${product.gradB} transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`} />
      <svg viewBox="0 0 200 240" className={`absolute inset-0 h-full w-full p-8 transition-transform duration-700 ${hover ? "scale-105 -rotate-1" : "scale-100 rotate-0"}`} style={{ opacity: 0.5 }}>
        <path d="M60 40 L80 20 L120 20 L140 40 L170 55 L160 90 L140 80 L140 210 L60 210 L60 80 L40 90 L30 55 Z" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>
      {product.tag && (
        <div className="absolute right-2 top-2 rounded-sm px-2 py-1 text-[10px] font-bold tracking-widest text-black" style={{ background: GOLD_BRIGHT }}>
          {product.tag}
        </div>
      )}
      {product.stock <= LOW_STOCK_THRESHOLD && (
        <div className="absolute left-2 top-2 rounded-sm bg-red-600/90 px-2 py-1 text-[9px] font-bold tracking-widest text-white">
          LOW STOCK
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  MODE SWITCHER — floating bar                                       */
/* ================================================================== */
function ModeSwitcher() {
  const { mode, setMode, t, orders, cartCount } = useStore();
  return (
    <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-neutral-800 bg-black/90 p-1.5 shadow-2xl backdrop-blur-md">
        <span className="hidden px-3 text-[10px] font-bold tracking-widest text-neutral-500 sm:inline">
          {t("viewing_as")}:
        </span>
        <button
          onClick={() => setMode("store")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold tracking-wide transition-colors ${
            mode === "store" ? "text-black" : "text-neutral-400 hover:text-white"
          }`}
          style={mode === "store" ? { background: GOLD_BRIGHT } : {}}
        >
          <Store className="h-3.5 w-3.5" />
          {t("mode_store")}
          {cartCount > 0 && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/20 text-[9px]">{cartCount}</span>
          )}
        </button>
        <button
          onClick={() => setMode("admin")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold tracking-wide transition-colors ${
            mode === "admin" ? "text-black" : "text-neutral-400 hover:text-white"
          }`}
          style={mode === "admin" ? { background: GOLD_BRIGHT } : {}}
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          {t("mode_admin")}
          {orders.filter((o) => o.status === "New").length > 0 && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] text-white">
              {orders.filter((o) => o.status === "New").length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  CUSTOMER STOREFRONT                                                 */
/* ================================================================== */
function CustomerStorefront() {
  const {
    lang, setLang, t, catLabel,
    products, cart, cartDetailed, cartSubtotal, cartCount,
    addToCart, updateCartQty, removeCartItem,
    wishlist, toggleWishlist,
    placeOrder, toast, showToast,
  } = useStore();

  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isRTL = lang === "ar";

  const filtered = useMemo(
    () => (category === "All" ? products : products.filter((p) => p.category === category)),
    [category, products]
  );
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [searchTerm, products]);

  const discount = promoApplied ? cartSubtotal * 0.1 : 0;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "IDENTITY10") {
      setPromoApplied(true);
      showToast(isRTL ? "تم تطبيق الكود — خصم 10%" : "Promo code applied — 10% off");
    } else {
      showToast(isRTL ? "كود غير صالح" : "Invalid promo code");
    }
  };

  const handleAddToCart = (product, size, qty) => {
    addToCart(product, size, qty);
    showToast(isRTL ? `تمت الإضافة: ${product.name}` : `Added ${product.name} (${size}) to bag`);
    setCartOpen(true);
  };

  const navItems = [
    { key: "nav_home", cat: null },
    { key: "nav_shop", cat: "All" },
    { key: "nav_hoodies", cat: "Oversized Hoodies" },
    { key: "nav_tees", cat: "Graphic Tees" },
    { key: "nav_access", cat: "Tote Bags" },
    { key: "nav_story", cat: null },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen w-full bg-[#0D0D0D] pb-24 text-white antialiased selection:bg-[#C9A24B]/30">
      {/* ANNOUNCEMENT BAR */}
      <div className="w-full border-b border-neutral-900 bg-black py-2 text-center text-[11px] font-semibold tracking-[0.1em] text-neutral-300">
        {t("announce")}
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-neutral-900/80 bg-[#0D0D0D]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2 text-white">
              <HullahMark className="h-8 w-7" />
              <HullahWordmark className="text-lg" />
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-semibold tracking-[0.12em] text-neutral-300 lg:flex">
            {navItems.map(({ key, cat }) => (
              <a
                key={key}
                href="#"
                className="relative py-1 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#D4AF37] after:transition-all hover:after:w-full"
                onClick={(e) => {
                  e.preventDefault();
                  if (cat) setCategory(cat);
                  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1 rounded-sm border border-neutral-800 px-2 py-1 text-[10px] font-bold tracking-widest text-neutral-300 hover:border-neutral-600"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" /> {lang === "en" ? "AR" : "EN"}
            </button>
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-[#D4AF37]">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Wishlist" className="relative hover:text-[#D4AF37]">
              <Heart className="h-5 w-5" />
              {wishlist.size > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-black">
                  {wishlist.size}
                </span>
              )}
            </button>
            <button aria-label="Cart" className="relative hover:text-[#D4AF37]" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileNavOpen(false)} />
          <div className={`relative flex h-full w-72 flex-col bg-[#111113] p-6 ${isRTL ? "mr-auto" : "ml-auto"}`}>
            <button className="mb-8 self-end" onClick={() => setMobileNavOpen(false)}>
              <X className="h-6 w-6" />
            </button>
            <div className="mb-8 flex items-center gap-2">
              <HullahMark className="h-8 w-7" />
              <HullahWordmark className="text-base" />
            </div>
            <div className="flex flex-col gap-5 text-sm font-semibold tracking-widest text-neutral-300">
              {navItems.map(({ key, cat }) => (
                <a
                  key={key}
                  href="#"
                  className="hover:text-[#D4AF37]"
                  onClick={(e) => {
                    e.preventDefault();
                    if (cat) setCategory(cat);
                    setMobileNavOpen(false);
                    setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50);
                  }}
                >
                  {t(key)}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-24 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-sm border border-neutral-800 bg-[#111113] p-5">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <Search className="h-5 w-5 text-neutral-500" />
              <input
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isRTL ? "ابحث عن هوديز، تيشيرتات..." : "Search hoodies, tees, totes..."}
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
              />
              <button onClick={() => { setSearchOpen(false); setSearchTerm(""); }}>
                <X className="h-5 w-5 text-neutral-500 hover:text-white" />
              </button>
            </div>
            <div className="mt-4 max-h-80 space-y-1 overflow-y-auto">
              {searchResults.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setQuickView(p); setSearchOpen(false); setSearchTerm(""); }}
                  className="flex w-full items-center gap-3 rounded-sm p-2 text-left hover:bg-white/5"
                >
                  <ProductVisual product={p} className="h-12 w-12 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-neutral-500">{catLabel(p.category)} · {currency(p.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,75,0.10),transparent_55%)]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.3em]" style={{ color: GOLD_BRIGHT }}>
              <span className="h-px w-8" style={{ background: GOLD_BRIGHT }} />
              {t("hero_eyebrow")}
            </p>
            <h1 className="text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero_title1")}
              <br />
              <span className="text-neutral-500">// </span>{t("hero_title2")}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-400">{t("hero_desc")}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2 rounded-sm px-7 py-3.5 text-xs font-bold tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
                style={{ background: GOLD_BRIGHT }}
              >
                {t("cta_explore")}
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
              </button>
              <button className="flex items-center gap-2 rounded-sm border border-neutral-700 px-7 py-3.5 text-xs font-bold tracking-[0.15em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]">
                {t("cta_lookbook")}
              </button>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[#1c1c1f] via-[#0d0d0d] to-black" />
            <div className="absolute inset-0 flex items-center justify-center">
              <HullahMark className="h-40 w-32 text-white/10" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-sm border border-neutral-800 bg-black/60 px-4 py-3 backdrop-blur">
              <div>
                <p className="text-xs font-bold tracking-widest">ESSENTIAL HOODIE</p>
                <p className="text-[11px] text-neutral-500">Onyx Black</p>
              </div>
              <p className="text-sm font-bold" style={{ color: GOLD_BRIGHT }}>$128</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE BAR */}
      <section className="border-b border-neutral-900 bg-[#111113]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 sm:grid-cols-4 lg:px-8">
          {[
            { icon: Gem, t: "feat_materials", s: "feat_materials_sub" },
            { icon: Printer, t: "feat_print", s: "feat_print_sub" },
            { icon: Truck, t: "feat_delivery", s: "feat_delivery_sub" },
            { icon: ShieldCheck, t: "feat_secure", s: "feat_secure_sub" },
          ].map(({ icon: Icon, t: tk, s }) => (
            <div key={tk} className="flex flex-col items-start gap-2">
              <Icon className="h-5 w-5" style={{ color: GOLD_BRIGHT }} />
              <p className="text-xs font-bold tracking-wide">{t(tk)}</p>
              <p className="text-[11px] text-neutral-500">{t(s)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section id="shop" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-neutral-500">{t("shop_eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">{t("shop_title")}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-sm border px-4 py-2 text-[11px] font-bold tracking-widest transition-colors ${
                  category === c ? "border-[#D4AF37] bg-[#D4AF37] text-black" : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {catLabel(c).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.id} className="group relative flex flex-col overflow-hidden rounded-sm border border-neutral-900 bg-[#111113] transition-colors hover:border-neutral-700">
              <div className="relative">
                <ProductVisual product={p} className="aspect-[4/5] w-full" />
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur transition-colors hover:bg-black"
                >
                  <Heart className="h-4 w-4" fill={wishlist.has(p.id) ? GOLD_BRIGHT : "none"} stroke={wishlist.has(p.id) ? GOLD_BRIGHT : "white"} />
                </button>
                <button
                  onClick={() => setQuickView(p)}
                  className="absolute inset-x-3 bottom-3 z-10 translate-y-14 rounded-sm border border-white/20 bg-black/70 py-2 text-[10px] font-bold tracking-widest opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {t("quick_view")}
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-[10px] font-semibold tracking-widest text-neutral-500">{catLabel(p.category).toUpperCase()}</p>
                <h3 className="text-sm font-bold leading-snug">{p.name}</h3>
                <div className="flex items-center gap-1.5">
                  {p.colors.map((c) => (
                    <span key={c} title={SWATCHES[c].label} className="h-3.5 w-3.5 rounded-full border border-neutral-700" style={{ backgroundColor: SWATCHES[c].hex }} />
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <p className="text-sm font-bold" style={{ color: GOLD_BRIGHT }}>{currency(p.price)}</p>
                  <button
                    disabled={p.stock <= 0}
                    onClick={() => handleAddToCart(p, "M", 1)}
                    className="rounded-sm border border-neutral-700 px-3 py-1.5 text-[10px] font-bold tracking-widest transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {p.stock <= 0 ? (isRTL ? "نفدت الكمية" : "OUT OF STOCK") : t("add_to_cart")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="border-y border-neutral-900 bg-[#111113]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[#1a1a1c] to-black" />
            <div className="absolute inset-0 flex items-center justify-center">
              <HullahMark className="h-52 w-40 text-white/[0.06]" />
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.3em]" style={{ color: GOLD_BRIGHT }}>{t("story_eyebrow")}</p>
            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">{t("story_title")}</h2>
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">{t("story_p1")}</p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">{t("story_p2")}</p>
            <button className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest text-white hover:text-[#D4AF37]">
              {t("story_cta")} <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-10 border-b border-neutral-900 pb-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <HullahMark className="h-8 w-7" />
                <HullahWordmark className="text-base" />
              </div>
              <p className="text-xs leading-relaxed text-neutral-500">{t("footer_tag")}</p>
              <div className="mt-5 flex items-center gap-4 text-neutral-500">
                <a href="#" className="hover:text-[#D4AF37]"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-[#D4AF37]"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="hover:text-[#D4AF37]"><Facebook className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold tracking-widest">{t("footer_shop")}</p>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <button className="hover:text-white" onClick={() => { setCategory(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>
                      {catLabel(c)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold tracking-widest">{t("footer_support")}</p>
              <ul className="space-y-2.5 text-xs text-neutral-500">
                <li><a href="#" className="hover:text-white">{t("footer_shipping")}</a></li>
                <li><a href="#" className="hover:text-white">{t("footer_sizeguide")}</a></li>
                <li><a href="#" className="hover:text-white">{t("footer_track")}</a></li>
                <li><a href="#" className="hover:text-white">{t("footer_contact")}</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-bold tracking-widest">{t("footer_join")}</p>
              <p className="mb-3 text-xs text-neutral-500">{t("footer_join_sub")}</p>
              <form
                onSubmit={(e) => { e.preventDefault(); showToast(isRTL ? "تم تسجيلك بنجاح" : "You're on the list"); e.currentTarget.reset(); }}
                className="flex overflow-hidden rounded-sm border border-neutral-800"
              >
                <input type="email" required placeholder={t("footer_email_ph")} className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-neutral-600 outline-none" />
                <button type="submit" className="shrink-0 px-4 text-xs font-bold text-black" style={{ background: GOLD_BRIGHT }}>{t("footer_join_btn")}</button>
              </form>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
            <p className="text-[11px] text-neutral-600">© {new Date().getFullYear()} HULLAH. All rights reserved.</p>
            <div className="flex items-center gap-3 text-neutral-600">
              <CreditCard className="h-5 w-5" />
              <span className="text-[11px] tracking-wide">VISA · MASTERCARD · AMEX · PAYPAL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onAddToCart={handleAddToCart}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
        />
      )}

      {/* SIZE GUIDE */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-md rounded-sm border border-neutral-800 bg-[#111113] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-widest">{t("size_guide").toUpperCase()}</h3>
              <button onClick={() => setSizeGuideOpen(false)}><X className="h-5 w-5 text-neutral-500 hover:text-white" /></button>
            </div>
            <table className="w-full text-left text-xs text-neutral-400">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500">
                  <th className="py-2">SIZE</th><th className="py-2">CHEST (IN)</th><th className="py-2">LENGTH (IN)</th>
                </tr>
              </thead>
              <tbody>
                {[["S", "38–40", "27"], ["M", "41–43", "28"], ["L", "44–46", "29"], ["XL", "47–49", "30"], ["XXL", "50–52", "31"]].map(([s, c, l]) => (
                  <tr key={s} className="border-b border-neutral-900">
                    <td className="py-2 font-semibold text-white">{s}</td><td className="py-2">{c}</td><td className="py-2">{l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setCartOpen(false)} />
          <div className={`relative flex h-full w-full max-w-md flex-col bg-[#111113] shadow-2xl ${isRTL ? "mr-auto" : "ml-auto"}`}>
            <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-5">
              <h3 className="flex items-center gap-2 text-sm font-bold tracking-widest">
                <ShoppingBag className="h-4 w-4" /> {t("cart_title")} ({cartCount})
              </h3>
              <button onClick={() => setCartOpen(false)}><X className="h-5 w-5 text-neutral-500 hover:text-white" /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cartDetailed.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="h-10 w-10 text-neutral-700" />
                  <p className="text-sm text-neutral-500">{t("cart_empty")}</p>
                  <button onClick={() => setCartOpen(false)} className="mt-2 rounded-sm border border-neutral-700 px-4 py-2 text-[11px] font-bold tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37]">
                    {t("cart_continue")}
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartDetailed.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <ProductVisual product={item.product} className="h-20 w-16 shrink-0" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold leading-snug">{item.product.name}</p>
                            <p className="text-[11px] text-neutral-500">{t("size")} {item.size}</p>
                          </div>
                          <button onClick={() => removeCartItem(item.id, item.size)}><X className="h-4 w-4 text-neutral-600 hover:text-white" /></button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 rounded-sm border border-neutral-800">
                            <button className="p-1.5 hover:text-[#D4AF37]" onClick={() => updateCartQty(item.id, item.size, -1)}><Minus className="h-3 w-3" /></button>
                            <span className="w-4 text-center text-xs">{item.qty}</span>
                            <button className="p-1.5 hover:text-[#D4AF37]" onClick={() => updateCartQty(item.id, item.size, 1)}><Plus className="h-3 w-3" /></button>
                          </div>
                          <p className="text-xs font-bold" style={{ color: GOLD_BRIGHT }}>{currency(item.product.price * item.qty)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartDetailed.length > 0 && (
              <div className="border-t border-neutral-800 px-6 py-5">
                <div className="mb-4 flex gap-2">
                  <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder={t("promo_ph")} className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-600" />
                  <button onClick={applyPromo} className="shrink-0 rounded-sm border border-neutral-700 px-3 text-[11px] font-bold tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37]">{t("promo_apply")}</button>
                </div>
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div className="flex justify-between"><span>{t("cart_subtotal")}</span><span className="text-white">{currency(cartSubtotal)}</span></div>
                  {promoApplied && (
                    <div className="flex justify-between" style={{ color: GOLD_BRIGHT }}>
                      <span className="flex items-center gap-1"><Check className="h-3 w-3" /> IDENTITY10</span><span>-{currency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-500"><span>{t("cart_shipping")}</span><span>{t("cart_free")}</span></div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3">
                  <span className="text-sm font-bold tracking-widest">{t("cart_total")}</span>
                  <span className="text-lg font-black" style={{ color: GOLD_BRIGHT }}>{currency(cartSubtotal - discount)}</span>
                </div>
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="mt-5 w-full rounded-sm py-3.5 text-xs font-bold tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
                  style={{ background: GOLD_BRIGHT }}
                >
                  {t("cart_checkout")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <CheckoutModal
          isRTL={isRTL}
          total={cartSubtotal - discount}
          onBack={() => setCheckoutOpen(false)}
          onSubmit={(customer) => {
            const order = placeOrder(customer);
            setCheckoutOpen(false);
            setCartOpen(false);
            setPromo("");
            setPromoApplied(false);
            showToast(isRTL ? `تم استلام طلبك رقم ${order.id}` : `Order ${order.id} placed successfully`);
          }}
        />
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 rounded-sm border border-neutral-700 bg-black px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  QUICK VIEW MODAL                                                    */
/* ------------------------------------------------------------------ */
function QuickViewModal({ product, onClose, onAddToCart, onOpenSizeGuide }) {
  const { t, catLabel, wishlist, toggleWishlist } = useStore();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors[0]);

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-sm border border-neutral-800 bg-[#111113] sm:grid-cols-2">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-1.5 hover:bg-black"><X className="h-5 w-5" /></button>
        <ProductVisual product={product} className="h-64 w-full sm:h-full" />
        <div className="flex flex-col p-6">
          <p className="text-[10px] font-bold tracking-widest text-neutral-500">{catLabel(product.category).toUpperCase()}</p>
          <h3 className="mt-1 text-lg font-black uppercase tracking-tight">{product.name}</h3>
          <p className="mt-2 text-lg font-bold" style={{ color: GOLD_BRIGHT }}>{currency(product.price)}</p>

          <div className="mt-5">
            <p className="mb-2 text-[11px] font-bold tracking-widest text-neutral-400">{t("color")} — {SWATCHES[color].label}</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)} className="h-7 w-7 rounded-full border-2 transition-transform hover:scale-110" style={{ backgroundColor: SWATCHES[c].hex, borderColor: color === c ? GOLD_BRIGHT : "transparent" }} />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-bold tracking-widest text-neutral-400">{t("size")}</p>
              <button onClick={onOpenSizeGuide} className="text-[11px] font-semibold underline decoration-neutral-600 underline-offset-2 hover:text-[#D4AF37]">{t("size_guide")}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`h-9 w-11 rounded-sm border text-xs font-bold transition-colors ${size === s ? "border-[#D4AF37] bg-[#D4AF37] text-black" : "border-neutral-700 text-neutral-300 hover:border-neutral-500"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-sm border border-neutral-800 p-3 text-xs text-neutral-400">
            <Printer className="h-4 w-4 shrink-0" style={{ color: GOLD_BRIGHT }} />
            <span>{product.gsm} · {product.print}</span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-sm border border-neutral-700 px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="hover:text-[#D4AF37]"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-4 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="hover:text-[#D4AF37]"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <button
              onClick={() => { onAddToCart(product, size, qty); onClose(); }}
              className="flex-1 rounded-sm py-3 text-xs font-bold tracking-widest text-black transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD_BRIGHT }}
            >
              {t("add_to_cart")}
            </button>
            <button onClick={() => toggleWishlist(product.id)}>
              <Heart className="h-6 w-6" fill={wishlist.has(product.id) ? GOLD_BRIGHT : "none"} stroke={wishlist.has(product.id) ? GOLD_BRIGHT : "white"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CHECKOUT MODAL — collects customer info, then places the order     */
/* ------------------------------------------------------------------ */
function CheckoutModal({ isRTL, total, onBack, onSubmit }) {
  const { t } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError(isRTL ? "الرجاء تعبئة جميع الحقول" : "Please fill in all fields");
      return;
    }
    onSubmit({ name: name.trim(), phone: phone.trim(), address: address.trim(), payment });
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/85 px-4">
      <div className="w-full max-w-md rounded-sm border border-neutral-800 bg-[#111113] p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-widest">{t("checkout_title")}</h3>
          <button onClick={onBack}><X className="h-5 w-5 text-neutral-500 hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">{t("checkout_name")}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">{t("checkout_phone")}</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">{t("checkout_address")}</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} className="w-full resize-none rounded-sm border border-neutral-800 bg-transparent px-3 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">{t("checkout_payment")}</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: "cod", label: t("pay_cod") },
                { id: "card", label: t("pay_card") },
                { id: "wallet", label: t("pay_wallet") },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`flex items-center justify-between rounded-sm border px-3 py-2.5 text-xs font-semibold transition-colors ${
                    payment === opt.id ? "border-[#D4AF37] text-[#D4AF37]" : "border-neutral-800 text-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  {opt.label}
                  {payment === opt.id && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
            <span className="text-xs font-bold tracking-widest text-neutral-400">{t("cart_total")}</span>
            <span className="text-lg font-black" style={{ color: GOLD_BRIGHT }}>{currency(total)}</span>
          </div>

          <button type="submit" className="w-full rounded-sm py-3.5 text-xs font-bold tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5" style={{ background: GOLD_BRIGHT }}>
            {t("checkout_submit")}
          </button>
          <button type="button" onClick={onBack} className="w-full text-center text-[11px] font-semibold text-neutral-500 hover:text-white">
            {t("checkout_back")}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ADMIN DASHBOARD                                                     */
/* ================================================================== */
function AdminDashboard() {
  const {
    products, addProduct, updateProduct, deleteProduct, adjustStock,
    orders, updateOrderStatus,
    abandonedCarts, removeAbandonedCart,
    activityLog, showToast,
  } = useStore();

  const [tab, setTab] = useState("overview"); // overview | orders | carts | inventory | log
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const totalSales = orders.reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter((o) => ["New", "Processing", "Shipped"].includes(o.status)).length;
  const lowStockItems = products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD);

  const filteredOrders = statusFilter === "All" ? orders : orders.filter((o) => o.status === statusFilter);

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  const statusColor = {
    New: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Processing: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Shipped: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
    Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] pb-28 text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-30 border-b border-neutral-900 bg-[#0D0D0D]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-2">
            <HullahMark className="h-8 w-7" />
            <div>
              <p className="text-sm font-black uppercase tracking-widest">HULLAH Admin</p>
              <p className="text-[10px] tracking-widest text-neutral-500">MANAGEMENT DASHBOARD</p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 pb-3 lg:px-8">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "orders", label: "Orders", icon: ClipboardList },
            { id: "carts", label: "Abandoned Carts", icon: ShoppingCart },
            { id: "inventory", label: "Inventory", icon: Boxes },
            { id: "log", label: "Activity Log", icon: Activity },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-sm px-3.5 py-2 text-[11px] font-bold tracking-wide transition-colors ${
                tab === id ? "bg-[#D4AF37] text-black" : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
              {id === "orders" && orders.filter((o) => o.status === "New").length > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-1.5 text-[9px] text-white">{orders.filter((o) => o.status === "New").length}</span>
              )}
              {id === "carts" && abandonedCarts.length > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-1.5 text-[9px] text-white">{abandonedCarts.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* ---------------- OVERVIEW ---------------- */}
        {tab === "overview" && (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Sales", value: currency(totalSales), icon: DollarSign, sub: `${orders.length} total orders` },
                { label: "Active Orders", value: activeOrders, icon: ClipboardList, sub: "New / Processing / Shipped" },
                { label: "Abandoned Carts", value: abandonedCarts.length, icon: ShoppingCart, sub: "Incomplete checkouts" },
                { label: "Low Stock Alerts", value: lowStockItems.length, icon: AlertTriangle, sub: `Threshold ≤ ${LOW_STOCK_THRESHOLD} units` },
              ].map(({ label, value, icon: Icon, sub }) => (
                <div key={label} className="rounded-sm border border-neutral-900 bg-[#111113] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] font-bold tracking-widest text-neutral-500">{label.toUpperCase()}</p>
                    <Icon className="h-4 w-4" style={{ color: GOLD_BRIGHT }} />
                  </div>
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-[11px] text-neutral-600">{sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-sm border border-neutral-900 bg-[#111113] p-5">
                <p className="mb-4 text-xs font-bold tracking-widest text-neutral-300">RECENT ORDERS</p>
                {orders.slice(0, 5).length === 0 ? (
                  <p className="text-xs text-neutral-600">No orders yet — place one from the Customer Store to see it appear here instantly.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((o) => (
                      <div key={o.id} className="flex items-center justify-between border-b border-neutral-900 pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="text-xs font-bold">{o.id} · {o.customer.name}</p>
                          <p className="text-[11px] text-neutral-500">{timeAgo(o.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`rounded-sm border px-2 py-0.5 text-[10px] font-bold ${statusColor[o.status]}`}>{o.status}</span>
                          <span className="text-xs font-bold" style={{ color: GOLD_BRIGHT }}>{currency(o.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-sm border border-neutral-900 bg-[#111113] p-5">
                <p className="mb-4 text-xs font-bold tracking-widest text-neutral-300">LOW STOCK ITEMS</p>
                {lowStockItems.length === 0 ? (
                  <p className="text-xs text-neutral-600">All products are well stocked.</p>
                ) : (
                  <div className="space-y-3">
                    {lowStockItems.map((p) => (
                      <div key={p.id} className="flex items-center justify-between border-b border-neutral-900 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <ProductVisual product={p} className="h-10 w-10 shrink-0 rounded" />
                          <div>
                            <p className="text-xs font-bold">{p.name}</p>
                            <p className="text-[11px] text-neutral-500">{p.category}</p>
                          </div>
                        </div>
                        <span className="rounded-sm border border-red-500/30 bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">
                          {p.stock} LEFT
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- ORDERS ---------------- */}
        {tab === "orders" && (
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {["All", ...ORDER_STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-sm border px-3.5 py-1.5 text-[11px] font-bold tracking-wide transition-colors ${
                    statusFilter === s ? "border-[#D4AF37] bg-[#D4AF37] text-black" : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto rounded-sm border border-neutral-900">
              <table className="w-full min-w-[720px] text-left text-xs">
                <thead className="bg-[#111113] text-[10px] tracking-widest text-neutral-500">
                  <tr>
                    <th className="px-4 py-3">ORDER ID</th>
                    <th className="px-4 py-3">CUSTOMER</th>
                    <th className="px-4 py-3">ITEMS</th>
                    <th className="px-4 py-3">TOTAL</th>
                    <th className="px-4 py-3">STATUS</th>
                    <th className="px-4 py-3">DATE</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-neutral-600">No orders in this status.</td></tr>
                  )}
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="border-t border-neutral-900 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-bold">{o.id}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold">{o.customer.name}</p>
                        <p className="text-neutral-500">{o.customer.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-neutral-400">{o.items.reduce((s, i) => s + i.qty, 0)} items</td>
                      <td className="px-4 py-3 font-bold" style={{ color: GOLD_BRIGHT }}>{currency(o.total)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={o.status}
                          onChange={(e) => { updateOrderStatus(o.id, e.target.value); showToast(`Order ${o.id} → ${e.target.value}`); }}
                          className={`rounded-sm border bg-transparent px-2 py-1 text-[11px] font-bold outline-none ${statusColor[o.status]}`}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-[#111113] text-white">{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-neutral-500">{timeAgo(o.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedOrder(o)} className="text-[11px] font-bold text-neutral-400 hover:text-[#D4AF37]">VIEW</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- ABANDONED CARTS ---------------- */}
        {tab === "carts" && (
          <div className="space-y-4">
            {abandonedCarts.length === 0 && (
              <div className="rounded-sm border border-neutral-900 bg-[#111113] p-8 text-center text-sm text-neutral-600">
                No abandoned carts. When a customer adds items in the Customer Store and leaves the tab without checking out for ~25s, it will appear here automatically.
              </div>
            )}
            {abandonedCarts.map((c) => {
              const detailed = c.items.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((i) => i.product);
              const total = detailed.reduce((s, i) => s + i.product.price * i.qty, 0);
              return (
                <div key={c.id} className="flex flex-col gap-4 rounded-sm border border-neutral-900 bg-[#111113] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-neutral-300">
                      <Users className="h-3.5 w-3.5" style={{ color: GOLD_BRIGHT }} />
                      Guest session · <Clock className="h-3.5 w-3.5 text-neutral-500" /> {timeAgo(c.lastActive)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {detailed.map((i) => (
                        <span key={`${i.id}-${i.size}`} className="rounded-sm border border-neutral-800 px-2 py-1 text-[11px] text-neutral-400">
                          {i.product.name} · {i.size} × {i.qty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ color: GOLD_BRIGHT }}>{currency(total)}</span>
                    <button
                      onClick={() => showToast("Reminder message queued for this guest session")}
                      className="flex items-center gap-1.5 rounded-sm border border-neutral-700 px-3 py-2 text-[11px] font-bold tracking-wide hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    >
                      <BellRing className="h-3.5 w-3.5" /> SEND REMINDER
                    </button>
                    <button onClick={() => removeAbandonedCart(c.id)} className="text-neutral-600 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------- INVENTORY ---------------- */}
        {tab === "inventory" && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest text-neutral-300">{products.length} PRODUCTS</p>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-1.5 rounded-sm px-4 py-2 text-[11px] font-bold tracking-wide text-black"
                style={{ background: GOLD_BRIGHT }}
              >
                <Plus className="h-3.5 w-3.5" /> ADD PRODUCT
              </button>
            </div>

            <div className="space-y-3">
              {products.map((p) => (
                <InventoryRow key={p.id} product={p} onUpdate={updateProduct} onAdjustStock={adjustStock} onDelete={deleteProduct} />
              ))}
            </div>
          </div>
        )}

        {/* ---------------- ACTIVITY LOG ---------------- */}
        {tab === "log" && (
          <div className="rounded-sm border border-neutral-900 bg-[#111113] p-5">
            <p className="mb-4 text-xs font-bold tracking-widest text-neutral-300">SYSTEM ACTIVITY</p>
            {activityLog.length === 0 ? (
              <p className="text-xs text-neutral-600">No activity yet. Actions in the Customer Store will appear here in real time.</p>
            ) : (
              <div className="space-y-3">
                {activityLog.map((log) => {
                  const Icon = log.kind === "order" ? ClipboardList : log.kind === "cart" ? ShoppingCart : log.kind === "stock" ? Boxes : Activity;
                  return (
                    <div key={log.id} className="flex items-start gap-3 border-b border-neutral-900 pb-3 last:border-0 last:pb-0">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD_BRIGHT }} />
                      <div className="flex-1">
                        <p className="text-xs text-neutral-300">{log.message}</p>
                        <p className="text-[10px] text-neutral-600">{timeAgo(log.time)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ORDER DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-lg rounded-sm border border-neutral-800 bg-[#111113] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-widest">ORDER {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)}><X className="h-5 w-5 text-neutral-500 hover:text-white" /></button>
            </div>
            <div className="mb-4 space-y-1.5 text-xs">
              <p className="flex items-center gap-2 text-neutral-300"><Users className="h-3.5 w-3.5 text-neutral-500" /> {selectedOrder.customer.name}</p>
              <p className="flex items-center gap-2 text-neutral-300"><PhoneCall className="h-3.5 w-3.5 text-neutral-500" /> {selectedOrder.customer.phone}</p>
              <p className="flex items-center gap-2 text-neutral-300">📍 {selectedOrder.customer.address}</p>
              <p className="flex items-center gap-2 text-neutral-300"><CreditCard className="h-3.5 w-3.5 text-neutral-500" /> {selectedOrder.customer.payment}</p>
            </div>
            <div className="space-y-2 border-t border-neutral-900 pt-4">
              {selectedOrder.items.map((i, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300">{i.name} · {i.size} × {i.qty}</span>
                  <span className="font-bold" style={{ color: GOLD_BRIGHT }}>{currency(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-neutral-900 pt-4">
              <span className="text-xs font-bold tracking-widest">TOTAL</span>
              <span className="text-lg font-black" style={{ color: GOLD_BRIGHT }}>{currency(selectedOrder.total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProduct && (
        <AddProductModal
          onClose={() => setShowAddProduct(false)}
          onAdd={(data) => { addProduct(data); setShowAddProduct(false); showToast(`Product "${data.name}" added`); }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  INVENTORY ROW — inline price / stock editing                       */
/* ------------------------------------------------------------------ */
function InventoryRow({ product, onUpdate, onAdjustStock, onDelete }) {
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceDraft, setPriceDraft] = useState(product.price);
  const [imageDraft, setImageDraft] = useState(product.imageUrl || "");
  const [editingImage, setEditingImage] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-sm border border-neutral-900 bg-[#111113] p-4 sm:flex-row sm:items-center">
      <ProductVisual product={product} className="h-16 w-14 shrink-0 rounded" />

      <div className="min-w-[180px] flex-1">
        <p className="text-sm font-bold">{product.name}</p>
        <p className="text-[11px] text-neutral-500">{product.category}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-widest text-neutral-500">PRICE</span>
        {editingPrice ? (
          <input
            type="number"
            autoFocus
            value={priceDraft}
            onChange={(e) => setPriceDraft(e.target.value)}
            onBlur={() => { onUpdate(product.id, { price: Number(priceDraft) || 0 }); setEditingPrice(false); }}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="w-20 rounded-sm border border-neutral-700 bg-transparent px-2 py-1 text-xs outline-none focus:border-[#D4AF37]"
          />
        ) : (
          <button onClick={() => setEditingPrice(true)} className="flex items-center gap-1 text-xs font-bold hover:text-[#D4AF37]" style={{ color: GOLD_BRIGHT }}>
            {currency(product.price)} <Pencil className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-widest text-neutral-500">STOCK</span>
        <button onClick={() => onAdjustStock(product.id, -1)} className="rounded-sm border border-neutral-800 p-1 hover:border-neutral-600"><Minus className="h-3 w-3" /></button>
        <span className={`w-8 text-center text-xs font-bold ${product.stock <= LOW_STOCK_THRESHOLD ? "text-red-400" : "text-white"}`}>{product.stock}</span>
        <button onClick={() => onAdjustStock(product.id, 1)} className="rounded-sm border border-neutral-800 p-1 hover:border-neutral-600"><Plus className="h-3 w-3" /></button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-widest text-neutral-500">IMAGE</span>
        {editingImage ? (
          <input
            autoFocus
            value={imageDraft}
            placeholder="Image URL"
            onChange={(e) => setImageDraft(e.target.value)}
            onBlur={() => { onUpdate(product.id, { imageUrl: imageDraft.trim() }); setEditingImage(false); }}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="w-36 rounded-sm border border-neutral-700 bg-transparent px-2 py-1 text-[11px] outline-none focus:border-[#D4AF37]"
          />
        ) : (
          <button onClick={() => setEditingImage(true)} className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-[#D4AF37]">
            {product.imageUrl ? "Change" : "Set URL"} <Pencil className="h-3 w-3" />
          </button>
        )}
      </div>

      <button onClick={() => onDelete(product.id)} className="ml-auto text-neutral-600 hover:text-red-400">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ADD PRODUCT MODAL                                                   */
/* ------------------------------------------------------------------ */
function AddProductModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Oversized Hoodies");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !stock) {
      setError("Please fill in name, price and stock.");
      return;
    }
    onAdd({ name: name.trim(), category, price: Number(price), stock: Number(stock), imageUrl: imageUrl.trim() });
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/85 px-4">
      <div className="w-full max-w-md rounded-sm border border-neutral-800 bg-[#111113] p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-widest">ADD NEW PRODUCT</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-neutral-500 hover:text-white" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">Product Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-sm border border-neutral-800 bg-[#0D0D0D] px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37]">
              {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">Price ($)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">Stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37]" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-bold tracking-widest text-neutral-400">Image URL (optional)</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37]" />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" className="w-full rounded-sm py-3 text-xs font-bold tracking-widest text-black" style={{ background: GOLD_BRIGHT }}>
            ADD PRODUCT
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ROOT APP                                                            */
/* ================================================================== */
function HullahApp() {
  const { mode } = useStore();
  return (
    <>
      {mode === "store" ? <CustomerStorefront /> : <AdminDashboard />}
      <ModeSwitcher />
    </>
  );
}

export default function HullahDualInterfaceApp() {
  return (
    <StoreProvider>
      <HullahApp />
    </StoreProvider>
  );
}
