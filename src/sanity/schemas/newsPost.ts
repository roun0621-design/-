// ──────────────────────────────────────────
// Sanity Schema: News Post (newsPost)
// ──────────────────────────────────────────
// 이 스키마는 Sanity Studio에서 사용됩니다.
// Sanity 프로젝트 내 schemas/ 폴더에 배치하세요.

const newsPost = {
  name: "newsPost",
  title: "소식 / News",
  type: "document",
  fields: [
    {
      name: "title",
      title: "제목 / Title",
      type: "string",
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: "slug",
      title: "URL 슬러그",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "language",
      title: "언어 / Language",
      type: "string",
      options: {
        list: [
          { title: "한국어", value: "ko" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "ko",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "카테고리 / Category",
      type: "string",
      options: {
        list: [
          { title: "대회 소식 / Event News", value: "event" },
          { title: "기술 업데이트 / Tech Update", value: "tech" },
          { title: "파트너십 / Partnership", value: "partnership" },
          { title: "미디어 / Media", value: "media" },
        ],
      },
    },
    {
      name: "excerpt",
      title: "요약 / Excerpt",
      type: "text",
      rows: 3,
      description: "리스트에서 보여줄 짧은 요약 (150자 이내 권장)",
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: "thumbnail",
      title: "대표 이미지 / Thumbnail",
      type: "image",
      options: {
        hotspot: true, // 크롭 핫스팟 활성화
      },
      fields: [
        {
          name: "alt",
          title: "대체 텍스트 / Alt Text",
          type: "string",
          description: "이미지 설명 (접근성 및 SEO용)",
        },
      ],
    },
    {
      name: "body",
      title: "본문 / Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                title: "링크 / Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "캡션 / Caption",
              type: "string",
            },
            {
              name: "alt",
              title: "대체 텍스트 / Alt Text",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "images",
      title: "갤러리 이미지 / Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "캡션",
              type: "string",
            },
            {
              name: "alt",
              title: "대체 텍스트",
              type: "string",
            },
          ],
        },
      ],
      description: "게시글에 첨부할 추가 이미지 갤러리",
    },
    {
      name: "publishedAt",
      title: "게시일 / Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "seo",
      title: "SEO 설정",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "비워두면 게시글 제목이 사용됩니다.",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          description: "비워두면 요약이 사용됩니다.",
        },
        {
          name: "ogImage",
          title: "OG Image",
          type: "image",
          description: "비워두면 대표 이미지가 사용됩니다.",
        },
      ],
    },
  ],

  // Sanity Studio에서 보이는 미리보기 설정
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail",
      language: "language",
    },
    prepare({
      title,
      subtitle,
      media,
      language,
    }: {
      title: string;
      subtitle: string;
      media: any;
      language: string;
    }) {
      return {
        title: `[${language?.toUpperCase()}] ${title}`,
        subtitle: subtitle || "미분류",
        media,
      };
    },
  },

  // 정렬 순서
  orderings: [
    {
      title: "게시일 (최신순)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "게시일 (오래된순)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
};

export default newsPost;
