import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  // Validate against admin credentials hash to keep a single source of truth
  const isValid = bcrypt.compareSync(password, config.admin.passwordHash);
  if (!isValid) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.username = config.admin.username;
  await session.save();

  return NextResponse.json({ success: true }, { status: 200 });
}
