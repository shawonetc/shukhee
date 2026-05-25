"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, Star, Clock, ShieldCheck, Phone, ArrowRight,
  ChevronLeft, Stethoscope, Heart, Brain, Baby, Bone, Eye as EyeIcon,
  Pill, Activity, Smile, Wind, Droplet, Scissors, Zap, Users,
  ShoppingCart, User, Globe, Menu, X, ChevronRight,
} from "lucide-react";

const SPECIALTIES = [
  { id: "cardiology", name: "Cardiology", bn: "হৃদরোগ", icon: Heart, desc: "Heart & Vascular care", color: "from-rose-500 to-pink-600", bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-600", doctors: 42 },
  { id: "gynecology", name: "Gynecology", bn: "স্ত্রী ও প্রসূতি রোগ", icon: Users, desc: "Pregnancy & Female health", color: "from-pink-500 to-fuchsia-600", bg: "bg-pink-50", border: "border-pink-100", text: "text-pink-600", doctors: 56 },
  { id: "dermatology", name: "Dermatology", bn: "চর্ম ও যৌন রোগ", icon: Droplet, desc: "Skin, Hair & Allergy experts", color: "from-purple-500 to-violet-600", bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600", doctors: 38 },
  { id: "pediatrics", name: "Pediatrics", bn: "নবজাতক ও শিশু রোগ", icon: Baby, desc: "Infant & Child wellbeing", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-600", doctors: 61 },
  { id: "general-medicine", name: "General Medicine", bn: "জেনারেল মেডিসিন", icon: Stethoscope, desc: "Cough, Fever, Diabetes, BP", color: "from-cyan-500 to-teal-600", bg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600", doctors: 89 },
  { id: "orthopedics", name: "Orthopedics", bn: "হাড় ও জোড় রোগ", icon: Bone, desc: "Joint pain, Fractures, Spine", color: "from-indigo-500 to-blue-600", bg: "bg-indigo-50", border: "border-indigo-100", text: "text-indigo-600", doctors: 33 },
  { id: "psychiatry", name: "Psychiatry", bn: "মানসিক রোগ", icon: Brain, desc: "Depression, Anxiety, Stress", color: "from-violet-500 to-purple-600", bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-600", doctors: 27 },
  { id: "dentistry", name: "Dentistry", bn: "দন্ত ও মুখ রোগ", icon: Smile, desc: "Teeth, Gum & Oral hygiene", color: "from-sky-500 to-blue-600", bg: "bg-sky-50", border: "border-sky-100", text: "text-sky-600", doctors: 44 },
  { id: "ophthalmology", name: "Ophthalmology", bn: "চক্ষু রোগ", icon: EyeIcon, desc: "Vision, Cataract, Glaucoma", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600", doctors: 29 },
  { id: "ent", name: "ENT", bn: "নাক কান গলা রোগ", icon: Wind, desc: "Ear, Nose & Throat specialist", color: "from-teal-500 to-cyan-600", bg: "bg-teal-50", border: "border-teal-100", text: "text-teal-600", doctors: 31 },
  { id: "neurology", name: "Neurology", bn: "স্নায়ুরোগ", icon: Zap, desc: "Brain, Nerve & Spine disorders", color: "from-fuchsia-500 to-pink-600", bg: "bg-fuchsia-50", border: "border-fuchsia-100", text: "text-fuchsia-600", doctors: 22 },
  { id: "urology", name: "Urology", bn: "মূত্ররোগ", icon: Activity, desc: "Kidney, Bladder & Prostate", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600", doctors: 25 },
  { id: "gastroenterology", name: "Gastroenterology", bn: "পরিপাকতন্ত্র রোগ", icon: Pill, desc: "Stomach, Liver & Digestion", color: "from-orange-500 to-red-600", bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-600", doctors: 35 },
  { id: "endocrinology", name: "Endocrinology", bn: "হরমোন ও ডায়াবেটিস", icon: Activity, desc: "Diabetes, Thyroid, Hormones", color: "from-lime-500 to-green-600", bg: "bg-lime-50", border: "border-lime-100", text: "text-lime-600", doctors: 18 },
  { id: "pulmonology", name: "Pulmonology", bn: "বক্ষব্যাধি", icon: Wind, desc: "Asthma, COPD, Lung care", color: "from-slate-500 to-gray-600", bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", doctors: 20 },
  { id: "surgery", name: "General Surgery", bn: "সার্জারি", icon: Scissors, desc: "Surgical operations & procedures", color: "from-red-500 to-rose-600", bg: "bg-red-50", border: "border-red-100", text: "text-red-600", doctors: 47 },
];

const FEATURED_DOCTORS = [
  { id: "d1", name: "Dr. Md. Monzurul Haque", specialty: "Dermatology", degrees: "MBBS, DDV, MRCP PACES (UK)", fee: 299, exp: 6, rating: 4.8, reviews: 312, available: true },
  { id: "d2", name: "Dr. Nandita Nandi", specialty: "Pediatrics", degrees: "MBBS(RU), DCH(BMU), FCPS", fee: 200, exp: 7, rating: 4.9, reviews: 489, available: true },
  { id: "d3", name: "Dr. Dardia Jaman", specialty: "Gynecology", degrees: "MBBS, FCPS(Final Part), MRCOG (UK)", fee: 350, exp: 9, rating: 4.7, reviews: 256, available: false },
  { id: "d4", name: "Dr. Zahidul Islam", specialty: "Dermatology", degrees: "M.B.B.S, FCPS (Part-2 Trainee)", fee: 300, exp: 6, rating: 4.6, reviews: 178, available: true },
  { id: "d5", name: "Dr. Muhaimen Salit", specialty: "Orthopedics", degrees: "MBBS, FCPS(FP), FCGP, PGT", fee: 300, exp: 9, rating: 4.8, reviews: 345, available: true },
  { id: "d6", name: "Dr. Soumitra Paul", specialty: "Pediatrics", degrees: "M.B.B.S, B.C.S. (Health), M.D.", fee: 400, exp: 14, rating: 4.9, reviews: 567, available: true },
  { id: "d7", name: "Dr. Sadia Iffat Anam", specialty: "General Medicine", degrees: "MBBS, DMU", fee: 300, exp: 10, rating: 4.5, reviews: 203, available: false },
  { id: "d8", name: "Dr. Zakir Hossen", specialty: "General Medicine", degrees: "MBBS, PGT(Medicine), CCD(Birdem)", fee: 400, exp: 10, rating: 4.7, reviews: 289, available: true },
];

export default function SpecialistsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredSpecialties = SPECIALTIES.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.bn.includes(search) || s.desc.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDoctors = FEATURED_DOCTORS.filter(
    (d) => selectedSpecialty === "all" || d.specialty.toLowerCase().replace(/\s/g, "-") === selectedSpecialty
  );

  const totalDoctors = SPECIALTIES.reduce((sum, s) => sum + s.doctors, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="relative flex flex-col group cursor-pointer">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                shukhee<span className="text-purple-600">.com</span>
              </span>
              <svg className="absolute -bottom-2 left-0 w-28 sm:w-36 h-2 text-cyan-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M5,1 Q50,9 95,1" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
              </svg>
            </Link>
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden lg:flex items-center gap-2.5 bg-purple-50 border border-purple-100 rounded-full py-1.5 pl-2.5 pr-4">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-purple-600 font-semibold tracking-wider uppercase">Hotline 24/7</p>
                  <p className="text-sm font-bold text-slate-800">10657</p>
                </div>
              </div>
              <Link href="/login" className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-sm font-semibold py-2.5 px-5 rounded-full hover:from-slate-700 hover:to-slate-800 shadow-sm transition-all">
                <User className="w-4 h-4" />
                <span>Login / Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-950 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-xs font-bold text-cyan-300">Specialist Doctors</span>
          </div>

          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full py-1.5 px-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-300">{totalDoctors}+ Doctors Available</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Specialist Doctor{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">Categories</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/80 font-medium leading-relaxed max-w-lg">
              Book online consultations with Bangladesh&apos;s top verified specialist doctors. Get expert medical advice from the comfort of your home.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search specialties (e.g. Cardiology, Dermatology)..."
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder-slate-400 border border-white/20 rounded-2xl py-4 pl-14 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTY CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSpecialties.map((spec) => {
            const IconComp = spec.icon;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(selectedSpecialty === spec.id ? "all" : spec.id)}
                className={`relative p-5 sm:p-6 rounded-3xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 text-left group overflow-hidden ${
                  selectedSpecialty === spec.id ? "ring-2 ring-purple-500 border-purple-200 shadow-purple-100" : `${spec.border} hover:border-purple-200`
                }`}
              >
                {/* Gradient accent top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${spec.color} opacity-0 group-hover:opacity-100 transition-opacity ${selectedSpecialty === spec.id ? "!opacity-100" : ""}`} />

                <div className={`w-11 h-11 rounded-2xl ${spec.bg} ${spec.text} flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-purple-700 transition-colors">{spec.name}</h3>
                <p className="text-xs text-purple-600 font-semibold mt-0.5">{spec.bn}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-1.5 uppercase tracking-wide">{spec.desc}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold text-slate-500">{spec.doctors} doctors</span>
                </div>
              </button>
            );
          })}
        </div>

        {filteredSpecialties.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No specialties found</h3>
            <p className="text-sm text-slate-500 mt-1">Try searching with a different keyword</p>
          </div>
        )}
      </section>

      {/* FEATURED DOCTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-purple-600" />
              {selectedSpecialty === "all" ? "Featured Specialist Doctors" : `${SPECIALTIES.find((s) => s.id === selectedSpecialty)?.name || ""} Doctors`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {filteredDoctors.length} doctors available • Book online video/audio consultation
            </p>
          </div>

          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-700 hover:border-purple-300 transition-all shadow-sm"
            >
              <span>{selectedSpecialty === "all" ? "All Specialties" : SPECIALTIES.find((s) => s.id === selectedSpecialty)?.name}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-2 max-h-64 overflow-y-auto">
                <button onClick={() => { setSelectedSpecialty("all"); setDropdownOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-purple-50 transition-colors ${selectedSpecialty === "all" ? "text-purple-600 bg-purple-50" : "text-slate-700"}`}>
                  All Specialties
                </button>
                {SPECIALTIES.map((s) => (
                  <button key={s.id} onClick={() => { setSelectedSpecialty(s.id); setDropdownOpen(false); }} className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-purple-50 transition-colors ${selectedSpecialty === s.id ? "text-purple-600 bg-purple-50" : "text-slate-700"}`}>
                    {s.name} ({s.doctors})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div>
                {/* Avatar + Info */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors truncate">{doc.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{doc.degrees}</p>
                    <span className="inline-block mt-1.5 text-[9px] font-black uppercase tracking-wider bg-purple-50 text-purple-600 py-0.5 px-2.5 rounded-full border border-purple-100">
                      {doc.specialty}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <Star className="w-3.5 h-3.5 text-amber-500 mx-auto mb-0.5" />
                    <span className="text-[10px] font-black text-slate-800">{doc.rating}</span>
                    <span className="text-[8px] text-slate-400 block">({doc.reviews})</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <Clock className="w-3.5 h-3.5 text-blue-500 mx-auto mb-0.5" />
                    <span className="text-[10px] font-black text-slate-800">{doc.exp}yr</span>
                    <span className="text-[8px] text-slate-400 block">Exp.</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 mx-auto mb-0.5" />
                    <span className="text-[10px] font-black text-slate-800">BMDC</span>
                    <span className="text-[8px] text-slate-400 block">Verified</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Consultation Fee</span>
                  <span className="text-base font-black text-slate-900">৳{doc.fee}</span>
                </div>
                <button className={`font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm flex items-center gap-1.5 ${
                  doc.available
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`} disabled={!doc.available}>
                  {doc.available ? (
                    <>Book Now <ArrowRight className="w-3.5 h-3.5" /></>
                  ) : "Unavailable"}
                </button>
              </div>

              {/* Availability dot */}
              {doc.available && (
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                  <span className="text-[10px] font-bold text-emerald-600">Available Now</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No doctors found in this category</h3>
            <p className="text-sm text-slate-500 mt-1">Try selecting a different specialty</p>
            <button onClick={() => setSelectedSpecialty("all")} className="mt-4 text-sm font-bold text-purple-600 hover:text-purple-700">View All Doctors</button>
          </div>
        )}
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Can&apos;t find your specialist?</h3>
            <p className="text-sm text-purple-100 font-medium mt-3 leading-relaxed">
              Call our 24/7 hotline and our care team will connect you with the right doctor within minutes.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="tel:10657" className="bg-white text-purple-700 font-extrabold text-sm py-3 px-6 rounded-full hover:bg-purple-50 transition-all shadow-lg flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call 10657
              </a>
              <Link href="/" className="bg-white/10 border border-white/20 text-white font-bold text-sm py-3 px-6 rounded-full hover:bg-white/20 transition-all flex items-center gap-2">
                Back to Home <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 py-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Shukhee Digital Care Bangladesh. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
