import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
export const runtime = 'nodejs';
import { performSync } from '@/lib/syncRepos';

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(request: NextRequest) {
  // Read raw body for signature validation
  const rawBody = await request.text();
  const signature = request.headers.get('x-hub-signature-256') || '';
  const event = request.headers.get('x-github-event') || 'unknown';
  const delivery = request.headers.get('x-github-delivery') || '';

  const secret = process.env.GITHUB_WEBHOOK_SECRET || '';

  // Require a secret in production; allow missing secret only in local dev
  const isProd = process.env.NODE_ENV === 'production';
  if (!secret && isProd) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  if (secret) {
    const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (!timingSafeEqual(expected, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  // Best-effort parse
  let payload: any = {};
  try { payload = JSON.parse(rawBody); } catch {}

  // For simplicity and reliability, trigger a full sync on key events.
  // Supported: repository (created, deleted, renamed), push, public/private changes, etc.
  const triggerEvents = new Set([
    'repository',
    'push',
    'public',
    'member',
    'fork',
    'create',
    'delete',
    'rename',
  ]);

  if (!triggerEvents.has(event)) {
    return NextResponse.json({ ok: true, skipped: true, reason: `ignored event: ${event}` });
  }

  try {
    const result = await performSync();
    return NextResponse.json({ ok: true, event, delivery, ...result });
  } catch (err: any) {
    console.error('Webhook sync failed:', err);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
