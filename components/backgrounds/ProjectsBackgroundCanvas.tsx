"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GridPoint {
  baseX: number;
  baseY: number;
  phase: number;
  elev: number;
}

export function ProjectsBackgroundCanvas() {
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
      height = canvas.height = rect.height || 1200;
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

    // Isometric Wave Grid
    const cols = 22;
    const rows = 16;
    const points: GridPoint[][] = [];

    for (let r = 0; r <= rows; r++) {
      points[r] = [];
      for (let c = 0; c <= cols; c++) {
        points[r][c] = {
          baseX: 0,
          baseY: 0,
          phase: (c * 0.4) + (r * 0.35),
          elev: 0,
        };
      }
    }

    let time = 0;
    let scanAngle = 0;

    const render = () => {
      if (isVisible) {
        time += 0.018;
        scanAngle = (scanAngle + 0.012) % (Math.PI * 2);
        ctx.clearRect(0, 0, width, height);

        // Ambient Multi-hue Backdrop
        const radialGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          100,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.7
        );
        radialGrad.addColorStop(0, "rgba(34, 211, 238, 0.06)");
        radialGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.04)");
        radialGrad.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, width, height);

        // Calculate Isometric Grid coordinates with subtle wave undulation
        const cellW = (width * 1.2) / cols;
        const cellH = (height * 0.9) / rows;
        const startX = -width * 0.1;
        const startY = height * 0.1;

        for (let r = 0; r <= rows; r++) {
          for (let c = 0; c <= cols; c++) {
            const p = points[r][c];
            p.elev = Math.sin(time + p.phase) * 14 + Math.cos(time * 0.7 + p.phase * 0.8) * 8;
            p.baseX = startX + c * cellW;
            p.baseY = startY + r * cellH + p.elev;
          }
        }

        // Draw Grid Lines (Horizontal & Vertical)
        ctx.lineWidth = 1;
        for (let r = 0; r <= rows; r++) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
          ctx.beginPath();
          for (let c = 0; c <= cols; c++) {
            const p = points[r][c];
            if (c === 0) ctx.moveTo(p.baseX, p.baseY);
            else ctx.lineTo(p.baseX, p.baseY);
          }
          ctx.stroke();
        }

        for (let c = 0; c <= cols; c++) {
          ctx.strokeStyle = "rgba(34, 211, 238, 0.02)";
          ctx.beginPath();
          for (let r = 0; r <= rows; r++) {
            const p = points[r][c];
            if (r === 0) ctx.moveTo(p.baseX, p.baseY);
            else ctx.lineTo(p.baseX, p.baseY);
          }
          ctx.stroke();
        }

        // Sonar Radar Sweep Beam from Center
        const centerX = width * 0.5;
        const centerY = height * 0.45;
        const scanLength = Math.max(width, height) * 0.65;
        const beamX = centerX + Math.cos(scanAngle) * scanLength;
        const beamY = centerY + Math.sin(scanAngle) * scanLength;

        // Faint Radar Arc
        ctx.strokeStyle = "rgba(34, 211, 238, 0.05)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, scanLength * 0.6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(139, 92, 246, 0.03)";
        ctx.beginPath();
        ctx.arc(centerX, centerY, scanLength * 0.35, 0, Math.PI * 2);
        ctx.stroke();

        // Sweeping Hologram Line
        ctx.strokeStyle = "rgba(34, 211, 238, 0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(beamX, beamY);
        ctx.stroke();

        // Pulsing Grid Intersection Nodes
        for (let r = 0; r <= rows; r += 2) {
          for (let c = 0; c <= cols; c += 2) {
            const p = points[r][c];
            const nodeAngle = Math.atan2(p.baseY - centerY, p.baseX - centerX);
            const angleDiff = Math.abs(((scanAngle - nodeAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
            const isNearSweep = angleDiff < 0.25;

            const alpha = isNearSweep ? 0.6 : 0.12;
            const size = isNearSweep ? 2.5 : 1.2;

            ctx.fillStyle = isNearSweep ? "#22D3EE" : "rgba(139, 92, 246, 0.4)";
            ctx.beginPath();
            ctx.arc(p.baseX, p.baseY, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
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
