"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Globe } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 min-h-screen flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 flex items-center gap-4">
            <span className="text-pink-neon">01.</span>
            {"<About_Me />"}
          </h2>
          <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-pink-neon/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Profile Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] h-full">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-zinc-400">root@rayhan:~</span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm md:text-base text-zinc-300 space-y-4">
                <div className="flex gap-2">
                  <span className="text-cyan-neon">~</span>
                  <span className="text-pink-neon">{"$"}</span>
                  <span className="typing-text">cat profile.json</span>
                </div>
                
                <div className="pl-4 border-l border-white/10 text-zinc-400">
                  <pre className="whitespace-pre-wrap font-mono">
{`{
  "name": "Md. Rayhan Ahmed Shis",
  "role": "Full-Stack Developer",
  "focus": "Building scalable web apps & blockchain tech",
  "philosophy": "Code is poetry. Performance is a feature.",
  "status": "Ready for new challenges"
}`}
                  </pre>
                </div>
                
                <div className="mt-6 text-zinc-300 leading-relaxed font-sans">
                  <p className="mb-4">
                    I am a passionate software engineer who bridges the gap between design and engineering. 
                    I specialize in building high-performance, robust, and beautiful digital experiences.
                  </p>
                  <p>
                    My journey started with a deep curiosity about how things work on the web, which led me to master full-stack development. Today, I'm exploring the cutting edge of web technologies, including 3D rendering and decentralized applications.
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <span className="text-cyan-neon">~</span>
                  <span className="text-pink-neon">{"$"}</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats / Interest Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            <div className="glass-panel p-6 rounded-xl hover:border-cyan-neon/30 transition-colors group">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-cyan-neon/10 rounded-lg group-hover:bg-cyan-neon/20 transition-colors">
                  <Terminal className="w-6 h-6 text-cyan-neon" />
                </div>
                <h3 className="text-lg font-bold text-white">Engineering</h3>
              </div>
              <p className="text-zinc-400 text-sm">Clean architecture, efficient algorithms, and scalable system design.</p>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:border-purple-neon/30 transition-colors group">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-purple-neon/10 rounded-lg group-hover:bg-purple-neon/20 transition-colors">
                  <Cpu className="w-6 h-6 text-purple-neon" />
                </div>
                <h3 className="text-lg font-bold text-white">Innovation</h3>
              </div>
              <p className="text-zinc-400 text-sm">Constantly learning and adopting the latest tech to stay ahead of the curve.</p>
            </div>

            <div className="glass-panel p-6 rounded-xl hover:border-pink-neon/30 transition-colors group sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-pink-neon/10 rounded-lg group-hover:bg-pink-neon/20 transition-colors">
                  <Globe className="w-6 h-6 text-pink-neon" />
                </div>
                <h3 className="text-lg font-bold text-white">Web3 & Decentralization</h3>
              </div>
              <p className="text-zinc-400 text-sm">Passionate about blockchain technology and its potential to revolutionize the web.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
