import { SectionWrapper } from "../section-wrapper";

const items = [
  {
    role: "Developer / Creative Coder",
    org: "Independent / Open Source",
    period: "2022 — Present",
    blurb:
      "Building modern web experiences, automation tools, and experimenting with emerging tech.",
  },
];

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="mx-auto mt-24 w-full max-w-5xl px-4">
      <h2 className="text-2xl font-semibold">Experience</h2>
      <div className="mt-4 space-y-4">
        {items.map((it) => (
          <div key={it.role} className="glass rounded-xl p-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-base font-medium">{it.role}</p>
                <p className="text-sm opacity-80">{it.org}</p>
              </div>
              <p className="text-sm opacity-70">{it.period}</p>
            </div>
            <p className="mt-2 text-sm opacity-80">{it.blurb}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
