"use client";
// ──────────────────────────────────────────
// Instagram Feed Grid – Minimal White Theme
// Enhanced placeholder grid with brand patterns
// ──────────────────────────────────────────
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Camera, ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { InstagramPost } from "@/types";

/* placeholder patterns for when API is unavailable */
const placeholderPatterns = [
  "linear-gradient(135deg, rgba(183,159,88,0.08) 0%, rgba(183,159,88,0.02) 100%)",
  "linear-gradient(45deg, rgba(183,159,88,0.04) 0%, rgba(183,159,88,0.10) 100%)",
  "linear-gradient(180deg, rgba(183,159,88,0.06) 0%, rgba(183,159,88,0.03) 100%)",
  "linear-gradient(225deg, rgba(183,159,88,0.02) 0%, rgba(183,159,88,0.08) 100%)",
  "linear-gradient(90deg, rgba(183,159,88,0.05) 0%, rgba(183,159,88,0.09) 100%)",
  "linear-gradient(315deg, rgba(183,159,88,0.10) 0%, rgba(183,159,88,0.04) 100%)",
  "linear-gradient(0deg, rgba(183,159,88,0.03) 0%, rgba(183,159,88,0.07) 100%)",
  "linear-gradient(270deg, rgba(183,159,88,0.08) 0%, rgba(183,159,88,0.02) 100%)",
];

export default function InstagramFeed() {
  const t = useTranslations("home");
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts?.slice(0, 8) || []);
        }
      } catch {
        // Silently fail — will show branded placeholder grid
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-2 text-pr-brand mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Camera size={18} strokeWidth={1.5} />
            <span className="font-display text-[11px] tracking-[0.3em]">
              INSTAGRAM
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-pr-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("instagram_title")}
          </motion.h2>
          <motion.p
            className="mt-3 text-pr-secondary font-sans"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("instagram_subtitle")}
          </motion.p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {loading
            ? /* Loading skeleton with pulse animation */
              [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl animate-pulse"
                  style={{ background: placeholderPatterns[i] }}
                />
              ))
            : posts.length > 0
            ? /* Live Instagram posts */
              posts.map((post, i) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Image
                    src={
                      post.media_type === "VIDEO"
                        ? post.thumbnail_url || post.media_url
                        : post.media_url
                    }
                    alt={post.caption?.slice(0, 100) || "PACE RISE Instagram"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink size={22} className="text-white" strokeWidth={1.5} />
                  </div>
                </motion.a>
              ))
            : /* Branded placeholder grid — visually appealing even without API */
              [...Array(8)].map((_, i) => (
                <motion.a
                  key={i}
                  href="https://www.instagram.com/pace.rise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group aspect-square rounded-xl border border-pr-border flex flex-col items-center justify-center gap-2 hover:border-pr-brand/40 transition-all duration-300 cursor-pointer"
                  style={{ background: placeholderPatterns[i] }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Camera
                    size={i === 0 || i === 3 || i === 5 ? 28 : 20}
                    className="text-pr-brand/30 group-hover:text-pr-brand/60 transition-colors duration-300"
                    strokeWidth={1}
                  />
                  {(i === 0 || i === 7) && (
                    <span className="text-[10px] text-pr-tertiary group-hover:text-pr-brand font-display tracking-wider transition-colors duration-300">
                      @pace.rise
                    </span>
                  )}
                </motion.a>
              ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.instagram.com/pace.rise"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-display tracking-wider text-pr-brand border border-pr-brand/30 rounded-full hover:bg-pr-brand-light hover:border-pr-brand transition-all duration-300 group"
          >
            <Camera size={15} strokeWidth={1.5} />
            @pace.rise
            <ArrowUpRight size={14} strokeWidth={2} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
