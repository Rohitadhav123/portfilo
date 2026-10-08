"use client";

import React, { useEffect, useState, useRef } from "react";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { PERSONAL_INFO } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function EducationSection() {
  const [cgpa, setCgpa] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(
            {},
            {
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                const val = (this.progress() * 8.94).toFixed(2);
                setCgpa(parseFloat(val));
              },
            }
          );
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-[#07070A]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="06"
          title="ACADEMIC BACKGROUND"
          subtitle="Computer Engineering degree & cumulative academic performance."
          accentColor="#8B5CF6"
        />

        <div ref={containerRef} className="mt-12">
          <Reveal direction="up" delay={0.1}>
            <div className="relative rounded-3xl border border-white/10 bg-[#0E0E14] p-8 sm:p-12 overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex flex-col gap-4 max-w-2xl">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#8B5CF6]">
                    <GraduationCap className="h-5 w-5" />
                    <span>BACHELOR OF ENGINEERING</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                    {PERSONAL_INFO.education.institution}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-[#9A9AB0]">
                    <span className="flex items-center gap-1.5 text-[#22D3EE]">
                      <Award className="h-4 w-4" />
                      <span>{PERSONAL_INFO.education.degree}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>Class of {PERSONAL_INFO.education.year}</span>
                    </span>
                  </div>
                </div>

                {/* Animated CGPA Counter Badge */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-tr from-[#8B5CF6]/20 via-[#22D3EE]/10 to-transparent p-8 border border-white/15 min-w-[200px] text-center shadow-xl">
                  <span className="font-mono text-xs text-[#9A9AB0] uppercase tracking-wider mb-1">
                    CUMULATIVE CGPA
                  </span>
                  <span className="font-display text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                    {cgpa.toFixed(2)}
                  </span>
                  <span className="font-mono text-[10px] text-[#22D3EE] mt-2">
                    FIRST CLASS WITH DISTINCTION
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
