"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

export default function WhatsAppWidget() {
  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-30 flex-col gap-3">
      <button className="bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:scale-108 hover:bg-emerald-600 transition-all flex items-center gap-2 font-bold text-xs group">
        <span className="relative flex h-2.5 w-2.5">
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageSquare className="w-4.5 h-4.5" />
        <span className="hidden sm:inline">WhatsApp Chat</span>
      </button>
    </div>
  );
}
