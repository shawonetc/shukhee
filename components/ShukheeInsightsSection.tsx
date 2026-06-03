"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Heart, ShieldAlert, Sparkles } from "lucide-react";
import { INSIGHTS_ARTICLES } from "@/app/insights/data";

export default function ShukheeInsightsSection() {
  // We showcase the first 3 articles as a preview on the homepage
  const featuredArticle = INSIGHTS_ARTICLES[0];
  const sideArticles = INSIGHTS_ARTICLES.slice(1, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-3xl shadow-xs border border-slate-100/80 my-10 relative overflow-hidden">
      
      {/* Background decorations for a premium look */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 relative z-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-100 rounded-full py-1 px-3 text-[11px] font-black text-purple-600 uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-purple-500 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Stay Healthy, Stay Informed</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#6f2c91] flex items-center gap-2">
            Shukhee Insights
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1.5 max-w-xl">
            Reliable medical advice, healthcare tips, and wellness articles verified by Bangladesh&apos;s leading registered specialist doctors.
          </p>
        </div>

        <Link 
          href="/insights" 
          className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs py-3 px-5 rounded-xl transition-all shadow-md shadow-purple-200 hover:shadow-lg group flex-shrink-0"
        >
          <span>Explore All Insights</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Big Featured Card (8 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between group">
          <Link href={`/insights?article=${featuredArticle.id}`} className="block">
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 shadow-2xs group-hover:shadow-md transition-all duration-300">
              
              {/* Image banner */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.titleBn || featuredArticle.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Ribbon badge */}
                <div className="absolute top-4 left-4 bg-purple-600 text-white font-black text-[10px] tracking-wider uppercase py-1 px-3 rounded-md shadow-md z-10 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current text-pink-300" />
                  <span>Featured Advice</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3.5">
                  <span className="bg-purple-50 text-purple-600 font-bold px-2.5 py-0.5 rounded-full border border-purple-100">
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-purple-700 transition-colors leading-tight mb-3">
                  {featuredArticle.titleBn}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3 mb-4">
                  {featuredArticle.excerpt}
                </p>

                {/* Doctor profile card */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 font-black text-sm">
                    {featuredArticle.doctorName.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{featuredArticle.doctorName}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{featuredArticle.doctorTitle}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-bold text-purple-600 group-hover:underline flex items-center gap-0.5">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

              </div>

            </div>
          </Link>
        </div>

        {/* Right Column: Side articles list (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>More Health Insights</span>
            </h4>
            
            {sideArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/insights?article=${article.id}`}
                className="block group/item"
              >
                <div className="bg-slate-50/50 hover:bg-white hover:shadow-xs border border-slate-100/60 rounded-xl p-4 transition-all duration-300 flex items-start gap-4">
                  
                  {/* Thumbnail / Doctor Icon container */}
                  <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover/item:scale-105 transition-transform border border-purple-100">
                    <Heart className="w-5 h-5 fill-current text-purple-400" />
                  </div>
                  
                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full border border-slate-200 uppercase tracking-wide">
                      {article.category.split(" ")[0]}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-950 line-clamp-2 mt-1.5 group-hover/item:text-purple-600 transition-colors leading-snug">
                      {article.titleBn || article.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1 truncate">
                      By {article.doctorName}
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>

          {/* Quick Hotline block */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-100 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Need Immediate Advice?</h4>
                <p className="text-[10px] text-slate-500 font-medium">Talk directly to registered doctors 24/7.</p>
              </div>
            </div>
            <Link 
              href="/instant-mbbs" 
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-[11px] py-2.5 px-4 rounded-xl transition-all shadow-xs"
            >
              Consult Now
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}
