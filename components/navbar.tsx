"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { name: "Identity", id: "about", href: "#about" },
  { name: "Neural Stack", id: "skills", href: "#skills" },
  { name: "Active Systems", id: "projects", href: "#projects" },
  { name: "Timeline", id: "experience", href: "#experience" },
  { name: "Transmission", id: "contact", href: "#contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Top threshold
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide/reveal based on scroll direction
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Scrollspy
    const sections = ["hero", ...navItems.map(item => item.id)];
    let current = "";
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el && latest >= el.offsetTop - 300) {
        current = section;
      }
    }
    setActiveTab(current);
  });

  return (
    <motion.div 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 transition-all duration-500",
        scrolled ? "pt-4" : "pt-6"
      )}
    >
      <nav
        className={cn(
          "glass-panel flex w-full max-w-5xl items-center justify-between px-6 py-3 transition-all duration-500",
          scrolled ? "bg-black/60 shadow-[0_0_20px_rgba(0,243,255,0.15)] border-cyan-neon/40" : "bg-transparent border-white/5"
        )}
      >
        <Link href="#hero" className="flex items-center gap-2 group">
          <span className="text-xl font-bold font-mono tracking-tighter text-white group-hover:text-cyan-neon transition-colors">
            MRAS<span className="text-cyan-neon animate-pulse">_</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="relative px-4 py-2 text-xs font-mono font-medium transition-colors hover:text-cyan-neon z-10 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-cyan-neon/10 border border-cyan-neon/40 rounded-sm -z-10 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={isActive ? "text-cyan-neon text-glow" : "text-zinc-400 group-hover:text-cyan-neon"}>
                  <span className="opacity-50 text-cyan-neon/50 group-hover:opacity-100 transition-opacity mr-1">/</span>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/resume.pdf"
            className="hidden sm:inline-flex items-center justify-center rounded-sm border border-cyan-neon/50 bg-cyan-neon/5 px-4 py-1.5 text-xs font-mono font-medium text-cyan-neon transition-all hover:bg-cyan-neon hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] focus:outline-none"
          >
            SYS.RESUME
          </a>
          
          <button className="md:hidden text-white hover:text-cyan-neon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </nav>
    </motion.div>
  );
}
