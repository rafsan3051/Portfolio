"use client";

import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Particles from "../../components/particles";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectsPage() {
  const { data: repos, error } = useSWR(
    "https://api.github.com/users/rafsan3051/repos?sort=updated&per_page=12",
    fetcher
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-black via-zinc-600/20 to-black">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={80}
        staticity={40}
        ease={60}
      />

      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm duration-500 text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="hidden w-full h-px animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mb-12" />
        
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-white bg-clip-text text-edge-outline animate-title mb-4">
          Projects
        </h1>
        <p className="text-zinc-400 text-lg mb-16 animate-fade-in">
          A collection of projects I've worked on
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {!repos ? (
            <div className="col-span-full text-center text-zinc-500 py-20">
              Loading projects...
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-zinc-500 py-20">
              Failed to load projects
            </div>
          ) : (
            repos
              .filter((repo: any) => !repo.fork)
              .slice(0, 12)
              .map((repo: any) => (
                <Link
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Github size={24} className="text-zinc-400" />
                    <ExternalLink
                      size={16}
                      className="text-zinc-600 transition-all duration-500 group-hover:text-zinc-400"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2 line-clamp-1">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">
                    {repo.description || "No description available"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        ⭐ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
