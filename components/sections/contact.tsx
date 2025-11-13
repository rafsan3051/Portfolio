import { SectionWrapper } from "../section-wrapper";
import { Github, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <SectionWrapper id="contact" className="mx-auto mt-24 w-full max-w-5xl px-4">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <p className="mt-2 max-w-2xl text-sm opacity-80">
        Want to collaborate or chat? Reach out via the links below.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          className="glass inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
          href="https://github.com/rafsan3051"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          className="glass inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
          href="https://linkedin.com/in/"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
        <a className="glass inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm" href="mailto:rayhan@example.com">
          <Mail size={16} /> Email
        </a>
      </div>
    </SectionWrapper>
  );
}
