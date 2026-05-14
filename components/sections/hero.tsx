"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "../3d/hero-canvas";
import { TypeAnimation } from "react-type-animation";

export function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <HeroCanvas />
      
      <div className="z-10 container mx-auto px-6 relative mt-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-neon/30 bg-black/40 glass px-4 py-1.5 text-sm font-medium text-cyan-neon"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-neon opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-neon"></span>
          </span>
          System Online. Connection Established.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4"
        >
          <span className="text-white">Md. Rayhan </span>
          <br className="md:hidden" />
          <span className="text-gradient text-glow">Ahmed Shis</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="h-12 md:h-16 flex items-center justify-center mb-8"
        >
          <div className="text-xl md:text-3xl text-zinc-400 font-mono">
            <span className="text-pink-neon">{`> `}</span>
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "Blockchain Enthusiast",
                2000,
                "Creative Technologist",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl text-lg text-zinc-400 mb-10 mx-auto"
        >
          Crafting high-performance, futuristic web applications with modern technologies. 
          Building the digital infrastructure of tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-black bg-cyan-neon rounded-md overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              Explore Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white border border-white/20 glass rounded-md overflow-hidden transition-all hover:border-pink-neon hover:text-pink-neon hover:shadow-[0_0_20px_rgba(255,0,127,0.3)]"
          >
            <span className="absolute inset-0 bg-pink-neon/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative">Initiate Contact</span>
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-neon/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
