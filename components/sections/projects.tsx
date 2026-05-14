"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Activity } from "lucide-react";
import { MouseEvent, useRef } from "react";

const projectsData = [
  {
    title: "Nexus Core",
    description: "A decentralized exchange platform with advanced liquidity aggregation, featuring real-time charting, order book depth, and seamless wallet integration.",
    tech: ["Next.js", "Solidity", "TailwindCSS", "Ethers.js"],
    status: "ACTIVE",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "CyberGrid Analytics",
    description: "Enterprise-grade analytics dashboard processing millions of data points in real-time. Features complex interactive visualizations and predictive AI modeling.",
    tech: ["React", "Python", "TensorFlow", "Three.js"],
    status: "UPGRADING",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "NeonChat Protocol",
    description: "End-to-end encrypted messaging protocol with zero-knowledge proofs for identity verification and decentralized storage for message history.",
    tech: ["Node.js", "WebRTC", "Redis", "Cryptography"],
    status: "BETA",
    github: "#",
    demo: "#",
    featured: false,
  }
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full glass-panel rounded-xl overflow-hidden border border-cyan-neon/20 hover:border-cyan-neon/50 transition-all duration-500 bg-black/40 backdrop-blur-md"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(0, 243, 255, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Project Image Placeholder */}
        <div className="relative h-48 md:h-64 w-full overflow-hidden bg-zinc-950 border-b border-cyan-neon/20" style={{ transform: "translateZ(30px)" }}>
          {/* Holographic grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-neon bg-cyan-neon/5 group-hover:scale-105 transition-transform duration-700">
            <Activity className="w-12 h-12 mb-4 opacity-50" />
            <span className="font-mono text-xs tracking-widest uppercase opacity-70">[ DATA_STREAM_SECURED ]</span>
          </div>
          
          {/* Scanning line effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-neon opacity-0 group-hover:opacity-50 group-hover:animate-[scan_2s_linear_infinite] z-20 shadow-[0_0_10px_#00f3ff]" />
        </div>

        <div className="relative p-6 z-20" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              {project.featured && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-pink-neon animate-pulse shadow-[0_0_5px_#ff007f]" />
                  <span className="text-[10px] font-mono text-pink-neon tracking-widest uppercase">
                    Priority_Target
                  </span>
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-bold font-mono text-white group-hover:text-cyan-neon transition-colors">
                {project.title}
              </h3>
            </div>
            <div className="flex gap-2 bg-black/50 p-1.5 rounded-md border border-white/10">
              <a href={project.github} className="text-zinc-500 hover:text-cyan-neon transition-colors p-1.5 hover:bg-cyan-neon/10 rounded-sm">
                <Github className="w-4 h-4" />
              </a>
              <a href={project.demo} className="text-zinc-500 hover:text-pink-neon transition-colors p-1.5 hover:bg-pink-neon/10 rounded-sm">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-zinc-400 text-sm font-sans leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span key={tech} className="text-[10px] font-mono text-cyan-neon/70 bg-cyan-neon/5 px-2 py-1 rounded-sm border border-cyan-neon/20 uppercase tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm">
              STATUS: <span className={project.status === "ACTIVE" ? "text-green-400" : "text-yellow-400"}>{project.status}</span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full py-32 min-h-screen overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-neon/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-cyan-neon/10 border border-cyan-neon/30">
            <Activity className="w-6 h-6 text-cyan-neon" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
            <span className="text-cyan-neon opacity-50">{"// "}</span>
            ACTIVE_SYSTEMS
          </h2>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-neon to-transparent animate-pulse" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black/50 border border-cyan-neon/30 hover:border-cyan-neon text-cyan-neon rounded-sm transition-all font-mono text-sm uppercase tracking-widest overflow-hidden shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_30px_rgba(0,243,255,0.3)]"
          >
            <span className="absolute inset-0 bg-cyan-neon/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Access_Full_Archive</span>
            <ExternalLink className="w-4 h-4 relative group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
