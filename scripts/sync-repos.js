#!/usr/bin/env node
/*
  Standalone GitHub sync for portfolio projects.
  - Fetches current repos for the configured user
  - Generates/updates MDX files in src/app/work/projects
  - Deletes MDX files that no longer correspond to existing/selected repos
  - Updates .synced.json manifest

  Usage:
    npm run sync:repos

  Env vars respected:
    GITHUB_USERNAME (default: rafsan3051)
    GITHUB_TOKEN    (optional, increases rate limits)
*/

const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
require('dotenv').config();

(async () => {
  const username = process.env.GITHUB_USERNAME || 'rafsan3051';
  const token = process.env.GITHUB_TOKEN && !String(process.env.GITHUB_TOKEN).startsWith('your_')
    ? process.env.GITHUB_TOKEN
    : '';

  const octokit = new Octokit({ auth: token || undefined });

  function slugify(name) {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  const projectsDir = path.join(process.cwd(), 'src', 'app', 'work', 'projects');
  const manifestPath = path.join(projectsDir, '.synced.json');

  async function readManifest() {
    try {
      const raw = await fsp.readFile(manifestPath, 'utf-8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed?.slugs) ? parsed.slugs : [];
    } catch {
      return [];
    }
  }

  try {
    console.log(`Syncing GitHub repos for @${username}...`);
    const { data: user } = await octokit.users.getByUsername({ username });

    // Fetch repos (paginate up to 100)
    const { data: repos } = await octokit.repos.listForUser({ username, sort: 'updated', per_page: token ? 100 : 30 });

    const previousSlugs = await readManifest();
    const newSlugs = [];

    await fsp.mkdir(projectsDir, { recursive: true });

    for (const repo of repos) {
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
`  - name: "${(user.name || user.login).replace(/\"/g, '\\"')}"\n` +
`    role: "Developer"\n` +
`    avatar: "${user.avatar_url}"\n` +
`    linkedIn: "https://www.linkedin.com/in/${username}"\n` +
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

      await fsp.writeFile(mdxPath, mdxContent, 'utf-8');
    }

    // Identify stale MDX files that were previously synced OR are marked as source: "github"
    const manifestRemoved = previousSlugs.filter((s) => !newSlugs.includes(s));

    // Scan directory for github-sourced MDX not present in newSlugs
    const dirEntries = await fsp.readdir(projectsDir);
    const mdxFiles = dirEntries.filter((f) => f.toLowerCase().endsWith('.mdx'));
    const detectedRemoved = [];
    for (const file of mdxFiles) {
      const filePath = path.join(projectsDir, file);
      try {
        const content = await fsp.readFile(filePath, 'utf-8');
        // Quick frontmatter checks without a YAML parser
        const hasGithubSource = /\nsource:\s*["']github["']/.test(content);
        const slugMatch = content.match(/\nslug:\s*["']([^"']+)["']/);
        const slugFromFile = slugMatch ? slugMatch[1] : path.basename(file, '.mdx');
        if (hasGithubSource && !newSlugs.includes(slugFromFile)) {
          detectedRemoved.push(slugFromFile);
        }
      } catch {}
    }

    const removedSet = new Set([...manifestRemoved, ...detectedRemoved]);
    const removedSlugs = Array.from(removedSet);
    for (const slug of removedSlugs) {
      const filePath = path.join(projectsDir, `${slug}.mdx`);
      try {
        await fsp.unlink(filePath);
        console.log(`Removed stale project: ${slug}`);
      } catch {}
    }

    await fsp.writeFile(manifestPath, JSON.stringify({ slugs: newSlugs }, null, 2), 'utf-8');

  console.log(`Sync complete. Updated: ${newSlugs.length} | Removed: ${removedSlugs.length}`);
  } catch (err) {
    console.error('Sync failed:', err?.message || err);
    process.exit(1);
  }
})();
