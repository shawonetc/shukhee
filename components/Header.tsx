"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Phone, Menu, X, ChevronRight, ChevronDown, LayoutGrid } from "lucide-react";

const SEARCH_PLACEHOLDERS = [
  "Search medicines by name...",
  "Search specialties (e.g. Cardiologist)...",
  "Search home nursing services...",
  "Search lab test packages..."
];

const CATEGORIES = [
  { name: "Medicine", nameBn: "ওষুধ", slug: "medicine", icon: "💊" },
  { name: "Supplements", nameBn: "সাপ্লিমেন্ট", slug: "supplements", icon: "🧪" },
  { name: "Baby Care", nameBn: "বেবি কেয়ার", slug: "baby-care", icon: "🍼" },
  { name: "Skin Care", nameBn: "স্কিন কেয়ার", slug: "skin-care", icon: "🧴" },
  { name: "Hair Care", nameBn: "হেয়ার কেয়ার", slug: "hair-care", icon: "💇‍♀️" },
  { name: "Personal Care", nameBn: "পারসোনাল কেয়ার", slug: "personal-care", icon: "🧼" },
  { name: "Medical Devices", nameBn: "মেডিকেল ডিভাইস", slug: "medical-devices", icon: "🩺" },
  { name: "Health Accessories", nameBn: "হেলথ অ্যাক্সেসরিজ", slug: "health-accessories", icon: "🩹" }
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
  const pathname = usePathname();
  const [activePlaceholderIdx, setActivePlaceholderIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

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
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          
          {/* Row 1: Logo, Nav Links, Actions (Language, Auth, Hotline) */}
          <div className="flex items-center justify-between h-16 mb-2">
            
            {/* LOGO */}
            <div className="flex items-center gap-5">
              <Link href="/" className="relative flex items-center group cursor-pointer transition-all hover:opacity-90">
                <span className="text-2xl font-extrabold tracking-tight text-[#1cb0db] flex items-center">
                  MedicareBD
                </span>
              </Link>

              {/* Categories Hover/Click Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setCatDropdownOpen(true)}
                onMouseLeave={() => setCatDropdownOpen(false)}
              >
                <button
                  onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-cyan-500 rounded-xl text-xs font-extrabold transition-all border border-slate-100/50 focus:outline-none"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Categories</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${catDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {catDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-2 grid grid-cols-1 gap-0.5">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/healthstore?category=${cat.slug}`}
                          onClick={() => setCatDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-cyan-50/50 hover:text-cyan-600 transition-all text-xs font-bold text-slate-700"
                        >
                          <span className="text-sm">{cat.icon}</span>
                          <div className="flex flex-col">
                            <span>{cat.name}</span>
                            <span className="text-[9px] text-slate-400 font-semibold">{cat.nameBn}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* MIDDLE NAVIGATION LINKS */}
            <div className="flex items-center gap-6">
              <Link href="#" className="text-[13px] font-bold text-slate-600 hover:text-cyan-500 transition-colors">
                Become a Provider
              </Link>
              <Link href="/insights" className="text-[13px] font-bold text-slate-600 hover:text-cyan-500 transition-colors">
                Shukhee Insights
              </Link>
              <Link 
                href="#" 
                className="border border-cyan-400 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all py-1.5 px-4 rounded-lg text-[13px] font-bold"
              >
                Subscription
              </Link>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-4">
              
              {/* Translation Language Toggle 文A */}
              <button 
                onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
                className="text-slate-500 hover:text-cyan-500 p-1 flex items-center text-sm font-bold focus:outline-none"
              >
                <span className="text-base">文</span>
                <span className="text-[10px] font-normal ml-0.5">A</span>
              </button>

              {/* Log In & Sign Up buttons */}
              <Link 
                href="/login" 
                className="border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all rounded-lg px-4 py-1.5 text-xs font-bold"
              >
                Log In
              </Link>
              <Link 
                href="/login" 
                className="bg-[#1cb0db] text-white hover:bg-[#199ec5] transition-all rounded-lg px-4 py-1.5 text-xs font-bold"
              >
                Sign up
              </Link>

              {/* Hotline Support Box */}
              <div className="border border-slate-200 rounded-lg py-1 px-3 flex items-center gap-2 text-slate-700 text-xs font-bold bg-white">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Hotline: 10657</span>
              </div>

            </div>

          </div>

          {/* Row 2: Search input & Cart Trigger */}
          <div className="flex items-center gap-4 border-t border-slate-50 pt-3">
            
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines by name"
                className="w-full bg-white border border-slate-200/85 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800 placeholder-slate-400 shadow-2xs"
              />
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            </div>

            {/* Cart trigger square */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center bg-slate-50/50 border border-slate-200 rounded-xl hover:bg-slate-100/50 hover:border-slate-300 transition-all focus:outline-none"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-500" />
              <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[9px] font-black rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-xs">
                {cartTotalQty}
              </span>
            </button>

          </div>

          {/* Row 3: Sub-navigation bar (matches the image exactly) */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 whitespace-nowrap text-xs font-semibold text-slate-600 border-t border-slate-100/60 pt-3.5 mt-2.5">
            <Link 
              href="/" 
              className={`transition-colors pb-1.5 ${pathname === "/" ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
            >
              Home
            </Link>
            <Link 
              href="/instant-mbbs" 
              className={`transition-colors pb-1.5 ${pathname === "/instant-mbbs" ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
            >
              Instant MBBS Doctor
            </Link>
            <Link 
              href="/specialists" 
              className={`transition-colors pb-1.5 ${pathname === "/specialists" ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
            >
              Specialist Doctor
            </Link>
            <Link 
              href="/healthstore" 
              className={`transition-colors pb-1.5 ${pathname === "/healthstore" || pathname.startsWith("/checkout") ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
            >
              MedicareBD HealthStore
            </Link>
            <Link 
              href="#" 
              className="text-slate-700 hover:text-[#1cb0db] transition-colors pb-1.5"
            >
              HomeLab Test
            </Link>
            <Link 
              href="#" 
              className="text-slate-700 hover:text-[#1cb0db] transition-colors pb-1.5"
            >
              Mental Wellness
            </Link>
            <Link 
              href="#" 
              className="text-slate-700 hover:text-[#1cb0db] transition-colors pb-1.5"
            >
              Surgery Booking
            </Link>
            <button className="text-slate-700 hover:text-[#1cb0db] flex items-center gap-1 transition-colors focus:outline-none pb-1.5">
              <span>Others</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* MOBILE HEADER (SMALLER THAN MD) */}
        <div className="md:hidden flex flex-col px-4 py-3 gap-3 bg-white">
          
          {/* Row 1: Logo, Language, Log In, Sign Up, Hamburger */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative flex items-center group cursor-pointer transition-all hover:opacity-90">
              <span className="text-xl font-extrabold tracking-tight text-[#1cb0db] flex items-center">
                MedicareBD
              </span>
            </Link>

            {/* Translation, Login, Signup, Hamburger */}
            <div className="flex items-center gap-2">
              
              {/* Translate 文A */}
              <button 
                onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
                className="text-slate-500 hover:text-cyan-500 p-1 flex items-center text-sm font-bold focus:outline-none"
              >
                <span>文</span>
                <span className="text-[10px] font-normal ml-0.5">A</span>
              </button>

              {/* Login / Sign Up buttons */}
              <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-purple-600 px-1 py-1">
                Log In
              </Link>
              <Link href="/login" className="bg-[#1cb0db] hover:bg-[#199ec5] text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xs transition-colors">
                Sign Up
              </Link>

              {/* Hamburger Menu toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 focus:outline-none"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>

            </div>
          </div>

          {/* Row 2: Search Input & Cart Trigger */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines by name"
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800 placeholder-slate-400 shadow-xs"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Cart trigger square */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all shadow-xs"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-cyan-500" />
              <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[9px] font-black rounded-full h-4.5 w-4.5 flex items-center justify-center border border-white shadow">
                {cartTotalQty}
              </span>
            </button>
          </div>

          {/* Mobile Row 3: Sub-navigation bar (scrollable) */}
          <div className="w-full overflow-x-auto scrollbar-none -mx-4 px-4 border-t border-slate-50 pt-2.5 mt-1">
            <div className="flex items-center gap-5 whitespace-nowrap text-[11px] font-semibold text-slate-600">
              <Link 
                href="/" 
                className={`transition-colors pb-1 ${pathname === "/" ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
              >
                Home
              </Link>
              <Link 
                href="/instant-mbbs" 
                className={`transition-colors pb-1 ${pathname === "/instant-mbbs" ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
              >
                Instant MBBS
              </Link>
              <Link 
                href="/specialists" 
                className={`transition-colors pb-1 ${pathname === "/specialists" ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
              >
                Specialist Doctor
              </Link>
              <Link 
                href="/healthstore" 
                className={`transition-colors pb-1 ${pathname === "/healthstore" || pathname.startsWith("/checkout") ? "text-[#1cb0db] border-b-2 border-[#1cb0db] font-bold" : "text-slate-700 hover:text-[#1cb0db]"}`}
              >
                HealthStore
              </Link>
              <Link href="#" className="text-slate-700 hover:text-[#1cb0db] pb-1">HomeLab</Link>
              <Link href="#" className="text-slate-700 hover:text-[#1cb0db] pb-1">Wellness</Link>
              <button className="text-slate-700 hover:text-[#1cb0db] flex items-center gap-1 focus:outline-none pb-1">
                <span>Others</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </header>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-black text-[#1cb0db]">MedicareBD</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-base font-semibold text-slate-800">
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Become a Provider</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link href="/insights" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Shukhee Insights</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-purple-600 flex items-center justify-between border-b border-slate-50 pb-2">
                <span>Subscription</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>

            {/* COLLAPSIBLE CATEGORIES SECTION */}
            <div className="border-t border-slate-100 pt-4 mt-6">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Shop By Category</span>
              <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/healthstore?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-cyan-50/50 transition-all text-[11px] font-bold text-slate-700"
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <Phone className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">Hotline support</p>
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
