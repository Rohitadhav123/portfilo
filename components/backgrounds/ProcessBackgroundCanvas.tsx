"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PipelinePacket {
  x: number;
  yRatio: number;
  speed: number;
  color: string;
  size: number;
}

export function ProcessBackgroundCanvas() {
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

    // Packets moving left to right through pipeline conduits
    const packetColors = ["#22D3EE", "#8B5CF6", "#10B981", "#38BDF8"];
    const packetCount = 20;
    const packets: PipelinePacket[] = Array.from({ length: packetCount }, () => ({
      x: Math.random() * width,
      yRatio: 0.3 + Math.random() * 0.4,
      speed: Math.random() * 1.5 + 0.8,
      color: packetColors[Math.floor(Math.random() * packetColors.length)],
      size: Math.random() * 2 + 1.5,
    }));

    let time = 0;

    const render = () => {
      if (isVisible) {
        time += 0.02;
        ctx.clearRect(0, 0, width, height);

        // Ambient Pipeline Glow
        const bg = ctx.createLinearGradient(0, height * 0.3, width, height * 0.7);
        bg.addColorStop(0, "rgba(34, 211, 238, 0.05)");
        bg.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
        bg.addColorStop(1, "rgba(16, 185, 129, 0.05)");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        // Sinusoidal Energy Pipeline Waves
        const conduits = [
          { yOffset: height * 0.42, amp: 20, freq: 0.004, speed: 1.2, color: "rgba(34, 211, 238, 0.08)" },
          { yOffset: height * 0.52, amp: 28, freq: 0.003, speed: -0.9, color: "rgba(139, 92, 246, 0.07)" },
          { yOffset: height * 0.62, amp: 16, freq: 0.005, speed: 1.5, color: "rgba(16, 185, 129, 0.07)" },
        ];

        conduits.forEach((cond) => {
          ctx.strokeStyle = cond.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 15) {
            const y = cond.yOffset + Math.sin(x * cond.freq + time * cond.speed) * cond.amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        // Step Station Anchors (5 steps from 01 to 05)
        for (let i = 1; i <= 5; i++) {
          const stationX = (width / 6) * i;
          const stationY = height * 0.52 + Math.sin(stationX * 0.003 - time * 0.9) * 28;

          // Station Pulsing Halo
          const pulse = (Math.sin(time * 3 + i) + 1) * 0.5;
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 + pulse * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(stationX, stationY, 12 + pulse * 8, 0, Math.PI * 2);
          ctx.stroke();

          // Station Core
          ctx.fillStyle = "#22D3EE";
          ctx.beginPath();
          ctx.arc(stationX, stationY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Conveyor Packets Moving Left to Right
        packets.forEach((p) => {
          p.x += p.speed;
          if (p.x > width + 20) {
            p.x = -20;
            p.yRatio = 0.35 + Math.random() * 0.3;
          }

          const py = height * p.yRatio + Math.sin(p.x * 0.004 + time * 1.2) * 20;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.75;
          ctx.beginPath();
          ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.arc(p.x, py, p.size * 2.8, 0, Math.PI * 2);
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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-65"
    />
  );
}
