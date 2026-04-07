"use client";
// ──────────────────────────────────────────
// Contact Form – White Theme, Resend
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
import { nl2br } from "@/utils/nl2br";
import type { ContactFormData } from "@/types";

const inquiryTypes = ["pacing", "cos", "event", "partnership", "demo", "other"] as const;

export default function ContactContent() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    organization: "",
    type: "pacing",
    message: "",
    locale,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
        setForm({ name: "", email: "", organization: "", type: "pacing", message: "", locale });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-white border border-pr-border rounded-xl text-pr-primary placeholder:text-pr-tertiary focus:outline-none focus:border-pr-brand/50 focus:ring-1 focus:ring-pr-brand/20 transition-all font-sans text-sm";

  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            CONTACT
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pr-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-pr-secondary font-sans text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {nl2br(t("subtitle"))}
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Form + Info */}
      <section className="py-16 md:py-24 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {status === "success" ? (
                <div className="bg-white rounded-2xl border border-pr-border p-10 md:p-14 text-center">
                  <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl font-bold text-pr-primary mb-2">{t("success_title")}</h3>
                  <p className="text-pr-secondary font-sans">{nl2br(t("success_message"))}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-2.5 text-sm border border-pr-border rounded-full hover:border-pr-brand text-pr-secondary hover:text-pr-brand transition-colors"
                  >
                    {t("title")}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-pr-border p-8 md:p-10 space-y-6"
                >
                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <AlertCircle size={18} className="text-red-500 shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-sm font-medium text-red-600">{t("error_title")}</p>
                        <p className="text-xs text-red-500">{nl2br(t("error_message"))}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-pr-primary mb-2">{t("name")} *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder={t("name_placeholder")}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pr-primary mb-2">{t("email")} *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder={t("email_placeholder")}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pr-primary mb-2">{t("organization")}</label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => updateField("organization", e.target.value)}
                      placeholder={t("organization_placeholder")}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pr-primary mb-2">{t("type")}</label>
                    <select
                      value={form.type}
                      onChange={(e) => updateField("type", e.target.value)}
                      className={inputClasses}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {t(`type_${type}` as any)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pr-primary mb-2">{t("message")} *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder={t("message_placeholder")}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <Send size={16} strokeWidth={2} />
                        {t("submit")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-pr-primary mb-4">{t("info_title")}</h3>

              {[
                { icon: Mail, label: t("info_email"), value: "pacerise.run@gmail.com", href: "mailto:pacerise.run@gmail.com" },
                { icon: Camera, label: t("info_instagram"), value: "@pace.rise", href: "https://www.instagram.com/pace.rise" },
                { icon: Globe, label: t("info_website"), value: "pace-rise.com", href: "https://pace-rise.com" },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <div key={i} className="bg-white rounded-xl border border-pr-border p-5 hover:border-pr-brand/30 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-pr-brand-light text-pr-brand">
                      <Icon size={17} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-pr-tertiary uppercase tracking-wider">{label}</p>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-pr-primary hover:text-pr-brand transition-colors"
                      >
                        {value}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              <a
                href="mailto:pacerise.run@gmail.com"
                className="block text-center px-6 py-3 text-sm font-display tracking-wider text-pr-brand border border-pr-brand/30 rounded-full hover:bg-pr-brand-light transition-all duration-300"
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
