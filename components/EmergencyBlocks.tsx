"use client";

import React from "react";
import { Truck, Phone, Droplet, Plus } from "lucide-react";

export default function EmergencyBlocks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* AMBULANCE */}
        <div className="p-6 bg-rose-50/70 border border-rose-100 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xs transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0">
            <Truck className="w-8 h-8" />
          </div>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h4 className="text-base font-black text-rose-950">Emergency ICU Ambulance Booking</h4>
            <p className="text-xs text-rose-700/80 font-medium leading-relaxed max-w-sm">
              Get immediate dispatch of Oxygen and ICU enabled emergency vehicles to your home in 5 clicks.
            </p>
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2 px-4 rounded-full mt-2 inline-flex items-center gap-1.5 shadow-sm transition-all">
              <Phone className="w-3.5 h-3.5" /> Book Ambulance (24/7)
            </button>
          </div>
        </div>

        {/* BLOOD BANK */}
        <div className="p-6 bg-rose-50/70 border border-rose-100 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xs transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
            <Droplet className="w-8 h-8" />
          </div>
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h4 className="text-base font-black text-rose-950">Active Donor Blood Bank</h4>
            <p className="text-xs text-rose-700/80 font-medium leading-relaxed max-w-sm">
              Submit an instant blood group request to alert volunteer emergency blood donors residing near your location.
            </p>
            <button className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs py-2 px-4 rounded-full mt-2 inline-flex items-center gap-1.5 shadow-sm transition-all">
              <Plus className="w-3.5 h-3.5" /> Find Blood Donor
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
