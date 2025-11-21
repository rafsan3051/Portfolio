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
    <main className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-zinc-950">
      <AnimatedBackground />
      <nav className="my-16 animate-fade-in z-20">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <Particles className="absolute inset-0 z-10 animate-fade-in" quantity={100} />
      
      <div className="hidden w-screen h-px md:block animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        Md. Rayhan Ahmed Shis
      </h1>

      <div className="hidden w-screen h-px md:block animate-glow bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500">
          Full-stack developer crafting innovative web applications with blockchain and modern technologies.
        </h2>
      </div>
    </main>
  );
}
