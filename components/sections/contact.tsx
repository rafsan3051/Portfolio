"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Radio, Key, Fingerprint } from "lucide-react";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate secure network request
    setTimeout(() => {
      setFormStatus("sent");
    }, 3000);
  };

  return (
    <section id="contact" className="relative w-full py-32 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-neon/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-pink-neon/10 border border-pink-neon/30">
            <Radio className="w-6 h-6 text-pink-neon" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-mono text-white mb-4">
            <span className="text-pink-neon opacity-50">{"// "}</span>
            TRANSMISSION
          </h2>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-pink-neon to-transparent animate-pulse" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start relative">
          {/* Central glowing orb for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-neon/5 rounded-full blur-[150px] pointer-events-none z-0" />

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 relative z-10"
          >
            <div className="glass-panel p-8 rounded-xl border border-cyan-neon/20 hover:border-cyan-neon/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] transition-all duration-500 bg-black/60 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-neon/10 rounded-full blur-3xl group-hover:bg-cyan-neon/20 transition-all duration-500" />
              
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <Key className="w-5 h-5 text-cyan-neon" />
                <h3 className="text-xl font-bold text-white font-mono uppercase tracking-widest">Public_Keys</h3>
              </div>
              
              <div className="space-y-6">
                <a href="mailto:hello@rayhan.dev" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group/link">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover/link:border-pink-neon/50 group-hover/link:bg-pink-neon/10 group-hover/link:shadow-[0_0_15px_rgba(255,0,127,0.3)] transition-all">
                    <Mail className="w-5 h-5 text-pink-neon" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-pink-neon/70 uppercase tracking-widest">Secure_Email</span>
                    <span className="text-base font-mono">hello@rayhan.dev</span>
                  </div>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group/link">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover/link:border-cyan-neon/50 group-hover/link:bg-cyan-neon/10 group-hover/link:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all">
                    <Linkedin className="w-5 h-5 text-cyan-neon" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-cyan-neon/70 uppercase tracking-widest">Neural_Network</span>
                    <span className="text-base font-mono">/in/rayhan</span>
                  </div>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group/link">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover/link:border-purple-neon/50 group-hover/link:bg-purple-neon/10 group-hover/link:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all">
                    <Github className="w-5 h-5 text-purple-neon" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-purple-neon/70 uppercase tracking-widest">Code_Repository</span>
                    <span className="text-base font-mono">github.com/rayhan</span>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Terminal decorative element */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 hidden md:block bg-black/80 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden">
              {/* Scanline */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
              
              <div className="font-mono text-xs md:text-sm text-cyan-neon/80 leading-relaxed relative z-20">
                <TypeAnimation
                  sequence={[
                    "root@system:~# ping -c 4 rayhan.dev\n\n",
                    500,
                    "PING rayhan.dev (192.168.1.1): 56 data bytes\n64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.042 ms\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.045 ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.038 ms\n64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.041 ms\n\n--- rayhan.dev ping statistics ---\n4 packets transmitted, 4 packets received, 0.0% packet loss\nround-trip min/avg/max/stddev = 0.038/0.041/0.045/0.002 ms\n\nroot@system:~# _",
                  ]}
                  wrapper="div"
                  cursor={false}
                  speed={80}
                  className="whitespace-pre-wrap"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-xl border border-white/10 flex flex-col gap-6 bg-black/60 backdrop-blur-xl relative overflow-hidden">
              
              {/* Animated borders during sending */}
              {formStatus === "sending" && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-neon animate-[scan_1s_linear_infinite]" />
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-neon animate-[scan_1s_linear_infinite_reverse]" />
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white font-mono flex items-center gap-3">
                  <span className="w-3 h-3 bg-cyan-neon animate-pulse shadow-[0_0_10px_#00f3ff]"></span>
                  SECURE_CHANNEL
                </h3>
                <Fingerprint className="w-5 h-5 text-zinc-500" />
              </div>
              
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="name" className="text-[10px] font-mono text-cyan-neon uppercase tracking-widest">Entity_ID [Name]</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    required
                    disabled={formStatus !== "idle"}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-cyan-neon focus:bg-cyan-neon/5 transition-all font-mono placeholder:text-zinc-700 disabled:opacity-50"
                    placeholder="Enter designation..."
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan-neon transition-all duration-300 group-focus-within:w-full shadow-[0_0_10px_#00f3ff]" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="email" className="text-[10px] font-mono text-purple-neon uppercase tracking-widest">Routing_Address [Email]</label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    required
                    disabled={formStatus !== "idle"}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-purple-neon focus:bg-purple-neon/5 transition-all font-mono placeholder:text-zinc-700 disabled:opacity-50"
                    placeholder="Enter return address..."
                  />
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-purple-neon transition-all duration-300 group-focus-within:w-full shadow-[0_0_10px_#b026ff]" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="message" className="text-[10px] font-mono text-pink-neon uppercase tracking-widest">Encrypted_Payload [Message]</label>
                <div className="relative">
                  <textarea 
                    id="message" 
                    required
                    rows={4}
                    disabled={formStatus !== "idle"}
                    className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-pink-neon focus:bg-pink-neon/5 transition-all font-mono placeholder:text-zinc-700 resize-none disabled:opacity-50"
                    placeholder="Input transmission data..."
                  ></textarea>
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-pink-neon transition-all duration-300 group-focus-within:w-full shadow-[0_0_10px_#ff007f]" />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus !== "idle"}
                className={`relative overflow-hidden w-full py-4 rounded-sm font-mono font-bold uppercase tracking-widest transition-all mt-4 group ${
                  formStatus === "sent" 
                    ? "bg-green-500/10 text-green-400 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]" 
                    : formStatus === "sending"
                    ? "bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/50 animate-pulse"
                    : "bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/30 hover:bg-cyan-neon hover:text-black hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
                }`}
              >
                {/* Button Glitch Hover Effect */}
                {formStatus === "idle" && (
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse pointer-events-none" />
                )}

                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formStatus === "idle" && (
                    <>
                      <span className="text-white group-hover:text-black transition-colors">{"//"}</span> TRANSMIT_DATA
                    </>
                  )}
                  {formStatus === "sending" && "ENCRYPTING_PAYLOAD..."}
                  {formStatus === "sent" && "TRANSMISSION_SUCCESSFUL"}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
