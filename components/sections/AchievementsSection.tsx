"use client";

import React from "react";
import { Trophy, Award, Medal } from "lucide-react";
import { ACHIEVEMENTS } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function AchievementsSection() {
  return (
    <section className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-[#07070A]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="05"
          title="HONORS & HACKATHONS"
          subtitle="Competitive achievements, innovation recognitions, and research qualifications."
          accentColor="#EC4899"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {ACHIEVEMENTS.map((item, idx) => (
            <Reveal key={item.id} direction="up" delay={idx * 0.15}>
              <TiltCard maxRotate={8} className="p-8 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EC4899]/10 border border-[#EC4899]/30 text-[#EC4899] group-hover:scale-110 transition-transform">
                      {idx === 0 ? <Trophy className="h-6 w-6" /> : <Medal className="h-6 w-6" />}
                    </div>
                    <span className="font-mono text-xs text-[#EC4899] bg-[#EC4899]/10 px-3 py-1 rounded-full border border-[#EC4899]/30 font-bold uppercase">
                      {item.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9A9AB0] mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-[#9A9AB0] border-t border-white/5 pt-4 mt-6">
                  <Award className="h-3.5 w-3.5 text-[#EC4899]" />
                  <span>VERIFIED COMPETITION AWARD</span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
