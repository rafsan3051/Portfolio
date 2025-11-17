"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Particles from "../../components/particles";
import SkillProgress from "../../components/skill-progress";
import Testimonials from "../../components/testimonials";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-black via-zinc-600/20 to-black">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={60}
        staticity={30}
        ease={40}
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
          <div />
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-6 pt-32 pb-16">
        <div className="hidden w-full h-px animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mb-12" />
        
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-white bg-clip-text text-edge-outline animate-title mb-8">
          About Me
        </h1>

        <div className="space-y-8 text-zinc-300 animate-fade-in">
          <section className="glass rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
              Md. Rayhan Ahmed Shis
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Developer / Technologist / Creative Coder — building modern web
              experiences, automation, and exploring emerging tech.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              I'm passionate about creating elegant solutions to complex
              problems. My focus is on building scalable, maintainable, and
              user-friendly applications using modern web technologies.
            </p>
          </section>

          <section className="glass rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
              Skills & Expertise
            </h2>
            <div className="space-y-4">
              <SkillProgress skill="Next.js & React" level={95} color="bg-gradient-to-r from-blue-500 to-cyan-500" delay={100} />
              <SkillProgress skill="TypeScript" level={90} color="bg-gradient-to-r from-blue-600 to-blue-400" delay={200} />
              <SkillProgress skill="Node.js & Backend" level={85} color="bg-gradient-to-r from-green-500 to-emerald-500" delay={300} />
              <SkillProgress skill="Python & Django" level={80} color="bg-gradient-to-r from-yellow-500 to-orange-500" delay={400} />
              <SkillProgress skill="Laravel & PHP" level={85} color="bg-gradient-to-r from-red-500 to-pink-500" delay={500} />
              <SkillProgress skill="Docker & DevOps" level={75} color="bg-gradient-to-r from-cyan-500 to-blue-500" delay={600} />
              <SkillProgress skill="Blockchain (Hyperledger)" level={70} color="bg-gradient-to-r from-purple-500 to-indigo-500" delay={700} />
              <SkillProgress skill="UI/UX Design" level={80} color="bg-gradient-to-r from-pink-500 to-rose-500" delay={800} />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Tailwind CSS",
                "Git",
                "REST APIs",
                "GraphQL",
                "MongoDB",
                "PostgreSQL",
                "Redis",
                "AWS",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 transition-colors duration-300 hover:border-zinc-500 hover:bg-zinc-700/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="glass rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
              Experience
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-200">
                  Full-Stack Developer
                </h3>
                <p className="text-sm text-zinc-500 mb-2">
                  Freelance • 2020 - Present
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Building web applications, e-commerce platforms, and custom
                  solutions for clients worldwide. Specializing in Next.js,
                  React, and modern JavaScript frameworks.
                </p>
              </div>
            </div>
          </section>

          <section className="glass rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
              Education
            </h2>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200">
                Computer Science & Engineering
              </h3>
              <p className="text-sm text-zinc-500 mb-2">
                University • 2019 - 2024
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Focused on software engineering, algorithms, and web
                development. Completed various projects involving machine
                learning, blockchain, and full-stack development.
              </p>
            </div>
          </section>

          <Testimonials />
        </div>
      </div>
    </div>
  );
}
