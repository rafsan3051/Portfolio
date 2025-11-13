import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { PropsWithChildren } from "react";

export function SectionWrapper({
  children,
  id,
  className,
  as: As = "section",
}: PropsWithChildren<{ id?: string; className?: string; as?: any }>) {
  return (
    <As id={id} className={cn("relative", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.05 }}
      >
        {children}
      </motion.div>
    </As>
  );
}
