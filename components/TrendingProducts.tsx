"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TRENDING_PRODUCTS = [
  {
    id: "p1",
    name: "Simple Kind to Skin Hydrating Facial Wash",
    price: 375,
    originalPrice: 850,
    discountAmount: 475,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "p2",
    name: "Eid Dessert Special",
    price: 599,
    originalPrice: 680,
    discountAmount: 81,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "p3",
    name: "Harpic & Lizol Citrus & Pine Toilet Cleaner Combo",
    price: 280,
    originalPrice: 340,
    discountAmount: 60,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "p4",
    name: "Christian Dean Secret Tone Up Sun Cream 70ml",
    price: 410,
    originalPrice: 892,
    discountAmount: 482,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "p5",
    name: "Cerave Foaming Facial Cleanser 236ml",
    price: 1283,
    originalPrice: 2241,
    discountAmount: 958,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "p6",
    name: "Lux Body Wash Black Orchid & Juniper Oil 245ml",
    price: 190,
    originalPrice: 200,
    discountAmount: 10,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "p7",
    name: "Snack Time Combo Pack (Instant Noodles & Juice)",
    price: 199,
    originalPrice: 225,
    discountAmount: 26,
    image: "https://images.unsplash.com/photo-1599490659223-e153cb53c58a?q=80&w=200&auto=format&fit=crop"
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative">
      
      {/* Header Title */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Trending Products
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

        {/* Products Carousel */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {TRENDING_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="flex-shrink-0 w-[210px] min-h-[350px] bg-white border border-slate-100/80 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group/card"
            >
              <div className="relative">
                {/* Discount Tag on Top Right */}
                <span className="absolute top-0 right-0 z-10 bg-[#e2f3ee] text-[#1eb2a6] text-[10px] font-bold py-1 px-2.5 rounded-lg border border-[#c4e6db]/30 shadow-2xs">
                  ৳ {prod.discountAmount.toFixed(2)} OFF
                </span>
                
                {/* Image Box */}
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-50/50 mb-4 flex items-center justify-center border border-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="object-contain max-h-[85%] max-w-[85%] group-hover/card:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Name */}
                <h4 className="text-xs sm:text-sm font-semibold text-slate-700 line-clamp-2 h-10 mt-1 mb-2 group-hover/card:text-cyan-600 transition-colors">
                  {prod.name}
                </h4>
              </div>

              {/* Pricing & Add To Cart Button */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-bold text-slate-900">৳ {prod.price.toFixed(2)}</span>
                  <span className="text-[11px] text-slate-400 line-through">৳ {prod.originalPrice.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={() => addToCart({ id: prod.id, name: prod.name, price: prod.price })}
                  className="w-full bg-white border border-cyan-400 text-cyan-500 hover:bg-cyan-500 hover:text-white font-bold text-xs py-2 rounded-lg transition-all shadow-2xs flex items-center justify-center focus:outline-none"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
