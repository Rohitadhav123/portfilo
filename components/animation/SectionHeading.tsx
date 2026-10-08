"use client";

import React from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  accentColor = "#8B5CF6",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-2 mb-12 sm:mb-16 ${className}`}>
      <Reveal direction="up" delay={0.1}>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal direction="up" delay={0.2}>
          <p className="max-w-2xl text-sm sm:text-base text-[#9A9AB0] font-sans mt-1">
            {subtitle}
          </p>
        </Reveal>
      )}

      <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
    </div>
  );
}
