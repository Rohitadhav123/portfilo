"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Ember {
  x: number;
  y: number;
  vy: number;
  vx: number;
  radius: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
}

interface Meteor {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export function AchievementsBackgroundCanvas() {
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
      height = canvas.height = rect.height || 750;
    };
    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Glowing victory embers (gold & magenta)
    const emberCount = Math.min(Math.floor(width / 24), 45);
    const colors = ["#EC4899", "#F59E0B", "#F472B6", "#FBBF24", "#FFFFFF"];
    const embers: Ember[] = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.45 + 0.2),
      vx: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    // Occasional subtle meteor streaks
    const meteors: Meteor[] = Array.from({ length: 3 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.5),
      len: Math.random() * 80 + 50,
      speed: Math.random() * 3 + 2,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      alpha: 0,
      active: false,
    }));

    let time = 0;
    let meteorCooldown = 100;

    const render = () => {
      if (isVisible) {
        time += 0.015;
        ctx.clearRect(0, 0, width, height);

        // Aurora Wave Gradient Mesh
        const aurora = ctx.createLinearGradient(0, 0, width, height);
        aurora.addColorStop(0, "rgba(236, 72, 153, 0.06)");
        aurora.addColorStop(0.5, "rgba(245, 158, 11, 0.04)");
        aurora.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = aurora;
        ctx.fillRect(0, 0, width, height);

        // Shimmering Aurora Ribbon
        ctx.save();
        ctx.beginPath();
        const ribbonY = height * 0.4 + Math.sin(time) * 40;
        ctx.moveTo(0, ribbonY);
        for (let x = 0; x <= width; x += 30) {
          const y = ribbonY + Math.sin(time * 1.2 + x * 0.005) * 45 + Math.cos(time * 0.8 + x * 0.008) * 25;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const ribbonGrad = ctx.createLinearGradient(0, ribbonY - 50, 0, height);
        ribbonGrad.addColorStop(0, "rgba(236, 72, 153, 0.04)");
        ribbonGrad.addColorStop(0.4, "rgba(245, 158, 11, 0.02)");
        ribbonGrad.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = ribbonGrad;
        ctx.fill();
        ctx.restore();

        // Spawn & Update Meteors
        meteorCooldown--;
        if (meteorCooldown <= 0) {
          meteorCooldown = Math.floor(Math.random() * 180 + 120);
          const inactive = meteors.find((m) => !m.active);
          if (inactive) {
            inactive.active = true;
            inactive.x = Math.random() * width * 0.8;
            inactive.y = Math.random() * (height * 0.3);
            inactive.alpha = 0.7;
          }
        }

        meteors.forEach((m) => {
          if (!m.active) return;
          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.alpha -= 0.012;

          if (m.alpha <= 0) {
            m.active = false;
          } else {
            const tailX = m.x - Math.cos(m.angle) * m.len;
            const tailY = m.y - Math.sin(m.angle) * m.len;

            const mGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
            mGrad.addColorStop(0, "rgba(236, 72, 153, 0)");
            mGrad.addColorStop(1, `rgba(251, 191, 36, ${m.alpha})`);

            ctx.strokeStyle = mGrad;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        });

        // Update & Render Rising Embers
        embers.forEach((e) => {
          e.y += e.vy;
          e.x += e.vx + Math.sin(time + e.y * 0.01) * 0.2;
          if (e.y < -10) {
            e.y = height + 10;
            e.x = Math.random() * width;
          }

          const currentAlpha = Math.max(0.1, e.alpha * (0.8 + 0.3 * Math.sin(time * 3 + e.x)));

          ctx.fillStyle = e.color;
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = e.color;
          ctx.globalAlpha = currentAlpha * 0.35;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius * 2.8, 0, Math.PI * 2);
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
