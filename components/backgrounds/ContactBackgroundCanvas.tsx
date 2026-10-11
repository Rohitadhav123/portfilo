"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export function ContactBackgroundCanvas() {
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
      height = canvas.height = rect.height || 850;
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

    // Bioluminescent Motes
    const moteColors = ["#8B5CF6", "#22D3EE", "#EC4899", "#A78BFA"];
    const moteCount = Math.min(Math.floor(width / 26), 40);
    const motes: Mote[] = Array.from({ length: moteCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      color: moteColors[Math.floor(Math.random() * moteColors.length)],
    }));

    // Beacon Rings
    const beaconRings = [
      { radius: 0, maxRadius: 360, speed: 0.8 },
      { radius: 120, maxRadius: 360, speed: 0.8 },
      { radius: 240, maxRadius: 360, speed: 0.8 },
    ];

    let time = 0;

    const render = () => {
      if (isVisible) {
        time += 0.015;
        ctx.clearRect(0, 0, width, height);

        const centerX = width * 0.5;
        const centerY = height * 0.7;

        // Rich Atmospheric Nebula Gradient
        const nebula = ctx.createRadialGradient(
          centerX,
          centerY,
          40,
          centerX,
          centerY,
          Math.max(width, height) * 0.7
        );
        nebula.addColorStop(0, "rgba(139, 92, 246, 0.12)");
        nebula.addColorStop(0.35, "rgba(34, 211, 238, 0.06)");
        nebula.addColorStop(0.7, "rgba(236, 72, 153, 0.03)");
        nebula.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, width, height);

        // Concentric Broadcasting Beacon Pulses
        beaconRings.forEach((ring) => {
          ring.radius += ring.speed;
          if (ring.radius > ring.maxRadius) {
            ring.radius = 0;
          }
          const alpha = (1 - ring.radius / ring.maxRadius) * 0.18;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Outer secondary ring echo
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ring.radius * 1.15, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Beacon Core Pulse
        const corePulse = (Math.sin(time * 3) + 1) * 0.5;
        ctx.fillStyle = "#22D3EE";
        ctx.globalAlpha = 0.4 + corePulse * 0.3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4 + corePulse * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#8B5CF6";
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 24 + corePulse * 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Render & Update Bioluminescent Motes
        motes.forEach((m) => {
          m.x += m.vx;
          m.y += m.vy;

          // Gravitational drift toward center
          const dx = centerX - m.x;
          const dy = centerY - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 40) {
            m.x += (dx / dist) * 0.12;
            m.y += (dy / dist) * 0.12;
          }

          if (m.x < 0) m.x = width;
          if (m.x > width) m.x = 0;
          if (m.y < 0) m.y = height;
          if (m.y > height) m.y = 0;

          const currentAlpha = Math.max(0.1, m.alpha * (0.8 + 0.3 * Math.sin(time * 2 + m.x)));

          ctx.fillStyle = m.color;
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = m.color;
          ctx.globalAlpha = currentAlpha * 0.3;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.radius * 2.5, 0, Math.PI * 2);
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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-75"
    />
  );
}
