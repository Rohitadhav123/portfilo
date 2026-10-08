"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "chars" | "words";
}

export function SplitText({ text, className = "", delay = 0, type = "chars" }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".split-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, rotateX: -40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: type === "chars" ? 0.03 : 0.08,
            delay: delay,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay, type, prefersReducedMotion]);

  if (type === "words") {
    const words = text.split(" ");
    return (
      <div ref={containerRef} className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="split-item inline-block transform-gpu">
            {word}
          </span>
        ))}
      </div>
    );
  }

  const chars = text.split("");
  return (
    <div ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="split-item inline-block transform-gpu">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
