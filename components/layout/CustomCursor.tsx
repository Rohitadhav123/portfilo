"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"default" | "hover" | "project" | "text">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const ringRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;

    // Check if touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Determine element state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverable = target.closest("a, button, [data-cursor='hover'], input, textarea, select");
      const projectHover = target.closest("[data-cursor='project']");
      const textHover = target.closest("p, h1, h2, h3, h4, span");

      if (projectHover) {
        setCursorState("project");
        const label = projectHover.getAttribute("data-cursor-label") || "VIEW";
        setCursorText(label);
      } else if (hoverable) {
        setCursorState("hover");
        setCursorText("");
      } else if (textHover) {
        setCursorState("text");
        setCursorText("");
      } else {
        setCursorState("default");
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Animation loop for ring smooth lerp
    let animFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 h-2 w-2 -mt-1 -ml-1 rounded-full bg-[#22D3EE] transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            cursorState === "hover" ? 1.8 : cursorState === "project" ? 0 : 1
          })`,
        }}
      />

      {/* Outer Lerp Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          cursorState === "hover"
            ? "h-14 w-14 -mt-7 -ml-7 border-[#8B5CF6]/80 bg-[#8B5CF6]/10 backdrop-blur-[2px]"
            : cursorState === "project"
            ? "h-20 w-20 -mt-10 -ml-10 border-[#22D3EE] bg-[#0E0E14]/90 text-xs font-mono font-bold tracking-widest text-[#22D3EE] shadow-lg shadow-[#22D3EE]/20"
            : cursorState === "text"
            ? "h-8 w-8 -mt-4 -ml-4 border-white/20 bg-white/5"
            : "h-9 w-9 -mt-[18px] -ml-[18px] border-white/30 bg-transparent"
        }`}
      >
        {cursorState === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px]"
          >
            {cursorText}
          </motion.span>
        )}
      </div>
    </div>
  );
}
