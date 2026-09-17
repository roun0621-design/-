// ──────────────────────────────────────────
// Service photos – 폴더 자동 인식 (server-only, 빌드 시 실행)
//
// ▶ 사진 넣는 방법
//   public/images/services/<서비스>/ 폴더에 사진 파일을 넣고 빌드/배포하면 끝.
//     · pacing-light/   → 페이싱 라이트 페이지
//     · node/           → PACE RISE : Node 페이지
//     · brand-events/   → 브랜드 · 이벤트 페이지
//   파일명 순서대로 최대 4장이 표시됩니다 (예: 01-xxx.webp, 02-xxx.webp).
//   권장: 가로형(4:3), 긴 변 1600px 이하, JPG/WebP, 장당 500KB 이하.
//   폴더가 비어 있으면 사진 영역은 화면에 나타나지 않습니다.
//
//   파일명에서 번호를 뺀 부분이 slug가 됩니다.
//     01-sprint-challenge.webp → "sprint-challenge"
//   브랜드 · 이벤트 페이지는 이 slug로 사진 하단 캡션을 붙입니다.
// ──────────────────────────────────────────
import fs from "fs";
import path from "path";

export type ServiceKey = "pacing-light" | "node" | "brand-events";

export interface ServicePhoto {
  src: string;
  slug: string;
}

const MAX_PHOTOS = 4;

export function getServicePhotos(service: ServiceKey): ServicePhoto[] {
  const dir = path.join(process.cwd(), "public", "images", "services", service);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .slice(0, MAX_PHOTOS)
      .map((f) => ({
        src: `/images/services/${service}/${encodeURIComponent(f)}`,
        slug: f
          .replace(/\.[^.]+$/, "") // extension
          .replace(/^\d+[-_ ]*/, "") // leading order number
          .replace(/[-_ ]+\d+$/, "") // trailing variant number ("-2")
          .toLowerCase(),
      }));
  } catch {
    return [];
  }
}
