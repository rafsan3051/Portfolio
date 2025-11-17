"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.003;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(0, 0, 0, 1)`);
      gradient.addColorStop(0.5, `rgba(${52 + Math.sin(time) * 20}, ${52 + Math.cos(time) * 20}, ${60 + Math.sin(time + 1) * 20}, 0.2)`);
      gradient.addColorStop(1, `rgba(0, 0, 0, 1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add animated noise
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time + i) * canvas.width) / 2 + canvas.width / 2;
        const y = (Math.cos(time * 0.7 + i) * canvas.height) / 2 + canvas.height / 2;
        const size = Math.sin(time + i) * 3 + 3;

        const radialGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 20);
        radialGradient.addColorStop(0, `rgba(82, 82, 91, ${0.05 + Math.sin(time + i) * 0.05})`);
        radialGradient.addColorStop(1, "rgba(82, 82, 91, 0)");

        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 20, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
