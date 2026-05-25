"use client";

import React from "react";
import { Heart } from "lucide-react";

const CAREGIVER_SERVICES = [
  {
    id: "c1",
    title: "Qualified Home Nurse",
    description: "Experienced medical nurses providing post-hospitalization support, injection administration, and wound dressing at your home.",
    price: "৳800 / Visit",
    badge: "Certified Experts",
    bg: "bg-gradient-to-br from-indigo-50 to-purple-50 border-purple-100",
    btnColor: "bg-purple-600 text-white hover:bg-purple-700"
  },
  {
    id: "c2",
    title: "Elderly Care Companion",
    description: "Dedicated non-medical companions ensuring proper medication timing, meals, mobility support, and daily hygiene for parents.",
    price: "৳15,000 / Month",
    badge: "24/7 Coverage Available",
    bg: "bg-gradient-to-br from-teal-50 to-emerald-50 border-emerald-100",
    btnColor: "bg-emerald-600 text-white hover:bg-emerald-700"
  },
  {
    id: "c3",
    title: "Nanny & Babysitter",
    description: "Loving childcare providers managing feeding schedules, sensory play activities, and infant hygiene safety under parental guides.",
    price: "৳12,000 / Month",
    badge: "Verified Backgrounds",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50 border-orange-100",
    btnColor: "bg-orange-600 text-white hover:bg-orange-700"
  },
  {
    id: "c4",
    title: "Expert Physiotherapist",
    description: "Recover range of motion, relieve back or muscle pain, and fast-track stroke rehabilitation with structured home physiotherapist sessions.",
    price: "৳1,200 / Session",
    badge: "BSc Physio Doctors",
    bg: "bg-gradient-to-br from-pink-50 to-rose-50 border-rose-100",
    btnColor: "bg-rose-600 text-white hover:bg-rose-700"
  }
];

export default function CaregiverServices() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
          <Heart className="w-6 h-6 text-purple-600" />
          Home Caregiver & Nursing Services
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Get expert, caring assistance directly in the comfort of your home</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAREGIVER_SERVICES.map((c) => (
          <div
            key={c.id}
            className={`p-6 rounded-3xl border ${c.bg} flex flex-col justify-between hover:shadow-sm transition-all duration-300 group`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase text-purple-600 bg-white border border-purple-100 py-1 px-3 rounded-full shadow-inner">
                  {c.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2 group-hover:text-purple-800 transition-colors">
                {c.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                {c.description}
              </p>
            </div>

            <div className="border-t border-slate-200/50 pt-4 mt-auto">
              <span className="text-[9px] text-slate-400 font-bold block">PACKAGE STARTS FROM</span>
              <span className="text-lg font-black text-slate-900 block mb-3">{c.price}</span>
              <button className={`w-full ${c.btnColor} font-bold text-xs py-2.5 rounded-2xl transition-all shadow-sm`}>
                Book Caregiver
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
