"use client";

import React from "react";
import Link from "next/link";
import { FileText, CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* BRAND LICENSING FOOTER NOTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center border-t border-slate-200/50 pt-8 pb-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white py-2 px-6 rounded-full border border-slate-100 text-[10px] sm:text-xs font-semibold text-slate-500 shadow-2xs">
          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-purple-500" /> DBID ID: 809954636</span>
          <span className="text-slate-200">|</span>
          <span>Reg No: 10292 / E-Commerce BD</span>
          <span className="text-slate-200">|</span>
          <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> DGDA Approved Pharmacists</span>
        </div>
      </section>

      {/* PREMIUM CHARCOAL FOOTER */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 mt-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold tracking-tight text-white flex items-center">
              shukhee<span className="text-purple-500">.com</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              We deliver premium, certified digital healthcare consultations, home caregiver companion systems, and authentic medicine supplies right to your home in Bangladesh.
            </p>
            <div className="pt-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">SUPPORT DESK EMAIL</span>
              <span className="text-sm font-bold text-white block">care@shukhee.com</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-extrabold text-white mb-6 uppercase tracking-wider">Telemedicine Services</h4>
            <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Instant MBBS Call (৳50)</Link></li>
              <li><Link href="/specialists" className="hover:text-white transition-colors">Book Specialists online</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Digital Prescription Log</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Home Diagnostic Collection</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Surgery Referral Guidelines</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-extrabold text-white mb-6 uppercase tracking-wider">Company Policies</h4>
            <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">About Shukhee Care</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Medicine Delivery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Patient Privacy Guidelines</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">SSK Agent Merchant Rules</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Corporate Office</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white mb-6 uppercase tracking-wider">Download Our Mobile App</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Get our digital medicine drawer, instant notification reports, and expert medical chats directly inside your mobile application.
            </p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 hover:bg-slate-800 transition-all text-center">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">GET IT ON</span>
                <span className="text-xs font-black text-white">Google Play</span>
              </button>
              <button className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 hover:bg-slate-800 transition-all text-center">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">DOWNLOAD ON THE</span>
                <span className="text-xs font-black text-white">App Store</span>
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM BRAND ROW */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Shukhee Digital Care Bangladesh. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
