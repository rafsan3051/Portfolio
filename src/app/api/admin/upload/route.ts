import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/session';
import path from 'path';
import fs from 'fs/promises';

function getExtByType(type: string | null): string {
  switch (type) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/avif':
      return 'avif';
    default:
      return 'bin';
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // 5MB limit
    const MAX = 5 * 1024 * 1024;
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > MAX) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = getExtByType(file.type);
    const filename = `avatar-${Date.now()}.${ext}`;
    const filepath = path.join(uploadsDir, filename);
    await fs.writeFile(filepath, buf);

    const url = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
