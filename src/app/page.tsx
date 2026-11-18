"use client";

import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { StudioSection } from "@/components/sections/StudioSection";
import { GearSection } from "@/components/sections/GearSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { ByteBotModal } from "@/components/ui/ByteBotModal";

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-[#08090D] text-white">
        {/* Film grain overlay */}
        <div className="film-grain" />

        {/* 1. Camera Shutter Preloader */}
        <Preloader onComplete={() => setPreloaderComplete(true)} />

        {/* 2. Glassmorphic Fixed Navbar with Dynamic Lighting Presets */}
        <Navbar />

        {/* 3. Hero Section (3D WebGL Scene, Theme Lighting, Focus Modes, AI Search) */}
        <HeroSection />

        {/* 4. Services Section (Crafted for Creative Excellence - 4 Tilt Cards) */}
        <ServicesSection />

        {/* 5. Work & Reel Gallery (4K Reels & Native Stills with Fullscreen Lightbox) */}
        <WorkSection />

        {/* 6. The Studio (3D Displaced Photo Plane + In-House Sets & Facility Specs) */}
        <StudioSection />

        {/* 7. Studio Gear & Photo Arsenal (Interactive Filter Tabs & Spec Cards) */}
        <GearSection />

        {/* 8. Production Workflow (01 Enquire > 02 Plan > 03 Shoot > 04 Deliver) */}
        <ProcessSection />

        {/* 9. Booking CTA & Interactive Form */}
        <BookingSection />

        {/* 10. Contact & Embedded Dark Studio Map */}
        <ContactSection />

        {/* 11. Semantic Footer */}
        <Footer />

        {/* 12. Persistent Floating Quick Dock (WhatsApp, Phone, ByteBot AI) */}
        <FloatingActions />

        {/* 13. Interactive ByteBot AI Studio Assistant Modal */}
        <ByteBotModal />
      </main>
    </ThemeProvider>
  );
}
