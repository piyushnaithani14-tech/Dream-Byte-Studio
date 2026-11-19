"use client";

import React from "react";
import { siteContent } from "@/content/siteContent";
import { MapPin, Phone, Mail, MessageSquare, Instagram, Youtube, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const ContactSection: React.FC = () => {
  const { activeTheme } = useTheme();

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-8 bg-[#08090D] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: activeTheme.color }}>
              <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center border border-current text-[7px]">●</span>
              <span>Connect & Visit</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              GET IN TOUCH WITH THE STUDIO
            </h2>
          </div>
          <p className="text-base text-neutral-400 max-w-lg font-normal leading-relaxed">
            Conveniently situated on Sahastradhara Road near IT Park, Dehradun. Connect with our production team for bookings, equipment specifications, and walkthroughs.
          </p>
        </div>

        {/* Content Layout: Contact Cards & Embedded Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Address Card */}
            <div className="p-6 rounded-xl bg-[#0E0F16] border border-white/[0.08] hover:border-white/20 transition-colors">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${activeTheme.color}15`,
                    borderColor: `${activeTheme.color}35`,
                    color: activeTheme.color,
                  }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                    Studio Location
                  </span>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    {siteContent.contact.address.full}
                  </p>
                  <span className="text-xs font-mono block mt-1" style={{ color: activeTheme.color }}>
                    Coordinates: 30.3164945° N, 78.0321918° E
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Phone Lines */}
            <div className="p-6 rounded-xl bg-[#0E0F16] border border-white/[0.08] hover:border-white/20 transition-colors">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${activeTheme.color}15`,
                    borderColor: `${activeTheme.color}35`,
                    color: activeTheme.color,
                  }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                    Direct Production Lines
                  </span>
                  <div>
                    <a
                      href={`tel:${siteContent.contact.primaryPhoneTel}`}
                      className="text-base font-mono font-bold text-white hover:underline block"
                    >
                      {siteContent.contact.primaryPhone} (Primary Desk)
                    </a>
                    <a
                      href={`tel:${siteContent.contact.secondaryPhoneTel}`}
                      className="text-sm font-mono text-neutral-300 hover:text-white block mt-0.5"
                    >
                      {siteContent.contact.secondaryPhone} (Secondary Desk)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email & WhatsApp Quick Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="p-5 rounded-xl bg-[#0E0F16] border border-white/[0.08] hover:border-white/20 transition-colors flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">Email Desk</span>
                  <span className="text-xs font-mono text-neutral-200 truncate block group-hover:text-white">
                    {siteContent.contact.email}
                  </span>
                </div>
              </a>

              <a
                href={siteContent.contact.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-[#0E0F16] border border-white/[0.08] hover:border-[#25D366]/40 transition-colors flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">WhatsApp</span>
                  <span className="text-xs font-mono text-[#25D366] font-semibold flex items-center gap-1">
                    <span>Chat Live</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            </div>

            {/* Verified Social Channels */}
            <div className="p-5 rounded-xl bg-[#0E0F16] border border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-3">
                Official Channels
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={siteContent.contact.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Instagram</span>
                </a>
                <a
                  href={siteContent.contact.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-neutral-400" />
                  <span>YouTube</span>
                </a>
                <a
                  href={siteContent.contact.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={siteContent.contact.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Dark Google Map */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              className="relative w-full h-[380px] sm:h-[420px] rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl bg-[#0E0F16]"
              style={{
                borderColor: `${activeTheme.color}35`,
              }}
            >
              <iframe
                title="Dream Byte Studio Location Map - Sahastradhara Road, Dehradun"
                src={siteContent.contact.address.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(92%) hue-rotate(180deg) contrast(1.15) brightness(0.85)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Location Pill */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 text-xs font-mono text-white shadow-xl flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.color }} />
                <div>
                  <div className="font-bold font-heading text-sm">Dream Byte Studio</div>
                  <div className="text-[10px] text-neutral-400">Above Bank of India, Sahastradhara Road</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
              <span>Himalayan Foothills Stage • Dehradun, Uttarakhand</span>
              <a
                href="https://maps.google.com/?q=30.3164945,78.0321918"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 font-semibold"
                style={{ color: activeTheme.color }}
              >
                <span>Get Driving Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
