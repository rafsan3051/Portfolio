"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Globe, Network, Fingerprint } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-32 min-h-screen flex items-center overflow-hidden">
      {/* Background glow for this specific section */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-neon/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-neon/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-cyan-neon/10 border border-cyan-neon/30">
            <Fingerprint className="w-6 h-6 text-cyan-neon" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
            <span className="text-cyan-neon opacity-50">{"// "}</span>
            IDENTITY_MATRIX
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-neon to-transparent animate-pulse" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Profile Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative group"
          >
            {/* Holographic scanning line */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl border border-cyan-neon/30">
              <div className="w-full h-[2px] bg-cyan-neon shadow-[0_0_10px_#00f3ff] opacity-50 absolute top-0 animate-[scan_3s_ease-in-out_infinite]" />
            </div>

            <div className="glass-panel border border-cyan-neon/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.1)] h-full relative z-10 backdrop-blur-md bg-black/60">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-cyan-neon/5 border-b border-cyan-neon/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-sm bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-sm bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <span className="text-xs font-mono text-cyan-neon/70 uppercase tracking-widest">AI_ANALYSIS_UI</span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm md:text-base text-zinc-300 space-y-6 relative">
                {/* Background watermark */}
                <div className="absolute right-4 bottom-4 opacity-[0.03] pointer-events-none">
                  <Fingerprint className="w-48 h-48" />
                </div>

                <div className="flex gap-3 items-center">
                  <span className="text-pink-neon animate-pulse">▶</span>
                  <span className="text-cyan-neon">System.AI.analyzeUser</span>
                  <span className="text-zinc-500">{"('Rayhan')"}</span>
                </div>
                
                <div className="pl-4 border-l-2 border-cyan-neon/30 text-zinc-400 bg-cyan-neon/[0.02] p-4 rounded-r-lg">
                  <TypeAnimation
                    sequence={[
                      500,
                      "{\n  \"status\": \"VERIFIED\",\n  \"class\": \"Full-Stack Architect\",\n  \"core_directive\": \"Build scalable web apps & blockchain tech\",\n  \"philosophy\": \"Code is poetry. Performance is a feature.\",\n  \"current_state\": \"Exploring Web3 & 3D Interfaces\"\n}",
                    ]}
                    wrapper="div"
                    cursor={false}
                    speed={80}
                    className="whitespace-pre-wrap font-mono text-cyan-neon/90"
                  />
                </div>
                
                <div className="mt-8 text-zinc-300 leading-relaxed font-sans border border-white/5 p-5 rounded-lg bg-white/[0.02]">
                  <p className="mb-4 flex gap-3 items-start">
                    <span className="text-cyan-neon mt-1">{"//"}</span>
                    <span>I am a passionate software engineer who bridges the gap between design and engineering. I specialize in building high-performance, robust, and visually stunning digital experiences.</span>
                  </p>
                  <p className="flex gap-3 items-start">
                    <span className="text-pink-neon mt-1">{"//"}</span>
                    <span>My journey started with a deep curiosity about how systems work, leading me to master full-stack development. Today, I'm focused on the cutting edge of web technologies, including 3D rendering and decentralized applications.</span>
                  </p>
                </div>

                <div className="flex gap-2 pt-4 items-center">
                  <span className="text-cyan-neon font-bold">AWAITING_INPUT</span>
                  <span className="w-3 h-5 bg-pink-neon animate-pulse" />
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
            <div className="glass-panel p-6 rounded-xl border border-cyan-neon/10 hover:border-cyan-neon/50 hover:bg-cyan-neon/5 transition-all duration-300 group shadow-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-black/50 border border-cyan-neon/30 rounded-lg group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all">
                  <Network className="w-6 h-6 text-cyan-neon" />
                </div>
                <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider">Engineering</h3>
              </div>
              <p className="text-zinc-400 text-sm font-sans">Clean architecture, efficient algorithms, and scalable system design for enterprise applications.</p>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-purple-neon/10 hover:border-purple-neon/50 hover:bg-purple-neon/5 transition-all duration-300 group shadow-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-black/50 border border-purple-neon/30 rounded-lg group-hover:shadow-[0_0_15px_rgba(176,38,255,0.5)] transition-all">
                  <Cpu className="w-6 h-6 text-purple-neon" />
                </div>
                <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider">Innovation</h3>
              </div>
              <p className="text-zinc-400 text-sm font-sans">Constantly adapting and integrating the latest neural frameworks and AI tools to stay ahead.</p>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-pink-neon/10 hover:border-pink-neon/50 hover:bg-pink-neon/5 transition-all duration-300 group sm:col-span-2 lg:col-span-1 shadow-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-black/50 border border-pink-neon/30 rounded-lg group-hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] transition-all">
                  <Globe className="w-6 h-6 text-pink-neon" />
                </div>
                <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider">Web3</h3>
              </div>
              <p className="text-zinc-400 text-sm font-sans">Passionate about decentralized systems, smart contracts, and the future of the open web.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
