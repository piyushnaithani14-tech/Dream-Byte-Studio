"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/content/siteContent";
import { HeroCanvas } from "@/components/canvas/HeroCanvas";
import { Play, Sparkles, Search, Camera, Mic, Sun, Heart, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface HeroSectionProps {
  onBookClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [focusTarget, setFocusTarget] = useState<"camera" | "mic" | "softbox" | "frame">("camera");
  const [searchQuery, setSearchQuery] = useState("");
  const { activeTheme, openConciergeWithPrompt } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      openConciergeWithPrompt(searchQuery);
      setSearchQuery("");
    }
  };

  const focusOptions: Array<{ id: "camera" | "mic" | "softbox" | "frame"; label: string; icon: any }> = [
    { id: "camera", label: "Cinema Camera & Optics", icon: Camera },
    { id: "mic", label: "Acoustic Lounge Suite", icon: Mic },
    { id: "softbox", label: "Diffused Studio Lighting", icon: Sun },
    { id: "frame", label: "Turn Moments into Memories", icon: Heart },
  ];

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-[185vh] bg-[#08090D]">
      {/* Sticky 3D Studio Canvas Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* WebGL 3D Canvas with Professional Lighting & Camera Telemetry */}
        <HeroCanvas scrollProgress={scrollProgress} focusTarget={focusTarget} />

        {/* Studio Viewfinder HUD Telemetry Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 md:p-10 select-none">
          {/* Top Camera Status & Coordinates */}
          <div className="flex items-center justify-between w-full pt-16 sm:pt-14">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 relative">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: activeTheme.color }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeTheme.color }} />
              </span>
              <span className="font-mono text-sm tracking-wider font-semibold text-white">
                REC [4K 60FPS]
              </span>
              <span className="hidden sm:inline-block font-mono text-sm tracking-wider text-neutral-400">
                • 1/250s • f/2.8 • ISO 400 • {activeTheme.temp.toUpperCase()}
              </span>
            </div>

            {/* Top Right: Dehradun Coordinates */}
            <div className="font-mono text-sm tracking-wider text-neutral-400 text-right">
              <span>30.3165° N, 78.0322° E</span>
              <span className="hidden sm:inline ml-2 font-semibold" style={{ color: activeTheme.color }}>
                DEHRADUN, UK
              </span>
            </div>
          </div>

          {/* Minimalist Viewfinder Reticle Corners */}
          <div className="absolute top-24 left-6 sm:left-8 w-5 h-5 border-t border-l border-white/20 pointer-events-none" />
          <div className="absolute top-24 right-6 sm:right-8 w-5 h-5 border-t border-r border-white/20 pointer-events-none" />
          <div className="absolute bottom-20 left-6 sm:left-8 w-5 h-5 border-b border-l border-white/20 pointer-events-none" />
          <div className="absolute bottom-20 right-6 sm:right-8 w-5 h-5 border-b border-r border-white/20 pointer-events-none" />

          {/* Main Hero Typography & CTAs (Center Content) */}
          <div
            className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 pointer-events-auto transition-opacity duration-300 my-auto"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2.2),
              transform: `translateY(${scrollProgress * -80}px)`,
            }}
          >
            {/* Top Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0E0F16]/80 backdrop-blur-md mb-4 shadow-sm text-xs font-mono text-neutral-300"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.color }} />
              <span>Sahastradhara Road • Dehradun</span>
              <span className="text-white/20">|</span>
              <span className="text-white font-medium">In-House Aesthetic Sets & Full Photo Gear</span>
            </motion.div>

            {/* H1 Main Headline - Clean Modern Proportions */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase leading-[1.05]"
            >
              DREAM BYTE{" "}
              <span
                style={{
                  color: activeTheme.color,
                }}
              >
                STUDIO
              </span>
            </motion.h1>

            {/* Sub-line & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-3 flex flex-col items-center gap-1.5"
            >
              <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-400">
                Photo • Video • Podcast • Wedding
              </div>
              <p className="text-base sm:text-xl text-white font-medium tracking-tight">
                &ldquo;Where Your Imagination is our innovation.&rdquo;
              </p>
              <p className="text-base text-neutral-300 max-w-xl font-normal leading-relaxed mt-1">
                {siteContent.hero.approvedStatement}
              </p>
            </motion.div>

            {/* Studio Concierge Inquiries Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-5 w-full max-w-xl"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex items-center rounded-xl bg-[#0E0F16]/90 border border-white/10 p-1.5 shadow-2xl backdrop-blur-xl focus-within:border-white/25 transition-colors"
              >
                <div className="pl-3.5 pr-2 text-neutral-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Inquire regarding in-house sets, gear & bookings..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-heading font-semibold text-xs text-black transition-opacity hover:opacity-90"
                  style={{ backgroundColor: activeTheme.color }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Consult</span>
                </button>
              </form>

              {/* Consultation Topic Pills */}
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
                {[
                  { label: "In-House Sets", q: "Tell me about your in-house aesthetic sets and backdrops." },
                  { label: "Camera & Lighting Gear", q: "What cameras, lenses, and lighting equipment are provided on set?" },
                  { label: "Podcast Suite", q: "How is the podcast lounge equipped for audio and video?" },
                  { label: "Sahastradhara Rd Location", q: "Where is Dream Byte Studio located in Dehradun?" },
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => openConciergeWithPrompt(chip.q)}
                    className="text-sm px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/10 hover:border-white/20 transition-all font-medium"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 3D Camera Focus Controls */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl"
            >
              <span className="text-sm font-mono uppercase tracking-wider text-neutral-500 mr-1 hidden sm:inline">
                3D View:
              </span>
              {focusOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = focusTarget === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFocusTarget(opt.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-white/15 text-white border"
                        : "bg-black/40 text-neutral-400 hover:text-white border border-white/5 hover:border-white/15"
                    }`}
                    style={isSelected ? { borderColor: activeTheme.color } : {}}
                  >
                    <Icon className="w-3 h-3" style={isSelected ? { color: activeTheme.color } : {}} />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
            >
              <a
                href={siteContent.contact.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onBookClick}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider text-black transition-all hover:opacity-95 shadow-lg w-full sm:w-auto"
                style={{
                  backgroundColor: activeTheme.color,
                  boxShadow: `0 0 25px ${activeTheme.color}35`,
                }}
              >
                <span>BOOK THE STUDIO</span>
                <span className="text-sm font-mono text-black/75">(+91 8279720490)</span>
              </a>

              <a
                href="#work"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 bg-black/40 hover:bg-white/10 text-white font-heading font-medium text-xs uppercase tracking-wider transition-all w-full sm:w-auto"
              >
                <Play className="w-3.5 h-3.5 fill-current" style={{ color: activeTheme.color }} />
                <span>VIEW PRODUCTIONS</span>
              </a>
            </motion.div>
          </div>

          {/* Bottom Telemetry & Scroll Cue */}
          <div
            className="flex items-center justify-between w-full pb-2 transition-opacity duration-200"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
          >
            <div className="text-sm font-mono text-neutral-500 tracking-wider">
              SHUTTER DOL-IN ACTIVE
            </div>

            {/* Scroll Indicator */}
            <a href="#services" className="flex flex-col items-center gap-1 group cursor-pointer">
              <span className="text-sm font-mono tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                SCROLL TO EXPLORE
              </span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1"
                style={{ borderColor: `${activeTheme.color}50` }}
              >
                <div className="w-1 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.color }} />
              </motion.div>
            </a>

            <div className="text-sm font-mono text-neutral-500 tracking-wider text-right">
              VOLUMETRIC OPTICAL RIG
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
