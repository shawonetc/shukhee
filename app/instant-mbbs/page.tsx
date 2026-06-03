"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Stethoscope, Phone, Video, VideoOff, Mic, MicOff, PhoneOff, Send,
  Download, CheckCircle, AlertCircle, ArrowRight, Clock, ArrowLeft,
  ShieldCheck, FileText, Sparkles, Plus, Heart, User, Check, Play
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

// Form input types
interface PatientDetails {
  name: string;
  age: string;
  gender: string;
  phone: string;
  symptoms: string;
  medium: "video" | "audio";
  paymentMethod: "bkash" | "nagad" | "card" | "free";
}

export default function InstantMBBSPage() {
  // Global Header/Cart states (reused to maintain fully working header)
  const [lang, setLang] = useState<"EN" | "BN">("EN");
  const [cart, setCart] = useState<{ [key: string]: { id: string; name: string; price: number; qty: number } }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Cart operations (just in case they interact with the header)
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

  // Instant MBBS States
  // status: "intake" | "matching" | "calling" | "prescription"
  const [status, setStatus] = useState<"intake" | "matching" | "calling" | "prescription">("intake");
  const [patient, setPatient] = useState<PatientDetails>({
    name: "",
    age: "",
    gender: "male",
    phone: "",
    symptoms: "",
    medium: "video",
    paymentMethod: "bkash"
  });

  // Matching logs simulation
  const [matchingStep, setMatchingStep] = useState(0);
  const [matchingLogs, setMatchingLogs] = useState<string[]>([
    "Initializing secure video channel...",
  ]);

  // Video call controls
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "doctor" | "patient" | "system"; text: string; time: string }>>([]);
  const [newMessage, setNewMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Real-time matching logic
  useEffect(() => {
    if (status !== "matching") return;

    const logs = [
      "Initializing secure video channel...",
      "Routing to the next available GP Consultant...",
      "Connecting to Dr. Md. Ashraful Islam (MBBS)...",
      "Encrypting call connection peer-to-peer...",
      "Doctor is accepting the call. Get ready!"
    ];

    setMatchingStep(0);
    setMatchingLogs([logs[0]]);

    const timer = setInterval(() => {
      setMatchingStep((prev) => {
        const next = prev + 1;
        if (next < logs.length) {
          setMatchingLogs((prevLogs) => [...prevLogs, logs[next]]);
          return next;
        } else {
          clearInterval(timer);
          setStatus("calling");
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [status]);

  // Video Call Ticking Timer & Auto chat message simulation
  useEffect(() => {
    if (status !== "calling") return;

    setCallDuration(0);
    setChatMessages([
      { sender: "system", text: "Dr. Md. Ashraful Islam joined the consultation.", time: "12:00 PM" },
      { sender: "doctor", text: `Hello! I am Dr. Ashraful. I see you are experiencing: "${patient.symptoms || "general discomfort"}". How long have you been suffering from this?`, time: "12:00 PM" }
    ]);

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Simulated doctor replies
    const replyTimer1 = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "patient", text: "Yes, doctor. It started yesterday afternoon. I have a slight headache too.", time: "12:01 PM" }
      ]);
    }, 4000);

    const replyTimer2 = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "doctor", text: "Understood. Let me check. Make sure you drink lots of fluids. I am writing down a prescription containing an antihistamine and some pain relief. Do you have any allergies?", time: "12:02 PM" }
      ]);
    }, 8000);

    const replyTimer3 = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "patient", text: "No doctor, I don't have any known allergies.", time: "12:02 PM" }
      ]);
    }, 12000);

    const replyTimer4 = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "doctor", text: "Perfect. I have drafted the digital prescription. You can view and download it immediately once we conclude this call. Take care and get enough rest!", time: "12:03 PM" },
        { sender: "system", text: "Doctor has finalized your digital prescription.", time: "12:03 PM" }
      ]);
    }, 16000);

    return () => {
      clearInterval(interval);
      clearTimeout(replyTimer1);
      clearTimeout(replyTimer2);
      clearTimeout(replyTimer3);
      clearTimeout(replyTimer4);
    };
  }, [status, patient.symptoms]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient.name || !patient.phone || !patient.age) {
      alert("Please fill in Name, Age, and Mobile number!");
      return;
    }
    setStatus("matching");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: "patient", text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setNewMessage("");

    // Simple reply from doctor to make chat feel responsive
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "doctor", text: "Thank you for the information. I have noted this down in your medical case history.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 2000);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const triggerDownload = () => {
    alert("Downloading your prescription in PDF format... (Simulated successfully!)");
  };

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

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh] flex flex-col justify-center">

        {/* ========================================================== */}
        {/* PHASE 1: INTAKE PATIENT DETAILS FORM                       */}
        {/* ========================================================== */}
        {status === "intake" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left side: Premium informational banner */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                24/7 ACTIVE COMPANIONS
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
                Instant MBBS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-[#1cb0db]">
                  Doctor Call
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Connect with a verified General Practitioner (GP) instantly in less than 10 minutes. Get diagnosis, medical advice, and a valid digital prescription directly sent to your phone.
              </p>

              {/* Service Features list */}
              <div className="space-y-3.5 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">100% Certified GP Doctors</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">BMDC registered practitioners only</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">Ultra-Fast 10 Min Response</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">No appointment or queues needed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">Digital PDF Prescription</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">Legally valid at all pharmacys in Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl text-white relative overflow-hidden shadow-md">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  <div>
                    <h4 className="text-xs font-black tracking-wide uppercase text-cyan-400">DGDA APPROVED NETWORK</h4>
                    <p className="text-[11px] text-slate-300 font-semibold mt-0.5">Compliant with telemedicine safety laws.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Elegant Intake Form */}
            <form onSubmit={handleStartConsultation} className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-purple-600" />
                Fill Patient Information
              </h3>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={patient.name}
                    onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                    placeholder="e.g. Rakibul Hasan"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-800 font-medium placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Patient Age</label>
                  <input
                    type="number"
                    required
                    value={patient.age}
                    onChange={(e) => setPatient({ ...patient, age: e.target.value })}
                    placeholder="e.g. 26"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-800 font-medium placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Gender</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["male", "female", "other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setPatient({ ...patient, gender: g })}
                        className={`py-3 px-2 border rounded-xl text-xs font-bold capitalize transition-all focus:outline-none ${patient.gender === g
                            ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:border-purple-200"
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Mobile Number (For WhatsApp PDF)</label>
                  <input
                    type="tel"
                    required
                    value={patient.phone}
                    onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-800 font-medium placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Symptoms / Complaints Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Symptoms / Primary Complaint (Optional)</label>
                <textarea
                  value={patient.symptoms}
                  onChange={(e) => setPatient({ ...patient, symptoms: e.target.value })}
                  placeholder="e.g. Fever since yesterday, sore throat, sneezing, headache..."
                  rows={3}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-800 font-medium placeholder-slate-400 resize-none"
                />
              </div>

              {/* Consultation Medium Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Select Consultation Format</label>
                <div className="grid grid-cols-2 gap-4">

                  {/* Video format */}
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, medium: "video" })}
                    className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all focus:outline-none relative ${patient.medium === "video"
                        ? "bg-cyan-50/50 text-cyan-600 border-cyan-400 ring-1 ring-cyan-400"
                        : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300"
                      }`}
                  >
                    <Video className="w-6 h-6" />
                    <div>
                      <h4 className="text-sm font-black">Video Consultation</h4>
                      <p className="text-[10px] font-bold text-slate-400">Recommended</p>
                    </div>
                    {patient.medium === "video" && (
                      <span className="absolute top-2 right-2 w-4 h-4 bg-cyan-500 text-white rounded-full flex items-center justify-center text-[9px]"><Check className="w-2.5 h-2.5 stroke-[3]" /></span>
                    )}
                  </button>

                  {/* Audio format */}
                  <button
                    type="button"
                    onClick={() => setPatient({ ...patient, medium: "audio" })}
                    className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all focus:outline-none relative ${patient.medium === "audio"
                        ? "bg-purple-50/50 text-purple-600 border-purple-400 ring-1 ring-purple-400"
                        : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                      }`}
                  >
                    <Phone className="w-6 h-6 animate-pulse" />
                    <div>
                      <h4 className="text-sm font-black">Voice Only Call</h4>
                      <p className="text-[10px] font-bold text-slate-400">Audio consultation</p>
                    </div>
                    {patient.medium === "audio" && (
                      <span className="absolute top-2 right-2 w-4 h-4 bg-purple-500 text-white rounded-full flex items-center justify-center text-[9px]"><Check className="w-2.5 h-2.5 stroke-[3]" /></span>
                    )}
                  </button>

                </div>
              </div>

              {/* Payment Method Choice */}
              <div className="space-y-2 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">Checkout Method</label>
                  <div className="bg-red-50 text-red-600 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-red-100">
                    75% Promotional Discount
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "bkash", name: "bKash" },
                    { id: "nagad", name: "Nagad" },
                    { id: "card", name: "Debit/Credit" },
                    { id: "free", name: "SSK Free Promo" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPatient({ ...patient, paymentMethod: p.id as any })}
                      className={`p-2.5 border rounded-xl text-xs font-extrabold transition-all text-center focus:outline-none ${patient.paymentMethod === p.id
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Consultation Fee</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-black text-slate-900">৳ 50.00</span>
                    <span className="text-slate-400 line-through text-xs">৳ 200.00</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-extrabold text-sm py-3 px-6 rounded-xl hover:shadow-lg transition-all active:scale-97 flex items-center gap-1.5 focus:outline-none"
                >
                  Pay & Connect <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================== */}
        {/* PHASE 2: LIVE MATCHING ANIMATION SIMULATOR                */}
        {/* ========================================================== */}
        {status === "matching" && (
          <div className="max-w-md mx-auto text-center space-y-8 bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">

            {/* Glowing backgrounds */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-cyan-400/15 rounded-full blur-2xl" />

            {/* Pulsing Stethoscope Icon container */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-purple-600/10 rounded-full animate-ping duration-1500" />
              <div className="absolute -inset-2 bg-cyan-400/10 rounded-full animate-ping duration-2000" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg border border-purple-400/30">
                <Stethoscope className="w-10 h-10 animate-bounce duration-1500" />
              </div>
            </div>

            {/* Matching text header */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Connecting with GP Doctor</h2>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CALL ROUTING ACTIVE • AVERAGE WAIT: 15 SEC
              </p>
            </div>

            {/* Live matched step logs console */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left font-mono text-[11px] text-slate-500 space-y-2.5 max-h-48 overflow-y-auto">
              {matchingLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 animate-fade-in">
                  <span className="text-emerald-500">✔</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-purple-600 animate-pulse mt-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                <span>Searching active doctors...</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStatus("intake")}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center gap-1 mx-auto focus:outline-none"
              >
                Cancel Call Request
              </button>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* PHASE 3: SIMULATED LIVE VIDEO/AUDIO CALL INTERFACE         */}
        {/* ========================================================== */}
        {status === "calling" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl min-h-[600px] text-white">

            {/* Left side: Live Video screen (Col 8) */}
            <div className="lg:col-span-8 flex flex-col justify-between relative bg-slate-950 p-6">

              {/* Top Row: Doctor Badge and Timer */}
              <div className="z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <div className="text-left">
                    <h4 className="text-xs font-black">Dr. Md. Ashraful Islam</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">GP Consultant • BMDC Reg: A-84950</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-red-600/90 text-white text-[11px] font-black tracking-wider px-3.5 py-1.5 rounded-xl uppercase shadow-md">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(callDuration)}</span>
                </div>
              </div>

              {/* Main Doctor Screen Image & Audio wave overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=700&auto=format&fit=crop"
                  alt="Doctor avatar"
                  className={`h-full w-full object-cover select-none transition-all duration-700 opacity-95 ${isCamOff ? "filter grayscale blur-xs scale-102" : ""
                    }`}
                />

                {/* Simulated Audio waveform animation when calling voice or active */}
                {patient.medium === "audio" && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-lg mb-2">
                      <Phone className="w-10 h-10 text-white animate-bounce" />
                    </div>
                    <h3 className="text-base font-black">Voice Only Call Active</h3>
                    <p className="text-xs text-slate-400">Muting camera to optimize bandwidth</p>

                    {/* Simulated Voice wave lines */}
                    <div className="flex items-center gap-1 h-10 mt-4">
                      {[1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 7, 5, 3, 2, 1].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h * 5}px` }}
                          className="w-1 bg-cyan-400 rounded-full animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Picture-in-Picture patient self-view in video call */}
              {patient.medium === "video" && (
                <div className="absolute right-6 bottom-24 w-28 h-36 sm:w-36 sm:h-48 bg-slate-800 border-2 border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex items-center justify-center">
                  {isCamOff ? (
                    <div className="text-center space-y-1 p-2">
                      <VideoOff className="w-5 h-5 text-slate-500 mx-auto" />
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Self Camera Off</p>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center text-center">
                      <div className="absolute inset-0 bg-purple-900/40 animate-pulse" />
                      <div className="z-10 space-y-1">
                        <User className="w-8 h-8 text-cyan-400 mx-auto bg-slate-800 p-1.5 rounded-full" />
                        <h5 className="text-[10px] font-bold text-white uppercase truncate px-2">{patient.name || "Patient"}</h5>
                        <p className="text-[8px] text-cyan-300 font-bold">1080p Live</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Call Controls panel */}
              <div className="z-10 flex items-center justify-center gap-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/5 max-w-sm mx-auto shadow-xl">

                {/* Mute button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all focus:outline-none ${isMuted ? "bg-red-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  title={isMuted ? "Unmute Mic" : "Mute Mic"}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Camera toggle (Only in video call) */}
                {patient.medium === "video" && (
                  <button
                    onClick={() => setIsCamOff(!isCamOff)}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all focus:outline-none ${isCamOff ? "bg-red-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    title={isCamOff ? "Turn Cam On" : "Turn Cam Off"}
                  >
                    {isCamOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </button>
                )}

                {/* RED END CALL BUTTON */}
                <button
                  onClick={() => setStatus("prescription")}
                  className="bg-red-600 hover:bg-red-700 w-28 h-11 rounded-full flex items-center justify-center gap-1.5 font-bold text-xs shadow-lg active:scale-95 transition-all text-white focus:outline-none"
                >
                  <PhoneOff className="w-4 h-4" /> End Call
                </button>

              </div>
            </div>

            {/* Right side: Live Chat Box Panel (Col 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900 border-l border-white/5 h-[600px]">

              {/* Header */}
              <div className="p-4 border-b border-white/5 bg-slate-950 flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-cyan-400" />
                <div className="text-left">
                  <h4 className="text-xs font-black">Live Consultation Log</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Syncing prescriptions in real-time</p>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {chatMessages.map((msg, idx) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={idx} className="bg-slate-850/50 border border-white/5 text-slate-300 text-[10px] font-semibold text-center p-2 rounded-xl">
                        {msg.text}
                      </div>
                    );
                  }

                  const isMe = msg.sender === "patient";
                  return (
                    <div key={idx} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <span className="text-[9px] text-slate-500 font-bold mb-1">
                        {isMe ? "You" : "Dr. Ashraful"} • {msg.time}
                      </span>
                      <div
                        className={`text-xs px-3.5 py-2 rounded-2xl max-w-[85%] font-medium leading-relaxed ${isMe
                            ? "bg-purple-600 text-white rounded-tr-none"
                            : "bg-slate-800 text-slate-100 rounded-tl-none border border-white/5"
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Message Typing Form */}
              <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message to doctor..."
                  className="flex-1 bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-xl flex items-center justify-center transition-colors focus:outline-none flex-shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>

            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* PHASE 4: FINAL PRESCRIPTION RENDER & DOWNLOAD             */}
        {/* ========================================================== */}
        {status === "prescription" && (
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Top Success Banner */}
            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-start sm:items-center gap-4 shadow-sm text-slate-700">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-black text-slate-900">Consultation Completed Successfully!</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Your digital prescription is ready. A backup copy has also been sent to <span className="font-bold text-slate-800">{patient.phone}</span> via SMS and WhatsApp.
                </p>
              </div>
              <button
                onClick={triggerDownload}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition-all focus:outline-none self-end sm:self-center"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>

            {/* Authentics PDF Prescription Mockup Card */}
            <div className="bg-white border border-slate-200 shadow-lg rounded-3xl p-6 sm:p-10 text-slate-800 space-y-8 font-serif relative overflow-hidden">

              {/* Premium Background Seal */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-slate-50 rounded-full border border-slate-100/50 flex items-center justify-center opacity-30 select-none pointer-events-none">
                <Stethoscope className="w-28 h-28 text-slate-200" />
              </div>

              {/* Prescription Header */}
              <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                {/* Doctor details left */}
                <div className="font-sans space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-none">Dr. Md. Ashraful Islam</h2>
                  <p className="text-[11px] font-bold text-slate-600">MBBS (DMC), BCS (Health)</p>
                  <p className="text-[10px] text-slate-500 font-semibold">General Medicine & GP Consultant</p>
                  <p className="text-[10px] text-slate-500 font-semibold">BMDC Reg No: A-84950</p>
                </div>

                {/* Logo and Helpline right */}
                <div className="font-sans text-left sm:text-right space-y-1">
                  <h3 className="text-xl font-extrabold text-[#6f2c91] leading-none">Shukhee Care</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">Shukhee Digital Telehealth Net</p>
                  <p className="text-[10px] text-[#00bcd4] font-black">24/7 Tele-Consult Desk: 10657</p>
                  <div className="inline-block mt-1 bg-emerald-50 text-emerald-600 font-extrabold text-[9px] py-0.5 px-2 rounded-full border border-emerald-100">
                    Digitally Verified
                  </div>
                </div>

              </div>

              {/* Patient Basic Bio Row */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-sans grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">PATIENT NAME</span>
                  <span className="font-bold text-slate-800">{patient.name || "Guest Patient"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">AGE / GENDER</span>
                  <span className="font-bold text-slate-800 capitalize">{patient.age || "26"} Yrs / {patient.gender}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">DATE & TIME</span>
                  <span className="font-bold text-slate-800">{new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">CASE REF ID</span>
                  <span className="font-bold text-slate-800">SH-992384-MBBS</span>
                </div>
              </div>

              {/* Symptoms & Diagnostics Column */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Diagnostics left (Col 1) */}
                <div className="font-sans space-y-4 border-r border-slate-100 pr-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide">Symptoms / C.C.</h4>
                    <p className="text-xs text-slate-600 italic leading-relaxed mt-2">
                      - {patient.symptoms || "General viral discomfort, fever-ish state"}<br />
                      - Headache & fatigue
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide">Diagnosis</h4>
                    <p className="text-xs font-bold text-slate-700 mt-2">
                      Acute Viral Syndrome / <br />
                      Slight Nasal Congestion
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 border-b border-slate-200 pb-1 uppercase tracking-wide">Vitals Checked</h4>
                    <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-2">
                      Temp: 100.2 °F (Reported)<br />
                      BP: Normal range<br />
                      SPO2: 98%
                    </p>
                  </div>
                </div>

                {/* Prescribed Medicines Rx right (Col 2) */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-1.5 border-b-2 border-slate-900 pb-1">
                    <span className="text-2xl font-black italic text-slate-950 font-sans">Rx</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans mt-1">Prescribed Medicines</span>
                  </div>

                  <ol className="space-y-6 text-sm font-sans list-decimal pl-4">
                    <li className="space-y-1">
                      <div className="flex justify-between font-black text-slate-900">
                        <span>Tab. Napa Extend (665mg)</span>
                        <span className="text-xs text-slate-400 font-normal">10 Tablets</span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold">
                        Dosage: <span className="font-bold text-slate-800">1 + 0 + 1</span> (1 tab morning, 1 tab night) — <span className="font-bold text-slate-800">After Food</span>
                      </p>
                      <p className="text-[10px] text-slate-400 italic">Consume for 5 days. Skip if fever settles down.</p>
                    </li>

                    <li className="space-y-1">
                      <div className="flex justify-between font-black text-slate-900">
                        <span>Tab. Fexo (120mg)</span>
                        <span className="text-xs text-slate-400 font-normal">7 Tablets</span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold">
                        Dosage: <span className="font-bold text-slate-800">0 + 0 + 1</span> (1 tab before sleeping) — <span className="font-bold text-slate-800">After Food</span>
                      </p>
                      <p className="text-[10px] text-slate-400 italic">Consume for 7 days to clear throat and nasal congestion.</p>
                    </li>

                    <li className="space-y-1">
                      <div className="flex justify-between font-black text-slate-900">
                        <span>Syp. Adryll (100ml)</span>
                        <span className="text-xs text-slate-400 font-normal">1 Bottle</span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold">
                        Dosage: <span className="font-bold text-slate-800">2 tsp + 2 tsp + 2 tsp</span> (Two teaspoons, thrice daily) — <span className="font-bold text-slate-800">After Food</span>
                      </p>
                      <p className="text-[10px] text-slate-400 italic">Drink warm water, avoid cold items.</p>
                    </li>
                  </ol>

                  {/* General Advice block */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 font-sans mt-6">
                    <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-wide mb-1">GENERAL INSTRUCTIONS</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      - Drink plenty of warm water and rest well.<br />
                      - Perform warm salt-water gargles thrice daily.<br />
                      - Monitor body temperature. If fever rises above 102°F or persists for more than 5 days, consult a physician in person.
                    </p>
                  </div>
                </div>

              </div>

              {/* Doctor signature section */}
              <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sans">

                {/* QR validation */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-200/50">
                    [ QR CODE ]
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-slate-800 uppercase leading-none">Validate Prescription</h5>
                    <p className="text-[9px] text-slate-400 font-semibold mt-1">Scan QR code using Shukhee Mobile app to instantly order medicines with direct discounts.</p>
                  </div>
                </div>

                {/* Signature image placeholder */}
                <div className="text-left sm:text-right space-y-1 self-end sm:self-center">
                  <div className="h-8 flex items-center justify-end">
                    <span className="font-cursive italic text-purple-600 text-lg border-b border-purple-200">Dr. Md. Ashraful Islam</span>
                  </div>
                  <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Authorized Digital Signature</h5>
                  <p className="text-[9px] text-slate-400 font-semibold">Shukhee Tele-Health Network Services</p>
                </div>

              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setStatus("intake");
                  setPatient({
                    name: "",
                    age: "",
                    gender: "male",
                    phone: "",
                    symptoms: "",
                    medium: "video",
                    paymentMethod: "bkash"
                  });
                }}
                className="bg-white border border-slate-200 text-slate-600 font-bold text-xs py-3.5 px-6 rounded-full hover:bg-slate-50 hover:text-slate-800 transition-all flex items-center gap-1.5 focus:outline-none"
              >
                <Plus className="w-4 h-4" /> New Consultation
              </button>

              <Link
                href="/"
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-extrabold text-xs py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 focus:outline-none"
              >
                Back to Home <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

      </main>

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

    </div>
  );
}
