"use client";

import React from "react";

const HOSPITAL_PARTNERS = [
  "Evercare Hospital",
  "Square Hospitals",
  "Labaid Specialized",
  "United Hospital",
  "Ibn Sina Hospital",
  "Popular Medical College"
];

export default function FeaturedBrands() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <h3 className="text-center text-xs text-slate-400 font-extrabold uppercase tracking-widest mb-8">
        Featured Brands & Pharmacy Partners
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center opacity-60">
        {HOSPITAL_PARTNERS.map((partner, idx) => (
          <div key={idx} className="bg-white border border-slate-100 py-4 px-3 rounded-2xl text-center font-bold text-xs text-slate-500 shadow-2xs hover:scale-102 transition-all">
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
}
