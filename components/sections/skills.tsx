"use client";

import { motion } from "framer-motion";
import { Cpu, Server, Globe, Database, Shield, Zap } from "lucide-react";

const skillsData = [
  {
    category: "Frontend Architecture",
    icon: <Globe className="w-6 h-6 text-cyan-neon" />,
    metrics: 95,
    skills: ["React 19", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    color: "from-cyan-neon",
    borderColor: "border-cyan-neon/30 hover:border-cyan-neon/80",
    glow: "hover:shadow-[0_0_30px_rgba(0,243,255,0.3)]",
  },
  {
    category: "Backend Systems",
    icon: <Server className="w-6 h-6 text-purple-neon" />,
    metrics: 90,
    skills: ["Node.js", "Express", "NestJS", "Python", "GraphQL", "gRPC"],
    color: "from-purple-neon",
    borderColor: "border-purple-neon/30 hover:border-purple-neon/80",
    glow: "hover:shadow-[0_0_30px_rgba(176,38,255,0.3)]",
  },
  {
    category: "Cloud & Database",
    icon: <Database className="w-6 h-6 text-pink-neon" />,
    metrics: 85,
    skills: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Kubernetes"],
    color: "from-pink-neon",
    borderColor: "border-pink-neon/30 hover:border-pink-neon/80",
    glow: "hover:shadow-[0_0_30px_rgba(255,0,127,0.3)]",
  },
  {
    category: "Web3 & Security",
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    metrics: 80,
    skills: ["Solidity", "Ethers.js", "Web3.js", "Smart Contracts", "Cryptography", "OAuth"],
    color: "from-blue-500",
    borderColor: "border-blue-500/30 hover:border-blue-500/80",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-32 min-h-screen flex items-center overflow-hidden">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.1)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-cyan-neon/10 border border-cyan-neon/30">
            <Cpu className="w-6 h-6 text-cyan-neon" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
            <span className="text-cyan-neon opacity-50">{"// "}</span>
            NEURAL_STACK
          </h2>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-neon to-transparent animate-pulse" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-panel p-6 md:p-8 rounded-xl border bg-black/40 backdrop-blur-md transition-all duration-500 ${category.borderColor} ${category.glow} group relative overflow-hidden`}
            >
              {/* Animated hover glow background */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-black/50 rounded-lg border border-white/10 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold font-mono text-white uppercase tracking-wider">
                      {category.category}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-white">{category.metrics}</span>
                    <span className="text-zinc-500 text-sm">%</span>
                  </div>
                </div>
                
                {/* Metric Bar */}
                <div className="h-1.5 w-full bg-white/10 rounded-full mb-8 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.metrics}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${category.color} to-white rounded-full shadow-[0_0_10px_currentColor]`}
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-sm bg-cyan-neon/5 border border-cyan-neon/20 text-xs md:text-sm text-zinc-300 font-mono transition-all duration-300 hover:border-cyan-neon hover:text-cyan-neon hover:bg-cyan-neon/10 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,243,255,0.3)] cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global metrics terminal panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto glass-panel border border-cyan-neon/20 rounded-xl overflow-hidden relative"
        >
          {/* Scanning line for dashboard */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-[1px] bg-cyan-neon shadow-[0_0_8px_#00f3ff] opacity-30 absolute top-0 animate-[scan_4s_ease-in-out_infinite]" />
          </div>

          <div className="bg-cyan-neon/5 border-b border-cyan-neon/20 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-neon" />
              <span className="text-xs font-mono text-cyan-neon uppercase tracking-widest">system_metrics.exe</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-sm bg-cyan-neon/40 animate-pulse" />
              <div className="w-2 h-2 rounded-sm bg-purple-neon/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 rounded-sm bg-pink-neon/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
          <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5 relative z-10 backdrop-blur-md bg-black/40">
            <div className="px-4 group cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-cyan-neon mb-2 font-mono group-hover:scale-110 transition-transform text-glow">4+</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest group-hover:text-cyan-neon transition-colors">Years Exp</div>
            </div>
            <div className="px-4 group cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-purple-neon mb-2 font-mono group-hover:scale-110 transition-transform shadow-purple-neon">50+</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest group-hover:text-purple-neon transition-colors">Projects</div>
            </div>
            <div className="px-4 group cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-pink-neon mb-2 font-mono group-hover:scale-110 transition-transform shadow-pink-neon">100%</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest group-hover:text-pink-neon transition-colors">Commitment</div>
            </div>
            <div className="px-4 group cursor-default">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">∞</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors">Learning</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
