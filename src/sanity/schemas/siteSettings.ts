// ──────────────────────────────────────────
// Sanity Schema: Company Info (siteSettings)
// ──────────────────────────────────────────
// 회사 정보 및 사이트 전역 설정을 위한 싱글턴 문서

const siteSettings = {
  name: "siteSettings",
  title: "사이트 설정 / Site Settings",
  type: "document",
  fields: [
    {
      name: "companyName",
      title: "회사명",
      type: "string",
      initialValue: "PACE RISE",
    },
    {
      name: "description",
      title: "회사 소개 (한국어)",
      type: "text",
      rows: 3,
    },
    {
      name: "descriptionEn",
      title: "Company Description (English)",
      type: "text",
      rows: 3,
    },
    {
      name: "email",
      title: "대표 이메일",
      type: "string",
      initialValue: "pacerise.run@gmail.com",
    },
    {
      name: "instagram",
      title: "인스타그램 핸들",
      type: "string",
      initialValue: "@pace.rise",
    },
    {
      name: "website",
      title: "홈페이지 URL",
      type: "url",
      initialValue: "https://pace-rise.com",
    },
    {
      name: "recordsSystemUrl",
      title: "기록 조회 시스템 URL",
      type: "url",
      description: "독립 운영 중인 Node.js 기록 조회 시스템의 주소",
    },
    {
      name: "logo",
      title: "로고 이미지",
      type: "image",
    },
    {
      name: "ogImage",
      title: "기본 OG Image",
      type: "image",
      description: "소셜 미디어 공유 시 기본 이미지",
    },
  ],

  preview: {
    prepare() {
      return {
        title: "사이트 설정",
      };
    },
  },
};

export default siteSettings;
