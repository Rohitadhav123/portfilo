"use client";

import React, { useState } from "react";
import { Mail, Copy, Send } from "lucide-react";
import { PERSONAL_INFO } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Toast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function ContactSection() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopyEmail = () => {
    copyToClipboard(PERSONAL_INFO.contact.email).then((success) => {
      if (success) {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
      }
    });
  };

  return (
    <section id="contact" className="relative z-10 py-28 px-6 sm:px-12 md:px-20 bg-[#07070A] overflow-hidden">
      {/* Background Interactive Orb & Radial Mesh Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] rounded-full bg-gradient-to-tr from-[#8B5CF6]/20 via-[#22D3EE]/10 to-[#EC4899]/20 blur-[140px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeading
          number="08"
          title="GET IN TOUCH"
          subtitle="Initiate a conversation for full-stack roles, contract work, or tech discussions."
          accentColor="#8B5CF6"
        />

        <div className="mt-12 rounded-3xl border border-white/10 bg-[#0E0E14]/80 backdrop-blur-xl p-8 sm:p-14 shadow-2xl flex flex-col items-center text-center">
          <Reveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-mono text-[#22D3EE] mb-6">
              <Send className="h-3.5 w-3.5" />
              <span>LET'S CONNECT</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
              {PERSONAL_INFO.contact.headline}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#9A9AB0] max-w-xl mt-6 leading-relaxed">
              {PERSONAL_INFO.contact.subtext}
            </p>
          </Reveal>

          {/* Direct Phone & Copy Email Row */}
          <Reveal direction="up" delay={0.4} className="mt-8 w-full max-w-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 font-mono text-sm">
              <span className="text-white font-semibold">{PERSONAL_INFO.contact.email}</span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 rounded-xl bg-[#8B5CF6] hover:bg-[#22D3EE] text-black font-bold px-4 py-2 text-xs transition-all cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>COPY EMAIL</span>
              </button>
            </div>
          </Reveal>

          {/* Magnetic Social Buttons */}
          <Reveal direction="up" delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/15 px-7 py-3.5 font-mono text-sm font-medium text-white hover:bg-white/20 transition-all shadow-lg"
                >
                  <Mail className="h-4 w-4 text-[#22D3EE]" />
                  <span>EMAIL ME</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={PERSONAL_INFO.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/15 px-7 py-3.5 font-mono text-sm font-medium text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all shadow-lg"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LINKEDIN</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={PERSONAL_INFO.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/15 px-7 py-3.5 font-mono text-sm font-medium text-white hover:bg-white/20 transition-all shadow-lg"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GITHUB</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>

      <Toast
        message="Email copied to clipboard!"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </section>
  );
}
