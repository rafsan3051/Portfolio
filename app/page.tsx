"use client";

import Link from "next/link";
import Particles from "../components/particles";
import AnimatedBackground from "../components/animated-background";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <AnimatedBackground />
      {/* Theme toggle removed per request */}
      <nav className="my-16 animate-fade-in z-20">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </ul>
      </nav>
      <Particles className="absolute inset-0 z-10 animate-fade-in" quantity={100} />
      
      <div className="hidden w-screen h-px md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        Md. Rayhan Ahmed Shis
      </h1>

      <div className="hidden w-screen h-px md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500">
          Developer / Technologist / Creative Coder — building modern web experiences and exploring emerging tech.
        </h2>
      </div>
    </main>
  );
}
