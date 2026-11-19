"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent, VideoReel, PhotoItem } from "@/content/siteContent";
import Image from "next/image";
import { Play, X, Maximize2, Clock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const REEL_DURATIONS = ["0:45", "0:30", "1:15", "1:00"];

export const WorkSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoReel | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const { activeTheme } = useTheme();

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
        setActivePhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getPhotoAspect = (aspect?: string) => {
    switch (aspect) {
      case "portrait":
        // 576x1024 native vertical portrait aspect ratio (9:16)
        return "aspect-[9/16]";
      case "square":
        // 1024x912 native warm podcast lounge aspect ratio (~8:7)
        return "aspect-[1024/912]";
      case "landscape":
      default:
        return "aspect-[4/3]";
    }
  };

  return (
    <section id="work" className="relative py-28 px-6 sm:px-8 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Top Ambient Light Accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${activeTheme.color}50 50%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: activeTheme.color }}>
              <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center border border-current text-[7px]">●</span>
              <span>Selected Productions</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              FEATURED REELS & IN-HOUSE STILLS
            </h2>
          </div>
          <p className="text-base text-neutral-400 max-w-lg font-normal leading-relaxed">
            {siteContent.work.subheading}
          </p>
        </div>

        {/* 1. Video Reel Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {siteContent.work.videos.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredVideoId(reel.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              onClick={() => setActiveVideo(reel)}
              className="group relative rounded-xl overflow-hidden bg-[#0E0F16] border border-white/[0.08] hover:border-white/25 transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
              style={{
                boxShadow: hoveredVideoId === reel.id ? `0 0 30px ${activeTheme.color}25` : "0 10px 30px rgba(0,0,0,0.6)",
              }}
            >
              {/* Aspect Ratio Container */}
              <div className="relative w-full aspect-[9/16] bg-black/90 overflow-hidden">
                <video
                  src={reel.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Shutter Telemetry Overlay */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-sm font-mono text-white tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.color }} />
                  <span>REEL 0{index + 1}</span>
                </div>

                {/* Duration Tag */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-sm font-mono text-neutral-300 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{REEL_DURATIONS[index % REEL_DURATIONS.length]}</span>
                </div>

                {/* Play Icon Pill in Center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg"
                    style={{
                      borderColor: hoveredVideoId === reel.id ? activeTheme.color : "rgba(255,255,255,0.2)",
                    }}
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" style={{ color: activeTheme.color }} />
                  </div>
                </div>

                {/* Bottom Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0E0F16] via-[#0E0F16]/70 to-transparent" />
              </div>

              {/* Card Meta Content */}
              <div className="p-5 bg-[#0E0F16] relative z-10 border-t border-white/[0.06]">
                <span className="font-mono text-sm uppercase tracking-wider block mb-1 font-semibold" style={{ color: activeTheme.color }}>
                  {reel.category}
                </span>
                <h3 className="text-base font-bold text-white mb-1 tracking-tight">
                  {reel.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 font-normal">
                  {reel.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Photo Gallery Grid */}
        <div className="pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-1" style={{ color: activeTheme.color }}>
                <span>In-House Stage Stills</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                STUDIO PHOTOGRAPHY & STILLS
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Native Upload Formats • Click to View Full Resolution
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {siteContent.work.photoGrid.map((photo, pIdx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                onClick={() => setActivePhoto(photo)}
                className="group relative rounded-xl overflow-hidden bg-[#0E0F16] border border-white/[0.08] hover:border-white/25 transition-all duration-300 cursor-pointer shadow-xl"
              >
                <div className={`relative w-full ${getPhotoAspect(photo.aspect)} overflow-hidden bg-[#050508]`}>
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  {/* Expand icon pill */}
                  <div
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-md"
                    style={{ color: activeTheme.color }}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 bg-[#0E0F16] border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold" style={{ color: activeTheme.color }}>
                      {photo.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      STILL 0{pIdx + 1}
                    </span>
                  </div>
                  <h4 className="font-heading text-base font-bold text-white mb-1 tracking-tight">
                    {photo.title}
                  </h4>
                  <p className="text-base text-neutral-300 leading-relaxed font-normal line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Fullscreen Lightbox Modal (Video & Photo) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full aspect-video sm:aspect-auto max-h-[75vh] flex items-center justify-center rounded-xl overflow-hidden border shadow-2xl bg-black"
                style={{ borderColor: `${activeTheme.color}50` }}
              >
                <video
                  src={activeVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-auto max-w-full rounded-xl"
                />
              </div>

              <div className="w-full mt-4 flex items-center justify-between px-2">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold" style={{ color: activeTheme.color }}>
                    {activeVideo.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {activeVideo.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  DREAM BYTE STUDIO • 4K CAPTURE
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActivePhoto(null)}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20 cursor-pointer border border-white/10"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full max-h-[78vh] flex items-center justify-center rounded-xl overflow-hidden border shadow-2xl bg-black/90 p-2 sm:p-4"
                style={{ borderColor: `${activeTheme.color}50` }}
              >
                <div className="relative w-full h-[65vh] sm:h-[74vh] flex items-center justify-center">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                </div>
              </div>

              <div className="w-full mt-4 flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm uppercase tracking-wider font-semibold" style={{ color: activeTheme.color }}>
                      {activePhoto.title === "Latest Still" ? "LATEST STILL" : activePhoto.category}
                    </span>
                    <span className="text-sm font-mono text-neutral-400">• IN-HOUSE STAGE STILL</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-normal max-w-2xl mt-0.5 leading-relaxed">
                    {activePhoto.caption}
                  </p>
                </div>
                <div
                  className="text-sm font-mono whitespace-nowrap bg-black/70 px-3 py-1.5 rounded-md border self-start sm:self-auto"
                  style={{ color: activeTheme.color, borderColor: `${activeTheme.color}40` }}
                >
                  DREAM BYTE STUDIO • SAHASTRADHARA RD
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
