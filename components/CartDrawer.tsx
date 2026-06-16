"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cart: { [key: string]: CartItem };
  updateCartQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  cartTotalQty: number;
  cartTotalPrice: number;
}

export default function CartDrawer({
  isOpen,
  setIsOpen,
  cart,
  updateCartQty,
  removeItem,
  cartTotalQty,
  cartTotalPrice
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Drawer container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-in-out transform">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5.5 h-5.5 text-purple-600" />
            <h3 className="text-lg font-black text-slate-950">Your Cart ({cartTotalQty} items)</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1 rounded-full hover:bg-slate-200 transition-all focus:outline-none"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {Object.values(cart).length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Your cart is empty</h4>
              <p className="text-xs text-slate-400 font-medium max-w-[200px]">Add some medicines or skin cleansers to get started.</p>
            </div>
          ) : (
            Object.values(cart).map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 group">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate mb-1">{item.name}</h4>
                  <span className="text-xs font-black text-purple-600 block">৳{item.price} each</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex items-center border border-slate-200 rounded-full bg-white px-2 py-1">
                    <button
                      onClick={() => updateCartQty(item.id, -1)}
                      className="p-0.5 rounded-full hover:bg-slate-100 text-slate-500 focus:outline-none"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-slate-800 px-2.5">{item.qty}</span>
                    <button
                      onClick={() => updateCartQty(item.id, 1)}
                      className="p-0.5 rounded-full hover:bg-slate-100 text-slate-500 focus:outline-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Checkout Summary */}
        {Object.values(cart).length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>Subtotal</span>
                <span>৳{cartTotalPrice}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>Delivery Charge (Express Dhaka)</span>
                <span className="text-emerald-600">FREE</span>
              </div>
              <div className="border-t border-slate-200/50 pt-2 flex justify-between text-base font-black text-slate-900">
                <span>Total Amount</span>
                <span>৳{cartTotalPrice}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Checkout & Buy Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
