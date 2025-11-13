import { SectionWrapper } from "../section-wrapper";

const skills = [
  "TypeScript",
  "React / Next.js",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",
  "Web APIs / Automation",
  "Git / CI",
];

export function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="mx-auto mt-24 w-full max-w-5xl px-4">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="glass rounded-md px-3 py-1 text-sm opacity-90">
            {s}
          </span>
        ))}
      </div>
    </SectionWrapper>
  );
}
