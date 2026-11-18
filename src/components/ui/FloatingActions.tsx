"use client";

import React from "react";
import { MessageSquare, Phone, Sparkles } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import { useTheme } from "@/context/ThemeContext";

export const FloatingActions: React.FC = () => {
  const { setIsConciergeOpen, activeTheme } = useTheme();

  return (
    <>
      {/* 1. Bottom-Left Quick Contacts (WhatsApp & Phone) */}
      <div className="fixed bottom-6 left-6 z-[90] flex items-center gap-2.5">
        {/* WhatsApp Button */}
        <a
          href={siteContent.contact.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Booking"
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-md bg-black/90 backdrop-blur-md border border-white/10 text-xs font-medium text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            WhatsApp Concierge
          </span>
        </a>

        {/* Telephone Call Button */}
        <a
          href={`tel:${siteContent.contact.primaryPhoneTel}`}
          aria-label="Call Studio Manager"
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#12131D] border border-white/20 text-white shadow-xl hover:border-white/50 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Phone className="w-4 h-4 text-white" />
          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-md bg-black/90 backdrop-blur-md border border-white/10 text-xs font-mono text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Call +91 8279720490
          </span>
        </a>
      </div>

      {/* 2. Bottom-Right Studio Concierge Trigger */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <button
          onClick={() => setIsConciergeOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#12131D] border border-white/15 text-white shadow-2xl hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-200"
          style={{ borderColor: `${activeTheme.color}50` }}
          aria-label="Open Studio Concierge"
        >
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-black font-bold"
            style={{ backgroundColor: activeTheme.color }}
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-xs font-heading font-semibold tracking-wide">Studio Concierge</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </button>
      </div>
    </>
  );
};
