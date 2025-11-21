import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "unknown";
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const ts = new Date().toISOString();

  // Log download (Vercel Analytics will track this automatically)
  console.log(`[resume-download] time=${ts} ip=${ip} ua=${ua}`);

  return NextResponse.redirect(new URL("/resume.pdf", req.url), { status: 307 });
}
