"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { MouseEvent } from "react";

const projectsData = [
  {
    title: "Nexus Core",
    description: "A decentralized exchange platform with advanced liquidity aggregation, featuring real-time charting, order book depth, and seamless wallet integration.",
    tech: ["Next.js", "Solidity", "TailwindCSS", "Ethers.js"],
    image: "/og.png", // using placeholder, should be a real image
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "CyberGrid Analytics",
    description: "Enterprise-grade analytics dashboard processing millions of data points in real-time. Features complex interactive visualizations and predictive AI modeling.",
    tech: ["React", "Python", "TensorFlow", "Three.js"],
    image: "/og.png",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "NeonChat Protocol",
    description: "End-to-end encrypted messaging protocol with zero-knowledge proofs for identity verification and decentralized storage for message history.",
    tech: ["Node.js", "WebRTC", "Redis", "Cryptography"],
    image: "/og.png",
    github: "#",
    demo: "#",
    featured: false,
  }
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      className={`group relative glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-neon/40 transition-colors duration-500 ${
        project.featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 243, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-zinc-900 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-cyan-neon/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Replace with next/image for actual images */}
        <div className="absolute inset-0 flex items-center justify-center text-zinc-700 bg-black/50 group-hover:scale-105 transition-transform duration-700">
          <span className="font-mono text-sm">[ IMAGE DATA CORRUPTED // SIMULATION ACTIVE ]</span>
        </div>
      </div>

      <div className="relative p-6 md:p-8 z-20">
        <div className="flex justify-between items-start mb-4">
          <div>
            {project.featured && (
              <span className="text-xs font-mono text-pink-neon tracking-widest uppercase mb-2 block">
                Featured System
              </span>
            )}
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-neon transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-3">
            <a href={project.github} className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <Github className="w-5 h-5" />
            </a>
            <a href={project.demo} className="text-zinc-400 hover:text-cyan-neon transition-colors p-2 hover:bg-white/5 rounded-full">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <span key={tech} className="text-xs font-mono text-cyan-neon/80 bg-cyan-neon/5 px-2 py-1 rounded border border-cyan-neon/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full py-24 min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 flex items-center gap-4">
            <span className="text-purple-neon">03.</span>
            {"<Deployed_Systems />"}
          </h2>
          <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-purple-neon/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white text-zinc-300 hover:text-white rounded-md transition-all font-mono text-sm"
          >
            Access Full Archive
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
