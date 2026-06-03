"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, Phone, ShoppingCart, User, ArrowRight, MessageSquare, Clipboard, FileText, Star, Percent } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileStickyWidget from "@/components/MobileStickyWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";

// HIGH-FIDELITY PRODUCT SVG GRAPHICS (Custom styled to look spectacular and prevent empty images)
const AxisYCreamIcon = () => (
  <div className="w-full h-36 bg-slate-50 flex items-center justify-center rounded-xl p-3 relative group-hover:scale-105 transition-transform duration-300">
    <svg viewBox="0 0 100 120" className="w-24 h-24 sm:w-28 sm:h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="15" width="30" height="70" rx="8" fill="#d1e7dd" />
      <rect x="30" y="85" width="40" height="15" rx="4" fill="#0f5132" />
      <path d="M48 100L50 112L52 100H48Z" fill="#0f5132" />
      <rect x="42" y="32" width="16" height="30" rx="2" fill="#ffffff" />
      <text x="50" y="48" fontSize="7" fontWeight="bold" fill="#0f5132" textAnchor="middle">AXIS-Y</text>
      <text x="50" y="55" fontSize="4.5" fill="#333" textAnchor="middle">Glow Cream</text>
    </svg>
    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black py-0.5 px-1.5 rounded-md">-21%</div>
  </div>
);

const OrdinaryBottleIcon = () => (
  <div className="w-full h-36 bg-slate-50 flex items-center justify-center rounded-xl p-3 relative group-hover:scale-105 transition-transform duration-300">
    <svg viewBox="0 0 100 120" className="w-24 h-24 sm:w-28 sm:h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="32" y="30" width="36" height="60" rx="10" fill="#e9ecef" />
      <rect x="40" y="12" width="20" height="18" rx="4" fill="#ffffff" stroke="#ced4da" strokeWidth="1" />
      <line x1="50" y1="5" x2="50" y2="12" stroke="#495057" strokeWidth="3.5" />
      <rect x="36" y="45" width="28" height="30" fill="#ffffff" />
      <text x="50" y="56" fontSize="6.5" fontWeight="bold" fill="#212529" textAnchor="middle">The Ordinary</text>
      <text x="50" y="64" fontSize="4.5" fill="#6c757d" textAnchor="middle">Niacinamide 10%</text>
    </svg>
    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black py-0.5 px-1.5 rounded-md">-17%</div>
  </div>
);

const CeraVeIcon = () => (
  <div className="w-full h-36 bg-slate-50 flex items-center justify-center rounded-xl p-3 relative group-hover:scale-105 transition-transform duration-300">
    <svg viewBox="0 0 100 120" className="w-24 h-24 sm:w-28 sm:h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="25" width="44" height="75" rx="6" fill="#ffffff" stroke="#dee2e6" strokeWidth="2" />
      <rect x="44" y="10" width="12" height="15" fill="#495057" />
      <path d="M40 12H60V7H40V12Z" fill="#0d6efd" />
      <rect x="30" y="30" width="5" height="65" fill="#0d6efd" />
      <rect x="38" y="40" width="24" height="40" fill="#ffffff" />
      <text x="50" y="55" fontSize="8" fontWeight="bold" fill="#0a58ca" textAnchor="middle">CeraVe</text>
      <text x="50" y="64" fontSize="4.5" fill="#0b5ed7" textAnchor="middle">Moisturizing</text>
    </svg>
    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black py-0.5 px-1.5 rounded-md">-18%</div>
  </div>
);

