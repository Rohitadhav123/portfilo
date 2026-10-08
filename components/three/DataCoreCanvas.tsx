"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DataCoreScene } from "./DataCoreScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function DataCoreFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* CSS Fallback 3D Core Visual */}
      <div className="relative h-64 w-64 sm:h-80 sm:w-80 flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border border-[#22D3EE]/30 bg-gradient-to-tr from-[#8B5CF6]/20 via-transparent to-[#22D3EE]/20 blur-xl animate-pulse" />
        
        {/* Rotating wireframe octagon */}
        <div className="absolute h-48 w-48 rounded-3xl border border-[#22D3EE]/40 transform rotate-45 animate-[spin_12s_linear_infinite]" />
        <div className="absolute h-48 w-48 rounded-3xl border border-[#8B5CF6]/40 transform -rotate-45 animate-[spin_18s_linear_infinite_reverse]" />
        
        {/* Inner solid core */}
        <div className="relative h-32 w-32 rounded-2xl bg-gradient-to-tr from-[#0E0E14] via-[#161622] to-[#8B5CF6]/30 border border-white/20 shadow-2xl flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-[#22D3EE] blur-md opacity-70 animate-ping" />
        </div>
      </div>
    </div>
  );
}

export default function DataCoreCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (prefersReducedMotion) {
    return <DataCoreFallback />;
  }

  return (
    <div ref={containerRef} className="relative h-full w-full min-h-[380px] sm:min-h-[480px]">
      {isVisible ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="h-full w-full"
        >
          <DataCoreScene isMobile={isMobile} />
        </Canvas>
      ) : (
        <DataCoreFallback />
      )}
    </div>
  );
}
