"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CircuitTrace {
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  color: string;
}

interface PulsePacket {
  traceIndex: number;
  progress: number;
  speed: number;
  size: number;
  color: string;
}

interface MilestoneRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export function ExperienceBackgroundCanvas() {
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
      height = canvas.height = rect.height || 900;
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

    // Generate circuit pathways
    const traceCount = Math.max(8, Math.floor(width / 160));
    const traces: CircuitTrace[] = [];
    for (let i = 0; i < traceCount; i++) {
      const startX = (width / (traceCount + 1)) * (i + 1) + (Math.random() - 0.5) * 40;
      const bendY = (height / 3) * (1 + (i % 2) * 0.4);
      const offsetX = (i % 2 === 0 ? 1 : -1) * (40 + Math.random() * 50);
      traces.push({
        startX,
        startY: 0,
        midX: startX + offsetX,
        midY: bendY,
        endX: startX + offsetX,
        endY: height,
        color: i % 2 === 0 ? "rgba(34, 211, 238, 0.08)" : "rgba(139, 92, 246, 0.08)",
      });
    }

    // Glowing data packets traversing the traces
    const packetCount = traceCount * 2;
    const packets: PulsePacket[] = Array.from({ length: packetCount }, (_, i) => ({
      traceIndex: i % traces.length,
      progress: Math.random(),
      speed: Math.random() * 0.003 + 0.002,
      size: Math.random() * 2.5 + 2,
      color: i % 2 === 0 ? "#22D3EE" : "#8B5CF6",
    }));

    // Ambient pulsing milestone beacon rings
    const rings: MilestoneRing[] = [
      { x: width * 0.15, y: height * 0.25, radius: 0, maxRadius: 80, alpha: 0.5, speed: 0.4 },
      { x: width * 0.85, y: height * 0.55, radius: 20, maxRadius: 90, alpha: 0.4, speed: 0.35 },
      { x: width * 0.3, y: height * 0.8, radius: 10, maxRadius: 75, alpha: 0.45, speed: 0.3 },
    ];

    let time = 0;

    const render = () => {
      if (isVisible) {
        time += 0.01;
        ctx.clearRect(0, 0, width, height);

        // Ambient Depth Gradient
        const gradient = ctx.createRadialGradient(
          width * 0.8,
          height * 0.3,
          50,
          width * 0.8,
          height * 0.3,
          width * 0.6
        );
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.08)");
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
        gradient.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw Circuit Traces
        traces.forEach((trace) => {
          ctx.strokeStyle = trace.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(trace.startX, trace.startY);
          ctx.lineTo(trace.startX, trace.midY * 0.8);
          ctx.lineTo(trace.midX, trace.midY);
          ctx.lineTo(trace.endX, trace.endY);
          ctx.stroke();

          // Small junction anchor dots
          ctx.fillStyle = trace.color;
          ctx.beginPath();
          ctx.arc(trace.midX, trace.midY, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        // Update and Render Traveling Data Packets
        packets.forEach((pkt) => {
          pkt.progress += pkt.speed;
          if (pkt.progress > 1) {
            pkt.progress = 0;
            pkt.traceIndex = Math.floor(Math.random() * traces.length);
          }

          const tr = traces[pkt.traceIndex];
          if (!tr) return;

          // Compute position along 3-point segmented path
          let px = tr.startX;
          let py = pkt.progress * height;

          if (py < tr.midY * 0.8) {
            px = tr.startX;
          } else if (py < tr.midY) {
            const segRatio = (py - tr.midY * 0.8) / (tr.midY * 0.2);
            px = tr.startX + (tr.midX - tr.startX) * segRatio;
          } else {
            px = tr.midX;
          }

          // Packet Glow
          ctx.fillStyle = pkt.color;
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
          ctx.fill();

          // Packet Trail
          ctx.fillStyle = pkt.color;
          ctx.globalAlpha = 0.25;
          ctx.beginPath();
          ctx.arc(px, py, pkt.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;

        // Render Beacon Milestone Rings
        rings.forEach((ring) => {
          ring.radius += ring.speed;
          if (ring.radius > ring.maxRadius) {
            ring.radius = 0;
          }
          const ringAlpha = (1 - ring.radius / ring.maxRadius) * 0.2;
          ctx.strokeStyle = `rgba(34, 211, 238, ${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx.stroke();
        });
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
