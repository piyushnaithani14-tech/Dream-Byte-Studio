"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteContent, ServiceItem } from "@/content/siteContent";
import { Camera, Film, Mic, Heart, ArrowUpRight, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface TiltCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  const getIcon = () => {
    switch (type) {
      case "camera":
        return <Camera className="w-5 h-5" />;
      case "video":
        return <Film className="w-5 h-5" />;
      case "mic":
        return <Mic className="w-5 h-5" />;
      case "rings":
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <div
      className="relative w-11 h-11 rounded-lg bg-white/[0.04] border flex items-center justify-center transition-colors"
      style={{
        borderColor: `${color}40`,
        color: color,
      }}
    >
      {getIcon()}
    </div>
  );
};

const TiltCard: React.FC<TiltCardProps> = ({ service, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { activeTheme, openConciergeWithPrompt } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative h-full flex flex-col justify-between p-7 rounded-xl bg-[#0E0F16] border border-white/[0.08] transition-all duration-300 overflow-hidden shadow-xl"
        style={
          isHovered
            ? {
                borderColor: `${activeTheme.color}60`,
                boxShadow: `0 15px 35px -10px rgba(0,0,0,0.8)`,
              }
            : {}
        }
      >
        <div>
          {/* Top Domain Badge & Icon */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border font-medium"
              style={{
                color: activeTheme.color,
                borderColor: `${activeTheme.color}35`,
                backgroundColor: `${activeTheme.color}10`,
              }}
            >
              {service.badge}
            </span>
            <ServiceIcon type={service.iconType} color={activeTheme.color} />
          </div>

          {/* Heading & Tagline */}
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm font-mono text-neutral-400 mb-3 italic">
            &ldquo;{service.tagline}&rdquo;
          </p>
          <p className="text-base text-neutral-300 leading-relaxed font-normal mb-6">
            {service.description}
          </p>

          {/* Feature Bullets */}
          <div className="space-y-2.5 mb-6">
            {service.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5 text-base text-neutral-300 font-normal">
                <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: activeTheme.color }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer: Highlight + Action Buttons */}
        <div className="pt-4 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.color }} />
            <span>{service.inHouseHighlight}</span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <a
              href="#booking"
              className="flex items-center gap-1 text-xs font-heading font-semibold hover:underline"
              style={{ color: activeTheme.color }}
            >
              <span>Reserve Session</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openConciergeWithPrompt(`Tell me more about booking ${service.title} at Dream Byte Studio.`)}
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-colors"
                title="Consult Studio Concierge"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <a
                href={siteContent.contact.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#25D366]/20 text-neutral-300 hover:text-[#25D366] transition-colors"
                title="Direct WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const { activeTheme } = useTheme();

  return (
    <section id="services" className="relative py-28 px-6 sm:px-8 bg-[#08090D] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: activeTheme.color }}>
              <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center border border-current text-[7px]">●</span>
              <span>Studio Capabilities</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              CRAFTED FOR CREATIVE EXCELLENCE
            </h2>
          </div>
          <p className="text-base text-neutral-400 max-w-lg font-normal leading-relaxed">
            All four production verticals are fully supported with our aesthetic location and complete equipment arsenal in Dehradun.
          </p>
        </div>

        {/* 4 Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.services.map((service, index) => (
            <TiltCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
