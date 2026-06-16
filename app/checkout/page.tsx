"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShoppingCart, ArrowLeft, Trash2, Plus, Minus, CreditCard, 
  Check, AlertCircle, Sparkles, ShieldCheck, ArrowRight, Loader2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyWidget from "@/components/MobileStickyWidget";
import WhatsAppWidget from "@/components/WhatsAppWidget";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function CheckoutPage() {
  const router = useRouter();

  // Global Header/Cart states (reused to maintain fully working header)
  const [lang, setLang] = useState<"EN" | "BN">("EN");
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("inside"); // "inside" | "outside"
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: "",
    message: ""
  });
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    orderId: ""
  });

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

  // Update cart state and localStorage
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

  // Calculations
  const cartTotalQty = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = city === "inside" ? 70 : 120;
  const cartTotalPrice = cartSubtotal + deliveryCharge;

  // Form validations & Submission
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(cart).length === 0) {
      setErrorModal({
        isOpen: true,
        title: "Empty Cart",
        message: "Please add at least one product to your cart before checking out."
      });
      return;
    }

    if (!name.trim()) {
      setErrorModal({
        isOpen: true,
        title: "Name Required",
        message: "Please enter your full name for delivery."
      });
      return;
    }

    // Basic BD Phone validation
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setErrorModal({
        isOpen: true,
        title: "Mobile Number Required",
        message: "Please enter your mobile number so we can reach you."
      });
      return;
    }

    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setErrorModal({
        isOpen: true,
        title: "Invalid Mobile Number",
        message: "Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678)."
      });
      return;
    }

    if (!address.trim()) {
      setErrorModal({
        isOpen: true,
        title: "Delivery Address Required",
        message: "Please specify your detailed shipping address."
      });
      return;
    }

    // Validate mobile banking details
    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      if (!senderNumber.trim()) {
        setErrorModal({
          isOpen: true,
          title: "Sender Account Required",
          message: `Please specify the account number you sent the payment from.`
        });
        return;
      }
      if (!transactionId.trim()) {
        setErrorModal({
          isOpen: true,
          title: "Transaction ID Required",
          message: `Please input the Transaction ID received after your payment transfer.`
        });
        return;
      }
    }

    // Simulate submission progress
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = "SH-" + Math.floor(100000 + Math.random() * 900000);
      setSuccessModal({
        isOpen: true,
        orderId: generatedOrderId
      });
    }, 2000);
  };

  const handleSuccessClose = () => {
    // Clear cart
    setCart({});
    localStorage.removeItem("shukhee_cart");
    setSuccessModal({ isOpen: false, orderId: "" });
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-100 selection:text-cyan-800">
      
      {/* GLOBAL HEADER */}
      <Header
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartTotalQty={cartTotalQty}
        setCartOpen={setCartOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link 
            href="/" 
            className="text-xs font-bold text-slate-500 hover:text-[#1cb0db] transition-colors flex items-center gap-1 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </Link>
          <span className="text-slate-300 text-xs">/</span>
          <span className="text-xs font-black text-[#1cb0db]">Secure Checkout</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">
          Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1cb0db] to-[#1498be]">Purchase</span>
        </h1>

        {/* Main Grid Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Shipping & Payment Info (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
              
              <h3 className="text-base sm:text-lg font-black text-slate-955 flex items-center gap-2.5 border-b border-slate-50 pb-4">
                <span className="w-6.5 h-6.5 bg-cyan-50 text-[#1cb0db] rounded-full flex items-center justify-center text-xs font-black">1</span>
                Shipping Address Details
              </h3>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Receiver&apos;s Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500 text-slate-800 font-medium placeholder-slate-400"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Contact Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500 text-slate-800 font-medium placeholder-slate-400"
                  />
                </div>

                {/* Area Select (Dhaka Inside / Outside) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Delivery Region</label>
                    <button
                      type="button"
                      onClick={() => setCity("inside")}
                      className={`w-full py-3 px-4 border rounded-xl text-xs font-bold text-center transition-all focus:outline-none ${
                        city === "inside"
                          ? "bg-[#1cb0db] text-white border-[#1cb0db] shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-cyan-200"
                      }`}
                    >
                      Inside Dhaka (৳70)
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">&nbsp;</label>
                    <button
                      type="button"
                      onClick={() => setCity("outside")}
                      className={`w-full py-3 px-4 border rounded-xl text-xs font-bold text-center transition-all focus:outline-none ${
                        city === "outside"
                          ? "bg-[#1cb0db] text-white border-[#1cb0db] shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-cyan-200"
                      }`}
                    >
                      Outside Dhaka (৳120)
                    </button>
                  </div>
                </div>

                {/* Full Address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Detailed Delivery Address</label>
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House 42, Road 11, Banani, Dhaka"
                    rows={3}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/10 focus:border-cyan-500 text-slate-800 font-medium placeholder-slate-400 resize-none"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <h3 className="text-base sm:text-lg font-black text-slate-955 flex items-center gap-2.5 border-b border-slate-50 pb-4 pt-4">
                <span className="w-6.5 h-6.5 bg-cyan-50 text-[#1cb0db] rounded-full flex items-center justify-center text-xs font-black">2</span>
                Choose Payment Method
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all focus:outline-none relative ${
                      paymentMethod === "cod"
                        ? "bg-cyan-50/30 text-[#1cb0db] border-[#1cb0db] ring-1 ring-[#1cb0db]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300"
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-black">Cash on Delivery</span>
                    {paymentMethod === "cod" && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#1cb0db] text-white rounded-full flex items-center justify-center text-[9px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>

                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bkash")}
                    className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all focus:outline-none relative ${
                      paymentMethod === "bkash"
                        ? "bg-pink-50/50 text-pink-600 border-pink-400 ring-1 ring-pink-400"
                        : "bg-white text-slate-600 border-slate-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center font-black text-[10px]">b</div>
                    <span className="text-xs font-black">bKash</span>
                    {paymentMethod === "bkash" && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-pink-500 text-white rounded-full flex items-center justify-center text-[9px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("nagad")}
                    className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all focus:outline-none relative ${
                      paymentMethod === "nagad"
                        ? "bg-orange-50/50 text-orange-600 border-orange-400 ring-1 ring-orange-400"
                        : "bg-white text-slate-600 border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-[10px]">n</div>
                    <span className="text-xs font-black">Nagad</span>
                    {paymentMethod === "nagad" && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-[9px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                </div>

                {/* Mobile Banking Payment Fields */}
                {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                  <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 space-y-4">
                    <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                      <p className="font-extrabold text-slate-800">Payment Steps:</p>
                      <p>1. Send <b>৳ {cartTotalPrice.toFixed(2)}</b> (Merchant/Personal) to: <b>01712345678</b></p>
                      <p>2. Fill in the transaction details below to verify your payment.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Sender Number */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Your Payee Account Number</label>
                        <input
                          type="tel"
                          required
                          value={senderNumber}
                          onChange={(e) => setSenderNumber(e.target.value)}
                          placeholder="e.g. 017XXXXXXXX"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-slate-800 font-semibold placeholder-slate-400"
                        />
                      </div>

                      {/* Transaction ID */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Transaction ID (TxnID)</label>
                        <input
                          type="text"
                          required
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. A9B8C7D6E5"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-800 font-semibold placeholder-slate-400 uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-slate-100 pt-6 flex items-center justify-between gap-4">
                <Link href="/" className="text-xs font-extrabold text-slate-500 hover:text-[#1cb0db] transition-colors py-2 px-4 rounded-xl hover:bg-slate-50">
                  Continue Shopping
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#1cb0db] to-[#1594ba] text-white font-extrabold text-sm py-3 px-8 rounded-2xl hover:shadow-lg hover:shadow-cyan-100 transition-all active:scale-98 flex items-center gap-2 focus:outline-none disabled:opacity-75 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Secure Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Right Column: Order Summary (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs space-y-5">
              <h3 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-2 pb-2 border-b border-slate-50">
                <ShoppingCart className="w-5 h-5 text-[#1cb0db]" />
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
                {Object.values(cart).length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs font-semibold">
                    No items in cart. Please add products to check out.
                  </div>
                ) : (
                  Object.values(cart).map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-100/50 rounded-2xl">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-800 truncate" title={item.name}>{item.name}</h4>
                        <span className="text-[10px] font-black text-[#1cb0db] mt-1 block">৳ {item.price.toFixed(2)} each</span>
                      </div>
                      
                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center border border-slate-200 rounded-full bg-white px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.id, -1)}
                            className="p-0.5 rounded-full hover:bg-slate-100 text-slate-500 focus:outline-none"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-slate-800 px-2">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.id, 1)}
                            className="p-0.5 rounded-full hover:bg-slate-100 text-slate-500 focus:outline-none"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal & Delivery details */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5">
                <div className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>Subtotal</span>
                  <span>৳ {cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>Delivery Charge ({city === "inside" ? "Inside Dhaka" : "Outside Dhaka"})</span>
                  <span>৳ {deliveryCharge.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-slate-200/50 pt-3 flex justify-between text-base font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1cb0db] to-[#1281a1]">
                    ৳ {cartTotalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Guarantee badges */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2 text-[10px] text-slate-500 font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Original Products Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1cb0db]" />
                  <span>DGDA Approved Telehealth Platform</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* GLOBAL FOOTER */}
      <Footer />

      {/* MOBILE STICKY BOTTOM DOCTOR CALL WIDGET */}
      <MobileStickyWidget />

      {/* FLOATING 24/7 INTERACTIVE WIDGET SUPPORT */}
      <WhatsAppWidget />

      {/* CUSTOM ERROR MODAL */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setErrorModal({ ...errorModal, isOpen: false })} />
          
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full z-10 border border-slate-100 text-center space-y-4 relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Glossy alert container */}
            <div className="w-14 h-14 bg-rose-50 border border-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <AlertCircle className="w-6.5 h-6.5" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-black text-slate-950">{errorModal.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{errorModal.message}</p>
            </div>

            <button
              onClick={() => setErrorModal({ ...errorModal, isOpen: false })}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs py-3 rounded-xl transition-all focus:outline-none"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* CUSTOM SUCCESS MODAL */}
      {successModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="absolute inset-0" />
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full z-10 border border-slate-100 text-center space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Green glowing tick */}
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping duration-1500" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-950">Order Placed Successfully!</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VERIFIED INVOICE • ORDER ID: {successModal.orderId}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed pt-2">
                Thank you for shopping at MedicareBD! Our team will contact you shortly to confirm your order details and delivery schedule.
              </p>
            </div>

            {/* Info Summary Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left text-xs space-y-2 font-medium">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Invoice:</span>
                <span className="font-extrabold text-slate-800">৳ {cartTotalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Status:</span>
                <span className="font-extrabold text-emerald-600 uppercase">
                  {paymentMethod === "cod" ? "Pay on Delivery" : "Pending Verification"}
                </span>
              </div>
            </div>

            <button
              onClick={handleSuccessClose}
              className="w-full bg-gradient-to-r from-[#1cb0db] to-[#1594ba] hover:from-[#1ebae8] hover:to-[#179ec5] text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md focus:outline-none"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