const SmartSkincareIcon = () => (
  <div className="w-full h-36 bg-slate-50 flex items-center justify-center rounded-xl p-3 relative group-hover:scale-105 transition-transform duration-300">
    <svg viewBox="0 0 100 120" className="w-24 h-24 sm:w-28 sm:h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="34" y="25" width="32" height="70" rx="16" fill="#fff3cd" />
      <rect x="45" y="8" width="10" height="17" fill="#adb5bd" />
      <circle cx="50" cy="18" r="8" fill="#ced4da" />
      <rect x="38" y="45" width="24" height="30" fill="#ffffff" />
      <text x="50" y="57" fontSize="7.5" fontWeight="bold" fill="#664d03" textAnchor="middle">SMART</text>
      <text x="50" y="67" fontSize="5.5" fill="#856404" textAnchor="middle">SKINCARE</text>
    </svg>
    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black py-0.5 px-1.5 rounded-md">-20%</div>
  </div>
);

const BabySkincareIcon = () => (
  <div className="w-full h-36 bg-slate-50 flex items-center justify-center rounded-xl p-3 relative group-hover:scale-105 transition-transform duration-300">
    <svg viewBox="0 0 100 120" className="w-24 h-24 sm:w-28 sm:h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="40" height="60" rx="20" fill="#e0f7fa" />
      <rect x="42" y="15" width="16" height="15" rx="3" fill="#ffb74d" />
      <path d="M50 65C50 65 44 59 44 55C44 52 46.5 50 49 50C50 50 50 51 50 51C50 51 50 50 51 50C53.5 50 56 52 56 55C56 59 50 65 50 65Z" fill="#ff7043" />
      <text x="50" y="45" fontSize="7" fontWeight="bold" fill="#00838f" textAnchor="middle">BABY WASH</text>
    </svg>
    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black py-0.5 px-1.5 rounded-md">-21%</div>
  </div>
);

const CosrxTonerIcon = () => (
  <div className="w-full h-36 bg-slate-50 flex items-center justify-center rounded-xl p-3 relative group-hover:scale-105 transition-transform duration-300">
    <svg viewBox="0 0 100 120" className="w-24 h-24 sm:w-28 sm:h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="20" width="30" height="85" rx="8" fill="#e0f2f1" fillOpacity="0.8" stroke="#a9dfbf" strokeWidth="1.5" />
      <rect x="42" y="5" width="16" height="15" fill="#343a40" />
      <rect x="38" y="35" width="24" height="40" fill="#ffffff" />
      <text x="50" y="52" fontSize="8" fontWeight="bold" fill="#1b5e20" textAnchor="middle">COSRX</text>
      <text x="50" y="62" fontSize="4.5" fill="#1b5e20" textAnchor="middle">Snail Mucin</text>
    </svg>
    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black py-0.5 px-1.5 rounded-md">-18%</div>
  </div>
);

// MOCK DATASET FOR FLASH DISCOUNT PRODUCTS
const HEALTHSTORE_PRODUCTS = [
  {
    id: "hs1",
    name: "AXIS-Y Dark Spot Correcting Glow Cream",
    brand: "AXIS-Y",
    price: 990,
    originalPrice: 1250,
    rating: 4.8,
    reviews: 142,
    icon: AxisYCreamIcon
  },
  {
    id: "hs2",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    price: 790,
    originalPrice: 950,
    rating: 4.9,
    reviews: 215,
    icon: OrdinaryBottleIcon
  },
  {
    id: "hs3",
    name: "Smart Skincare Serum Formula",
    brand: "Smart Skincare",
    price: 680,
    originalPrice: 850,
    rating: 4.6,
    reviews: 87,
    icon: SmartSkincareIcon
  },
  {
    id: "hs4",
    name: "CeraVe Moisturizing Lotion",
    brand: "CeraVe",
    price: 1350,
    originalPrice: 1650,
    rating: 4.9,
    reviews: 310,
    icon: CeraVeIcon
  },
  {
    id: "hs5",
    name: "Baby Care Soothing Body Wash",
    brand: "Baby Care",
    price: 590,
    originalPrice: 750,
    rating: 4.7,
    reviews: 64,
    icon: BabySkincareIcon
  },
  {
    id: "hs6",
    name: "COSRX Advanced Snail Mucin Toner",
    brand: "COSRX",
    price: 1190,
    originalPrice: 1450,
    rating: 4.8,
    reviews: 119,
    icon: CosrxTonerIcon
  }
];

