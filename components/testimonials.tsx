"use client";

import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Smith",
    role: "Product Manager",
    company: "Tech Corp",
    content:
      "Rayhan delivered an exceptional portfolio website that exceeded all expectations. His attention to detail and technical expertise is outstanding.",
  },
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "StartupXYZ",
    content:
      "Working with Rayhan was a pleasure. He transformed our vision into a stunning, functional application. Highly recommended!",
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    company: "Digital Solutions",
    content:
      "Rayhan's code quality and problem-solving skills are top-notch. He's a reliable developer who consistently delivers great results.",
  },
];

export default function Testimonials() {
  return (
    <section className="glass rounded-lg p-8 backdrop-blur-sm">
      <h2 className="mb-8 text-2xl font-semibold text-zinc-100">
        What People Say
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800/30 p-6 transition-all duration-500 hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <Quote
              className="mb-4 text-zinc-600 transition-colors duration-500 group-hover:text-zinc-500"
              size={32}
            />
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              "{testimonial.content}"
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-semibold text-white">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-200">
                  {testimonial.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
