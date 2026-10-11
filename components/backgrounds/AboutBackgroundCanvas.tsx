"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

interface Glyph {
  text: string;
  x: number;
  y: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  size: number;
  color: string;
}

export function AboutBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || 800;
    };
    resize();
    window.addEventListener("resize", resize);

    // Observer to pause when off-screen for maximum performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Constellation Nodes
    const particleCount = Math.min(Math.floor(width / 22), 55);
    const colors = ["#8B5CF6", "#22D3EE", "#A78BFA", "#38BDF8"];
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Floating Code Glyphs
    const glyphSymbols = ["</>", "{...}", "0x1A", "async", "fn()", "=>", "import", "const", "TS", "REST"];
    const glyphCount = 14;
    const glyphs: Glyph[] = Array.from({ length: glyphCount }, () => ({
      text: glyphSymbols[Math.floor(Math.random() * glyphSymbols.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.35 + 0.15),
      alpha: Math.random() * 0.2 + 0.05,
      maxAlpha: Math.random() * 0.22 + 0.08,
      size: Math.random() * 4 + 11,
      color: Math.random() > 0.5 ? "rgba(139, 92, 246," : "rgba(34, 211, 238,",
    }));

    let time = 0;

    const render = () => {
      if (isVisible) {
        time += 0.015;
        ctx.clearRect(0, 0, width, height);

        // Soft Radial Aura
        const bgGlow = ctx.createRadialGradient(
          width * 0.2,
          height * 0.4,
          20,
          width * 0.2,
          height * 0.4,
          width * 0.7
        );
        bgGlow.addColorStop(0, "rgba(139, 92, 246, 0.07)");
        bgGlow.addColorStop(0.6, "rgba(34, 211, 238, 0.03)");
        bgGlow.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = bgGlow;
        ctx.fillRect(0, 0, width, height);

        // Render & Update Glyphs
        ctx.save();
        glyphs.forEach((g) => {
          g.y += g.vy;
          if (g.y < -30) {
            g.y = height + 30;
            g.x = Math.random() * width;
          }
          const currentAlpha = g.alpha * (0.8 + 0.2 * Math.sin(time * 2 + g.x));
          ctx.font = `${g.size}px monospace`;
          ctx.fillStyle = `${g.color} ${currentAlpha})`;
          ctx.fillText(g.text, g.x, g.y);
        });
        ctx.restore();

        // Render Constellation Network Lines
        const maxDist = 125;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.16;
              ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Render & Update Particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Particle Core
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Particle Glow
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70"
    />
  );
}
