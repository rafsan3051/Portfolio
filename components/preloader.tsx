"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-cyan-neon font-mono overflow-hidden"
        >
          {/* Background scanline for preloader */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,243,255,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_2s_linear_infinite] pointer-events-none"></div>
          
          <div className="max-w-md w-full p-8 relative z-10">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-neon shadow-[0_0_10px_#00f3ff]"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-neon shadow-[0_0_10px_#00f3ff]"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-neon shadow-[0_0_10px_#00f3ff]"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-neon shadow-[0_0_10px_#00f3ff]"></div>
            
            <div className="mb-6 flex justify-between items-end">
              <div className="text-xs text-zinc-500">SYS_INIT_SEQ</div>
              <div className="text-xs text-cyan-neon animate-pulse">AUTH: REQUIRED</div>
            </div>

            <TypeAnimation
              sequence={[
                "INITIALIZING CYBER_OS v2.0...",
                500,
                "ESTABLISHING NEURAL LINK...",
                500,
                "LOADING CORE MODULES...",
                500,
                "DECRYPTING IDENTITY MATRICES...",
                500,
                "SYSTEM ONLINE.",
                1000,
              ]}
              wrapper="div"
              cursor={true}
              repeat={0}
              speed={70}
              className="text-sm md:text-base leading-relaxed tracking-wider opacity-90 min-h-[120px]"
            />
            
            <div className="mt-8 h-1 w-full bg-cyan-neon/10 overflow-hidden rounded-full relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-cyan-neon shadow-[0_0_15px_#00f3ff]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
