"use client";

import React from "react";
import { Store, CheckCircle } from "lucide-react";

export default function SSKNetwork() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-10">
        
        <div className="max-w-lg space-y-4">
          <div className="flex items-center gap-2 text-purple-600 font-extrabold uppercase text-xs tracking-wider">
            <Store className="w-5 h-5" />
            <span>Shukhee Sheba Kendra (SSK) Network</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Bridging the gap in rural healthcare access points
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            SSK pharmacies are our certified offline medical centers located in thousands of villages and neighborhoods. Patients can consult urban specialist doctors directly with the support of our trusted pharmacy merchants.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs sm:text-sm font-semibold text-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>10,000+ SSK Centers Nationwide</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>On-spot Pulse & Vitals Logging</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Printed Prescription Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Cash on Delivery checkout support</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96 rounded-3xl bg-slate-50 border border-slate-100 p-6 flex flex-col justify-center space-y-5 text-center">
          <div className="text-5xl">🏪</div>
          <h3 className="text-base font-black text-slate-950">Register your pharmacy as an SSK merchant</h3>
          <p className="text-xs text-slate-500 leading-normal font-medium">
            Multiply your patient sales count, expand your pharmacy reputation, and earn high commissions as an ambassador.
          </p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-2xl transition-all shadow-md">
            Apply For SSK License
          </button>
        </div>

      </div>
    </section>
  );
}
