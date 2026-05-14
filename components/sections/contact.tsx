"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate network request
    setTimeout(() => {
      setFormStatus("sent");
    }, 2000);
  };

  return (
    <section id="contact" className="relative w-full py-24 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4 flex items-center justify-center gap-4">
            <span className="text-pink-neon">05.</span>
            {"<Initiate_Contact />"}
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Ready to build the future? Establish a secure connection and let's collaborate on your next digital venture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-panel p-8 rounded-xl border border-white/10 hover:border-pink-neon/30 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-6 font-mono">Connection_Details</h3>
              
              <div className="space-y-6">
                <a href="mailto:hello@example.com" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <div className="p-3 bg-white/5 rounded-lg group-hover:bg-pink-neon/20 transition-colors">
                    <Mail className="w-6 h-6 text-pink-neon" />
                  </div>
                  <div>
                    <span className="block text-sm font-mono text-zinc-500">Email_Protocol</span>
                    <span className="text-lg">hello@rayhan.dev</span>
                  </div>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-neon/20 transition-colors">
                    <Linkedin className="w-6 h-6 text-cyan-neon" />
                  </div>
                  <div>
                    <span className="block text-sm font-mono text-zinc-500">Professional_Network</span>
                    <span className="text-lg">linkedin.com/in/rayhan</span>
                  </div>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                  <div className="p-3 bg-white/5 rounded-lg group-hover:bg-purple-neon/20 transition-colors">
                    <Github className="w-6 h-6 text-purple-neon" />
                  </div>
                  <div>
                    <span className="block text-sm font-mono text-zinc-500">Code_Repository</span>
                    <span className="text-lg">github.com/rayhan</span>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Terminal decorative element */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 hidden md:block">
              <div className="font-mono text-sm text-zinc-400">
                <span className="text-pink-neon">root@system:</span><span className="text-cyan-neon">~</span>$ ping -c 4 rayhan.dev
                <br />
                PING rayhan.dev (192.168.1.1): 56 data bytes
                <br />
                64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.042 ms
                <br />
                64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.045 ms
                <br />
                <span className="text-green-500">--- rayhan.dev ping statistics ---</span>
                <br />
                2 packets transmitted, 2 packets received, 0.0% packet loss
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-xl border border-white/10 flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-white mb-2 font-mono flex items-center gap-2">
                <span className="w-2 h-6 bg-cyan-neon inline-block animate-pulse"></span>
                Secure_Message_Relay
              </h3>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-mono text-zinc-400">Identity [Name]</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:ring-1 focus:ring-cyan-neon transition-all font-mono placeholder:text-zinc-700"
                  placeholder="Enter your designation"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-mono text-zinc-400">Return_Address [Email]</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-pink-neon focus:ring-1 focus:ring-pink-neon transition-all font-mono placeholder:text-zinc-700"
                  placeholder="Enter return routing address"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-mono text-zinc-400">Encrypted_Payload [Message]</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  className="bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-purple-neon focus:ring-1 focus:ring-purple-neon transition-all font-mono placeholder:text-zinc-700 resize-none"
                  placeholder="Transmit your requirements..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus !== "idle"}
                className={`relative overflow-hidden w-full py-4 rounded-md font-mono font-bold uppercase tracking-widest transition-all ${
                  formStatus === "sent" 
                    ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                    : "bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/50 hover:bg-cyan-neon hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                }`}
              >
                {formStatus === "idle" && "Transmit Payload"}
                {formStatus === "sending" && <span className="animate-pulse">Encrypting & Sending...</span>}
                {formStatus === "sent" && "Transmission Successful"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
