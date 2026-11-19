"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touch devices)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, select, textarea, [data-cursor-interactive], [role='button']");
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute("data-cursor-text");
        setCursorText(customText || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", handlePointerOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handlePointerOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Viewfinder / Focus Reticle */}
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          rotate: isHovered ? 90 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className={`relative transition-all duration-300 ${
            isHovered
              ? "w-14 h-14 border border-[#FFDB59] rounded-full shadow-[0_0_20px_rgba(255,219,89,0.5)]"
              : "w-8 h-8 border border-white/30 rounded-full"
          }`}
        >
          {/* Camera Viewfinder Crosshairs when hovering */}
          {isHovered && (
            <>
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#FFDB59]" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#FFDB59]" />
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-0.5 w-1.5 bg-[#FFDB59]" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-0.5 w-1.5 bg-[#FFDB59]" />
            </>
          )}
        </div>
      </motion.div>

      {/* Center Focus Dot */}
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          backgroundColor: isHovered ? "#FFDB59" : "#FFFFFF",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Floating text prompt if provided (e.g. "DRAG" or "VIEW") */}
      {cursorText && (
        <motion.div
          className="absolute left-0 top-0 ml-6 mt-4 px-2 py-0.5 bg-[#07070A]/90 border border-[#FFDB59]/40 rounded text-sm font-mono tracking-wider text-[#FFDB59] uppercase pointer-events-none"
          style={{
            x: smoothX,
            y: smoothY,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {cursorText}
        </motion.div>
      )}
    </div>
  );
};
