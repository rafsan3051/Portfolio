"use client";

import { Badge, Row } from "@once-ui-system/core";
import { useState } from "react";

interface TechFilterProps {
  technologies: string[];
  onFilterChange: (selected: string[]) => void;
}

export function TechFilter({ technologies, onFilterChange }: TechFilterProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleTech = (tech: string) => {
    const newSelected = selected.includes(tech)
      ? selected.filter((t) => t !== tech)
      : [...selected, tech];
    
    setSelected(newSelected);
    onFilterChange(newSelected);
  };

  return (
    <Row gap="8" wrap fillWidth horizontal="center" paddingY="m">
      {technologies.map((tech) => (
        <Badge
          key={tech}
          background={selected.includes(tech) ? "accent-strong" : "neutral-weak"}
          paddingX="12"
          paddingY="4"
          textVariant="label-default-s"
          style={{ 
            cursor: "pointer", 
            transition: "all 0.2s ease",
            color: selected.includes(tech) ? "white" : "inherit"
          }}
          onClick={() => toggleTech(tech)}
        >
          {tech}
        </Badge>
      ))}
    </Row>
  );
}
