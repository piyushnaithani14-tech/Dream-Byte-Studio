"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Zap, Mic, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { siteContent, GearItem } from "@/content/siteContent";
import { useTheme } from "@/context/ThemeContext";

export const GearSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { activeTheme, openConciergeWithPrompt } = useTheme();

  const filteredItems =
    activeTab === "all"
      ? siteContent.gear.items
      : siteContent.gear.items.filter((item) => item.category === activeTab);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cameras":
        return <Camera className="w-5 h-5" />;
      case "lighting":
        return <Zap className="w-5 h-5" />;
      case "audio":
      default:
        return <Mic className="w-5 h-5" />;
    }
  };

  return (
    <section id="gear" className="relative py-28 px-6 sm:px-8 bg-[#08090D] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: activeTheme.color }}>
              <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center border border-current text-[7px]">●</span>
              <span>All Equipment In-House</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              STUDIO GEAR & PHOTO ARSENAL
            </h2>
          </div>
          <p className="text-base text-neutral-400 max-w-lg font-normal leading-relaxed">
            {siteContent.gear.subheading}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/[0.08]">
          {siteContent.gear.categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-black font-semibold shadow-md"
                    : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
                style={isActive ? { backgroundColor: activeTheme.color } : {}}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gear Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative rounded-xl bg-[#0E0F16] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Card Header with Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border font-medium"
                      style={{
                        color: activeTheme.color,
                        borderColor: `${activeTheme.color}35`,
                        backgroundColor: `${activeTheme.color}10`,
                      }}
                    >
                      {item.tag}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
                      {getCategoryIcon(item.category)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-sm font-mono text-neutral-400 mb-3">{item.subtitle}</div>
                  <p className="text-base text-neutral-300 leading-relaxed font-normal mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5 text-base text-neutral-300 font-normal">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: activeTheme.color }} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Banner Callout */}
        <div
          className="mt-12 rounded-xl p-6 sm:p-8 bg-[#0E0F16] border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{ borderColor: `${activeTheme.color}35` }}
        >
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest block mb-1 font-semibold" style={{ color: activeTheme.color }}>
              THE DREAM BYTE STUDIO ADVANTAGE
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
              Walk in with an idea. Everything to capture it is already on set.
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl font-normal leading-relaxed">
              Eliminate outside rental runs, logistics bottlenecks, and gear compatibility issues. We provide the complete in-house arsenal for photo, video, and podcast sessions in Dehradun.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 w-full md:w-auto">
            <button
              onClick={() => openConciergeWithPrompt("What specific equipment is included for my shoot?")}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-xs sm:text-sm border border-white/10 transition-all flex-1 md:flex-initial whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Inquire About Gear</span>
            </button>
            <a
              href="#booking"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-black font-heading font-semibold text-xs sm:text-sm transition-transform hover:scale-[1.02] shadow-lg flex-1 md:flex-initial whitespace-nowrap"
              style={{ backgroundColor: activeTheme.color }}
            >
              <span>Book Studio & Gear</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
