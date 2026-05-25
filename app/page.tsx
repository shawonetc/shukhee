"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import QuickConsultations from "@/components/QuickConsultations";
import SpecialtyNeeds from "@/components/SpecialtyNeeds";
import SpecialistCategories from "@/components/SpecialistCategories";
import TrendingProducts from "@/components/TrendingProducts";
import TrustedStats from "@/components/TrustedStats";
import CaregiverServices from "@/components/CaregiverServices";
import EssentialMedicines from "@/components/EssentialMedicines";
import TourismAndSurgery from "@/components/TourismAndSurgery";
import EmergencyBlocks from "@/components/EmergencyBlocks";
import SSKNetwork from "@/components/SSKNetwork";
import FeaturedBrands from "@/components/FeaturedBrands";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileStickyWidget from "@/components/MobileStickyWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  // State variables
  const [lang, setLang] = useState<"EN" | "BN">("EN");
  const [cart, setCart] = useState<{ [key: string]: { id: string; name: string; price: number; qty: number } }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Cart operations
  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[product.id]) {
        updated[product.id] = { ...updated[product.id], qty: updated[product.id].qty + 1 };
      } else {
        updated[product.id] = { id: product.id, name: product.name, price: product.price, qty: 1 };
      }
      return updated;
    });
    setCartOpen(true);
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
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const cartTotalQty = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-purple-100 selection:text-purple-800">

      {/* GLOBAL HEADER */}
      <Header
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartTotalQty={cartTotalQty}
        setCartOpen={setCartOpen}
      />

      {/* HERO BANNER SLIDER */}
      <HeroSlider />

      {/* QUICK DOCTOR CONSULTATION CARDS */}
      <QuickConsultations />

      {/* SPECIALTY ACCORDING TO SPECIFIC NEED */}
      <SpecialtyNeeds />

      {/* SPECIALIST DOCTORS SPECIALTIES GRID */}
      <SpecialistCategories />

      {/* TRENDING SKINCARE / PRODUCTS CAROUSEL */}
      <TrendingProducts addToCart={addToCart} />

      {/* TRUSTED PARTNER STATS */}
      <TrustedStats />

      {/* CAREGIVER AT HOME SERVICES */}
      <CaregiverServices />

      {/* ESSENTIAL MEDICINE DELIVERY CAROUSEL */}
      <EssentialMedicines addToCart={addToCart} />

      {/* MEDICAL TOURISM & SURGERY BOOKING BANNERS */}
      <TourismAndSurgery />

      {/* AMBULANCE & BLOOD BANK BLOCKS */}
      <EmergencyBlocks />

      {/* SHUKHEE SHEBA KENDRA (SSK) */}
      <SSKNetwork />

      {/* FEATURED BRANDS */}
      <FeaturedBrands />

      {/* FAQs */}
      <FAQs />

      {/* PREMIUM CHARCOAL FOOTER */}
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
