"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Search, Phone, ShoppingCart, User, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileStickyWidget from "@/components/MobileStickyWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";

// HIGH-FIDELITY MEDICAL AVATARS (SVG based to look premium and avoid empty placeholders)
const MaleDoctorAvatar = () => (
  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-100/50 flex-shrink-0 flex items-center justify-center border border-cyan-100 shadow-2xs relative">
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="43" r="22" fill="#ffdbac" />
      {/* Hair */}
      <path d="M28 40C28 30 36 24 50 24C64 24 72 30 72 40C72 41 69 35 65 33C60 31 50 31 45 33C38 35 34 40 28 40Z" fill="#2d1f10" />
      {/* Glasses */}
      <rect x="38" y="38" width="10" height="6" rx="1.5" stroke="#2d1f10" strokeWidth="1.8" />
      <rect x="52" y="38" width="10" height="6" rx="1.5" stroke="#2d1f10" strokeWidth="1.8" />
      <line x1="48" y1="41" x2="52" y2="41" stroke="#2d1f10" strokeWidth="1.8" />
      {/* Stethoscope */}
      <path d="M36 68C36 78 44 80 50 80C56 80 64 78 64 68" stroke="#78909c" strokeWidth="2.5" strokeLinecap="round" />
      {/* Suit/Coat */}
      <path d="M22 90C22 76 34 68 45 66L48 71H52L55 66C66 68 78 76 78 90H22Z" fill="#ffffff" stroke="#1cb0db" strokeWidth="2" />
      {/* Necktie */}
      <path d="M47 71L50 82L53 71H47Z" fill="#159fca" />
    </svg>
    <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
  </div>
);

const FemaleDoctorAvatar = () => (
  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100/50 flex-shrink-0 flex items-center justify-center border border-purple-100 shadow-2xs relative">
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="43" r="22" fill="#fed3b3" />
      {/* Hair */}
      <path d="M28 45C28 32 36 24 50 24C64 24 72 32 72 45C72 53 70 56 68 60C66 64 68 68 68 72C68 72 63 67 63 60C63 54 67 50 67 44C67 44 63 35 50 35C37 35 33 44 33 44C33 50 37 54 37 60C37 67 32 72 32 72C32 68 34 64 32 60C30 56 28 53 28 45Z" fill="#321a0f" />
      {/* Stethoscope */}
      <path d="M36 68C36 78 44 80 50 80C56 80 64 78 64 68" stroke="#78909c" strokeWidth="2.5" strokeLinecap="round" />
      {/* Suit/Coat */}
      <path d="M22 90C22 76 34 68 45 66L48 71H52L55 66C66 68 78 76 78 90H22Z" fill="#ffffff" stroke="#e91e63" strokeWidth="1.8" />
      {/* Pink inner shirt */}
      <path d="M47 71L50 82L53 71H47Z" fill="#f06292" />
    </svg>
    <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
  </div>
);

