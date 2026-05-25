"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Phone, Globe, ChevronDown, Menu, X, ChevronRight } from "lucide-react";

const SEARCH_PLACEHOLDERS = [
  "Search specialties (e.g. Cardiologist, Dermatologist)...",
  "Search medicines (e.g. Napa Extra, Fexo, Orva)...",
  "Search home nursing services...",
  "Search lab packages (e.g. Diabetes, Lipid Profile)..."
];

interface HeaderProps {
  lang: "EN" | "BN";
  setLang: (lang: "EN" | "BN") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartTotalQty: number;
  setCartOpen: (open: boolean) => void;
}

export default function Header({
  lang,
  setLang,
  searchQuery,
  setSearchQuery,
  cartTotalQty,
  setCartOpen
}: HeaderProps) {
  const [activePlaceholderIdx, setActivePlaceholderIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search placeholder animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePlaceholderIdx((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
        
        {/* DESKTOP HEADER (MD & ABOVE) */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <Link href="/" className="relative flex flex-col group cursor-pointer">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center">
                  shukhee
                  <span className="text-purple-600">.com</span>
                </span>
                {/* Signature smiley line below logo */}
                <svg className="absolute -bottom-2.5 left-0 w-36 h-2 text-cyan-400 group-hover:text-cyan-500 transition-colors" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M5,1 Q50,9 95,1" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
                </svg>
              </Link>
            </div>

            {/* INTERACTIVE SEARCH BAR */}
            <div className="flex flex-1 max-w-lg mx-8 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={SEARCH_PLACEHOLDERS[activePlaceholderIdx]}
                  className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-inner"
                />
                <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
              </div>
            </div>

            {/* ACTIONS BAR */}
            <div className="flex items-center gap-4 lg:gap-6">
              
              {/* HOTLINE */}
              <div className="hidden lg:flex items-center gap-2.5 bg-purple-50 border border-purple-100 rounded-full py-1.5 pl-2.5 pr-4">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-purple-600 font-semibold tracking-wider uppercase">Hotline 24/7</p>
                  <p className="text-sm font-bold text-slate-800">10657</p>
                </div>
              </div>

              {/* LANGUAGE TOGGLE */}
              <button 
                onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors py-1.5 px-3 rounded-full hover:bg-slate-50 border border-slate-100"
              >
                <Globe className="w-4.5 h-4.5 text-slate-400" />
                <span>{lang === "EN" ? "English" : "বাংলা"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* USER REGISTRATION */}
              <Link href="/login" className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-sm font-semibold py-2.5 px-5 rounded-full hover:from-slate-700 hover:to-slate-800 shadow-sm transition-all">
                <User className="w-4 h-4" />
                <span>Login / Sign Up</span>
              </Link>

              {/* CART FLOATING NOTIFICATION BADGE */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all hover:scale-105 shadow-sm"
              >
                <ShoppingCart className="w-5.5 h-5.5" />
                {cartTotalQty > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow">
                    {cartTotalQty}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE HEADER (SMALLER THAN MD) */}
        <div className="md:hidden flex flex-col px-4 py-3 gap-3 bg-white">
          {/* Row 1: Logo, Language, Log In, Sign Up, Hamburger */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative flex flex-col group cursor-pointer">
              <span className="text-2xl font-black tracking-tight text-slate-950 flex items-center">
                shukhee<span className="text-purple-600">.com</span>
              </span>
              <svg className="absolute -bottom-1.5 left-0 w-28 h-1 text-cyan-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M5,1 Q50,9 95,1" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Translation, Login, Signup, Hamburger */}
            <div className="flex items-center gap-2">
              {/* Translate indicator 文A */}
              <button 
                onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
                className="text-slate-500 hover:text-purple-600 p-1 flex items-center text-sm font-bold"
              >
                <span>文</span>
                <span className="text-[10px] font-normal ml-0.5">A</span>
              </button>

              {/* Login / Sign Up buttons */}
              <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-purple-600 px-1 py-1">
                Log In
              </Link>
              <Link href="/signup" className="bg-[#1cb0db] hover:bg-[#199ec5] text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xs transition-colors">
                Sign Up
              </Link>

              {/* Hamburger box */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 focus:outline-none"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Row 2: Search Input & Cart Trigger Box */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name"
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800 placeholder-slate-400 shadow-xs"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Cart trigger square */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all shadow-xs"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-[#1cb0db]" />
              {cartTotalQty > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[9px] font-black rounded-full h-4.5 w-4.5 flex items-center justify-center border border-white shadow">
                  {cartTotalQty}
                </span>
              )}
            </button>
          </div>
        </div>

      </header>

      {/* MOBILE NAV COLLAPSEDRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-black text-slate-950">shukhee<span className="text-purple-600">.com</span></span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-base font-semibold text-slate-800">
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Instant MBBS Doctor</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link href="/specialists" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Book Specialist Doctor</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Order Medicine Home Delivery</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Caregiver Home Nursing</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Lab Test Packages</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between pb-2">
                <span>Surgery Booking Guide</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>
            <div className="mt-auto border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-100">
                <Phone className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Hotline support</p>
                  <p className="text-base font-black text-slate-900">Dial: 10657</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
