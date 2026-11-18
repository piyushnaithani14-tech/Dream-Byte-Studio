"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent } from "@/content/siteContent";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const Footer: React.FC = () => {
  const { activeTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050608] border-t border-white/[0.08] pt-16 pb-12 px-6 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-9 h-9">
                  <Image
                    src={siteContent.brand.logoPath}
                    alt={siteContent.brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-base text-white tracking-wider">
                    DREAM BYTE STUDIO
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    Photo • Video • Podcast • Wedding
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 max-w-sm leading-relaxed mb-4 font-normal">
                &ldquo;{siteContent.brand.tagline}&rdquo;
              </p>

              <div
                className="inline-block px-3 py-1 rounded-md text-xs font-mono tracking-wider border"
                style={{
                  color: activeTheme.color,
                  borderColor: `${activeTheme.color}35`,
                  backgroundColor: `${activeTheme.color}10`,
                }}
              >
                A {siteContent.brand.parentCompany} company
              </div>
            </div>
          </div>

          {/* Col 2: Studio Directory */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-4">
              Studio Directory
            </span>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-normal">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Production Services
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Featured Reels & Stills
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors">
                  Aesthetic Sets & Floor Space
                </a>
              </li>
              <li>
                <a href="#gear" className="hover:text-white transition-colors">
                  In-House Gear Arsenal
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Production Workflow
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Reserve Studio Time
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Coordinates & Back to Top */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-4">
                Dehradun Facility
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed mb-3 font-normal">
                {siteContent.contact.address.full}
              </p>
              <div className="space-y-1 text-xs font-mono text-neutral-400 mb-6">
                <div>Primary Desk: {siteContent.contact.primaryPhone}</div>
                <div>Studio Email: {siteContent.contact.email}</div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors w-fit group"
            >
              <span>Back to Top</span>
              <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.08] transition-colors">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} {siteContent.brand.name}. All rights reserved.
          </div>
          <div>Sister brand of Dream Byte Solutions Pvt. Ltd.</div>
        </div>
      </div>
    </footer>
  );
};
