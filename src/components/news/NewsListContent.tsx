"use client";
// ──────────────────────────────────────────
// News List Content – White Theme
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
  event: "bg-blue-50 text-blue-600",
  tech: "bg-emerald-50 text-emerald-600",
  partnership: "bg-purple-50 text-purple-600",
  media: "bg-amber-50 text-amber-600",
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
                <div key={i} className="rounded-2xl bg-white animate-pulse h-80" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Newspaper size={48} className="mx-auto text-pr-tertiary mb-4" strokeWidth={1} />
              <p className="text-pr-secondary text-lg font-sans">{t("no_posts")}</p>
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
                    className="group block bg-white rounded-2xl border border-pr-border overflow-hidden hover:border-pr-brand/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] bg-gray-100">
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
                          <Newspaper size={32} className="text-pr-tertiary" strokeWidth={1} />
                        </div>
                      )}
                      {post.category && (
                        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-pr-tertiary mb-3">
                        <Calendar size={12} strokeWidth={1.5} />
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString(
                            locale === "ko" ? "ko-KR" : "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </time>
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-pr-primary group-hover:text-pr-brand transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-2 text-sm text-pr-secondary line-clamp-2 font-sans">{post.excerpt}</p>
                      )}
                      <div className="mt-4 flex items-center gap-1 text-sm text-pr-brand font-display tracking-wider">
                        {t("read_more")}
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" strokeWidth={2} />
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
