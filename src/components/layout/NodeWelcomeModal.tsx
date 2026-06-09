"use client";
// ──────────────────────────────────────────
// Node Welcome Modal
// "Looking for Node?" gateway popup — shown once per session.
// Guides visitors who came looking for PACE RISE : Node.
// ──────────────────────────────────────────
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, ArrowRight, X, ExternalLink } from "lucide-react";
import { nl2br } from "@/utils/nl2br";

const NODE_URL = "https://pace-rise-node.com";
const SESSION_KEY = "pr_node_modal_seen";
const DISMISS_KEY = "pr_node_modal_dismissed";

export default function NodeWelcomeModal() {
  const t = useTranslations("node_modal");
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      /* storage unavailable — show anyway */
    }
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
      if (dontShow) localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  // Close on ESC + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, dontShow]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="node-modal-title"
            className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 p-1.5 rounded-full text-pr-tertiary hover:text-pr-primary hover:bg-gray-100 transition-colors z-10"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2} />
            </button>

            {/* Brand accent glow */}
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-[80px] pointer-events-none"
              style={{ background: "rgba(183,159,88,0.18)" }}
            />

            <div className="relative px-7 pt-9 pb-7 text-center">
              {/* Icon */}
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-pr-brand-light text-pr-brand mb-5">
                <Monitor size={26} strokeWidth={1.5} />
              </div>

              {/* Badge */}
              <p className="font-display text-[11px] tracking-[0.25em] text-pr-brand mb-3">
                {t("badge")}
              </p>

              {/* Title */}
              <h2
                id="node-modal-title"
                className="text-2xl font-bold tracking-tight text-pr-primary mb-3"
              >
                {t("title")}
              </h2>

              {/* Description */}
              <p className="text-[15px] text-pr-secondary leading-relaxed font-sans">
                {nl2br(t("desc"))}
              </p>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-2.5">
                <a
                  href={NODE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-pr-brand text-white font-display text-sm tracking-wider hover:bg-[#A48D4A] hover:shadow-[0_4px_20px_rgba(183,159,88,0.3)] transition-all duration-300"
                >
                  {t("cta_go")}
                  <ExternalLink size={15} strokeWidth={2} />
                </a>
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-gray-100 text-pr-secondary font-display text-sm tracking-wider hover:bg-gray-200 hover:text-pr-primary transition-all duration-200"
                >
                  {t("cta_stay")}
                  <ArrowRight size={14} strokeWidth={2} />
                </button>
              </div>

              {/* Don't show again */}
              <label className="mt-5 inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dontShow}
                  onChange={(e) => setDontShow(e.target.checked)}
                  className="w-4 h-4 rounded border-pr-border text-pr-brand focus:ring-pr-brand/30 cursor-pointer accent-[#B79F58]"
                />
                <span className="text-xs text-pr-tertiary">{t("dismiss")}</span>
              </label>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
