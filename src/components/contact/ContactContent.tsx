"use client";
// ──────────────────────────────────────────
// Contact Form – Email via Resend API route
// ──────────────────────────────────────────
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Camera,
  Globe,
} from "lucide-react";
import type { ContactFormData } from "@/types";

const inquiryTypes = ["wavelight", "event", "partnership", "other"] as const;

export default function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    organization: "",
    type: "wavelight",
    message: "",
    locale,
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          organization: "",
          type: "wavelight",
          message: "",
          locale,
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const updateField = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a12] to-[var(--pr-black)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="font-display text-sm tracking-[0.3em] text-[var(--pr-accent)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            CONTACT
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-[var(--pr-gray-400)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {status === "success" ? (
                <div className="gradient-border rounded-2xl p-10 md:p-14 bg-white/[0.02] text-center">
                  <CheckCircle
                    size={48}
                    className="mx-auto text-emerald-400 mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">
                    {t("success_title")}
                  </h3>
                  <p className="text-[var(--pr-gray-400)]">
                    {t("success_message")}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {t("title")}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="gradient-border rounded-2xl p-8 md:p-10 bg-white/[0.02] space-y-6"
                >
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <AlertCircle
                        size={20}
                        className="text-red-400 shrink-0"
                      />
                      <div>
                        <p className="text-sm font-medium text-red-400">
                          {t("error_title")}
                        </p>
                        <p className="text-xs text-red-400/70">
                          {t("error_message")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--pr-gray-300)] mb-2">
                        {t("name")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder={t("name_placeholder")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-[var(--pr-gray-600)] focus:outline-none focus:border-[var(--pr-accent)]/50 focus:ring-1 focus:ring-[var(--pr-accent)]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--pr-gray-300)] mb-2">
                        {t("email")} *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder={t("email_placeholder")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-[var(--pr-gray-600)] focus:outline-none focus:border-[var(--pr-accent)]/50 focus:ring-1 focus:ring-[var(--pr-accent)]/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--pr-gray-300)] mb-2">
                      {t("organization")}
                    </label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) =>
                        updateField("organization", e.target.value)
                      }
                      placeholder={t("organization_placeholder")}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-[var(--pr-gray-600)] focus:outline-none focus:border-[var(--pr-accent)]/50 focus:ring-1 focus:ring-[var(--pr-accent)]/30 transition-all"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--pr-gray-300)] mb-2">
                      {t("type")}
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => updateField("type", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--pr-accent)]/50 focus:ring-1 focus:ring-[var(--pr-accent)]/30 transition-all"
                    >
                      {inquiryTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-[var(--pr-black)]"
                        >
                          {t(`type_${type}` as any)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--pr-gray-300)] mb-2">
                      {t("message")} *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder={t("message_placeholder")}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-[var(--pr-gray-600)] focus:outline-none focus:border-[var(--pr-accent)]/50 focus:ring-1 focus:ring-[var(--pr-accent)]/30 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--pr-accent)] text-[var(--pr-black)] font-semibold rounded-xl hover:glow-accent-box transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[var(--pr-black)]/30 border-t-[var(--pr-black)] rounded-full animate-spin" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t("submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">
                {t("info_title")}
              </h3>

              {/* Email */}
              <div className="gradient-border rounded-xl p-5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--pr-accent)]/10 text-[var(--pr-accent)]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--pr-gray-500)] uppercase tracking-wider">
                      {t("info_email")}
                    </p>
                    <a
                      href="mailto:pacerise.run@gmail.com"
                      className="text-sm text-white hover:text-[var(--pr-accent)] transition-colors"
                    >
                      pacerise.run@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="gradient-border rounded-xl p-5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--pr-accent)]/10 text-[var(--pr-accent)]">
                    <Camera size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--pr-gray-500)] uppercase tracking-wider">
                      {t("info_instagram")}
                    </p>
                    <a
                      href="https://www.instagram.com/pace.rise"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-[var(--pr-accent)] transition-colors"
                    >
                      @pace.rise
                    </a>
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="gradient-border rounded-xl p-5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--pr-accent)]/10 text-[var(--pr-accent)]">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--pr-gray-500)] uppercase tracking-wider">
                      {t("info_website")}
                    </p>
                    <a
                      href="https://pace-rise.com"
                      className="text-sm text-white hover:text-[var(--pr-accent)] transition-colors"
                    >
                      pace-rise.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Email CTA */}
              <a
                href="mailto:pacerise.run@gmail.com"
                className="block text-center px-6 py-3 text-sm font-medium border border-[var(--pr-accent)]/30 text-[var(--pr-accent)] rounded-xl hover:bg-[var(--pr-accent)]/10 transition-all"
              >
                {t("direct_email")}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
