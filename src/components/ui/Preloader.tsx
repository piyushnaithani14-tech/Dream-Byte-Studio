"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [fStop, setFStop] = useState("f/16");

  useEffect(() => {
    const fStops = ["f/16", "f/11", "f/8.0", "f/5.6", "f/4.0", "f/2.8", "f/1.8", "f/1.4"];
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const nextVal = prev + Math.floor(Math.random() * 4) + 2;
        const bounded = Math.min(nextVal, 100);
        const stopIndex = Math.min(
          Math.floor((bounded / 100) * fStops.length),
          fStops.length - 1
        );
        setFStop(fStops[stopIndex]);
        return bounded;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="studio-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "brightness(1.8)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#07070A] overflow-hidden select-none"
        >
          {/* Subtle studio grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Glowing central radial ambient */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FFDB59]/5 blur-[120px] pointer-events-none" />

          {/* Central Logo Container with Light Sweep */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Shutter Blades SVG Icon */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#FFDB59]"
                style={{
                  transform: `rotate(${progress * 1.8}deg)`,
                  transition: "transform 0.1s linear",
                }}
              >
                {/* Outer aperture housing ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-40"
                />
                {/* Iris blades */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <path
                    key={i}
                    d="M 50 20 C 65 30, 75 45, 50 50 Z"
                    fill="currentColor"
                    className="opacity-80"
                    transform={`rotate(${angle + progress * 0.5} 50 50)`}
                  />
                ))}
                {/* Center aperture hole */}
                <circle
                  cx="50"
                  cy="50"
                  r={Math.max(4, 18 - (progress / 100) * 12)}
                  fill="#07070A"
                  stroke="#FFDB59"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Center flash point */}
              <div
                className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_15px_#FFDB59]"
                style={{
                  opacity: progress > 90 ? (progress - 90) / 10 : 0.2,
                }}
              />
            </div>

            {/* Logo Image with Animated Light Sweep */}
            <div className="relative w-48 h-28 mb-4 overflow-hidden">
              <Image
                src="/assets/logos/DREAM_BYTE_STUDIO_VERTICAL-02.png"
                alt="Dream Byte Studio Logo"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              />
              {/* Dynamic Light Sweep Bar across the logo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Exposure Meter & Telemetry */}
            <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest text-[#8F94A0] mb-2 px-2">
              <div className="flex items-center gap-1.5 text-[#FFDB59]">
                <span className="w-2 h-2 rounded-full bg-[#FFDB59] animate-pulse" />
                <span>REC [CALIBRATING]</span>
              </div>
              <div className="text-white/80">{fStop}</div>
            </div>

            {/* Progress Meter Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFDB59]/60 via-[#FFDB59] to-white rounded-full shadow-[0_0_12px_rgba(255,219,89,0.7)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Exposure Index and Percentage */}
            <div className="w-full flex items-center justify-between mt-3 text-sm font-mono text-[#8F94A0]">
              <span>SHUTTER 1/250s</span>
              <span className="text-white font-bold text-sm tracking-normal">
                {progress}
                <span className="text-[#FFDB59] font-normal">%</span>
              </span>
              <span>ISO 400</span>
            </div>
          </div>

          {/* Bottom studio branding stamp */}
          <div className="absolute bottom-8 text-sm font-mono tracking-widest text-white/30 uppercase">
            Dehradun • Uttarakhand
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
