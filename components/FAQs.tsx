"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQs_DATA = [
  {
    q: "How does the Instant MBBS doctor consultation work?",
    a: "It's simple and extremely fast! Click the 'Instant MBBS Doctor' button, input your basic details, and select video or audio. Within 10 minutes, a certified GP doctor will join the call. Post-call, you will immediately receive a digital PDF prescription on your phone dashboard via WhatsApp or SMS."
  },
  {
    q: "What is a Shukhee Sheba Kendra (SSK)?",
    a: "SSK represents our official partner pharmacy network across Bangladesh. For rural patients who lack smartphones or fast internet, they can visit any designated local SSK pharmacy. The pharmacist will use our premium merchant app to connect the patient to top city specialist doctors via high-quality video links, take electronic vitals, and coordinate physical medicine deliveries."
  },
  {
    q: "How long does home delivery of medicine take?",
    a: "For Dhaka Metropolitan City, we deliver within 2 to 6 hours. For orders placed outside of Dhaka, deliveries are processed via standard courier express services and typically arrive within 24 to 48 hours. All medicines are stored in temperature-controlled boxes and sourced directly from licensed pharma companies."
  },
  {
    q: "Can I book specialized surgery operations via Shukhee?",
    a: "Yes! Shukhee has tied up with over 100+ premier national and international hospitals. We coordinate patient files, book specialists, secure upfront discounts of up to 50% on surgical beds/operation procedures, and manage the complete post-discharge diagnostic follow-ups."
  }
];

export default function FAQs() {
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-20">
      <div className="text-center mb-10">
        <HelpCircle className="w-10 h-10 text-purple-600 mx-auto mb-3" />
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Get transparent information on our patient workflows</p>
      </div>

      <div className="space-y-4">
        {FAQs_DATA.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs cursor-pointer"
            onClick={() => setFaqOpenIdx(faqOpenIdx === idx ? null : idx)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-950 flex items-start gap-2.5">
                <span className="text-purple-600 font-black">Q.</span>
                <span className="leading-tight">{faq.q}</span>
              </h4>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${faqOpenIdx === idx ? "rotate-180 text-purple-600" : ""}`} />
            </div>
            
            {faqOpenIdx === idx && (
              <div className="mt-3 pl-6 border-t border-slate-100/50 pt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
