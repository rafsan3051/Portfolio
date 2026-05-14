"use client";

import { Navbar } from "../components/navbar";
import { HeroSection } from "../components/sections/hero";
import { AboutSection } from "../components/sections/about";
import { SkillsSection } from "../components/sections/skills";
import { ProjectsSection } from "../components/sections/projects";
import { ExperienceSection } from "../components/sections/experience";
import { ContactSection } from "../components/sections/contact";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="w-full py-8 text-center border-t border-white/5 glass z-10 mt-20">
        <p className="text-zinc-500 font-mono text-sm">
          © {new Date().getFullYear()} Md. Rayhan Ahmed Shis. All systems operational.
        </p>
      </footer>
    </main>
  );
}
