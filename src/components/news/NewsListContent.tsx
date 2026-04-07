"use client";
// ──────────────────────────────────────────
// News List Content – Instagram Feed Based
// Behold.so API → 카드형 레이아웃
// 클릭 시 Instagram 게시물로 이동
// ──────────────────────────────────────────
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowUpRight,
  Camera,
  ExternalLink,
  Play,
  Images,
} from "lucide-react";
import Image from "next/image";
import type { InstagramPost } from "@/types";

/* placeholder patterns */
const placeholderPatterns = [
  "linear-gradient(135deg, rgba(183,159,88,0.08) 0%, rgba(183,159,88,0.02) 100%)",
  "linear-gradient(45deg, rgba(183,159,88,0.04) 0%, rgba(183,159,88,0.10) 100%)",
  "linear-gradient(180deg, rgba(183,159,88,0.06) 0%, rgba(183,159,88,0.03) 100%)",
  "linear-gradient(225deg, rgba(183,159,88,0.02) 0%, rgba(183,159,88,0.08) 100%)",
  "linear-gradient(90deg, rgba(183,159,88,0.05) 0%, rgba(183,159,88,0.09) 100%)",
  "linear-gradient(315deg, rgba(183,159,88,0.10) 0%, rgba(183,159,88,0.04) 100%)",
];

/** 미디어 타입 아이콘 */
function MediaBadge({ type }: { type: string }) {
  if (type === "VIDEO")
    return (
      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-display tracking-wider rounded-full">
        <Play size={10} fill="white" />
        REEL
      </span>
    );
  if (type === "CAROUSEL_ALBUM")
    return (
      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-display tracking-wider rounded-full">
        <Images size={10} />
        ALBUM
      </span>
    );
  return null;
}

/** 날짜 포맷 */
function formatDate(timestamp: string, locale: string) {
  return new Date(timestamp).toLocaleDateString(
    locale === "ko" ? "ko-KR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export default function NewsListContent() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

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
            NEWS
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
            className="mt-4 text-lg text-pr-secondary font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Posts Grid */}
      <section className="py-16 md:py-24 bg-[var(--pr-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white animate-pulse h-96"
                  style={{ background: placeholderPatterns[i] }}
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Camera
                size={48}
                className="mx-auto text-pr-tertiary mb-4"
                strokeWidth={1}
              />
              <p className="text-pr-secondary text-lg font-sans">
                {t("no_posts")}
              </p>
              <a
                href="https://www.instagram.com/pace.rise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-pr-brand font-display text-sm tracking-wider hover:underline"
              >
                @pace.rise
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <motion.a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white rounded-2xl border border-pr-border overflow-hidden hover:border-pr-brand/40 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {/* Image */}
                    <div
                      className="relative aspect-square bg-gray-100"
                      style={
                        post.colorPalette?.dominant
                          ? {
                              backgroundColor: `rgb(${post.colorPalette.dominant})`,
                            }
                          : undefined
                      }
                    >
                      <Image
                        src={post.imageUrlLarge || post.imageUrl}
                        alt={
                          post.caption?.slice(0, 100) || "PACE RISE Instagram"
                        }
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                      <MediaBadge type={post.mediaType} />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ExternalLink
                          size={24}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-pr-tertiary mb-3">
                        <Calendar size={12} strokeWidth={1.5} />
                        <time>{formatDate(post.timestamp, locale)}</time>
                      </div>
                      {post.caption && (
                        <p className="text-sm text-pr-primary leading-relaxed line-clamp-3 font-sans">
                          {post.caption}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1 text-sm text-pr-brand font-display tracking-wider">
                        Instagram
                        <ArrowUpRight
                          size={13}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Follow CTA */}
              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="https://www.instagram.com/pace.rise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-display tracking-wider text-pr-brand border border-pr-brand/30 rounded-full hover:bg-pr-brand-light hover:border-pr-brand transition-all duration-300 group"
                >
                  <Camera size={15} strokeWidth={1.5} />
                  {locale === "ko"
                    ? "인스타그램에서 더 보기"
                    : "See more on Instagram"}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
