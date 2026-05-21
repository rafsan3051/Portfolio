"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useState, useEffect } from "react";

export function CyberVisualizer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [bars, setBars] = useState<number[]>(Array.from({ length: 8 }, () => Math.random()));

  useEffect(() => {
    if (!isPlaying) return;
    
    // Simulate audio/neural data fluctuation
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random()));
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-[90] hidden md:flex"
    >
      <div 
        onClick={() => setIsPlaying(!isPlaying)}
        className="glass-panel p-3 rounded-lg border border-cyan-neon/30 hover:border-cyan-neon bg-black/60 backdrop-blur-md cursor-pointer group flex items-center gap-4 transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
      >
        <div className="flex items-end gap-[2px] h-8 w-16">
          {bars.map((height, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-cyan-neon rounded-t-sm origin-bottom"
              animate={{ 
                height: isPlaying ? `${Math.max(10, height * 100)}%` : "10%",
                backgroundColor: isPlaying ? "rgba(0, 243, 255, 1)" : "rgba(0, 243, 255, 0.3)"
              }}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
        
        <div className="flex flex-col border-l border-white/10 pl-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className={`w-3 h-3 ${isPlaying ? 'text-pink-neon animate-pulse' : 'text-zinc-500'}`} />
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-white">
              Neural.Stream
            </span>
          </div>
          <span className="text-[8px] font-mono text-cyan-neon/70 tracking-wider">
            {isPlaying ? 'ACTIVE_SYNC' : 'PAUSED'}
          </span>
        </div>
        
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-neon/5 to-transparent rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}
