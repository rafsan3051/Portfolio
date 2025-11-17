"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate sending (replace with actual API call)
    setTimeout(() => {
      setStatus("sent");
      // Open email client
      window.location.href = `mailto:rafsan3051@gmail.com?subject=Message from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
      
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-300">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 backdrop-blur-sm transition-all duration-300 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 backdrop-blur-sm transition-all duration-300 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-300">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 backdrop-blur-sm transition-all duration-300 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 resize-none"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800/50 px-6 py-3 font-medium text-zinc-100 transition-all duration-500 hover:border-zinc-500 hover:bg-zinc-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === "sending" ? (
            <>
              <span className="animate-spin">⏳</span>
              Sending...
            </>
          ) : status === "sent" ? (
            <>
              <span>✓</span>
              Sent!
            </>
          ) : (
            <>
              <Send size={16} />
              Send Message
            </>
          )}
        </span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>
    </form>
  );
}
