// ──────────────────────────────────────────
// API Route: Instagram Feed Proxy
// ──────────────────────────────────────────
// Instagram Basic Display API 또는 Graph API를 통해
// @pace.rise 피드를 가져옵니다.
// 환경변수: INSTAGRAM_ACCESS_TOKEN
import { NextResponse } from "next/server";

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const CACHE_DURATION = 60 * 30; // 30분 캐시

export async function GET() {
  if (!INSTAGRAM_TOKEN) {
    // 토큰이 없으면 빈 배열 반환 (개발 중 graceful fallback)
    return NextResponse.json(
      { posts: [], message: "Instagram token not configured" },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=60, stale-while-revalidate=120`,
        },
      }
    );
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${INSTAGRAM_TOKEN}`,
      { next: { revalidate: CACHE_DURATION } }
    );

    if (!res.ok) {
      throw new Error(`Instagram API error: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(
      { posts: data.data || [] },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        },
      }
    );
  } catch (error) {
    console.error("Instagram fetch error:", error);
    return NextResponse.json(
      { posts: [], error: "Failed to fetch Instagram feed" },
      { status: 200 }
    );
  }
}
