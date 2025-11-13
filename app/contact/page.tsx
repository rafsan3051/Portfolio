"use client";

import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Particles from "../../components/particles";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-600/20 to-black">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={90}
        staticity={60}
        ease={30}
      />

      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm duration-500 text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
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
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50"
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
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-500">
                <Linkedin size={24} className="text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">LinkedIn</h3>
                <p className="text-sm text-zinc-500">Connect with me</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Let's connect and grow our professional network
            </p>
          </a>

          <a
            href="mailto:rayhan@example.com"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-500">
                <Mail size={24} className="text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Email</h3>
                <p className="text-sm text-zinc-500">rayhan@example.com</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Send me an email for collaborations or inquiries
            </p>
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-500">
                <Twitter size={24} className="text-zinc-100" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">Twitter</h3>
                <p className="text-sm text-zinc-500">Follow me</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm">
              Stay updated with my latest work and thoughts
            </p>
          </a>
        </div>

        <div className="mt-16 glass rounded-lg p-8 backdrop-blur-sm animate-fade-in">
          <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
            Ready to collaborate?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            I'm always interested in hearing about new projects and
            opportunities. Whether you have a question or just want to say hi,
            feel free to reach out!
          </p>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 text-sm font-medium text-zinc-100 transition-all duration-500 hover:border-zinc-500 hover:bg-zinc-700/50"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
