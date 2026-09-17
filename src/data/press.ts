// ──────────────────────────────────────────
// 언론 보도 (Press Coverage)
// 소식(/news) 페이지 하단 "언론 보도" 섹션에 표시됩니다.
//
// ▶ 기사 추가 방법
//   아래 pressItems 배열에 항목을 하나 추가하고 빌드/배포하면 끝.
//   (순서는 상관없음 — 화면에서는 date 기준 최신순으로 자동 정렬)
//
//   {
//     date: "2026-09-15",          // 보도일 (YYYY-MM-DD)
//     outlet: "중앙일보",            // 매체명
//     title: "기사 제목",
//     url: "https://...",          // 클릭 시 새 탭으로 이동할 기사 링크
//     outlet_en: "JoongAng Ilbo",  // (선택) 영문 페이지용 매체명
//     title_en: "English title",   // (선택) 영문 페이지용 제목 — 없으면 한글 제목 표시
//   },
// ──────────────────────────────────────────

export interface PressItem {
  date: string;
  outlet: string;
  title: string;
  url: string;
  outlet_en?: string;
  title_en?: string;
}

export const pressItems: PressItem[] = [
  {
    date: "2026-09-15",
    outlet: "중앙일보",
    outlet_en: "JoongAng Ilbo",
    title: "페이스라이즈, 세계 육상 'LED 페이싱 기술' 국내 도입",
    title_en: "PACE RISE brings world athletics' LED pacing technology to Korea",
    url: "https://m.news.nate.com/view/20260915n31119",
  },
  {
    date: "2026-09-15",
    outlet: "동아일보",
    outlet_en: "Dong-A Ilbo",
    title: "페이스라이즈, 세계 육상 대회 LED 페이싱 기술 국내 도입한다",
    title_en: "PACE RISE to introduce LED pacing technology used at world athletics meets",
    url: "https://m.news.nate.com/view/20260915n26247",
  },
];
