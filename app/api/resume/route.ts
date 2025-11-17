import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "unknown";
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const ts = new Date().toISOString();

  try {
    const store = getStore({ name: "resume-downloads" });
    const current = await store.get("count");
    const count = current ? parseInt(current, 10) || 0 : 0;
    await store.set("count", String(count + 1));
    await store.set(`event:${ts}`, JSON.stringify({ ip, ua, ts }), { metadata: { ttl: 60 * 60 * 24 * 7 } });
  } catch (e) {
    console.log("[resume-download] counter error", e);
  }
  console.log(`[resume-download] time=${ts} ip=${ip} ua=${ua}`);

  return NextResponse.redirect(new URL("/resume.pdf", req.url), { status: 307 });
}
