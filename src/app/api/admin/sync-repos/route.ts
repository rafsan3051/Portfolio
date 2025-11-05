import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/session';
import { getGitHubRepos } from '@/lib/github';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { selectedRepos } = body; // Array of repo names to sync

    // Fetch latest GitHub repos
    const repos = await getGitHubRepos();

    // Filter to selected repos
    const reposToSync = selectedRepos
      ? repos.filter((repo) => selectedRepos.includes(repo.name))
      : repos;

    // Create/update MDX files for each repo
    const projectsDir = path.join(process.cwd(), 'src', 'app', 'work', 'projects');

    for (const repo of reposToSync) {
      const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const mdxPath = path.join(projectsDir, `${slug}.mdx`);

      const mdxContent = `---
title: "${repo.name}"
publishedAt: "${repo.created_at || new Date().toISOString()}"
summary: "${repo.description || 'A project from GitHub'}"
images:
  - "/images/projects/${slug}/cover-01.jpg"
team:
  - name: "Rayhan Ahmed Shis"
    role: "Developer"
    avatar: "/images/avatar.jpg"
    linkedIn: "https://www.linkedin.com/in/rafsan3051"
---

## Overview

${repo.description || 'This is a GitHub repository synced to the portfolio.'}

## Repository Details

- **Language**: ${repo.language || 'Not specified'}
- **Stars**: ${repo.stargazers_count || 0}
- **Forks**: ${repo.forks_count || 0}
${repo.topics && repo.topics.length > 0 ? `- **Topics**: ${repo.topics.join(', ')}` : ''}

## GitHub Link

View the repository: [${repo.name}](${repo.html_url})

${repo.homepage ? `\n## Live Demo\n\n[Visit Live Site](${repo.homepage})` : ''}
`;

      await fs.writeFile(mdxPath, mdxContent, 'utf-8');
    }

    return NextResponse.json({
      success: true,
      synced: reposToSync.length,
      repos: reposToSync.map((r) => r.name),
    });
  } catch (error) {
    console.error('Error syncing repos:', error);
    return NextResponse.json(
      { error: 'Failed to sync repositories' },
      { status: 500 }
    );
  }
}
