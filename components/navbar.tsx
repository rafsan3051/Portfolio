"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cn(
      "fixed inset-x-0 top-4 z-50 flex w-full justify-center px-4",
      scrolled && "top-2"
    )}>
      <nav
        className={cn(
          "glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2 shadow-sm transition-all",
          scrolled ? "backdrop-blur-md" : "backdrop-blur-sm"
        )}
      >
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium opacity-90 hover:opacity-100">
            MRAS
          </Link>
          <div className="hidden gap-3 sm:flex">
            <Link href="#about" className="text-sm opacity-80 hover:opacity-100">About</Link>
            <Link href="#skills" className="text-sm opacity-80 hover:opacity-100">Skills</Link>
            <Link href="#projects" className="text-sm opacity-80 hover:opacity-100">Projects</Link>
            <Link href="#experience" className="text-sm opacity-80 hover:opacity-100">Experience</Link>
            <Link href="#contact" className="text-sm opacity-80 hover:opacity-100">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            className="hidden sm:inline-flex rounded-md border border-white/10 px-3 py-2 text-sm opacity-90 transition hover:opacity-100"
          >
            Resume
          </a>
        </div>
      </nav>
    </div>
  );
}
