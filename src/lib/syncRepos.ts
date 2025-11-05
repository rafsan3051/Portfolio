import path from 'path';
import fs from 'fs/promises';
import { getGitHubRepos, getGitHubUser } from '@/lib/github';

export interface SyncResult {
  success: boolean;
  synced: number;
  repos: string[];
  removed: string[];
}

function slugify(name: string) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export async function performSync(selectedRepos?: string[]): Promise<SyncResult> {
  const projectsDir = path.join(process.cwd(), 'src', 'app', 'work', 'projects');
  const manifestPath = path.join(projectsDir, '.synced.json');

  // Read previous manifest if present
  let previousSlugs: string[] = [];
  try {
    const raw = await fs.readFile(manifestPath, 'utf-8');
    const parsed = JSON.parse(raw);
    previousSlugs = Array.isArray(parsed?.slugs) ? parsed.slugs : [];
  } catch {}

  const repos = await getGitHubRepos();
  const user = await getGitHubUser();

  const reposToSync = selectedRepos && selectedRepos.length > 0
    ? repos.filter((r) => selectedRepos.includes(r.name))
    : repos;

  const newSlugs: string[] = [];

  // Ensure projectsDir exists
  await fs.mkdir(projectsDir, { recursive: true });

  for (const repo of reposToSync) {
    const slug = slugify(repo.name);
    const mdxPath = path.join(projectsDir, `${slug}.mdx`);
    newSlugs.push(slug);

    const mdxContent = `---\n` +
      `title: "${repo.name}"\n` +
      `publishedAt: "${repo.created_at || new Date().toISOString()}"\n` +
      `summary: "${(repo.description || 'A project from GitHub').replace(/\"/g, '\\"')}"\n` +
      `images:\n` +
      `  - "/images/projects/${slug}/cover-01.jpg"\n` +
      `team:\n` +
      `  - name: "${(user.name || user.login || '').replace(/\"/g, '\\"')}"\n` +
      `    role: "Developer"\n` +
      `    avatar: "${user.avatar_url}"\n` +
      `    linkedIn: "https://www.linkedin.com/in/${user.login}"\n` +
      `link: "${(repo.homepage || repo.html_url)}"\n` +
      `source: "github"\n` +
      `slug: "${slug}"\n` +
      `featured: false\n` +
      `tags: [${(repo.topics || []).map(t => `"${t}"`).join(', ')}]\n` +
      `---\n\n` +
      `## Overview\n\n` +
      `${(repo.description || 'This is a GitHub repository synced to the portfolio.')}\n\n` +
      `## Repository Details\n\n` +
      `- **Language**: ${repo.language || 'Not specified'}\n` +
      `- **Stars**: ${repo.stargazers_count || 0}\n` +
      `- **Forks**: ${repo.forks_count || 0}\n` +
      `${repo.topics && repo.topics.length > 0 ? `- **Topics**: ${repo.topics.join(', ')}` : ''}\n\n` +
      `## GitHub Link\n\n` +
      `View the repository: [${repo.name}](${repo.html_url})\n\n` +
      `${repo.homepage ? `## Live Demo\n\n[Visit Live Site](${repo.homepage})` : ''}\n`;

    await fs.writeFile(mdxPath, mdxContent, 'utf-8');
  }

  // Identify removed slugs using manifest and by scanning for github-sourced MDX
  const manifestRemoved = previousSlugs.filter((s) => !newSlugs.includes(s));

  const dirEntries = await fs.readdir(projectsDir);
  const mdxFiles = dirEntries.filter((f) => f.toLowerCase().endsWith('.mdx'));
  const detectedRemoved: string[] = [];
  for (const file of mdxFiles) {
    const filePath = path.join(projectsDir, file);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const hasGithubSource = /\nsource:\s*["']github["']/.test(content);
      const slugMatch = content.match(/\nslug:\s*["']([^"']+)["']/);
      const slugFromFile = slugMatch ? slugMatch[1] : path.basename(file, '.mdx');
      if (hasGithubSource && !newSlugs.includes(slugFromFile)) {
        detectedRemoved.push(slugFromFile);
      }
    } catch {}
  }

  const removedSet = new Set<string>([...manifestRemoved, ...detectedRemoved]);
  const removedSlugs = Array.from(removedSet);
  for (const slug of removedSlugs) {
    const filePath = path.join(projectsDir, `${slug}.mdx`);
    try { await fs.unlink(filePath); } catch {}
  }

  await fs.writeFile(manifestPath, JSON.stringify({ slugs: newSlugs }, null, 2), 'utf-8');

  return {
    success: true,
    synced: newSlugs.length,
    repos: reposToSync.map(r => r.name),
    removed: removedSlugs,
  };
}
