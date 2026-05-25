"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const QUICK_CONSULTATIONS = [
  {
    id: "mbbs",
    title: "MBBS Doctor",
    subtitle: "Instant",
    fee: "50.00",
    originalFee: "200.00",
    cta: "Book Now",
    bgColor: "bg-[#e2ede7]",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "specialist",
    title: "Doctor",
    subtitle: "Specialist",
    cta: "Book Now",
    bgColor: "bg-[#eaf4fc]",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "healthstore",
    title: "HealthStore",
    subtitle: "Shukhee",
    cta: "Flash Discount",
    tag: "New",
    bgColor: "bg-[#f4f8f0]",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "wellness",
    title: "Wellness",
    subtitle: "Mental",
    cta: "Book Now",
    bgColor: "bg-[#eceffc]",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "labtest",
    title: "Lab Test",
    subtitle: "Home",
    cta: "Book Now",
    bgColor: "bg-[#e5f1fa]",
    image: "https://images.unsplash.com/photo-1579165466541-7170a290b3a3?q=80&w=300&auto=format&fit=crop"
  }
];

export default function QuickConsultations() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollVal = 320;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollVal : scrollVal,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative">
      <div className="relative group">
        {/* Floating Left Arrow */}
        <button
          onClick={() => scrollContainer("left")}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-100 shadow-md w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-purple-600 active:scale-95 transition-all focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Floating Right Arrow */}
        <button
          onClick={() => scrollContainer("right")}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-100 shadow-md w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-purple-600 active:scale-95 transition-all focus:outline-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal scroll container */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {QUICK_CONSULTATIONS.map((c) => (
            <div
              key={c.id}
              className={`flex-shrink-0 w-[330px] h-[180px] p-6 rounded-2xl ${c.bgColor} relative overflow-hidden group/card flex flex-col justify-between cursor-pointer hover:shadow-sm transition-all duration-355`}
            >
              {/* Left Side Info Area */}
              <div className="z-10 flex items-start justify-between w-full">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {c.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-none">
                    {c.title}
                  </h3>
                </div>

                {/* Top Right Badges */}
                {c.fee && c.originalFee ? (
                  <div className="bg-white px-2.5 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5 shadow-2xs text-[11px] font-bold">
                    <span className="text-slate-800">৳ {c.fee}</span>
                    <span className="text-red-400 line-through font-normal text-[10px]">৳ {c.originalFee}</span>
                  </div>
                ) : c.tag ? (
                  <span className="bg-[#6f2c91] text-white text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-2xs">
                    {c.tag}
                  </span>
                ) : null}
              </div>

              {/* Bottom Left Button */}
              <div className="z-10">
                <button className="bg-white border border-cyan-400 text-cyan-500 hover:bg-cyan-500 hover:text-white font-bold text-xs py-1.5 px-4 rounded-lg shadow-2xs transition-all flex items-center gap-1 focus:outline-none">
                  <span>{c.cta}</span>
                  <span className="text-[9px] font-black">↗</span>
                </button>
              </div>

              {/* Right Side Illustration Image */}
              <div className="absolute right-0 bottom-0 h-[85%] w-[48%] pointer-events-none z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-contain object-bottom select-none mix-blend-multiply opacity-90 group-hover/card:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
