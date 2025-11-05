import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";

export async function GET() {
  const authed = await isAuthenticated();
  if (authed) return NextResponse.json({ authenticated: true }, { status: 200 });
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
