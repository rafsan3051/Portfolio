import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { getStore } from "@netlify/blobs";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const stat = await fs.stat(filePath);
    let downloads = 0;
    try {
      const store = getStore({ name: "resume-downloads" });
      const raw = await store.get("count");
      downloads = raw ? parseInt(raw, 10) || 0 : 0;
    } catch {}

    return NextResponse.json({
      size: stat.size,
      updatedAt: stat.mtime.toISOString(),
      downloads,
    });
  } catch (e) {
    return NextResponse.json({ error: "resume not found" }, { status: 404 });
  }
}
