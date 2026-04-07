// ──────────────────────────────────────────
// API Route: Instagram Feed via Behold.so
// ──────────────────────────────────────────
// Behold.so JSON Feed를 프록시하여 프론트엔드에 전달
// Facebook 계정 불필요 — Instagram 직접 연동
import { NextResponse } from "next/server";

const BEHOLD_FEED_URL = "https://feeds.behold.so/770EW8zSiT6qv5MCZOWR";
const CACHE_DURATION = 60 * 30; // 30분 캐시

export async function GET() {
  try {
    const res = await fetch(BEHOLD_FEED_URL, {
      next: { revalidate: CACHE_DURATION },
    });

    if (!res.ok) {
      throw new Error(`Behold API error: ${res.status}`);
    }

    const data = await res.json();

    // Behold 응답을 통일된 포맷으로 변환
    const posts = (data.posts || []).map((post: any) => ({
      id: post.id,
      caption: post.prunedCaption || post.caption || "",
      mediaType: post.mediaType, // IMAGE, VIDEO, CAROUSEL_ALBUM
      permalink: post.permalink,
      timestamp: post.timestamp,
      // CDN 최적화 이미지 사용 (WebP, 리사이즈 제공)
      imageUrl: post.sizes?.medium?.mediaUrl || post.mediaUrl,
      imageUrlLarge: post.sizes?.large?.mediaUrl || post.mediaUrl,
      thumbnailUrl: post.sizes?.small?.mediaUrl || post.thumbnailUrl,
      colorPalette: post.colorPalette,
    }));

    return NextResponse.json(
      {
        posts,
        username: data.username,
        profilePictureUrl: data.profilePictureUrl,
        followersCount: data.followersCount,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        },
      }
    );
  } catch (error) {
    console.error("Behold fetch error:", error);
    return NextResponse.json(
      { posts: [], error: "Failed to fetch Instagram feed" },
      { status: 200 }
    );
  }
}
