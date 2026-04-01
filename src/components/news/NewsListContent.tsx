"use client";
// ──────────────────────────────────────────
// News List Content – Fetches from Sanity
// ──────────────────────────────────────────
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import type { NewsPost } from "@/types";
import { sanityClient } from "@/lib/sanity";
import { NEWS_LIST_QUERY } from "@/lib/queries";

const categoryColors: Record<string, string> = {
  event: "bg-blue-500/20 text-blue-400",
  tech: "bg-emerald-500/20 text-emerald-400",
  partnership: "bg-purple-500/20 text-purple-400",
  media: "bg-amber-500/20 text-amber-400",
};

export default function NewsListContent() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await sanityClient.fetch(NEWS_LIST_QUERY, { locale });
        setPosts(data || []);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [locale]);

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
            NEWS
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

      {/* Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/5 animate-pulse h-80"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Newspaper
                size={48}
                className="mx-auto text-[var(--pr-gray-700)] mb-4"
              />
              <p className="text-[var(--pr-gray-500)] text-lg">
                {t("no_posts")}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/news/${post.slug.current}`}
                    className="group block gradient-border rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] bg-white/5">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper
                            size={32}
                            className="text-[var(--pr-gray-700)]"
                          />
                        </div>
                      )}

                      {/* Category Badge */}
                      {post.category && (
                        <span
                          className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${
                            categoryColors[post.category] ||
                            "bg-white/10 text-white"
                          }`}
                        >
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[var(--pr-gray-600)] mb-3">
                        <Calendar size={12} />
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString(
                            locale === "ko" ? "ko-KR" : "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>

                      <h3 className="text-lg font-semibold tracking-tight group-hover:text-[var(--pr-accent)] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="mt-2 text-sm text-[var(--pr-gray-500)] line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-1 text-sm text-[var(--pr-accent)] font-medium">
                        {t("read_more")}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
