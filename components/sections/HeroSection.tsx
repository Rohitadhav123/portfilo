"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Send, Code, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/data/content";
import { SplitText } from "@/components/animation/SplitText";
import { Reveal } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";
import { HeroBackgroundCanvas } from "@/components/three/HeroBackgroundCanvas";

const DataCoreCanvas = dynamic(() => import("@/components/three/DataCoreCanvas"), {
  ssr: false,
  loading: () => <div className="h-full w-full min-h-[380px] bg-transparent" />,
});

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-28 pb-12 px-6 sm:px-12 md:px-20 z-10"
    >
      {/* Immersive Animated Background Scene */}
      <HeroBackgroundCanvas />

      {/* Radial Atmospheric Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-[#8B5CF6]/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-[#22D3EE]/15 blur-[140px]" />

      <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 my-auto relative z-10">
        {/* Left Editorial Header */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl text-left">
          {/* Status Badge */}
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-mono text-[#22D3EE] backdrop-blur-xl shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-[#22D3EE] animate-ping" />
              <span>FULL-STACK ARCHITECT & DEVELOPER</span>
            </div>
          </Reveal>

          {/* Staggered Name Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white uppercase leading-[0.95] drop-shadow-2xl">
              <SplitText text={PERSONAL_INFO.name} delay={0.2} type="chars" />
            </h1>
            <div className="flex items-center gap-3 font-mono text-lg sm:text-2xl text-[#22D3EE] font-semibold tracking-wide mt-2">
              <Terminal className="h-5 w-5 text-[#8B5CF6]" />
              <span>{PERSONAL_INFO.role}</span>
            </div>
          </div>

          {/* Positioning Summary */}
          <Reveal direction="up" delay={0.4}>
            <p className="text-base sm:text-lg text-[#9A9AB0] max-w-xl leading-relaxed">
              {PERSONAL_INFO.tagline}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal direction="up" delay={0.5}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic strength={0.3}>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#projects", -70);
                  }}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#EC4899] px-8 py-4 font-mono text-sm font-bold text-black shadow-xl shadow-[#8B5CF6]/25 transition-all duration-300 hover:shadow-2xl hover:shadow-[#22D3EE]/40"
                >
                  <span className="relative z-10 uppercase tracking-wider">EXPLORE MY WORK</span>
                  <ArrowDown className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact", -70);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-7 py-4 font-mono text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  <span>LET'S CONNECT</span>
                  <Send className="h-3.5 w-3.5 text-[#9A9AB0]" />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Right 3D Interactive Canvas Scene */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl h-[420px] lg:h-[520px] relative">
          <DataCoreCanvas />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex justify-center pt-8 relative z-10">
        <button
          onClick={() => scrollTo("#about", -70)}
          aria-label="Scroll to about section"
          className="flex flex-col items-center gap-2 text-xs font-mono text-[#9A9AB0] hover:text-white transition-colors cursor-pointer group"
        >
          <span className="tracking-widest">// SCROLL TO DISCOVER</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex h-8 w-5 justify-center rounded-full border border-white/20 p-1"
          >
            <div className="h-2 w-1 rounded-full bg-[#22D3EE]" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
