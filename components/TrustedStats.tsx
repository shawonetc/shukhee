"use client";

import React from "react";
import { Sparkles, ThumbsUp, Store, MapPin } from "lucide-react";

const TRUSTED_STATS = [
  { label: "No. 1 Digital Health App", desc: "Fastest-growing medical consultancy app in BD", icon: Sparkles },
  { label: "3.4M+ Total Consults", desc: "Telemedicine calls and medicine deliveries completed", icon: ThumbsUp },
  { label: "10,000+ SSK Pharmacy Partners", desc: "Local clinics providing online specialists in villages", icon: Store },
  { label: "64 Districts Covered", desc: "Providing premium healthcare support in every corner", icon: MapPin }
];

export default function TrustedStats() {
  return (
    <section className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-16 mt-20 relative overflow-hidden">
      {/* Abstract background circles */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 top-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs text-cyan-300 font-extrabold uppercase tracking-wider bg-white/10 py-1 px-4 rounded-full">
            Your Trusted Healthcare Partner
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-4">
            Making healthcare simple, authentic & accessible for all
          </h2>
          <p className="text-sm text-slate-200/80 font-medium mt-3">
            We connect patients across urban & rural areas with top-tier healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUSTED_STATS.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition-all group flex flex-col justify-between"
              >
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white leading-snug">{stat.label}</h3>
                  <p className="text-xs text-slate-200/80 font-medium mt-2 leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
