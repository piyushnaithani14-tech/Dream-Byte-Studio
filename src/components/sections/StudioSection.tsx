"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/content/siteContent";
import { DisplacementPlane } from "@/components/canvas/DisplacementPlane";
import { MapPin, Navigation, Info, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const StudioSection: React.FC = () => {
  const { activeTheme } = useTheme();

  const studioPillars = [
    {
      title: "Aesthetic & Fancy In-House Sets",
      desc: "Curated organic Mediterranean alcove arches, warm acoustic wooden slat backdrops, and seamless cycloramas designed for high-production frames.",
    },
    {
      title: "All Photography Equipment In-House",
      desc: "Zero outside rental runs required. Full-frame 4K cinema bodies, fast prime optics, heavy-duty C-stands, and tethered calibrated monitors on set.",
    },
    {
      title: "Precision Lighting & Atmosphere",
      desc: "High-diffuse Godox octaboxes, motorized studio flash strobes, continuous warm tungsten lighting, and creative optical snoots ready on the floor.",
    },
    {
      title: "Complete Production Sanctuary",
      desc: "Dedicated bridal & model vanity suite, high-velocity climate control, quiet acoustic isolation, and client review workspace in Dehradun.",
    },
  ];

  return (
    <section id="studio" className="relative py-28 px-6 sm:px-8 bg-[#08090D] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: activeTheme.color }}>
              <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center border border-current text-[7px]">●</span>
              <span>Physical Space & Sets</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              FANCY IN-HOUSE SETS & COMPLETE GEAR
            </h2>
          </div>
          <p className="text-base text-neutral-400 max-w-lg font-normal leading-relaxed">
            {siteContent.theStudio.subheading}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: 3D Depth Displaced Plane Canvas */}
          <div className="lg:col-span-7">
            <DisplacementPlane />
            <p className="mt-3 text-xs font-mono text-neutral-400 flex items-center gap-2">
              <Info className="w-3.5 h-3.5" style={{ color: activeTheme.color }} />
              <span>{siteContent.theStudio.photoCaption}</span>
            </p>
          </div>

          {/* Right: Studio Details & Address Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Visit Us Card */}
            <div
              className="p-6 rounded-xl bg-[#0E0F16] border relative overflow-hidden shadow-xl"
              style={{
                borderColor: `${activeTheme.color}35`,
              }}
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-2" style={{ color: activeTheme.color }}>
                <Navigation className="w-4 h-4" />
                <span>Sahastradhara Road • Dehradun</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Visit Us in Person for a Studio Walkthrough
              </h3>
              <p className="text-base text-neutral-300 leading-relaxed font-normal mb-4">
                {siteContent.theStudio.note}
              </p>
              <div className="flex items-center gap-2 text-sm font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.color }} />
                <span>Call ahead scheduling recommended: +91 8279720490</span>
              </div>
            </div>

            {/* Address & GPS Coordinates Card */}
            <div className="p-6 rounded-xl bg-[#0E0F16] border border-white/[0.08]">
              <div className="flex items-start gap-3 mb-4 pb-4 border-b border-white/[0.08]">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: activeTheme.color }} />
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Studio Address</h4>
                  <p className="text-base text-neutral-300 leading-relaxed">
                    {siteContent.theStudio.addressBlock}
                  </p>
                  <p className="text-xs font-mono text-neutral-400 mt-1">
                    GPS: 30.3164945° N, 78.0321918° E
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=30.3164945,78.0321918"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-bold font-heading hover:underline"
                style={{ color: activeTheme.color }}
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* 4 In-House Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studioPillars.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeTheme.color }} />
                    <h5 className="font-heading text-xs font-bold text-white">{p.title}</h5>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed font-normal">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
