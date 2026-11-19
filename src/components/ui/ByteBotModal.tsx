"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Phone, MessageSquare, MapPin, Camera, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { siteContent } from "@/content/siteContent";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  actions?: Array<{ label: string; url?: string; onClick?: () => void }>;
  timestamp: string;
}

const CONSULTATION_PROMPTS = [
  { label: "Aesthetic Sets & Floor Space", query: "What sets, backdrops, and physical spaces are available in-house?" },
  { label: "Camera & Lighting Equipment", query: "What cinema cameras, optics, and lighting gear are provided on set?" },
  { label: "Podcast Lounge Suite", query: "How is the podcast lounge equipped for audio and multi-cam video?" },
  { label: "Dehradun Location & Visit", query: "Where is the studio located on Sahastradhara Road and how do I schedule a visit?" },
  { label: "Book Studio Time", query: "What is the procedure for booking studio dates and confirming equipment?" },
];

export const ByteBotModal: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, activePromptQuery, setActivePromptQuery, activeTheme } = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to Dream Byte Studio. We are an in-house commercial photography, film, and podcast facility on Sahastradhara Road, Dehradun. Every tool needed for a high-production shoot is already on set — curated aesthetic backdrops, 4K cinema bodies, prime optics, Godox softbox arrays, and acoustic audio suites. How may our production desk assist you today?",
      timestamp: "Ready",
      actions: [
        { label: "Book on WhatsApp", url: siteContent.contact.whatsAppUrl },
        { label: `Call Studio Desk (${siteContent.contact.primaryPhone})`, url: `tel:${siteContent.contact.primaryPhoneTel}` },
      ],
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (activePromptQuery) {
      handleUserQuery(activePromptQuery);
      setActivePromptQuery("");
    }
  }, [activePromptQuery]);

  const generateAnswer = (query: string): { text: string; actions?: Message["actions"] } => {
    const q = query.toLowerCase();

    if (q.includes("set") || q.includes("location") || q.includes("space") || q.includes("aesthetic") || q.includes("fancy") || q.includes("backdrop")) {
      return {
        text: "Our studio offers meticulously curated in-house shooting stages: organic Mediterranean wall alcoves with architectural display niches, warm backlit acoustic wooden slat paneling, seamless color sweeps, and a dedicated bridal and model vanity dressing suite. Everything is ready on the floor without external setup delays.",
        actions: [
          { label: "View Studio Spaces", onClick: () => { setIsConciergeOpen(false); window.location.hash = "studio"; } },
          { label: "Directions on Google Maps", url: "https://maps.google.com/?q=30.3164945,78.0321918" },
        ],
      };
    }

    if (q.includes("equipment") || q.includes("gear") || q.includes("camera") || q.includes("light") || q.includes("softbox") || q.includes("lens")) {
      return {
        text: "All gear is provided in-house: high-bitrate 4K cinema cameras, ultra-fast prime optics (f/1.4–f/2.8), motorized Godox softboxes, high-speed strobes, continuous warm tungsten lighting, heavy-duty C-stands, 3-axis motorized gimbals, and tethered color-calibrated monitors.",
        actions: [
          { label: "Inspect Gear Arsenal", onClick: () => { setIsConciergeOpen(false); window.location.hash = "gear"; } },
          { label: "Inquire on WhatsApp", url: siteContent.contact.whatsAppUrl },
        ],
      };
    }

    if (q.includes("podcast") || q.includes("audio") || q.includes("mic") || q.includes("interview")) {
      return {
        text: "Our in-house Podcast Lounge features acoustic wooden slat isolation walls, dual executive armchairs, professional broadcast dynamic microphones on heavy-duty articulating boom arms, low-noise preamps, and multi-angle 4K cameras for YouTube and streaming productions.",
        actions: [
          { label: "Reserve Podcast Lounge", url: siteContent.contact.whatsAppUrl },
          { label: "View Lounge Stills", onClick: () => { setIsConciergeOpen(false); window.location.hash = "work"; } },
        ],
      };
    }

    if (q.includes("where") || q.includes("address") || q.includes("visit") || q.includes("dehradun")) {
      return {
        text: `The studio is located at: 3rd Floor, above Bank of India, Sahastradhara Road, Near IT Park, Dehradun 248013, Uttarakhand. We operate 7 days a week by reservation. Walkthroughs can be scheduled ahead by telephone or WhatsApp.`,
        actions: [
          { label: `Call Primary Desk: ${siteContent.contact.primaryPhone}`, url: `tel:${siteContent.contact.primaryPhoneTel}` },
          { label: "WhatsApp Direct", url: siteContent.contact.whatsAppUrl },
        ],
      };
    }

    if (q.includes("book") || q.includes("price") || q.includes("cost") || q.includes("reserve") || q.includes("date")) {
      return {
        text: "To reserve production time, please share your desired shoot date, preferred hours, and production scope (Photo, Video, Podcast, or Wedding). You can submit through our on-page reservation form or contact our studio manager directly for immediate confirmation.",
        actions: [
          { label: "Open Reservation Form", onClick: () => { setIsConciergeOpen(false); window.location.hash = "booking"; } },
          { label: "Chat on WhatsApp", url: siteContent.contact.whatsAppUrl },
        ],
      };
    }

    return {
      text: "At Dream Byte Studio, 'Where Your Imagination is our innovation.' We provide an aesthetic location, complete in-house equipment, and all tools needed for a good photograph. Connect directly with our studio manager for technical specifications or customized bookings.",
      actions: [
        { label: "WhatsApp Studio Manager", url: siteContent.contact.whatsAppUrl },
        { label: `Call Desk (${siteContent.contact.primaryPhone})`, url: `tel:${siteContent.contact.primaryPhoneTel}` },
      ],
    };
  };

  const handleUserQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = generateAnswer(queryText);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        actions: response.actions,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserQuery(input);
  };

  return (
    <AnimatePresence>
      {isConciergeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setIsConciergeOpen(false)}
        >
          <motion.div
            initial={{ y: 40, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="w-full sm:max-w-xl h-[88vh] sm:h-[660px] bg-[#0C0D14] border border-white/10 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
            style={{ borderColor: `${activeTheme.color}35`, boxShadow: `0 0 50px rgba(0,0,0,0.85)` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#11121B] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-black font-bold shadow-md"
                  style={{ backgroundColor: activeTheme.color }}
                >
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-white text-sm sm:text-base">
                      Studio Concierge
                    </h3>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Live Desk
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">Dream Byte Studio • Sahastradhara Road, Dehradun</p>
                </div>
              </div>

              <button
                onClick={() => setIsConciergeOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close Studio Concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Consultation Chips */}
            <div className="px-4 py-2.5 bg-[#090A0F] border-b border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
              {CONSULTATION_PROMPTS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUserQuery(chip.query)}
                  className="whitespace-nowrap text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 hover:border-white/20 transition-all font-medium"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-4 rounded-xl text-base leading-relaxed ${
                      m.sender === "user"
                        ? "bg-white text-black font-medium"
                        : "bg-[#151722] text-neutral-200 border border-white/10"
                    }`}
                  >
                    {m.text}

                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                        {m.actions.map((act, aIdx) =>
                          act.url ? (
                            <a
                              key={aIdx}
                              href={act.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md text-black transition-opacity hover:opacity-90 shadow-sm"
                              style={{ backgroundColor: activeTheme.color }}
                            >
                              <span>{act.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              key={aIdx}
                              onClick={act.onClick}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                            >
                              <span>{act.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="p-3 bg-[#0F1018] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquire regarding equipment, stage availability, location..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-black disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105"
                style={{ backgroundColor: activeTheme.color }}
                aria-label="Send inquiry"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
