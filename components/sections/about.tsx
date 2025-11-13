import { SectionWrapper } from "../section-wrapper";

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="mx-auto mt-24 w-full max-w-5xl px-4">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="mt-3 max-w-3xl text-pretty opacity-80">
        I’m Md. Rayhan Ahmed Shis — a developer and technologist passionate about building
        modern web experiences, automation, and exploring emerging technologies. I enjoy
        designing interactive, fast, and accessible products with attention to detail.
      </p>
    </SectionWrapper>
  );
}
