"use client";

import { motion } from "framer-motion";

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
  return (
    <section id="experience" className="relative w-full py-24 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 flex items-center justify-center gap-4">
            <span className="text-cyan-neon">04.</span>
            {"<Experience_Log />"}
          </h2>
          <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-cyan-neon/50 to-transparent" />
        </motion.div>

        <div className="relative">
          {/* Vertical glowing timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2">
            <div className="w-full h-1/3 bg-gradient-to-b from-cyan-neon via-purple-neon to-pink-neon animate-pulse" />
          </div>

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-cyan-neon -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,243,255,0.8)]" />

                <div className="w-full md:w-1/2 pl-8 md:pl-0 flex flex-col items-start md:items-center">
                  <div className={`glass-panel p-6 rounded-xl w-full hover:border-white/20 transition-colors ${
                    index % 2 === 0 ? "md:text-left md:mr-8" : "md:text-left md:ml-8"
                  }`}>
                    <span className="text-xs font-mono text-cyan-neon block mb-2">{exp.date}</span>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <h4 className="text-lg text-zinc-400 mb-4">{exp.company}</h4>
                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span key={tech} className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">
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
