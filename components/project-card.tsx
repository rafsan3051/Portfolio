import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

type ProjectCardProps = {
  name: string;
  description?: string;
  stars?: number;
  url: string;
  className?: string;
};

export function ProjectCard({ name, description, stars, url, className }: ProjectCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "glass group block rounded-xl border border-white/10 p-5 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-medium transition-colors group-hover:text-primary">{name}</h3>
        <ExternalLink size={16} className="opacity-70 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      {description ? (
        <p className="mt-2 text-sm opacity-75 line-clamp-2">{description}</p>
      ) : null}
      {typeof stars === "number" ? (
        <p className="mt-3 text-xs opacity-60">★ {stars} stars</p>
      ) : null}
    </motion.a>
  );
}
