# PACE RISE – Official Website

> **Light the Pace** — 빛으로 이끄는 새로운 레이스

## Project Overview

- **Company**: PACE RISE (페이스라이즈)
- **Goal**: 아임웹 빌더의 한계를 벗어나 자체 구축한 Brand Gateway 홈페이지
- **Core Business**: 웨이브라이트 LED 트랙 페이싱 시스템 운영
- **Production URL**: https://pace-rise.com
- **Records System**: https://records.pace-rise.com (별도 Node.js 서버)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS v3 |
| i18n | next-intl v3 (한국어/영어) |
| CMS | Sanity.io (뉴스/블로그 콘텐츠) |
| Email | Resend API (문의 폼) |
| Fonts | Audiowide (brand), Inter (body), JetBrains Mono |
| Icons | Lucide React |
| Animation | Framer Motion |
| Instagram | Instagram Basic Display API (4-column grid) |
| SEO | Metadata API, sitemap.xml, robots.txt, hreflang |

## Implemented Features ✅

### Pages
- **Home** (`/`): Hero section with Wavelight animation, Services grid, Instagram 4-column feed
- **About** (`/about`): Mission, Technology showcase, Timeline history, Diamond League reference
- **News** (`/news`): Sanity CMS 연동 리스트 + 상세 페이지 (`/news/[slug]`)
- **Contact** (`/contact`): 이메일 발송 문의 폼 (Resend API) + 연락처 사이드바

### Core Features
- 🌐 **다국어 지원**: 한국어(기본) / 영어, `localePrefix: "as-needed"` (ko는 프리픽스 없음)
- 🎨 **Sophisticated Tech 디자인**: Dark theme, Neon Cyan(#00e5ff) accent, glow effects
- 📱 **반응형**: 모바일/태블릿/데스크탑 완벽 대응
- 🔍 **SEO**: 다국어 sitemap.xml, hreflang, OG meta, robots.txt
- 📸 **Instagram Feed**: API 프록시를 통한 자동 4단 그리드 페칭
- 📧 **Contact Form**: Resend를 통한 이메일 발송 (DB 저장 없음)
- 🏗️ **CMS Schema**: Sanity newsPost + siteSettings 스키마 완성

## URI Map

| Path | Method | Description |
|------|--------|-------------|
| `/` | GET | 홈페이지 (ko) |
| `/en` | GET | 홈페이지 (en) |
| `/about` | GET | 회사소개 (ko) |
| `/en/about` | GET | About (en) |
| `/news` | GET | 소식 리스트 (ko) |
| `/en/news` | GET | News list (en) |
| `/news/[slug]` | GET | 소식 상세 (ko) |
| `/en/news/[slug]` | GET | News detail (en) |
| `/contact` | GET | 문의하기 (ko) |
| `/en/contact` | GET | Contact (en) |
| `/api/contact` | POST | 문의 이메일 발송 |
| `/api/instagram` | GET | Instagram 피드 프록시 |
| `/sitemap.xml` | GET | 다국어 사이트맵 |
| `/robots.txt` | GET | 검색엔진 크롤링 규칙 |

## Environment Variables

```bash
# .env.local에 설정 필요
NEXT_PUBLIC_SANITY_PROJECT_ID=   # Sanity 프로젝트 ID
NEXT_PUBLIC_SANITY_DATASET=      # production
SANITY_API_TOKEN=                # Sanity 읽기 토큰
INSTAGRAM_ACCESS_TOKEN=          # Instagram Long-lived Token
RESEND_API_KEY=                  # Resend API 키
CONTACT_EMAIL_TO=                # 문의 수신 이메일 (기본: pacerise.run@gmail.com)
```

## Sanity CMS Schema

### newsPost (뉴스/블로그)
- `title`, `slug`, `language` (ko/en), `category` (event/tech/partnership/media)
- `excerpt`, `thumbnail`, `body` (Portable Text), `images` (gallery)
- `publishedAt`, `seo` (metaTitle, metaDescription, ogImage)

### siteSettings (사이트 전역 설정)
- `companyName`, `description`/`descriptionEn`, `email`, `instagram`
- `website`, `recordsSystemUrl`, `logo`, `ogImage`

## Development

```bash
npm install             # 의존성 설치
npm run build           # 프로덕션 빌드
npm run start           # 프로덕션 서버 (localhost:3000)
npm run dev             # 개발 서버 (Hot Reload)
```

## Deployment

- **Platform**: Vercel 권장 (Next.js 네이티브)
- **Status**: ✅ 빌드 성공, 프리뷰 서버 가동 중
- **Last Updated**: 2026-04-01

## Not Yet Implemented ⏳

- [ ] Sanity Studio 배포 (sanity deploy)
- [ ] Instagram Long-lived Token 발급 및 자동 갱신 로직
- [ ] Resend 도메인 인증 및 프로덕션 키 설정
- [ ] Vercel 배포 및 커스텀 도메인 (pace-rise.com) 연결
- [ ] 이미지 에셋 (로고, OG 이미지, 히어로 배경)
- [ ] Google Analytics / Tag Manager 연동
- [ ] 성능 최적화 (이미지 lazy load, ISR revalidation)

## Next Steps

1. **Sanity 프로젝트 생성**: `npx sanity@latest init` → 스키마 배포
2. **Resend 설정**: pace-rise.com 도메인 인증 → API 키 발급
3. **Instagram API**: Meta Developer Console에서 앱 생성 → 토큰 발급
4. **Vercel 배포**: GitHub 연동 → 환경변수 설정 → pace-rise.com 도메인
5. **콘텐츠 작성**: Sanity Studio에서 첫 뉴스 포스트 작성
