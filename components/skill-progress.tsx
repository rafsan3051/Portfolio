"use client";

import { useEffect, useState } from "react";

interface SkillProgressProps {
  skill: string;
  level: number;
  color: string;
  delay?: number;
}

export default function SkillProgress({
  skill,
  level,
  color,
  delay = 0,
}: SkillProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(level);
    }, delay);

    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">{skill}</span>
        <span className="text-sm text-zinc-500">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
