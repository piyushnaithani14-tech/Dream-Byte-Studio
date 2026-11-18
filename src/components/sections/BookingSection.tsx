"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/content/siteContent";
import { Phone, Send, CheckCircle, MessageSquare, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const BookingSection: React.FC = () => {
  const { activeTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Photo Shoots",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setIsSuccess(true);
        setRedirectUrl(result.whatsAppUrl);
      } else {
        alert(result.error || "Failed to submit booking enquiry.");
      }
    } catch (err) {
      // Fallback direct WhatsApp redirect
      const waText = encodeURIComponent(
        `Hi Dream Byte Studio! I would like to book: ${formData.service} for ${formData.name} (${formData.phone}). Preferred Date: ${formData.date}. Notes: ${formData.message}`
      );
      setRedirectUrl(`https://wa.me/918279720490?text=${waText}`);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative py-28 px-6 sm:px-8 bg-[#08090D] overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className="p-8 sm:p-12 rounded-2xl bg-[#0E0F16] border border-white/[0.08] shadow-2xl relative overflow-hidden"
          style={{
            borderColor: `${activeTheme.color}35`,
          }}
        >
          {/* Top Edge Glow */}
          <div
            className="absolute top-0 inset-x-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${activeTheme.color} 50%, transparent 100%)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Header & Direct Contact */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-3" style={{ color: activeTheme.color }}>
                  <span className="w-2.5 h-2.5 rounded-full flex items-center justify-center border border-current text-[7px]">●</span>
                  <span>Reserve Studio Time</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-4 leading-tight">
                  HAVE A PROJECT <br />
                  <span style={{ color: activeTheme.color }}>IN MIND?</span>
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal mb-8">
                  Lock in your production date on our aesthetic stage in Dehradun. Everything is provided in-house — cameras, lighting, backdrops, and microphones.
                </p>
              </div>

              {/* Direct Booking Desk Contact Bar */}
              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                <a
                  href={`tel:${siteContent.contact.primaryPhoneTel}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold"
                    style={{ backgroundColor: activeTheme.color }}
                  >
                    <Phone className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Direct Desk Line</div>
                    <div className="text-sm font-mono font-bold text-white">{siteContent.contact.primaryPhone}</div>
                  </div>
                </a>

                <a
                  href={siteContent.contact.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-[#25D366]/15 border border-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white font-bold">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Instant WhatsApp</div>
                    <div className="text-sm font-mono font-bold text-white">+91 8279720490</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Booking Form or Success View */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#090A0F] rounded-xl border border-white/10"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${activeTheme.color}20`, color: activeTheme.color }}
                    >
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      Reservation Request Received
                    </h3>
                    <p className="text-sm text-neutral-300 max-w-md mb-6 leading-relaxed font-normal">
                      Thank you, {formData.name}. Our studio desk has registered your reservation request for{" "}
                      <span className="text-white font-semibold">{formData.service}</span>.
                    </p>
                    {redirectUrl && (
                      <a
                        href={redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider text-black shadow-lg hover:scale-[1.02] transition-transform"
                        style={{ backgroundColor: activeTheme.color }}
                      >
                        <span>Confirm via WhatsApp</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-lg bg-[#141520] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 Phone number"
                          className="w-full px-4 py-3 rounded-lg bg-[#141520] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Service Dropdown */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Production Service *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[#141520] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                        >
                          <option value="Photo Shoots">Photo Shoots (In-House Gear)</option>
                          <option value="Videography">Videography (4K Cinema Production)</option>
                          <option value="Podcasts">Podcasts (Acoustic Lounge Suite)</option>
                          <option value="Wedding Shoots">Wedding Shoots & Pre-Wedding</option>
                          <option value="Custom Studio Rental">Custom In-House Studio Rental</option>
                        </select>
                      </div>

                      {/* Preferred Date */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[#141520] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message / Scope */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Project Scope & Equipment Specifications
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your production concept, lighting requirements, or desired timeline..."
                        className="w-full px-4 py-3 rounded-lg bg-[#141520] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-lg font-heading font-semibold text-xs uppercase tracking-wider text-black shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      style={{
                        backgroundColor: activeTheme.color,
                        boxShadow: `0 0 25px ${activeTheme.color}35`,
                      }}
                    >
                      {isSubmitting ? (
                        <span>Transmitting Request...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black" />
                          <span>Submit Studio Reservation Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
