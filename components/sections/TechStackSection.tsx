"use client";

import React, { useState } from "react";
import { TECH_CATEGORIES } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Cpu, Zap, Layers, Server, Database, Shield, Wrench } from "lucide-react";

export function TechStackSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "languages":
        return <Zap className="h-4 w-4 text-[#22D3EE]" />;
      case "frontend":
        return <Layers className="h-4 w-4 text-[#8B5CF6]" />;
      case "backend":
        return <Server className="h-4 w-4 text-[#EC4899]" />;
      case "database":
        return <Database className="h-4 w-4 text-[#F59E0B]" />;
      case "devops":
        return <Shield className="h-4 w-4 text-[#10B981]" />;
      default:
        return <Wrench className="h-4 w-4 text-[#22D3EE]" />;
    }
  };

  return (
    <section id="skills" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-[#07070A]">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#22D3EE]/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeading
          number="04"
          title="TECH ECOSYSTEM"
          subtitle="Clustered full-stack tools, databases, frameworks, and deployment stack."
          accentColor="#22D3EE"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {TECH_CATEGORIES.map((cat, idx) => (
            <Reveal key={cat.title} direction="up" delay={idx * 0.1}>
              <div className="relative group rounded-3xl border border-white/10 bg-[#0E0E14] p-7 hover:border-[#22D3EE]/50 transition-all duration-500 shadow-2xl overflow-hidden">
                {/* SVG Faint Connection Network Overlay */}
                <svg className="absolute inset-0 h-full w-full opacity-15 pointer-events-none stroke-white/40">
                  <line x1="15%" y1="20%" x2="85%" y2="80%" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="85%" y1="15%" x2="15%" y2="85%" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="50%" cy="50%" r="40%" fill="none" strokeWidth="1" strokeDasharray="2 6" />
                </svg>

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2.5">
                    {getCategoryIcon(cat.title)}
                    <span>{cat.title}</span>
                  </h3>
                  <span className="font-mono text-[10px] text-[#22D3EE] bg-[#22D3EE]/10 px-2.5 py-1 rounded-full border border-[#22D3EE]/20 font-semibold">
                    {cat.items.length} MODULES
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => {
                    const isHovered = hoveredSkill === item.name;

                    return (
                      <div
                        key={item.name}
                        onMouseEnter={() => setHoveredSkill(item.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`relative rounded-xl border px-4 py-2 text-xs font-mono transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "scale-105 border-[#22D3EE] bg-[#22D3EE]/20 text-white shadow-lg shadow-[#22D3EE]/30 z-10"
                            : "border-white/10 bg-white/5 text-[#9A9AB0] hover:text-white hover:border-white/20"
                        }`}
                      >
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
