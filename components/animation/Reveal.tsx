"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !elementRef.current) return;

    const el = elementRef.current;
    let initialX = 0;
    let initialY = 0;

    if (direction === "up") initialY = 40;
    if (direction === "down") initialY = -40;
    if (direction === "left") initialX = 40;
    if (direction === "right") initialX = -40;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: initialX, y: initialY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay, direction, prefersReducedMotion]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
