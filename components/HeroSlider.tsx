"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/slider/1.png",
    alt: "Shukhee Medical Consultation Banner"
  },
  {
    id: 2,
    image: "/slider/2.png",
    alt: "Shukhee Care Home Deliveries"
  }
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Automatic Hero slider animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative w-full aspect-[2/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-white">

        {/* SLIDES */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* SLIDER NAVIGATION CHEVRONS */}
        <button
          onClick={() => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs transition-all opacity-0 hover:opacity-100 sm:opacity-100 focus:outline-none"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs transition-all opacity-0 hover:opacity-100 sm:opacity-100 focus:outline-none"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* SLIDER DOTS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${idx === activeSlide ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
