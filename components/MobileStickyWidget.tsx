"use client";

import React from "react";
import { Phone } from "lucide-react";

export default function MobileStickyWidget() {
  return (
    <div className="fixed bottom-22 right-6 z-30 md:hidden">
      <button className="relative w-16 h-16 rounded-full bg-white border-2 border-cyan-400 shadow-2xl flex items-center justify-center p-0.5 group active:scale-95 transition-all">
        
        {/* Pulsing Outer cyan border for attention */}
        <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30 pointer-events-none" />

        {/* Doctor team avatar inside */}
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/doctor_team.png" 
            alt="Doctors Call" 
            className="w-full h-full object-cover object-top select-none" 
          />
        </div>

        {/* Pulsing Live indicator green dot on top-right */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-sm" />
        </span>

        {/* Floating Phone badge on bottom-right */}
        <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-white rounded-full p-1.5 shadow-md border border-white">
          <Phone className="w-3.5 h-3.5 fill-current" />
        </div>
      </button>
    </div>
  );
}

