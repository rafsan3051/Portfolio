"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { useRef } from "react";

const experienceData = [
  {
    role: "Senior Full-Stack Engineer",
    company: "CyberDyne Systems",
    date: "2032 - Present",
    description: "Leading the development of highly scalable decentralized applications. Architecting zero-trust security models and optimizing WebGL rendering pipelines for 3D data visualization.",
    tech: ["React", "Node.js", "Web3", "WebGL"],
  },
  {
    role: "Software Engineer II",
    company: "NeonCorp",
    date: "2029 - 2032",
    description: "Developed core features for enterprise data analytics dashboard. Improved application performance by 40% through code splitting and efficient state management.",
    tech: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL"],
  },
  {
    role: "Frontend Developer",
    company: "Nexus UI",
    date: "2027 - 2029",
    description: "Built responsive, accessible, and cinematic user interfaces for high-profile clients. Collaborated closely with design teams to implement complex animations.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
  }
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="relative w-full py-32 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-cyan-neon/10 border border-cyan-neon/30">
            <TerminalSquare className="w-6 h-6 text-cyan-neon" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
            <span className="text-cyan-neon opacity-50">{"// "}</span>
            MISSION_LOG
          </h2>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-neon to-transparent animate-pulse" />
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Background subtle line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Glowing Energy Line */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-neon via-purple-neon to-pink-neon md:-translate-x-1/2 shadow-[0_0_15px_#00f3ff,0_0_30px_#b026ff] rounded-full z-0" 
          />

          <div className="space-y-16 md:space-y-24">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-[15px] md:left-1/2 w-8 h-8 rounded-full bg-black border-2 border-cyan-neon -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(0,243,255,0.8)] flex items-center justify-center top-0 md:top-auto">
                  <div className="w-2 h-2 bg-pink-neon rounded-full animate-ping" />
                  <div className="absolute w-3 h-3 bg-cyan-neon rounded-full" />
                </div>

                <div className={`w-full md:w-1/2 pl-12 md:pl-0 flex flex-col items-start md:items-center ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`glass-panel p-6 md:p-8 rounded-xl w-full border border-cyan-neon/20 hover:border-cyan-neon/50 transition-all duration-500 bg-black/50 backdrop-blur-md group hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}>
                    {/* Corner decorative elements */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-neon/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-neon/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <span className="text-xs font-mono text-pink-neon tracking-widest uppercase border border-pink-neon/30 bg-pink-neon/5 px-2 py-1 rounded-sm">
                        {exp.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold font-mono text-white mb-1 group-hover:text-cyan-neon transition-colors">{exp.role}</h3>
                    <h4 className="text-base text-zinc-400 mb-6 font-mono uppercase tracking-wider">{exp.company}</h4>
                    
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed font-sans">
                      {exp.description}
                    </p>
                    
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      {exp.tech.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono text-cyan-neon/70 bg-cyan-neon/5 px-2 py-1 rounded-sm border border-cyan-neon/20 uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