export default function HealthStorePage() {
  const [lang, setLang] = useState<"EN" | "BN">("EN");
  const [cart, setCart] = useState<{ [key: string]: { id: string; name: string; price: number; qty: number } }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Cart operations
  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[product.id]) {
        updated[product.id] = { ...updated[product.id], qty: updated[product.id].qty + 1 };
      } else {
        updated[product.id] = { id: product.id, name: product.name, price: product.price, qty: 1 };
      }
      return updated;
    });
    setCartOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[id]) return prev;
      const newQty = updated[id].qty + delta;
      if (newQty <= 0) {
        delete updated[id];
      } else {
        updated[id] = { ...updated[id], qty: newQty };
      }
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const cartTotalQty = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="relative min-h-screen bg-[#fafbfc] text-slate-800 font-sans selection:bg-purple-100 selection:text-purple-800">
      
      {/* GLOBAL HEADER */}
      <Header
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartTotalQty={cartTotalQty}
        setCartOpen={setCartOpen}
      />

      {/* CLEAN SUB-NAVIGATION BAR */}
      <div className="w-full bg-white border-b border-slate-100 py-3 shadow-3xs overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 sm:gap-8 whitespace-nowrap text-xs font-semibold text-slate-600">
          <Link href="/" className="hover:text-cyan-500 transition-colors">
            Home
          </Link>
          <Link href="/instant-mbbs" className="hover:text-cyan-500 transition-colors">
            Instant MBBS Doctor
          </Link>
          <Link href="/specialists" className="hover:text-cyan-500 transition-colors">
            Specialist Doctor
          </Link>
          <Link 
            href="/healthstore" 
            className="text-cyan-500 border-b-2 border-cyan-500 pb-3 font-bold transition-all"
          >
            Shukhee HealthStore
          </Link>
          <Link href="#" className="hover:text-cyan-500 transition-colors">
            HomeLab Test
          </Link>
          <Link href="#" className="hover:text-cyan-500 transition-colors">
            Mental Wellness
          </Link>
          <Link href="#" className="hover:text-cyan-500 transition-colors">
            Surgery Booking
          </Link>
          <button className="hover:text-cyan-500 flex items-center gap-1 transition-colors focus:outline-none">
            <span>Others</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* PURPLE HERO BANNER (MATCHES THE IMAGE EXACTLY WITH BENGALI TEXT & ORIGINAL EMBLEMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[24/9] md:h-[380px] lg:h-[420px] shadow-sm bg-gradient-to-r from-purple-800 to-indigo-900 group">
          
          {/* Background image illustration */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/healthstore_hero_banner.png" 
            alt="Shukhee HealthStore Hero Banner" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-65"
          />

          {/* Glowing blur effects */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/25 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-500/25 rounded-full blur-3xl" />

          {/* Content Layer ( Bengali Mockup Overlays ) */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-lg md:max-w-xl text-white">
            <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-widest bg-white/10 backdrop-blur-xs border border-white/20 py-1 px-3 rounded-full inline-block w-fit mb-3">
              ১০০% আসল স্বাস্থ্যপণ্যের নির্ভরযোগ্য প্ল্যাটফর্ম
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-sm">
              সুখী অনলাইন <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300">হেলথস্টোর</span>
            </h1>
            
            {/* Click Here Button */}
            <div className="mt-6 flex items-center gap-4">
              <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-full shadow-lg transition-all flex items-center gap-2 border border-fuchsia-400/35">
                <span>ক্লিক করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {/* Floating Quality Stamp */}
              <div className="hidden sm:flex items-center gap-2 bg-black/25 backdrop-blur-xs py-1.5 px-3 rounded-xl border border-white/15">
                <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center">
                  <Percent className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">100% Original Brand Warranty</span>
              </div>
            </div>
          </div>

          {/* Custom slider controls indicators */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-all pointer-events-none">
            <span className="text-sm font-bold">&lt;</span>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-all pointer-events-none">
            <span className="text-sm font-bold">&gt;</span>
          </button>
          
          {/* Slider indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
            <span className="w-5 h-2.5 rounded-full bg-white" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
          </div>

        </div>
      </section>

      {/* FEATURE ACTIONS (3 BLOCKS ROW: PRESCRIPTION, MESSENGER, PRODUCTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Action 1: Upload Prescription */}
          <Link 
            href="#"
            className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-3xs hover:shadow-xs hover:border-cyan-200 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500">
                <FileText className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upload</p>
                <h4 className="text-sm font-black text-slate-800 group-hover:text-cyan-500 transition-colors">Prescription</h4>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-1.5 transition-transform" />
          </Link>

          {/* Action 2: Order via Messenger */}
          <a 
            href="https://m.me/shukhee"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-3xs hover:shadow-xs hover:border-blue-200 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <MessageSquare className="w-6 h-6 stroke-[2] fill-current" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order via</p>
                <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-500 transition-colors">Messenger</h4>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1.5 transition-transform" />
          </a>

          {/* Action 3: Explore Products */}
          <Link 
            href="#"
            className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-3xs hover:shadow-xs hover:border-purple-200 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                <Clipboard className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Explore</p>
                <h4 className="text-sm font-black text-slate-800 group-hover:text-purple-500 transition-colors">Products</h4>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1.5 transition-transform" />
          </Link>

        </div>
      </section>

      {/* FLASH DISCOUNT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        
        {/* Header and View All */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>Flash Discount</span>
            <span className="text-orange-500">⚡</span>
          </h2>
          <button 
            className="border border-cyan-400 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all font-bold text-xs py-2 px-4 rounded-lg focus:outline-none"
          >
            View All
          </button>
        </div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {HEALTHSTORE_PRODUCTS.map((prod) => {
            const ProductIcon = prod.icon;
            return (
              <div 
                key={prod.id}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs hover:shadow-xs hover:border-cyan-100 transition-all flex flex-col justify-between group"
              >
                
                <div>
                  {/* Styled SVG Image Representation */}
                  <ProductIcon />
                  
                  {/* Brand & Name */}
                  <div className="mt-3.5 text-left">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                      {prod.brand}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug mt-0.5 line-clamp-2 min-h-[32px] group-hover:text-cyan-500 transition-colors" title={prod.name}>
                      {prod.name}
                    </h4>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="text-[10px] font-black text-slate-700">{prod.rating}</span>
                    <span className="text-[9px] text-slate-400">({prod.reviews})</span>
                  </div>
                </div>

                {/* Price tag & checkout */}
                <div className="mt-4 border-t border-slate-50 pt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-slate-800">
                      ৳ {prod.price}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through font-medium">
                      ৳ {prod.originalPrice}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart({ id: prod.id, name: prod.name, price: prod.price })}
                    className="w-full mt-3 bg-cyan-50 border border-cyan-100 hover:bg-cyan-500 hover:text-white text-cyan-500 font-extrabold text-[10px] py-2 rounded-lg transition-all focus:outline-none"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* DYNAMIC CART DRAWER PANEL */}
      <CartDrawer
        isOpen={cartOpen}
        setIsOpen={setCartOpen}
        cart={cart}
        updateCartQty={updateCartQty}
        removeItem={removeItem}
        cartTotalQty={cartTotalQty}
        cartTotalPrice={cartTotalPrice}
      />

      {/* MOBILE STICKY BOTTOM DOCTOR CALL WIDGET */}
      <MobileStickyWidget />

      {/* FLOATING 24/7 INTERACTIVE WIDGET SUPPORT */}
      <WhatsAppWidget />

    </div>
  );
}
