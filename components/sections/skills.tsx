"use client";

import { motion } from "framer-motion";

const skillsData = [
  {
    category: "Frontend",
    icon: "🖥️",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    color: "from-cyan-neon/20 to-transparent",
    borderColor: "hover:border-cyan-neon/50",
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express", "NestJS", "Python", "GraphQL", "REST APIs"],
    color: "from-purple-neon/20 to-transparent",
    borderColor: "hover:border-purple-neon/50",
  },
  {
    category: "Database & Cloud",
    icon: "s🗄️",
    skills: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Vercel"],
    color: "from-pink-neon/20 to-transparent",
    borderColor: "hover:border-pink-neon/50",
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    skills: ["Git", "Figma", "Jest", "Cypress", "Web3/Ethers.js", "Linux"],
    color: "from-blue-500/20 to-transparent",
    borderColor: "hover:border-blue-500/50",
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-24 min-h-screen flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-end text-right"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 flex items-center justify-end gap-4">
            {"<Tech_Stack />"}
            <span className="text-cyan-neon">02.</span>
          </h2>
          <div className="h-[1px] w-full max-w-md bg-gradient-to-l from-cyan-neon/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-panel p-6 md:p-8 rounded-xl border border-white/5 transition-all duration-500 bg-gradient-to-br ${category.color} ${category.borderColor} group relative overflow-hidden`}
            >
              {/* Animated hover glow background */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                    {category.icon}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    {category.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-md bg-black/40 border border-white/10 text-sm md:text-base text-zinc-300 font-mono transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/5 hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
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
          className="mt-16 glass-panel border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">system_metrics.sh</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-cyan-neon mb-2 font-mono">4+</div>
              <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest">Years Exp</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-purple-neon mb-2 font-mono">50+</div>
              <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest">Projects</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-pink-neon mb-2 font-mono">100%</div>
              <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest">Commitment</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">∞</div>
              <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-widest">Learning</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
