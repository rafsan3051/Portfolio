"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Facebook, MessageCircle } from "lucide-react";
import Particles from "../../components/particles";
import ContactForm from "../../components/contact-form";
import { useEffect, useMemo, useState } from "react";

export default function ContactPage() {
  const [meta, setMeta] = useState<{ size: number; updatedAt: string; downloads?: number } | null>(null);
  const DRIVE_URL = process.env.NEXT_PUBLIC_RESUME_DRIVE_URL;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/resume-meta", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setMeta(data);
        }
      } catch {}
    };
    load();
  }, []);

  const formatted = useMemo(() => {
    if (!meta) return null;
    const sizeKB = meta.size < 1024 * 1024;
    const size = sizeKB ? `${(meta.size / 1024).toFixed(1)} KB` : `${(meta.size / (1024 * 1024)).toFixed(2)} MB`;
    const date = new Date(meta.updatedAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const downloads = typeof meta.downloads === "number" ? meta.downloads : undefined;
    return { size, date, downloads };
  }, [meta]);
  return (
    <div className="relative min-h-screen bg-zinc-950">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={90}
        staticity={60}
        ease={30}
      />

      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-medium duration-500 text-zinc-100 hover:text-zinc-400">
            Home
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/projects" className="text-sm duration-500 text-zinc-400 hover:text-zinc-100">
              Projects
            </Link>
            <Link href="/about" className="text-sm duration-500 text-zinc-400 hover:text-zinc-100">
              About
            </Link>
            <Link href="/contact" className="text-sm duration-500 text-zinc-100 hover:text-zinc-400">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-6 pt-32 pb-16">
        <div className="hidden w-full h-px animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mb-12" />
        
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-white bg-clip-text text-edge-outline animate-title mb-4">
          Get in Touch
        </h1>
        <p className="text-zinc-400 text-lg mb-16 animate-fade-in">
          Let's build something amazing together
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <a
            href="https://github.com/rafsan3051"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-500">
                <Github size={24} className="text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">GitHub</h3>
                <p className="text-sm text-zinc-500">@rafsan3051</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Check out my open-source projects and contributions
            </p>
          </a>

          <a
            href="https://www.linkedin.com/in/rayhan-ahmed-82a400245"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-blue-900/50 transition-colors duration-500">
                <Linkedin size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">LinkedIn</h3>
                <p className="text-sm text-zinc-500">Rayhan Ahmed</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Let's connect and grow our professional network
            </p>
          </a>

          <a
            href="mailto:rafsan3051@gmail.com"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-500">
                <Mail size={24} className="text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Email</h3>
                <p className="text-sm text-zinc-500">rafsan3051@gmail.com</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Send me an email for collaborations or inquiries
            </p>
          </a>

          <a
            href="https://www.facebook.com/share/1RkYAfF3St/"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-blue-900/50 transition-colors duration-500">
                <Facebook size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Facebook</h3>
                <p className="text-sm text-zinc-500">Rayhan Ahmed</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Connect with me on Facebook
            </p>
          </a>

          <a
            href="https://m.me/rayhanahmed3051"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-purple-900/50 transition-colors duration-500">
                <MessageCircle size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Messenger</h3>
                <p className="text-sm text-zinc-500">@rayhanahmed3051</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Send me a message on Messenger
            </p>
          </a>
        </div>

        <div className="mt-16 space-y-8 animate-fade-in">
          <div className="glass rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
              Send me a message
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>

          <div className="glass rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
              Ready to collaborate?
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              feel free to reach out!
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/api/resume"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 text-sm font-medium text-zinc-100 transition-all duration-500 hover:border-zinc-500 hover:bg-zinc-700/50 hover:scale-105"
              >
                📄 Download Resume
              </a>
              {DRIVE_URL && (
                <a
                  href={DRIVE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 text-sm font-medium text-zinc-100 transition-all duration-500 hover:border-zinc-500 hover:bg-zinc-700/50 hover:scale-105"
                >
                  ☁️ Google Drive
                </a>
              )}
              {formatted && (
                <span className="text-xs text-zinc-500">
                  {formatted.size} • Updated {formatted.date}
                  {typeof formatted.downloads === "number" ? ` • ${formatted.downloads} downloads` : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