// EXACT LIST OF DOCTORS REGISTERED IN THE USER'S MOCKUP
const SPECIALISTS_DATA = [
  {
    id: "m1",
    name: "Dr. Md. Monzurul Haque",
    degrees: "MBBS, DDV, MRCP PACES (UK), CCD (BI...",
    specialty: "Dermatology and Venereology",
    fee: "299.00",
    exp: 6,
    gender: "male"
  },
  {
    id: "m2",
    name: "Dr. Nandita Nandi",
    degrees: "MBBS(RU),DCH(BMU),FCPS(Paediatrics)...",
    specialty: "Pediatrics",
    fee: "200.00",
    exp: 7,
    gender: "female"
  },
  {
    id: "m3",
    name: "Dr. Dardia Jaman",
    degrees: "MBBS, FCPS(Final Part) , MRCOG (UK) p...",
    specialty: "Gynaecology and Obstetrics",
    fee: "350.00",
    exp: 9,
    gender: "female"
  },
  {
    id: "m4",
    name: "Dr. Zahidul Islam",
    degrees: "M.B.B.S, FCPS (Part-2 Trainee)(Dermatol...",
    specialty: "Dermatology and Venereology",
    fee: "300.00",
    exp: 6,
    gender: "male"
  },
  {
    id: "m5",
    name: "Dr. Muhaimen Salit (Zahid)",
    degrees: "MBBS, FCPS(FP), FCGP, PGT",
    specialty: "Orthopedics",
    fee: "300.00",
    exp: 9,
    gender: "male"
  },
  {
    id: "m6",
    name: "Asst. Prof. Dr. Soumitra Paul",
    degrees: "M.B.B.S; B.C.S. (Health); M.D. (Pediatric ...",
    specialty: "Pediatrics",
    fee: "400.00",
    exp: 14,
    gender: "male"
  },
  {
    id: "m7",
    name: "Dr. Farzana Akter",
    degrees: "MBBS, FCPS (Dermatology & Venereolo...",
    specialty: "Dermatology and Venereology",
    fee: "400.00",
    exp: 5,
    gender: "female"
  },
  {
    id: "m8",
    name: "Dr.Zakir Hossen",
    degrees: "MBBS,PGT(Medicine),CCD(Birdem)",
    specialty: "Internal medicine",
    fee: "400.00",
    exp: 10,
    gender: "male"
  },
  {
    id: "m9",
    name: "Dr. Joysree Karmaker",
    degrees: "MBBS, FCPS(PEDIATRICS)",
    specialty: "Pediatrics",
    fee: "500.00",
    exp: 12,
    gender: "female"
  },
  {
    id: "m10",
    name: "Dr.Sadia Iffat Anam",
    degrees: "MBBS,DMU",
    specialty: "General Physician",
    fee: "300.00",
    exp: 10,
    gender: "female"
  },
  {
    id: "m11",
    name: "Assistant Professor Dr.Akhter Uz Zaman Sajib",
    degrees: "MBBS, DFM (Forensic Medicine), FCGP (...",
    specialty: "Dermatology and Venereology",
    fee: "600.00",
    exp: 8,
    gender: "male"
  },
  {
    id: "m12",
    name: "Dr. Nazmul Hasan",
    degrees: "MBBS, PGT (Pediatrics)",
    specialty: "Pediatrics",
    fee: "200.00",
    exp: 2,
    gender: "male"
  }
];

// Extract distinct specialties for filter dropdown
const UNIQUE_SPECIALTIES = Array.from(new Set(SPECIALISTS_DATA.map(d => d.specialty)));

