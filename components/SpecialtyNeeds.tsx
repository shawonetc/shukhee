"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";

const SPECIALTY_NEEDS = [
  { id: 1, name: "Cold & Fever", icon: "🌡️", desc: "Cough, flu & allergy", bg: "bg-teal-50 hover:bg-teal-100/80 border-teal-100" },
  { id: 2, name: "Performance Issues", icon: "🔥", desc: "Confidential sexual health", bg: "bg-rose-50 hover:bg-rose-100/80 border-rose-100" },
  { id: 3, name: "Skin & Acne", icon: "🧴", desc: "Itching, hair loss, eczema", bg: "bg-purple-50 hover:bg-purple-100/80 border-purple-100" },
  { id: 4, name: "Pregnancy & Period", icon: "🤰", desc: "Gynecology doubts & support", bg: "bg-orange-50 hover:bg-orange-100/80 border-orange-100" },
  { id: 5, name: "Child Nutrition", icon: "🍼", desc: "Pediatrics & physical growth", bg: "bg-amber-50 hover:bg-amber-100/80 border-amber-100" },
  { id: 6, name: "Stomach Acidity", icon: "🍽️", desc: "Gas, pain & indigestion", bg: "bg-sky-50 hover:bg-sky-100/80 border-sky-100" }
];

export default function SpecialtyNeeds() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollVal = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollVal : scrollVal,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" />
            Consult according to your need
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Get fast solutions for standard health troubles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scrollContainer("left")}
            className="p-2 rounded-full border border-slate-200 hover:bg-white text-slate-600 hover:text-purple-600 transition-all shadow-sm focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollContainer("right")}
            className="p-2 rounded-full border border-slate-200 hover:bg-white text-slate-600 hover:text-purple-600 transition-all shadow-sm focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {SPECIALTY_NEEDS.map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 w-60 p-5 rounded-2xl border ${item.bg} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xs group`}
          >
            <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{item.icon}</span>
            <h4 className="text-sm font-black text-slate-800 group-hover:text-purple-950 mb-1">
              {item.name}
            </h4>
            <p className="text-xs text-slate-500 font-medium leading-normal">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
