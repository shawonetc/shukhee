"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Plus } from "lucide-react";

const TRENDING_PRODUCTS = [
  {
    id: "p1",
    name: "CeraVe Foaming Facial Cleanser 236ml",
    category: "Skincare",
    price: 1650,
    originalPrice: 1800,
    discountAmount: 150,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200&auto=format&fit=crop",
    rating: 4.8
  },
  {
    id: "p2",
    name: "Cetaphil Gentle Skin Cleanser 500ml",
    category: "Skincare",
    price: 1200,
    originalPrice: 1400,
    discountAmount: 200,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
    rating: 4.7
  },
  {
    id: "p3",
    name: "Simple Kind to Skin Hydrating Facial Wash",
    category: "Skincare",
    price: 450,
    originalPrice: 550,
    discountAmount: 100,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: "p4",
    name: "Neutrogena Hydro Boost Water Gel 50ml",
    category: "Skincare",
    price: 1890,
    originalPrice: 2100,
    discountAmount: 210,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop",
    rating: 4.6
  },
  {
    id: "p5",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    category: "Skincare",
    price: 1100,
    originalPrice: 1250,
    discountAmount: 150,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200&auto=format&fit=crop",
    rating: 4.8
  }
];

interface TrendingProductsProps {
  addToCart: (product: { id: string; name: string; price: number }) => void;
}

export default function TrendingProducts({ addToCart }: TrendingProductsProps) {
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
            <Sparkles className="w-6 h-6 text-purple-600" />
            Trending Skincare & Cosmetics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">100% authentic, directly sourced top brand products</p>
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
        {TRENDING_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="flex-shrink-0 w-64 bg-white border border-slate-100 rounded-3xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative">
              {/* Discount Tag */}
              <span className="absolute top-2 left-2 z-10 bg-emerald-500 text-white text-[9px] font-black py-1 px-2.5 rounded-full uppercase tracking-wider shadow">
                ৳{prod.discountAmount} OFF
              </span>
              
              {/* Image Box */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-50 mb-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <span className="text-[10px] text-purple-600 font-black uppercase tracking-wider">{prod.category}</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 h-10 mt-1 mb-2 group-hover:text-purple-950 transition-colors">
                {prod.name}
              </h4>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-black text-slate-900">৳{prod.price}</span>
                <span className="text-xs text-slate-400 line-through font-bold">৳{prod.originalPrice}</span>
              </div>
              
              <button
                onClick={() => addToCart(prod)}
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
