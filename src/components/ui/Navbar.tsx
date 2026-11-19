"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/content/siteContent";
import { Menu, X, Phone, ChevronDown, ArrowUpRight, Sparkles, SlidersHorizontal } from "lucide-react";
import { useTheme, LIGHTING_THEMES } from "@/context/ThemeContext";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { activeTheme, setThemeById, setIsConciergeOpen } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Productions", href: "#work" },
    { name: "Studio Space", href: "#studio" },
    { name: "Gear Arsenal", href: "#gear" },
    { name: "Workflow", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#08090D]/95 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "py-5 bg-gradient-to-b from-[#08090D]/90 via-[#08090D]/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* 1. Left: Brand Logo & Typography */}
          <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={siteContent.brand.logoPath}
                alt={siteContent.brand.name}
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-white tracking-wide">
                  DREAM BYTE STUDIO
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" title="Studio Active" />
              </div>
              <span className="text-[10px] font-mono tracking-[0.16em] text-neutral-400 uppercase">
                Dehradun • Photo • Video • Podcast
              </span>
            </div>
          </Link>

          {/* 2. Center: Desktop Editorial Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium uppercase tracking-[0.1em] text-neutral-300 hover:text-white transition-colors py-1 relative group"
              >
                <span>{link.name}</span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full"
                  style={{ backgroundColor: activeTheme.color }}
                />
              </a>
            ))}
          </nav>

          {/* 3. Right: Studio Lighting Profile + Direct Phone + CTAs */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Lighting Mode Selector */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 transition-colors"
                title="Switch Studio Lighting Profile"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.color }} />
                <span className="text-[11px]">{activeTheme.name}</span>
                <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${themeDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-[#0E0F16] border border-white/10 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-3 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Studio Lighting Profiles
                    </div>
                    {LIGHTING_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setThemeById(theme.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          activeTheme.id === theme.id
                            ? "bg-white/10 text-white font-semibold"
                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
                          <span>{theme.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">{theme.badge}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Studio Phone Call Link */}
            <a
              href={`tel:${siteContent.contact.primaryPhoneTel}`}
              className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors px-2 py-1"
              title={`Direct studio desk: ${siteContent.contact.primaryPhone}`}
            >
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden xl:inline">{siteContent.contact.primaryPhone}</span>
            </a>

            {/* Studio Concierge Trigger */}
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-neutral-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: activeTheme.color }} />
              <span>Studio Concierge</span>
            </button>

            {/* Primary Action Button */}
            <a
              href="#booking"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider text-black transition-all hover:opacity-95 shadow-md hover:scale-[1.02]"
              style={{
                backgroundColor: activeTheme.color,
                boxShadow: `0 0 20px ${activeTheme.color}35`,
              }}
            >
              <span>Book Session</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Bar: Concierge + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-200"
              aria-label="Studio Concierge"
            >
              <Sparkles className="w-4 h-4" style={{ color: activeTheme.color }} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#08090D]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 lg:hidden"
          >
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-5 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-heading font-medium tracking-wide text-neutral-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Lighting Profile Selection */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2 text-center">
                Studio Lighting Profile
              </span>
              <div className="grid grid-cols-2 gap-2">
                {LIGHTING_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setThemeById(theme.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs font-mono border transition-colors ${
                      activeTheme.id === theme.id
                        ? "bg-white/10 text-white font-bold border-white/30"
                        : "bg-black/30 text-neutral-400 border-white/5"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }} />
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="space-y-3">
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-lg text-center font-heading font-bold uppercase tracking-wider text-black text-xs block shadow-lg"
                style={{ backgroundColor: activeTheme.color }}
              >
                Book Studio Session
              </a>
              <a
                href={`tel:${siteContent.contact.primaryPhoneTel}`}
                className="w-full py-3 rounded-lg text-center text-xs font-mono text-neutral-300 border border-white/10 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Studio: {siteContent.contact.primaryPhone}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
