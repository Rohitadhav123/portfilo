"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SynapseNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  cluster: number;
}

interface SynapsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export function TechStackBackgroundCanvas() {
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
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || 850;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouseMove);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Color palette for ecosystem categories
    const clusterColors = ["#22D3EE", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];
    const nodeCount = Math.min(Math.floor(width / 32), 48);

    const nodes: SynapseNode[] = Array.from({ length: nodeCount }, (_, i) => {
      const cluster = i % clusterColors.length;
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.2,
        color: clusterColors[cluster],
        cluster,
      };
    });

    // Synapse packets
    const packetCount = 18;
    const packets: SynapsePacket[] = Array.from({ length: packetCount }, () => ({
      fromNode: Math.floor(Math.random() * nodeCount),
      toNode: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: Math.random() * 0.008 + 0.004,
      color: clusterColors[Math.floor(Math.random() * clusterColors.length)],
    }));

    let time = 0;

    const render = () => {
      if (isVisible) {
        time += 0.015;
        ctx.clearRect(0, 0, width, height);

        // Ambient glow
        const glow = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          50,
          width * 0.5,
          height * 0.5,
          width * 0.6
        );
        glow.addColorStop(0, "rgba(34, 211, 238, 0.06)");
        glow.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
        glow.addColorStop(1, "rgba(7, 7, 10, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        // Update nodes with subtle wandering and gentle mouse repulsion/attraction
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;

          // Mouse gentle pull
          const dmx = mouseX - n.x;
          const dmy = mouseY - n.y;
          const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
          if (distMouse < 180 && distMouse > 10) {
            n.x += (dmx / distMouse) * 0.4;
            n.y += (dmy / distMouse) * 0.4;
          }
        });

        // Draw Synaptic Links
        const linkDist = 140;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < linkDist) {
              const alpha = (1 - dist / linkDist) * 0.14;
              ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw Packets moving between nodes
        packets.forEach((p) => {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.fromNode = Math.floor(Math.random() * nodes.length);
            p.toNode = Math.floor(Math.random() * nodes.length);
          }

          const n1 = nodes[p.fromNode];
          const n2 = nodes[p.toNode];
          if (!n1 || !n2) return;

          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const px = n1.x + dx * p.progress;
            const py = n1.y + dy * p.progress;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fill();

            // Glow around packet
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        });

        // Draw Nodes
        nodes.forEach((n) => {
          ctx.fillStyle = n.color;
          ctx.globalAlpha = 0.7;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = n.color;
          ctx.globalAlpha = 0.15;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
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
