"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { INSIGHTS_ARTICLES } from "@/app/insights/data";

export default function ShukheeInsightsSection() {
  // We showcase the first 3 articles as a preview on the homepage in a minimal 3-column grid
  const articles = INSIGHTS_ARTICLES.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white my-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            MedicareBD <span className="text-[#1cb0db]">Insights</span>
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Reliable medical advice and wellness articles verified by registered specialist doctors.
          </p>
        </div>

        <Link 
          href="/insights" 
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1cb0db] hover:text-[#179ec4] transition-colors group"
        >
          <span>Explore All Insights</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Minimal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={`/insights?article=${article.id}`} 
            className="group flex flex-col justify-between"
          >
            <div className="w-full">
              {/* Image with zoom effect */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-xl mb-4 border border-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={article.image} 
                  alt={article.titleBn || article.title} 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Tag & Time */}
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-2">
                <span className="text-[#1cb0db] uppercase tracking-wider">
                  {article.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#1cb0db] transition-colors mb-2 line-clamp-2">
                {article.titleBn || article.title}
              </h3>
              
              {/* Excerpt */}
              <p className="text-slate-500 text-xs leading-relaxed font-semibold line-clamp-2 mb-4">
                {article.excerpt}
              </p>
            </div>

            {/* Author Doctor */}
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 mt-auto">
              <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1cb0db] font-black text-xs">
                {article.doctorName.split(" ").slice(-1)[0][0]}
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-bold text-slate-800 truncate">{article.doctorName}</h4>
                <p className="text-[9px] text-slate-400 font-bold truncate">{article.doctorTitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