export default function SpecialistsPage() {
  const router = useRouter();
  const [lang, setLang] = useState<"EN" | "BN">("EN");
  const [cart, setCart] = useState<{ [key: string]: { id: string; name: string; price: number; qty: number } }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Redesign filter state
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [doctorNameQuery, setDoctorNameQuery] = useState("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shukhee_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  // Cart operations
  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[product.id]) {
        updated[product.id] = { ...updated[product.id], qty: updated[product.id].qty + 1 };
      } else {
        updated[product.id] = { id: product.id, name: product.name, price: product.price, qty: 1 };
      }
      localStorage.setItem("shukhee_cart", JSON.stringify(updated));
      return updated;
    });
    router.push("/checkout");
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[id]) return prev;
      const newQty = updated[id].qty + delta;
      if (newQty <= 0) {
        delete updated[id];
      } else {
        updated[id] = { ...updated[id], qty: newQty };
      }
      localStorage.setItem("shukhee_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      localStorage.setItem("shukhee_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartTotalQty = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);

  // Dynamic filter application
  const filteredDoctors = SPECIALISTS_DATA.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === "all" || doc.specialty === selectedSpecialty;
    const matchesName = doc.name.toLowerCase().includes(doctorNameQuery.toLowerCase()) || 
                        doc.degrees.toLowerCase().includes(doctorNameQuery.toLowerCase());
    return matchesSpecialty && matchesName;
  });

  return (
    <div className="relative min-h-screen bg-[#fafbfc] text-slate-800 font-sans selection:bg-purple-100 selection:text-purple-800">
      
      {/* GLOBAL HEADER */}
      <Header
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartTotalQty={cartTotalQty}
        setCartOpen={setCartOpen}
      />


      {/* FILTER & INPUT CONTROLS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs">
          
          {/* Dropdown Select Specialty */}
          <div className="relative w-full md:w-80">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 cursor-pointer appearance-none shadow-3xs"
            >
              <option value="all">Select Doctor Specialty</option>
              {UNIQUE_SPECIALTIES.map((spec, idx) => (
                <option key={idx} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Text Input Search Doctor */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={doctorNameQuery}
              onChange={(e) => setDoctorNameQuery(e.target.value)}
              placeholder="Type Doctor Name"
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 shadow-3xs"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>

      {/* DYNAMIC TOTAL DOCTOR COUNT BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h3 className="text-sm font-extrabold text-[#1cb0db]">
          {filteredDoctors.length === 12 && selectedSpecialty === "all" && doctorNameQuery === "" 
            ? "332 doctors available" 
            : `${filteredDoctors.length} doctors matching query`}
        </h3>
      </div>

      {/* DOCTORS GRID CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDoctors.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-3xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              
              {/* Doctor Main Info Row */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                
                {/* Visual Avatar */}
                {doc.gender === "female" ? <FemaleDoctorAvatar /> : <MaleDoctorAvatar />}
                
                {/* Text Credentials */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug truncate hover:text-cyan-600 transition-colors" title={doc.name}>
                    {doc.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium leading-normal mt-0.5 truncate" title={doc.degrees}>
                    {doc.degrees}
                  </p>
                  
                  {/* Specialty Pill Badge */}
                  <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-wider bg-cyan-50 text-[#1cb0db] py-0.5 px-2.5 rounded-full border border-cyan-100">
                    {doc.specialty}
                  </span>
                  
                  {/* Consultation Fee */}
                  <div className="mt-3">
                    <span className="text-base font-extrabold text-[#1cb0db]">
                      ৳ {doc.fee}
                    </span>
                  </div>

                </div>

              </div>

              {/* Card Footer Details */}
              <div className="border-t border-slate-50 pt-3.5 flex items-center justify-between mt-2 gap-2">
                <span className="text-[10px] sm:text-xs font-semibold text-[#1cb0db] truncate">
                  {doc.exp} years of professional experience
                </span>
                
                <button 
                  onClick={() => addToCart({ id: doc.id, name: doc.name, price: parseFloat(doc.fee) })}
                  className="bg-white border border-cyan-400 hover:bg-cyan-500 hover:text-white text-cyan-500 font-extrabold text-[10px] sm:text-xs py-1.5 px-3 rounded-lg transition-all flex-shrink-0"
                >
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl mt-4">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No doctors match your filters</h3>
            <p className="text-sm text-slate-500 mt-1">Try resetting the specialty dropdown or clear the name search field.</p>
            <button 
              onClick={() => { setSelectedSpecialty("all"); setDoctorNameQuery(""); }}
              className="mt-5 text-xs font-black text-cyan-500 bg-cyan-50 border border-cyan-100 py-2.5 px-5 rounded-xl hover:bg-cyan-500 hover:text-white transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* DYNAMIC CART DRAWER PANEL */}
      <CartDrawer
        isOpen={cartOpen}
        setIsOpen={setCartOpen}
        cart={cart}
        updateCartQty={updateCartQty}
        removeItem={removeItem}
        cartTotalQty={cartTotalQty}
        cartTotalPrice={cartTotalPrice}
      />

      {/* MOBILE STICKY BOTTOM DOCTOR CALL WIDGET */}
      <MobileStickyWidget />

      {/* FLOATING 24/7 INTERACTIVE WIDGET SUPPORT */}
      <WhatsAppWidget />

    </div>
  );
}
