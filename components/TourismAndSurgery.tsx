"use client";

import React from "react";
import { CheckCircle, Calendar, Globe, ShieldCheck, Award } from "lucide-react";

export default function TourismAndSurgery() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BANNER 1: MEDICAL TOURISM */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-8 relative overflow-hidden shadow-sm group">
          <div className="relative z-10 max-w-sm space-y-4">
            <span className="bg-white/10 backdrop-blur-md text-[10px] text-cyan-300 font-black py-1 px-3.5 rounded-full uppercase tracking-wider border border-white/5">
              Medical Tourism Guide
            </span>
            <h3 className="text-2xl font-black tracking-tight leading-tight">
              Get specialized medical treatment in India
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Complete doctor panel referrals, easy diagnostic file sharing, travel booking assistance, and local logistics in Chennai, Bangalore, and Kolkata.
            </p>
            <ul className="text-xs text-slate-200 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-300" /> Free Doctor Portfolio Reviews
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-300" /> Indian Visa Documentation Support
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-300" /> 24/7 Helpline in India
              </li>
            </ul>
            <button className="bg-cyan-400 text-slate-950 font-extrabold text-xs py-3 px-6 rounded-full hover:bg-cyan-300 transition-all hover:scale-102 flex items-center gap-1.5 shadow-lg shadow-cyan-950/40">
              <Calendar className="w-4 h-4" />
              <span>Schedule Consultation</span>
            </button>
          </div>
          
          {/* Background art */}
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-15 group-hover:scale-105 transition-all text-white pointer-events-none">
            <Globe className="w-64 h-64" />
          </div>
        </div>

        {/* BANNER 2: SURGERY BOOKING */}
        <div className="bg-gradient-to-br from-purple-900 to-purple-950 text-white rounded-3xl p-8 relative overflow-hidden shadow-sm group">
          <div className="relative z-10 max-w-sm space-y-4">
            <span className="bg-white/10 backdrop-blur-md text-[10px] text-purple-300 font-black py-1 px-3.5 rounded-full uppercase tracking-wider border border-white/5">
              Up to 50% discount
            </span>
            <h3 className="text-2xl font-black tracking-tight leading-tight">
              Secure flat discounts on major surgeries
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Through our local network of 100+ premier partner hospitals across Bangladesh. Book operations with absolute ease and transparency.
            </p>
            <ul className="text-xs text-slate-200 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-300" /> Pre-negotiated operation costs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-300" /> Post-surgery rehab coverage
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-300" /> 0% EMI payment schemes
              </li>
            </ul>
            <button className="bg-purple-500 text-white font-extrabold text-xs py-3 px-6 rounded-full hover:bg-purple-400 transition-all hover:scale-102 flex items-center gap-1.5 shadow-lg shadow-purple-950/40">
              <ShieldCheck className="w-4 h-4" />
              <span>Book Surgery Slots</span>
            </button>
          </div>
          
          {/* Background art */}
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-15 group-hover:scale-105 transition-all text-white pointer-events-none">
            <Award className="w-64 h-64" />
          </div>
        </div>

      </div>
    </section>
  );
}
