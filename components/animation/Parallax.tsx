"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // positive = scroll faster, negative = scroll slower
  className?: string;
}

export function Parallax({ children, speed = 0.2, className = "" }: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !targetRef.current) return;

    const el = targetRef.current;
    const yDistance = speed * 100;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -yDistance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, targetRef);

    return () => ctx.revert();
  }, [speed, prefersReducedMotion]);

  return (
    <div ref={targetRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
