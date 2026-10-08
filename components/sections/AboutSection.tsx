"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, Database, Server, Layers } from "lucide-react";
import { PERSONAL_INFO } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Parallax } from "@/components/animation/Parallax";
import { gsap } from "@/lib/gsap";

export function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const words = textRef.current.querySelectorAll(".about-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const aboutWords = PERSONAL_INFO.about.split(" ");

  return (
    <section id="about" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-[#07070A]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="01"
          title="ABOUT ME"
          subtitle="Engineering robust full-stack platforms with modern web standards."
          accentColor="#8B5CF6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <p
              ref={textRef}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-relaxed text-white"
            >
              {aboutWords.map((word, index) => (
                <span key={index} className="about-word inline-block mr-2">
                  {word}
                </span>
              ))}
            </p>

            <Reveal direction="up" delay={0.2}>
              <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#0E0E14] border border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs text-[#22D3EE] uppercase tracking-wider">
                  <Terminal className="h-4 w-4" />
                  <span>CORE STACK ARCHITECTURE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PERSONAL_INFO.techBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-[#F4F4F8] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Developer Workspace Composition Visual */}
          <div className="lg:col-span-6 relative flex justify-center items-center min-h-[420px]">
            {/* Background Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B5CF6]/10 via-transparent to-[#22D3EE]/10 blur-2xl" />

            {/* Code Snippet Card */}
            <Reveal direction="up" delay={0.3} className="w-full">
              <div className="relative w-full rounded-2xl border border-white/10 bg-[#0E0E14]/90 backdrop-blur-xl p-5 shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-[#9A9AB0]">
                    architecture.ts
                  </span>
                </div>

                {/* Code lines */}
                <pre className="font-mono text-xs sm:text-sm text-[#9A9AB0] leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-[#EC4899]">interface</span>{" "}
                    <span className="text-[#22D3EE]">FullStackSystem</span> {"{\n"}
                    {"  "}developer: <span className="text-[#8B5CF6]">"{PERSONAL_INFO.name}"</span>;{"\n"}
                    {"  "}experienceMonths: <span className="text-[#F59E0B]">11</span>;{"\n"}
                    {"  "}productionReadyApps: <span className="text-[#F59E0B]">3</span>;{"\n"}
                    {"  "}domains: [<span className="text-[#8B5CF6]">"Healthcare"</span>, <span className="text-[#8B5CF6]">"Billing"</span>, <span className="text-[#8B5CF6]">"Sales-Tech"</span>];{"\n"}
                    {"}\n\n"}
                    <span className="text-[#EC4899]">async function</span>{" "}
                    <span className="text-[#22D3EE]">deployScalableApp</span>(config: <span className="text-[#22D3EE]">SystemConfig</span>) {"{\n"}
                    {"  "}<span className="text-[#EC4899]">const</span> app = <span className="text-[#EC4899]">new</span> System(config);{"\n"}
                    {"  "}<span className="text-[#EC4899]">await</span> app.connectDatabase();{"\n"}
                    {"  "}<span className="text-[#EC4899]">return</span> app.listen();{"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>
            </Reveal>

            {/* Parallax Floating Tech Badges */}
            <Parallax speed={-0.15} className="absolute -top-6 -right-4 hidden sm:block">
              <div className="flex items-center gap-2 rounded-xl border border-[#22D3EE]/30 bg-[#0E0E14] px-4 py-2 text-xs font-mono text-[#22D3EE] shadow-xl">
                <Code2 className="h-4 w-4" />
                <span>Next.js App Router</span>
              </div>
            </Parallax>

            <Parallax speed={0.2} className="absolute -bottom-6 -left-4 hidden sm:block">
              <div className="flex items-center gap-2 rounded-xl border border-[#8B5CF6]/30 bg-[#0E0E14] px-4 py-2 text-xs font-mono text-[#8B5CF6] shadow-xl">
                <Database className="h-4 w-4" />
                <span>PostgreSQL & MongoDB</span>
              </div>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
