"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SPECIALTY_NEEDS = [
  {
    id: 1,
    name: "Cold, Cough, Allergy & Fever",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=300&auto=format&fit=crop",
    bg: "bg-[#f0f9f9]"
  },
  {
    id: 2,
    name: "Performance Issues in Bed",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=300&auto=format&fit=crop",
    bg: "bg-[#fbf2f2]"
  },
  {
    id: 3,
    name: "Itching, Acne & Skin problems",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=300&auto=format&fit=crop",
    bg: "bg-[#f5eef7]"
  },
  {
    id: 4,
    name: "Period doubts or Pregnancy",
    image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=300&auto=format&fit=crop",
    bg: "bg-[#faedf2]"
  },
  {
    id: 5,
    name: "Weight lose/gain, Diet & Stomach",
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=300&auto=format&fit=crop",
    bg: "bg-[#fdf5e6]"
  },
  {
    id: 6,
    name: "Hair fall and Dandruff",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=300&auto=format&fit=crop",
    bg: "bg-[#f0f0fa]"
  }
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Consult with Top Doctors according to your specific need
        </h2>
      </div>

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

        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {SPECIALTY_NEEDS.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-[210px] h-[260px] p-6 rounded-2xl ${item.bg} cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md relative overflow-hidden group flex flex-col justify-between`}
            >
              <h4 className="text-base font-bold text-slate-800 leading-snug tracking-tight z-10">
                {item.name}
              </h4>
              
              {/* Image Box sitting at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[60%] overflow-hidden bg-transparent">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
