// ──────────────────────────────────────────
// Portable Text Renderer – Sanity Rich Text
// ──────────────────────────────────────────
// 간단한 Sanity Portable Text 렌더러
// 더 복잡한 케이스는 @portabletext/react를 사용 권장

import Image from "next/image";

interface Block {
  _type: string;
  _key?: string;
  style?: string;
  children?: { text: string; marks?: string[] }[];
  asset?: { url: string };
  caption?: string;
  alt?: string;
  markDefs?: { _key: string; _type: string; href?: string }[];
}

function renderBlock(block: Block) {
  if (block._type === "image" && block.asset?.url) {
    return (
      <figure key={block._key} className="my-8">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
          <Image
            src={block.asset.url}
            alt={block.alt || ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        {block.caption && (
          <figcaption className="mt-2 text-sm text-[var(--pr-gray-500)] text-center">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block._type !== "block" || !block.children) return null;

  const text = block.children.map((child, i) => {
    let content: React.ReactNode = child.text;

    if (child.marks?.includes("strong")) {
      content = <strong key={i}>{content}</strong>;
    }
    if (child.marks?.includes("em")) {
      content = <em key={i}>{content}</em>;
    }

    // Check for links
    const linkMark = child.marks?.find(
      (m) => !["strong", "em", "underline"].includes(m)
    );
    if (linkMark && block.markDefs) {
      const def = block.markDefs.find((d) => d._key === linkMark);
      if (def?.href) {
        content = (
          <a
            key={i}
            href={def.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--pr-accent)] hover:underline"
          >
            {content}
          </a>
        );
      }
    }

    return content;
  });

  switch (block.style) {
    case "h2":
      return (
        <h2
          key={block._key}
          className="text-2xl font-bold mt-10 mb-4 tracking-tight"
        >
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={block._key}
          className="text-xl font-semibold mt-8 mb-3 tracking-tight"
        >
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 key={block._key} className="text-lg font-semibold mt-6 mb-2">
          {text}
        </h4>
      );
    case "blockquote":
      return (
        <blockquote
          key={block._key}
          className="border-l-2 border-[var(--pr-accent)] pl-4 my-6 text-[var(--pr-gray-400)] italic"
        >
          {text}
        </blockquote>
      );
    default:
      return (
        <p
          key={block._key}
          className="text-[var(--pr-gray-300)] leading-relaxed mb-4"
        >
          {text}
        </p>
      );
  }
}

export default function PortableTextRenderer({ value }: { value: Block[] }) {
  if (!value || !Array.isArray(value)) return null;
  return <>{value.map(renderBlock)}</>;
}
