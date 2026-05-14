"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HeroCanvas } from "../3d/hero-canvas";
import { TypeAnimation } from "react-type-animation";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: yParallax, opacity: opacityFade }} className="absolute inset-0 z-0">
        <HeroCanvas />
      </motion.div>
      
      <div className="z-10 container mx-auto px-6 relative mt-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-3 rounded-sm border border-cyan-neon/30 bg-black/40 glass px-5 py-2 text-xs font-mono font-medium text-cyan-neon tracking-widest shadow-[0_0_15px_rgba(0,243,255,0.2)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-neon opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-neon"></span>
          </span>
          SECURE_CONNECTION_ESTABLISHED // SYS.READY
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-x-20 -inset-y-10 bg-cyan-neon/5 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter mb-4 leading-none relative z-10">
            <span className="text-white mix-blend-plus-lighter">Md. Rayhan </span>
            <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon via-purple-neon to-pink-neon text-glow block mt-2">Ahmed Shis</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-16 md:h-20 flex items-center justify-center mb-8 relative z-10 mt-6"
        >
          <div className="text-lg md:text-2xl text-zinc-400 font-mono glass-panel px-6 py-4 rounded-sm border-cyan-neon/20 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <span className="text-pink-neon mr-2 animate-pulse">{`root@ai:~#`}</span>
            <TypeAnimation
              sequence={[
                "execute full_stack_dev.sh",
                1500,
                "deploy smart_contracts.sol",
                1500,
                "init creative_technologist.exe",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl text-base text-zinc-400 mb-12 mx-auto font-mono leading-relaxed"
        >
          Architecting the digital infrastructure of tomorrow. Specializing in high-performance Web3 solutions and immersive cyberpunk interfaces.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 relative z-20"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-black bg-cyan-neon rounded-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,243,255,0.8)]"
          >
            {/* Glitch effect on hover */}
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse"></span>
            
            <span className="relative flex items-center gap-3">
              [ INITIALIZE_PROJECTS ]
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </a>
          
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-white border border-cyan-neon/30 glass rounded-sm overflow-hidden transition-all hover:border-pink-neon hover:text-pink-neon hover:shadow-[0_0_30px_rgba(255,0,127,0.4)]"
          >
            {/* Scanning line effect */}
            <span className="absolute left-0 top-0 w-full h-[2px] bg-pink-neon opacity-0 group-hover:opacity-100 group-hover:animate-[scan_1s_linear_infinite]"></span>
            
            <span className="relative flex items-center gap-2">
              <span className="text-cyan-neon group-hover:text-pink-neon transition-colors">/</span> TRANSMIT_DATA
            </span>
          </a>
        </motion.div>
      </div>

      {/* Holographic grid floor perspective */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[linear-gradient(to_top,rgba(0,243,255,0.05)_0%,transparent_100%)] pointer-events-none border-b border-cyan-neon/20 transform perspective-[1000px] rotateX-[60deg] origin-bottom scale-150"></div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-cyan-neon/60 font-mono tracking-[0.3em] uppercase glow-text">Scroll_Down</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-neon to-transparent animate-pulse shadow-[0_0_10px_#00f3ff]" />
      </motion.div>
    </section>
  );
}
