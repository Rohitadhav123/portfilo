"use client";

import React, { useEffect, useRef } from "react";
import { PROCESS_STEPS } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { gsap } from "@/lib/gsap";

export function ProcessSection() {
  const lineRef = useRef<SVGLineElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-[#07070A]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="07"
          title="DEVELOPMENT PROCESS"
          subtitle="A systematic, battle-tested engineering pipeline from concept to deployment."
          accentColor="#22D3EE"
        />

        <div ref={containerRef} className="relative mt-16">
          {/* Desktop SVG Glowing Pipeline Path */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 pointer-events-none z-0">
            <svg className="w-full h-4 overflow-visible">
              <line
                x1="5%"
                y1="50%"
                x2="95%"
                y2="50%"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
              />
              <line
                ref={lineRef}
                x1="5%"
                y1="50%"
                x2="95%"
                y2="50%"
                stroke="url(#process-gradient)"
                strokeWidth="3"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <defs>
                <linearGradient id="process-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <Reveal key={step.step} direction="up" delay={idx * 0.1}>
                <div className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0E0E14] p-6 hover:border-[#22D3EE]/50 transition-all duration-300 h-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-3xl font-extrabold text-[#22D3EE]">
                        {step.step}
                      </span>
                      <div className="h-3 w-3 rounded-full bg-white/10 group-hover:bg-[#22D3EE] group-hover:shadow-md group-hover:shadow-[#22D3EE]/50 transition-all" />
                    </div>

                    <h4 className="font-display text-lg font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#9A9AB0] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
