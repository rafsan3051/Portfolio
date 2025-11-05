import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/session';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { profile } = body;

    // Read current content
    const contentPath = path.join(process.cwd(), 'src', 'resources', 'content.tsx');
    let contentFile = await fs.readFile(contentPath, 'utf-8');

    // Update person object fields
    if (profile.firstName) {
      contentFile = contentFile.replace(
        /firstName:\s*['"].*?['"]/,
        `firstName: '${profile.firstName}'`
      );
    }
    if (profile.lastName) {
      contentFile = contentFile.replace(
        /lastName:\s*['"].*?['"]/,
        `lastName: '${profile.lastName}'`
      );
    }
    if (profile.role) {
      contentFile = contentFile.replace(
        /role:\s*['"].*?['"]/,
        `role: '${profile.role}'`
      );
    }
    if (profile.avatar) {
      contentFile = contentFile.replace(
        /avatar:\s*['"].*?['"]/,
        `avatar: '${profile.avatar}'`
      );
    }
    if (profile.location) {
      contentFile = contentFile.replace(
        /location:\s*['"].*?['"]/,
        `location: '${profile.location}'`
      );
    }
    if (profile.email) {
      contentFile = contentFile.replace(
        /email:\s*['"].*?['"]/,
        `email: '${profile.email}'`
      );
    }

    // Write updated content
    await fs.writeFile(contentPath, contentFile, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
