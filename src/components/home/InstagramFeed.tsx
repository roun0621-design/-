"use client";
// ──────────────────────────────────────────
// Instagram Feed Grid – Minimal White Theme
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
            ? [...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-gray-100 animate-pulse"
                />
              ))
            : posts.length > 0
            ? posts.map((post, i) => (
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
            : [...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-xl bg-gray-50 border border-pr-border flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Camera size={22} className="text-pr-tertiary" strokeWidth={1} />
                </motion.div>
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
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-display tracking-wider text-pr-brand border border-pr-brand/30 rounded-full hover:bg-pr-brand-light transition-all duration-300"
          >
            <Camera size={15} strokeWidth={1.5} />
            @pace.rise
          </a>
        </motion.div>
      </div>
    </section>
  );
}
