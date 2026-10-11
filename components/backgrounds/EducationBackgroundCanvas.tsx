"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Crosshair {
  x: number;
  y: number;
  vy: number;
  alpha: number;
}

export function EducationBackgroundCanvas() {
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

    // Mathematical coordinate crosshairs
    const crosshairCount = 18;
    const crosshairs: Crosshair[] = Array.from({ length: crosshairCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.2 + 0.1),
      alpha: Math.random() * 0.25 + 0.1,
    }));

    // 3D Octahedron vertices
    const octVertices: Point3D[] = [
      { x: 0, y: -70, z: 0 },
      { x: 70, y: 0, z: 0 },
      { x: 0, y: 0, z: 70 },
      { x: -70, y: 0, z: 0 },
      { x: 0, y: 0, z: -70 },
      { x: 0, y: 70, z: 0 },
    ];

    const octEdges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1],
    ];

    let time = 0;

    const render = () => {
      if (isVisible) {
        time += 0.012;
        ctx.clearRect(0, 0, width, height);

        // Violet Ambient Core
        const radial = ctx.createRadialGradient(
          width * 0.7,
          height * 0.4,
          20,
          width * 0.7,
          height * 0.4,
          width * 0.65
        );
        radial.addColorStop(0, "rgba(139, 92, 246, 0.08)");
        radial.addColorStop(0.5, "rgba(34, 211, 238, 0.03)");
        radial.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);

        // Floating Crosshairs
        ctx.lineWidth = 1;
        crosshairs.forEach((ch) => {
          ch.y += ch.vy;
          if (ch.y < -20) {
            ch.y = height + 20;
            ch.x = Math.random() * width;
          }
          ctx.strokeStyle = `rgba(139, 92, 246, ${ch.alpha})`;
          ctx.beginPath();
          ctx.moveTo(ch.x - 4, ch.y);
          ctx.lineTo(ch.x + 4, ch.y);
          ctx.moveTo(ch.x, ch.y - 4);
          ctx.lineTo(ch.x, ch.y + 4);
          ctx.stroke();
        });

        // Rotating Wireframe Octahedron on Right Side
        const octCenterX = width > 768 ? width * 0.75 : width * 0.5;
        const octCenterY = height * 0.45;

        // 3D Rotation matrices (Yaw & Pitch)
        const rotX = time * 0.6;
        const rotY = time * 0.8;
        const rotZ = time * 0.3;

        const projected = octVertices.map((v) => {
          // Rotate X
          let y1 = v.y * Math.cos(rotX) - v.z * Math.sin(rotX);
          let z1 = v.y * Math.sin(rotX) + v.z * Math.cos(rotX);
          // Rotate Y
          let x2 = v.x * Math.cos(rotY) + z1 * Math.sin(rotY);
          let z2 = -v.x * Math.sin(rotY) + z1 * Math.cos(rotY);
          // Rotate Z
          let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
          let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

          const fov = 260;
          const scale = fov / (fov + z2);
          return {
            x: octCenterX + x3 * scale,
            y: octCenterY + y3 * scale,
            scale,
          };
        });

        // Draw Octahedron Edges
        ctx.strokeStyle = "rgba(139, 92, 246, 0.22)";
        ctx.lineWidth = 1.2;
        octEdges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.stroke();
        });

        // Draw Vertices
        projected.forEach((p) => {
          ctx.fillStyle = "#22D3EE";
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Concentric Gyroscope Orbital Ellipses around Octahedron
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(34, 211, 238, 0.08)";
        ctx.save();
        ctx.translate(octCenterX, octCenterY);

        ctx.rotate(time * 0.2);
        ctx.beginPath();
        ctx.ellipse(0, 0, 110, 45, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.rotate(Math.PI / 3 + time * 0.15);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.07)";
        ctx.beginPath();
        ctx.ellipse(0, 0, 130, 55, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
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
