"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { StudioScene } from "./StudioScene";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface HeroCanvasProps {
  scrollProgress: number; // 0 to 1
  focusTarget?: "camera" | "mic" | "softbox" | "frame";
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ scrollProgress, focusTarget = "camera" }) => {
  const { activeTheme } = useTheme();
  const [dpr, setDpr] = useState(1.5);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize pointer coordinates to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y });
    };

    // Gyroscope / device orientation fallback for mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma is left-to-right tilt in [-90, 90]
        // beta is front-to-back tilt in [-180, 180]
        const x = Math.min(Math.max(e.gamma / 30, -1), 1);
        const y = Math.min(Math.max((e.beta - 45) / 30, -1), 1);
        setPointer({ x, y });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  // Graceful fallback for reduced motion or devices without WebGL
  if (!hasWebGL || reducedMotion) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#07070A] flex items-center justify-center">
        {/* Layered 2.5D Parallax Fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-300"
          style={{
            backgroundImage: "url('/assets/images/P1095305.webp')",
            transform: `translate(${pointer.x * -15}px, ${pointer.y * -15}px) scale(1.08)`,
          }}
        />
        {/* Center glowing studio lens ring */}
        <div
          className="relative w-72 h-72 rounded-full border border-[#FFDB59]/40 shadow-[0_0_80px_rgba(255,219,89,0.35)] flex items-center justify-center transition-transform duration-300"
          style={{
            transform: `translate(${pointer.x * 20}px, ${pointer.y * 20}px)`,
          }}
        >
          <div className="w-56 h-56 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#FFDB59]/20 to-transparent blur-sm" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07070A]/80 to-[#07070A]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#07070A]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42, near: 0.1, far: 50 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMappingExposure: 1.1,
        }}
        shadows
      >
        <PerformanceMonitor
          onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))}
          onDecline={() => setDpr(1)}
        />
        <color attach="background" args={["#07070A"]} />
        <fog attach="fog" args={["#07070A", 4, 18]} />

        <Suspense fallback={null}>
          <StudioScene
            scrollProgress={scrollProgress}
            pointer={pointer}
            themeColor={activeTheme.color}
            focusTarget={focusTarget}
          />
          
          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={0.55}
              luminanceSmoothing={0.3}
              intensity={0.85}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.15} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Theme Light Beam / Lens Dolly Transition Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-150"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeTheme.color}55 0%, rgba(7, 7, 10, 0.8) 70%, #07070A 100%)`,
          opacity: Math.max(0, (scrollProgress - 0.4) * 1.6),
        }}
      />
    </div>
  );
};
