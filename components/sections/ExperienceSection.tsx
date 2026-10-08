"use client";

import React, { useEffect, useRef } from "react";
import { Calendar, Briefcase, ChevronRight, Users, CheckCircle2 } from "lucide-react";
import { EXPERIENCES } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { gsap } from "@/lib/gsap";

export function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-[#07070A]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="02"
          title="EXPERIENCE"
          subtitle="Internship trajectory, technical leadership, and production platform delivery."
          accentColor="#22D3EE"
        />

        <div ref={containerRef} className="relative mt-12 pl-6 sm:pl-10">
          {/* Vertical Timeline Track Background */}
          <div className="absolute top-0 bottom-0 left-[11px] sm:left-[19px] w-[2px] bg-white/10" />

          {/* Animated Glowing Draw Line */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-[11px] sm:left-[19px] w-[2px] bg-gradient-to-b from-[#8B5CF6] via-[#22D3EE] to-[#EC4899] origin-top transform-gpu"
          />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative mb-16 last:mb-0">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#0E0E14] border border-[#22D3EE] text-[#22D3EE] shadow-lg shadow-[#22D3EE]/20 z-10">
                <Briefcase className="h-5 w-5" />
              </div>

              {/* Company Header */}
              <Reveal direction="up" delay={0.1}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-white flex items-center gap-3">
                      <span>{exp.company}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-3 py-0.5 text-xs font-mono font-medium text-[#8B5CF6]">
                        <Users className="h-3 w-3" />
                        <span>TEAM LEAD</span>
                      </span>
                    </h3>
                    <p className="font-mono text-sm text-[#22D3EE] mt-1">{exp.role}</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#9A9AB0] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </Reveal>

              {/* Nested Projects Showcase Timeline Cards */}
              <div className="flex flex-col gap-8">
                {exp.projects?.map((proj, idx) => (
                  <Reveal key={idx} direction="up" delay={idx * 0.15 + 0.2}>
                    <div className="group rounded-2xl border border-white/10 bg-[#0E0E14] p-6 sm:p-8 hover:border-[#8B5CF6]/50 transition-all duration-300 shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h4 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                          <ChevronRight className="h-5 w-5 text-[#8B5CF6] group-hover:translate-x-1 transition-transform" />
                          <span>{proj.name}</span>
                        </h4>
                        <span className="font-mono text-xs text-[#9A9AB0]">
                          {proj.period}
                        </span>
                      </div>

                      <p className="text-sm text-[#9A9AB0] mb-5 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/5 border border-white/10 text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Responsibilities list */}
                      <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
                        <span className="text-xs font-mono font-semibold text-[#22D3EE] uppercase tracking-wider">
                          Key Deliverables & Impact:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {proj.responsibilities.map((resp, rIdx) => (
                            <div
                              key={rIdx}
                              className="flex items-start gap-2 text-xs text-[#9A9AB0]"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
