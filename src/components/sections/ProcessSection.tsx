"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/content/siteContent";
import { MessageSquare, Sliders, Video, Download } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const getStepIcon = (index: number, color: string) => {
  const iconProps = { className: "w-5 h-5", style: { color } };
  switch (index) {
    case 0:
      return <MessageSquare {...iconProps} />;
    case 1:
      return <Sliders {...iconProps} />;
    case 2:
      return <Video {...iconProps} />;
    case 3:
    default:
      return <Download {...iconProps} />;
  }
};

export const ProcessSection: React.FC = () => {
  const { activeTheme } = useTheme();

  return (
    <section id="process" className="relative py-28 px-6 sm:px-8 bg-[#08090D] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: activeTheme.color }}>
              <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center border border-current text-[7px]">●</span>
              <span>Production Workflow</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              FROM CONCEPT TO MASTER CUT
            </h2>
          </div>
          <p className="text-base text-neutral-400 max-w-lg font-normal leading-relaxed">
            {siteContent.process.subheading}
          </p>
        </div>

        {/* 4 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line behind steps on desktop */}
          <div
            className="hidden lg:block absolute top-12 left-12 right-12 h-px pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${activeTheme.color}35 50%, transparent 100%)`,
            }}
          />

          {siteContent.process.steps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-6 rounded-xl bg-[#0E0F16] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-mono text-2xl font-bold"
                    style={{ color: activeTheme.color }}
                  >
                    0{idx + 1}
                  </span>
                  <div
                    className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ borderColor: `${activeTheme.color}30` }}
                  >
                    {getStepIcon(idx, activeTheme.color)}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-base text-neutral-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-sm font-mono text-neutral-500">
                <span>PHASE 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
