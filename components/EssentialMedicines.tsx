"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Droplet, Plus } from "lucide-react";

const ESSENTIAL_MEDICINES = [
  {
    id: "m1",
    name: "Napa Extra Tablet (Paracetamol/Caffeine)",
    category: "Fever & Pain",
    price: 30,
    originalPrice: 35,
    discountAmount: 5,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop",
    pack: "1 Leaf (12 Tablets)"
  },
  {
    id: "m2",
    name: "Orva 40mg Tablet (Olmesartan Medoxomil)",
    category: "Blood Pressure",
    price: 80,
    originalPrice: 90,
    discountAmount: 10,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=200&auto=format&fit=crop",
    pack: "1 Leaf (10 Tablets)"
  },
  {
    id: "m3",
    name: "Fexo 120mg Tablet (Fexofenadine HCl)",
    category: "Allergy & Cold",
    price: 90,
    originalPrice: 100,
    discountAmount: 10,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=200&auto=format&fit=crop",
    pack: "1 Leaf (10 Tablets)"
  },
  {
    id: "m4",
    name: "Proviten Junior Syrup 100ml",
    category: "Supplements",
    price: 120,
    originalPrice: 130,
    discountAmount: 10,
    image: "https://images.unsplash.com/photo-1611079830811-b65d1a34c895?q=80&w=200&auto=format&fit=crop",
    pack: "1 Bottle"
  },
  {
    id: "m5",
    name: "Dermex Anti-Itching Topical Spray",
    category: "Skin Reliever",
    price: 250,
    originalPrice: 280,
    discountAmount: 30,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=200&auto=format&fit=crop",
    pack: "1 Spray Can"
  }
];

interface EssentialMedicinesProps {
  addToCart: (product: { id: string; name: string; price: number }) => void;
}

export default function EssentialMedicines({ addToCart }: EssentialMedicinesProps) {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-purple-600" />
            Essential Medicines
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Get standard, authentic prescription pills delivered at 10% off</p>
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
        className="flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {ESSENTIAL_MEDICINES.map((med) => (
          <div
            key={med.id}
            className="flex-shrink-0 w-64 bg-white border border-slate-100 rounded-3xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative">
              {/* Discount Tag */}
              <span className="absolute top-2 left-2 z-10 bg-emerald-500 text-white text-[9px] font-black py-1 px-2.5 rounded-full uppercase tracking-wider shadow">
                ৳{med.discountAmount} OFF
              </span>
              
              {/* Image Box */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-50 mb-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={med.image}
                  alt={med.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <span className="text-[10px] text-purple-600 font-black uppercase tracking-wider">{med.category}</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 h-10 mt-1 mb-1 group-hover:text-purple-950 transition-colors">
                {med.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold mb-2">{med.pack}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-black text-slate-900">৳{med.price}</span>
                <span className="text-xs text-slate-400 line-through font-bold">৳{med.originalPrice}</span>
              </div>
              
              <button
                onClick={() => addToCart(med)}
                className="w-full bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white font-bold text-xs py-2.5 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add To Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
