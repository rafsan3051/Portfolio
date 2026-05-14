"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Simple scrollspy
      const sections = navItems.map(item => item.name.toLowerCase());
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveTab(section);
        }
      }
      if (window.scrollY < 200) setActiveTab("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 transition-all duration-500",
        scrolled ? "pt-4" : "pt-6"
      )}
    >
      <nav
        className={cn(
          "glass-panel flex w-full max-w-4xl items-center justify-between px-6 py-3 transition-all duration-500",
          scrolled ? "bg-black/60 shadow-[0_0_20px_rgba(0,243,255,0.1)] border-cyan-neon/30" : "bg-transparent border-white/5"
        )}
      >
        <Link href="#" className="flex items-center gap-2 group">
          <span className="text-xl font-bold font-mono tracking-tighter text-white group-hover:text-cyan-neon transition-colors">
            MRAS<span className="text-cyan-neon animate-pulse">_</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setActiveTab(item.name.toLowerCase())}
              className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-cyan-neon z-10"
            >
              {activeTab === item.name.toLowerCase() && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-cyan-neon/10 border border-cyan-neon/30 rounded-md -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={activeTab === item.name.toLowerCase() ? "text-cyan-neon text-glow" : "text-white/70"}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/resume.pdf"
            className="hidden sm:inline-flex items-center justify-center rounded-md border border-cyan-neon/50 px-4 py-2 text-sm font-medium text-cyan-neon transition-all hover:bg-cyan-neon hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-neon focus:ring-offset-2 focus:ring-offset-black"
          >
            SYS.RESUME
          </a>
          
          {/* Mobile menu button could go here */}
          <button className="md:hidden text-white hover:text-cyan-neon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </nav>
    </motion.div>
  );
}
