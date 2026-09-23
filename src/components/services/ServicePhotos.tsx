"use client";
// ──────────────────────────────────────────
// Service Photos – 서비스 상세 페이지 현장 사진 (최대 4장)
// 사진 목록은 src/lib/servicePhotos.ts가 폴더에서 자동 수집
// 사진이 없으면 아무것도 렌더링하지 않음
// captions를 넘기면 사진 하단에 캡션 오버레이 표시 (slug → 제목)
// ──────────────────────────────────────────
import Image from "next/image";
import { motion } from "framer-motion";
import type { ServicePhoto } from "@/lib/servicePhotos";
import Parallax from "@/components/motion/Parallax";

interface Props {
  photos: ServicePhoto[];
  alt: string;
  label?: string;
  captions?: Record<string, string>;
  className?: string;
}

export default function ServicePhotos({ photos, alt, label, captions, className = "" }: Props) {
  if (photos.length === 0) return null;
  const single = photos.length === 1;
  // odd count (3): first photo spans the full row as a wide banner
  const leadWide = !single && photos.length % 2 === 1;

  return (
    <div className={className}>
      {label && (
        <p className="font-display text-[11px] tracking-[0.3em] text-pr-brand mb-6 text-center">
          {label}
        </p>
      )}
      <div className={`grid gap-4 md:gap-6 ${single ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {photos.map(({ src, slug }, i) => {
          const wide = single || (leadWide && i === 0);
          const title = captions?.[slug];
          const tag = slug.replace(/[-_]+/g, " ").toUpperCase();
          return (
            <motion.figure
              key={src}
              className={`group relative overflow-hidden rounded-2xl border border-pr-border bg-[var(--pr-bg-secondary)] text-left ${
                wide ? "sm:col-span-2 aspect-[4/3] sm:aspect-[21/9]" : "aspect-[4/3]"
              }`}
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
            >
              <Parallax className="absolute inset-0" amount={5} scale={1.12}>
                <Image
                  src={src}
                  alt={title ? `${alt} – ${title}` : `${alt} ${i + 1}`}
                  fill
                  unoptimized
                  priority={i === 0}
                  sizes={wide ? "(max-width: 1024px) 100vw, 960px" : "(max-width: 640px) 100vw, 50vw"}
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </Parallax>
              {captions && (
                <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-16 md:px-6 md:pb-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <span className="flex items-center gap-2 font-display text-[10px] tracking-[0.22em] text-[#D9C27A]">
                    <span className="inline-block w-5 h-px bg-[#D9C27A]" />
                    {tag}
                  </span>
                  {title && (
                    <span className="block mt-1.5 text-lg md:text-xl font-bold tracking-tight text-white leading-snug font-sans">
                      {title}
                    </span>
                  )}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </div>
    </div>
  );
}
