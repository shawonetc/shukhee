"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Phone, Menu, X, ChevronRight } from "lucide-react";

const SEARCH_PLACEHOLDERS = [
  "Search medicines by name...",
  "Search specialties (e.g. Cardiologist)...",
  "Search home nursing services...",
  "Search lab test packages..."
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
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          
          {/* Row 1: Logo, Nav Links, Actions (Language, Auth, Hotline) */}
          <div className="flex items-center justify-between h-16 mb-2">
            
            {/* LOGO */}
            <div className="flex items-center">
              <Link href="/" className="relative flex flex-col group cursor-pointer">
                <span className="text-3xl font-extrabold tracking-tight text-[#6f2c91] flex items-center">
                  Shukhee
                </span>
                {/* Signature smiley line below logo */}
                <svg className="absolute -bottom-2 left-0 w-28 h-2 text-[#00bcd4]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M5,1 Q50,9 95,1" stroke="currentColor" strokeWidth="4.5" fill="transparent" strokeLinecap="round" />
                </svg>
              </Link>
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

        </div>

        {/* MOBILE HEADER (SMALLER THAN MD) */}
        <div className="md:hidden flex flex-col px-4 py-3 gap-3 bg-white">
          
          {/* Row 1: Logo, Language, Log In, Sign Up, Hamburger */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative flex flex-col group cursor-pointer">
              <span className="text-2xl font-extrabold tracking-tight text-[#6f2c91] flex items-center">
                Shukhee
              </span>
              <svg className="absolute -bottom-1.5 left-0 w-24 h-1 text-[#00bcd4]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M5,1 Q50,9 95,1" stroke="currentColor" strokeWidth="4.5" fill="transparent" strokeLinecap="round" />
              </svg>
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

        </div>

      </header>

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-black text-[#6f2c91]">Shukhee</span>
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
