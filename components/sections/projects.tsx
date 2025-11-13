"use client";

import useSWR from "swr";
import { ProjectCard } from "../project-card";
import { fetchUserRepos } from "../../lib/github";
import { SectionWrapper } from "../section-wrapper";

const fetcher = () => fetchUserRepos("rafsan3051", 8);

export function ProjectsSection() {
  const { data, isLoading } = useSWR("repos-rafsan3051", fetcher, {
    revalidateOnFocus: true,
  });

  return (
    <SectionWrapper id="projects" className="mx-auto mt-24 w-full max-w-5xl px-4">
      <h2 className="text-2xl font-semibold">Projects</h2>
      <p className="mt-2 max-w-2xl text-sm opacity-75">
        A selection of recent repositories from my GitHub.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass h-28 animate-pulse rounded-xl border border-white/10" />
          ))}
        {data?.map((repo) => (
          <ProjectCard
            key={repo.id}
            name={repo.name}
            description={repo.description ?? undefined}
            stars={repo.stargazers_count}
            url={repo.html_url}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
