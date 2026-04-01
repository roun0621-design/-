// ──────────────────────────────────────────
// API Route: Contact Form → Email via Resend
// ──────────────────────────────────────────
// 환경변수: RESEND_API_KEY, CONTACT_EMAIL_TO
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.CONTACT_EMAIL_TO || "pacerise.run@gmail.com";

// Lazy initialization to avoid build-time errors
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return new Resend(key);
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResend();
    const body = await request.json();
    const { name, email, organization, type, message, locale } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Inquiry type labels
    const typeLabels: Record<string, string> = {
      wavelight: "웨이브라이트 시스템 문의",
      event: "대회 운영 문의",
      partnership: "파트너십 / 협업 제안",
      other: "기타 문의",
    };

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "PACE RISE Website <noreply@pace-rise.com>",
      to: [ADMIN_EMAIL],
      replyTo: email,
      subject: `[웹사이트 문의] ${typeLabels[type] || type} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 10px;">
            새로운 문의가 접수되었습니다
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; width: 120px;">이름</td>
              <td style="padding: 8px 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">이메일</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">소속</td>
              <td style="padding: 8px 12px;">${organization || "-"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">문의 유형</td>
              <td style="padding: 8px 12px;">${typeLabels[type] || type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">언어</td>
              <td style="padding: 8px 12px;">${locale === "en" ? "English" : "한국어"}</td>
            </tr>
          </table>
          
          <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">메시지</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            이 이메일은 pace-rise.com 웹사이트 문의 폼에서 자동 발송되었습니다.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
