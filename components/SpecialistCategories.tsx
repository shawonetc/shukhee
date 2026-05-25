"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, ChevronRight } from "lucide-react";

const SPECIALTIES = [
  { name: "Cardiology", banglaName: "হৃদরোগ", desc: "Heart & Vascular care" },
  { name: "Gynecology", banglaName: "স্ত্রী ও প্রসূতি রোগ", desc: "Pregnancy & Female health" },
  { name: "Dermatology", banglaName: "চর্ম ও যৌন রোগ", desc: "Skin, Hair & Allergy experts" },
  { name: "Pediatrics", banglaName: "নবজাতক ও শিশু রোগ", desc: "Infant & Child wellbeing" },
  { name: "General Medicine", banglaName: "জেনারেল মেডিসিন", desc: "Cough, Fever, Diabetes, BP" },
  { name: "Orthopedics", banglaName: "হাড় ও জোড় রোগ", desc: "Joint pain, Fractures, Spine" },
  { name: "Psychiatry", banglaName: "মানসিক রোগ", desc: "Depression, Anxiety, Stress" },
  { name: "Dentistry", banglaName: "দন্ত ও মুখ রোগ", desc: "Teeth, Gum & Oral hygiene" }
];

export default function SpecialistCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-purple-600" />
            Specialist Doctor Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Book online chambers with veteran professionals in BD</p>
        </div>
        <Link href="/specialists" className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 border border-purple-100 py-2 px-4 rounded-full">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {SPECIALTIES.map((spec, idx) => (
          <Link
            key={idx}
            href="/specialists"
            className="p-5 bg-white border border-sky-100/70 rounded-2xl hover:border-purple-200 hover:shadow-sm transition-all duration-300 cursor-pointer group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg group-hover:bg-purple-600 group-hover:text-white transition-all">
              {idx % 4 === 0 ? "❤️" : idx % 4 === 1 ? "🤰" : idx % 4 === 2 ? "🧴" : "👶"}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950 group-hover:text-purple-700 transition-colors">
                {spec.name}
              </h4>
              <p className="text-xs text-purple-600 font-medium mt-0.5">{spec.banglaName}</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wide">{spec.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
