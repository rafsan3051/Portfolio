import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import fs from "fs";
import path from "path";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  onlyFeatured?: boolean;
  filterTags?: string[];
}

export function Projects({ range, exclude, onlyFeatured = false, filterTags = [] }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  let displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  // Apply featured filter
  if (onlyFeatured) {
    displayedProjects = displayedProjects.filter((p: any) => p.metadata?.featured === true);
  }

  // Apply tag filter if provided
  if (filterTags.length > 0) {
    const hasTag = (p: any) => Array.isArray(p.metadata?.tags) && p.metadata.tags.some((t: string) => filterTags.includes(String(t)));
    displayedProjects = displayedProjects.filter(hasTag);
  }

  // Resolve image paths to existing files; use GitHub OpenGraph as fallback
  const resolveImage = (imgPath: string, repoName?: string): string => {
    if (!imgPath) {
      // Use GitHub's auto-generated OpenGraph image for the repo
      return repoName
        ? `https://opengraph.githubassets.com/1/rafsan3051/${repoName}`
        : "/images/projects/project-01/cover-01.jpg";
    }
    const rel = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
    const abs = path.join(process.cwd(), "public", rel);
    try {
      if (fs.existsSync(abs)) return imgPath;
    } catch {
      // noop
    }
    // Fallback to GitHub OpenGraph if custom image doesn't exist
    return repoName
      ? `https://opengraph.githubassets.com/1/rafsan3051/${repoName}`
      : "/images/projects/project-01/cover-01.jpg";
  };

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post: any, index: number) => {
        const repoName = post.metadata.title || post.slug;
        return (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={(post.metadata.images || []).map((img: string) => resolveImage(img, repoName))}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member: any) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
            featured={post.metadata?.featured === true}
          />
        );
      })}
    </Column>
  );
}
