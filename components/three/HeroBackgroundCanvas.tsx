"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle Stars
    const particleCount = width < 768 ? 60 : 140;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      pulse: Math.random() * 0.02,
    }));

    // Floating Geometric Wireframes
    const geometries = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      speedY: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? "rgba(139, 92, 246, 0.15)" : "rgba(34, 211, 238, 0.15)",
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep Horizon Radial Gradient
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.6,
        50,
        width / 2,
        height * 0.6,
        Math.max(width, height)
      );
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.12)");
      gradient.addColorStop(0.5, "rgba(34, 211, 238, 0.05)");
      gradient.addColorStop(1, "rgba(7, 7, 10, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Perspective Grid Lines at Bottom Horizon
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const horizonY = height * 0.65;
      const perspectiveLines = 24;

      for (let i = 0; i <= perspectiveLines; i++) {
        const x = (width / perspectiveLines) * i;
        ctx.beginPath();
        ctx.moveTo(x, horizonY);
        ctx.lineTo(width / 2 + (x - width / 2) * 3, height);
        ctx.stroke();
      }

      // Horizontal grid lines moving down
      const gridOffset = (time * 20) % 30;
      for (let y = horizonY; y < height; y += 15 + (y - horizonY) * 0.08) {
        ctx.beginPath();
        ctx.moveTo(0, y + gridOffset * 0.2);
        ctx.lineTo(width, y + gridOffset * 0.2);
        ctx.stroke();
      }
      ctx.restore();

      // Render Floating Geometry Structures
      geometries.forEach((g) => {
        g.y += g.speedY;
        g.rotation += g.rotSpeed;
        if (g.y < -50) g.y = height + 50;
        if (g.y > height + 50) g.y = -50;

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rotation);
        ctx.strokeStyle = g.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rect(-g.size / 2, -g.size / 2, g.size, g.size);
        ctx.stroke();
        ctx.restore();
      });

      // Render Star Particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(time * 2 + p.x) * p.pulse;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(244, 244, 248, ${Math.max(0.1, Math.min(0.8, p.alpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80"
    />
  );
}
