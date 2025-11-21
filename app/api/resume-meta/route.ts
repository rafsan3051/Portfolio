import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const stat = await fs.stat(filePath);

    return NextResponse.json({
      size: stat.size,
      updatedAt: stat.mtime.toISOString(),
      downloads: 0, // Track via Vercel Analytics instead
    });
  } catch (e) {
    return NextResponse.json({ error: "resume not found" }, { status: 404 });
  }
}
