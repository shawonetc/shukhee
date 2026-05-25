"use client";

import React from "react";
import Link from "next/link";
import {
  Syringe,
  Heart,
  Activity,
  Sparkles,
  Stethoscope,
  Scissors,
  Baby,
  Droplets,
  Brain,
  Apple,
  UserRound
} from "lucide-react";

// Beautiful custom Tooth SVG for Dentistry
const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1 5.5 2 7.5.5 1 1 2.5 1 4.5 0 1 .5 1.5 1.5 1.5.8 0 1.5-.5 1.5-1.5 0-1.5.5-2 1-3 .5 1 1 1.5 1 3 0 1 .7 1.5 1.5 1.5 1 0 1.5-.5 1.5-1.5 0-2 .5-3.5 1-4.5 1-2 2-4 2-7.5 0-3.5-2.5-6-6-6Z" />
    <path d="M12 2v6" />
  </svg>
);

const SPECIALTIES = [
  { name: "Anesthesiology", icon: Syringe },
  { name: "Cardiology", icon: Heart },
  { name: "Colorectal Surgery", icon: Activity },
  { name: "Dentistry", icon: ToothIcon },
  { name: "Dermatology and...", icon: Sparkles },
  { name: "Endocrinology", icon: Activity },
  { name: "Gastroenterology", icon: Activity },
  { name: "General Physician", icon: Stethoscope },
  { name: "General Surgery", icon: Scissors },
  { name: "Gynaecology and...", icon: Baby },
  { name: "Haematology", icon: Droplets },
  { name: "Hepatology", icon: Activity },
  { name: "Internal medicine", icon: Stethoscope },
  { name: "Nephrology", icon: Activity },
  { name: "Neuromedicine", icon: Brain },
  { name: "Neurosurgery", icon: Brain },
  { name: "Nutritionist", icon: Apple },
  { name: "Oncology", icon: Activity },
  { name: "Orthopedics", icon: Activity },
  { name: "Otolaryngology(ENT)", icon: UserRound }
];

export default function SpecialistCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      
      {/* Header and View More */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Specialist Doctor Categories
        </h2>
        <Link 
          href="/specialists" 
          className="border border-cyan-400 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all font-bold text-xs py-2 px-4 rounded-lg focus:outline-none"
        >
          View More
        </Link>
      </div>

      {/* Grid of specialties */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {SPECIALTIES.map((spec, idx) => {
          const IconComponent = spec.icon;
          return (
            <Link
              key={idx}
              href="/specialists"
              className="flex items-center gap-2 sm:gap-3.5 bg-white border border-slate-100/70 rounded-xl p-3 sm:p-4 hover:border-cyan-200 hover:shadow-xs transition-all duration-300 cursor-pointer group"
            >
              {/* Colored Medical Icon */}
              <div className="text-cyan-500 group-hover:scale-108 transition-transform duration-300 flex-shrink-0">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              
              {/* Category Name */}
              <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors truncate">
                {spec.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
