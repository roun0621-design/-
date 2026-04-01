"use client";
// ──────────────────────────────────────────
// News Detail Content – Single post from Sanity
// ──────────────────────────────────────────
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import type { NewsPost } from "@/types";
import { sanityClient } from "@/lib/sanity";
import { NEWS_DETAIL_QUERY } from "@/lib/queries";
import PortableTextRenderer from "./PortableTextRenderer";

export default function NewsDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("news");
  const locale = useLocale();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await sanityClient.fetch(NEWS_DETAIL_QUERY, {
          slug,
          locale,
        });
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug, locale]);

  if (loading) {
    return (
      <div className="pt-20 md:pt-24">
        <div className="max-w-3xl mx-auto px-4 py-32">
          <div className="space-y-4">
            <div className="h-8 bg-white/5 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-1/2" />
            <div className="h-64 bg-white/5 rounded-2xl animate-pulse mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 md:pt-24">
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <p className="text-[var(--pr-gray-500)] text-lg">
            게시글을 찾을 수 없습니다.
          </p>
          <Link
            href="/news"
            className="mt-4 inline-flex items-center gap-2 text-[var(--pr-accent)]"
          >
            <ArrowLeft size={16} />
            {t("back_to_list")}
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-20 md:pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-[var(--pr-gray-500)] hover:text-[var(--pr-accent)] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t("back_to_list")}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-[var(--pr-gray-500)]">
              <Calendar size={14} />
              <time>
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === "ko" ? "ko-KR" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
            </div>
            <button
              onClick={handleShare}
              className="ml-auto p-2 text-[var(--pr-gray-500)] hover:text-[var(--pr-accent)] transition-colors"
              aria-label={t("share")}
            >
              <Share2 size={18} />
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-[var(--pr-gray-400)] leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </motion.header>

        {/* Thumbnail */}
        {post.thumbnail && (
          <motion.div
            className="mt-8 relative aspect-[16/9] rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </motion.div>
        )}

        {/* Body (Portable Text) */}
        <motion.div
          className="mt-10 prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {post.body && <PortableTextRenderer value={post.body} />}
        </motion.div>

        {/* Gallery */}
        {post.images && post.images.length > 0 && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${post.title} gallery ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </div>
  );
}
