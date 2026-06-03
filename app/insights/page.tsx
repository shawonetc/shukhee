"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowRight, BookOpen, Clock, Heart, Phone, ShieldCheck, 
  Sparkles, Stethoscope, Share2, X, ChevronRight, Bookmark, ArrowLeft
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileStickyWidget from "@/components/MobileStickyWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { INSIGHTS_ARTICLES, InsightArticle } from "./data";

function InsightsContent() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"EN" | "BN">("EN");
  const [cart, setCart] = useState<{ [key: string]: { id: string; name: string; price: number; qty: number } }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Active article being read in the interactive modal
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  // Check query parameters to automatically open an article if linked
  useEffect(() => {
    const articleId = searchParams.get("article");
    if (articleId) {
      const match = INSIGHTS_ARTICLES.find(a => a.id === articleId);
      if (match) {
        setActiveArticle(match);
      }
    }
  }, [searchParams]);

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

  // Article bookmark toggle
  const toggleBookmark = (id: string) => {
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(savedId => savedId !== id) : [...prev, id]
    );
  };

  // Copy share link
  const handleShare = (id: string) => {
    const shareUrl = `${window.location.origin}/insights?article=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Split content by headings for custom layout inside modal
  const renderArticleBody = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (trimmed.startsWith("###")) {
        return (
          <h3 key={index} className="text-lg font-extrabold text-slate-900 mt-6 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-purple-600 inline-block" />
            {trimmed.replace("###", "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h2 key={index} className="text-xl font-black text-purple-700 mt-8 mb-4 border-b border-purple-100 pb-2">
            {trimmed.replace("##", "").trim()}
          </h2>
        );
      }
      if (trimmed.startsWith("* **") || trimmed.startsWith("- **")) {
        return (
          <div key={index} className="my-2.5 pl-4 border-l-2 border-slate-200">
            <p className="text-sm leading-relaxed text-slate-700 font-medium">
              {trimmed.replace(/^(\*\s\*\*|-\s\*\*)/, "**")}
            </p>
          </div>
        );
      }
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        return (
          <li key={index} className="text-sm leading-relaxed text-slate-700 font-medium ml-6 list-disc my-1.5">
            {trimmed.replace(/^(\*|-)/, "").trim()}
          </li>
        );
      }
      return (
        <p key={index} className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium my-4">
          {trimmed}
        </p>
      );
    });
  };

  // Featured article is the first index, others are in right feed
  const featuredArticle = INSIGHTS_ARTICLES[0];
  const remainingArticles = INSIGHTS_ARTICLES.slice(1);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-purple-100 selection:text-purple-800">
      
      {/* GLOBAL HEADER */}
      <Header
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartTotalQty={cartTotalQty}
        setCartOpen={setCartOpen}
      />

      {/* HERO BANNER SECTION */}
      <section className="relative bg-gradient-to-br from-[#4c1d6f] via-[#6f2c91] to-[#12051c] overflow-hidden text-white">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-xs font-bold text-cyan-300">Shukhee Insights</span>
          </div>

          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full py-1.5 px-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black text-emerald-300 uppercase tracking-wide">100% Doctor Verified Advice</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Shukhee <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300">Insights</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-200/80 font-medium leading-relaxed max-w-lg">
              Empowering your health journey with scientific tips, guidelines, and wellness columns from the country&apos;s leading medical specialists.
            </p>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Large Featured Article Card (7/12) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full justify-between">
              
              <div>
                {/* Large Featured Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-200 cursor-pointer" onClick={() => setActiveArticle(featuredArticle)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.titleBn || featuredArticle.title} 
                    className="w-full h-full object-cover hover:scale-101 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white font-black text-[10px] uppercase py-1 px-3.5 rounded-lg shadow-md z-10 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                    <span>Featured Article</span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-400 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-50 text-[#6f2c91] font-bold px-3 py-1 rounded-full border border-purple-100 uppercase tracking-wider text-[10px]">
                        {featuredArticle.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleBookmark(featuredArticle.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          savedArticles.includes(featuredArticle.id) 
                            ? "bg-purple-50 border-purple-200 text-purple-600" 
                            : "bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button 
                        onClick={() => handleShare(featuredArticle.id)}
                        className="p-2 rounded-xl border bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-400 transition-all flex items-center gap-1.5"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold">{copiedId === featuredArticle.id ? "Copied!" : "Share"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Title Bengali & English */}
                  <h2 
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="text-2xl sm:text-3xl font-black text-slate-900 hover:text-purple-700 transition-colors leading-tight mb-4 cursor-pointer"
                  >
                    {featuredArticle.titleBn}
                  </h2>
                  
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium line-clamp-4 mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Detailed Author Header */}
                  <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-black text-base flex-shrink-0">
                      {featuredArticle.doctorName.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{featuredArticle.doctorName}</h4>
                      <p className="text-[11px] text-slate-500 font-semibold">{featuredArticle.doctorTitle}</p>
                      <p className="text-[9px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md inline-block border border-purple-100 mt-1">
                        {featuredArticle.doctorDegrees}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="p-6 sm:p-8 pt-0 border-t border-slate-50 mt-4 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50 rounded-b-3xl">
                <div className="text-center sm:text-left">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Doctor Support Hotline</span>
                  <span className="text-lg font-black text-slate-900 flex items-center gap-1 justify-center sm:justify-start">
                    <Phone className="w-4 h-4 text-purple-600" /> Dial 10657
                  </span>
                </div>
                
                <button 
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md shadow-purple-200 flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Advice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Vertical Feed of Other Articles (5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <h3 className="text-base font-black uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span>More Health Columns</span>
            </h3>

            {remainingArticles.map((article) => (
              <div 
                key={article.id} 
                className="bg-white border border-slate-100/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 py-0.5 px-2.5 rounded-full border border-slate-200">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>

                  <h4 
                    onClick={() => setActiveArticle(article)}
                    className="text-base font-extrabold text-slate-950 group-hover:text-purple-600 transition-colors leading-snug cursor-pointer mb-3 line-clamp-2"
                  >
                    {article.titleBn || article.title}
                  </h4>

                  <p className="text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                {/* Author footer */}
                <div className="border-t border-slate-50 pt-3.5 flex items-center justify-between gap-4 mt-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center font-black text-xs flex-shrink-0">
                      {article.doctorName.split(" ").slice(-1)[0][0]}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{article.doctorName}</h5>
                      <p className="text-[9px] text-slate-400 font-semibold truncate">{article.doctorTitle}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveArticle(article)}
                    className="text-[11px] font-black text-purple-600 hover:text-purple-700 bg-purple-50 group-hover:bg-purple-100/70 border border-purple-100/60 py-1.5 px-3 rounded-lg transition-all flex items-center gap-0.5 flex-shrink-0"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Premium CTA banner to consulting doctor */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-950 rounded-3xl p-6 text-white relative overflow-hidden shadow-md mt-2">
              <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              <h4 className="text-base font-black tracking-tight">Need a Private Consultation?</h4>
              <p className="text-xs text-purple-200/90 font-medium mt-2 leading-relaxed">
                Connect with highly qualified doctors instantly. Audio/video calls available 24/7.
              </p>
              <div className="flex gap-2.5 mt-5">
                <Link 
                  href="/instant-mbbs" 
                  className="bg-white text-purple-700 font-extrabold text-[11px] py-2.5 px-4.5 rounded-xl hover:bg-purple-50 transition-all shadow-sm"
                >
                  Consult MBBS Doctor
                </Link>
                <Link 
                  href="/specialists" 
                  className="bg-purple-800/80 border border-purple-700 text-white font-bold text-[11px] py-2.5 px-4.5 rounded-xl hover:bg-purple-800 transition-all"
                >
                  View Specialists
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* FULL DETAILED READER MODAL (GLASSMORPHIC & PREMIUM) */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300">
          
          {/* Modal Card Backdrop area to close */}
          <div className="absolute inset-0 cursor-default" onClick={() => setActiveArticle(null)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-10 max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header / Doctor Bio Banner */}
            <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 sm:p-8 flex-shrink-0 flex items-start justify-between gap-6">
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-inner">
                  {activeArticle.doctorName.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="bg-purple-600/60 border border-purple-500/50 text-[9px] font-black uppercase tracking-wider py-0.5 px-2 rounded-md">
                      Verified Practitioner
                    </span>
                    <span className="bg-emerald-500/80 text-white text-[9px] font-black uppercase tracking-wider py-0.5 px-2 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> BMDC Certified
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black leading-tight">{activeArticle.doctorName}</h3>
                  <p className="text-xs text-purple-200/90 font-semibold">{activeArticle.doctorTitle}</p>
                  <p className="text-[10px] text-purple-100 font-bold bg-white/10 border border-white/5 py-0.5 px-2 rounded-md inline-block mt-1">
                    {activeArticle.doctorDegrees}
                  </p>
                </div>
              </div>

              {/* Action buttons (Close / Bookmark) */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleBookmark(activeArticle.id)}
                  className={`p-2 rounded-full border transition-all ${
                    savedArticles.includes(activeArticle.id)
                      ? "bg-white/20 border-white/30 text-pink-300"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50/50">
              
              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 mb-6 border-b border-slate-100 pb-4">
                <span className="bg-purple-100 text-purple-700 font-black px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {activeArticle.readTime}
                </span>
                <span className="text-slate-300">•</span>
                <span>Published on {activeArticle.date}</span>
              </div>

              {/* Bengali Title Header */}
              {activeArticle.titleBn && (
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-5">
                  {activeArticle.titleBn}
                </h1>
              )}

              {/* Render parsed paragraphs and lists */}
              <article className="prose prose-slate max-w-none">
                {renderArticleBody(activeArticle.content)}
              </article>

              {/* Doctor consulting call out inside article */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-5 rounded-2xl my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Consult with {activeArticle.doctorName}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Get personalized advice regarding these symptoms.</p>
                  </div>
                </div>
                
                <Link 
                  href={`/specialists?search=${activeArticle.doctorSpecialty}`}
                  className="w-full sm:w-auto bg-[#6f2c91] hover:bg-[#5b2278] text-white font-extrabold text-xs py-3 px-5 rounded-xl transition-all shadow-sm text-center"
                >
                  Book Appointment
                </Link>
              </div>

            </div>

            {/* Modal Sticky Footer actions */}
            <div className="bg-white p-5 border-t border-slate-100 flex-shrink-0 flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              <button 
                onClick={() => setActiveArticle(null)}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> <span>Back to Feed</span>
              </button>

              <div className="w-full sm:w-auto flex items-center gap-3 justify-end">
                <button 
                  onClick={() => handleShare(activeArticle.id)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs py-3.5 px-5 rounded-xl transition-all flex items-center gap-1.5 justify-center"
                >
                  <Share2 className="w-4 h-4" /> 
                  <span>{copiedId === activeArticle.id ? "Link Copied!" : "Copy Link"}</span>
                </button>
                
                <Link 
                  href="/instant-mbbs" 
                  className="bg-[#1cb0db] hover:bg-[#199ec5] text-white font-black text-xs py-3.5 px-6 rounded-xl transition-all shadow-md shadow-cyan-100 text-center flex-1 sm:flex-none"
                >
                  Consult 24/7 Doctor
                </Link>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* PREMIUM CHARCOAL FOOTER */}
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

export default function InsightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-[#6f2c91]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#6f2c91] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold">Loading Shukhee Insights...</p>
        </div>
      </div>
    }>
      <InsightsContent />
    </Suspense>
  );
}
