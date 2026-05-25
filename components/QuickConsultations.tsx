"use client";

import React from "react";

const QUICK_CONSULTATIONS = [
  {
    id: "mbbs",
    title: "MBBS Doctor",
    subtitle: "Instant",
    fee: "50.00",
    originalFee: "200.00",
    cta: "Book Now",
    bgColor: "bg-[#e2f3ee]",
    btnColor: "border border-cyan-400 text-cyan-500 bg-white",
    textColor: "text-slate-800",
    image: "/doctor_team.png"
  },
  {
    id: "specialist",
    title: "Specialist Doctor",
    subtitle: "Select expert",
    fee: "250.00",
    originalFee: "500.00",
    cta: "Book Now",
    bgColor: "bg-[#e6f4fb]",
    btnColor: "border border-blue-450 text-blue-500 bg-white",
    textColor: "text-slate-800",
    image: "/doctor_team.png"
  }
];

export default function QuickConsultations() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 md:grid md:grid-cols-2 md:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {QUICK_CONSULTATIONS.map((c) => (
          <div
            key={c.id}
            className={`flex-shrink-0 w-[85%] sm:w-auto md:w-full min-h-[220px] p-6 sm:p-8 rounded-3xl ${c.bgColor} border border-slate-100/50 shadow-sm relative overflow-hidden group flex flex-col justify-between`}
          >
            {/* Top Row: Subtitle and Price Tag */}
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {c.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                  {c.title}
                </h3>
              </div>
              
              {/* Price container */}
              <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5 shadow-xs text-[11px] sm:text-xs font-bold">
                <span className="text-slate-800">৳ {c.fee}</span>
                <span className="text-red-500 line-through font-normal text-[10px]">৳ {c.originalFee}</span>
              </div>
            </div>

            {/* Bottom Row: CTA Button */}
            <div className="z-10 mt-6">
              <button className={`${c.btnColor} font-black text-xs py-2 px-4 rounded-lg shadow-xs hover:scale-102 transition-all inline-flex items-center gap-1`}>
                <span>{c.cta}</span>
                <span className="text-[10px]">↗</span>
              </button>
            </div>

            {/* Absolute Doctor Cutout Image */}
            <div className="absolute right-0 bottom-0 h-[85%] w-[45%] pointer-events-none z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-contain object-bottom select-none"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
