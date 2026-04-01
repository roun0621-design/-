"use client";
// ──────────────────────────────────────────
// Instagram Feed Grid – 4-Column Auto-fetching
// ──────────────────────────────────────────
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Camera, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { InstagramPost } from "@/types";

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
        // Silently fail — will show placeholder grid
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-[var(--pr-black)] to-[#050a12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            className="inline-flex items-center gap-2 text-[var(--pr-accent)] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Camera size={20} />
            <span className="font-display text-sm tracking-[0.3em]">
              INSTAGRAM
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("instagram_title")}
          </motion.h2>
          <motion.p
            className="mt-2 text-[var(--pr-gray-500)]"
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
            ? // Skeleton placeholders
              [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-white/5 animate-pulse"
                />
              ))
            : posts.length > 0
            ? // Real posts
              posts.map((post, i) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded-xl overflow-hidden bg-white/5"
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
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[var(--pr-black)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink size={24} className="text-white" />
                  </div>
                </motion.a>
              ))
            : // Placeholder: No Instagram token yet
              [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Camera
                    size={24}
                    className="text-[var(--pr-gray-700)]"
                  />
                </motion.div>
              ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.instagram.com/pace.rise"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[var(--pr-accent)] border border-[var(--pr-accent)]/30 rounded-xl hover:bg-[var(--pr-accent)]/10 transition-all"
          >
            <Camera size={16} />
            @pace.rise
          </a>
        </motion.div>
      </div>
    </section>
  );
}
