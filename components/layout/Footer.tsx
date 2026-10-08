"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "@/data/content";
import { useSmoothScroll } from "./SmoothScrollProvider";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo("#hero", 0);
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#07070A] py-12 px-6 sm:px-12 md:px-20">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#9A9AB0]">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-bold text-white tracking-widest">{PERSONAL_INFO.name}</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>© 2026 ROHIT ADHAV. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href={PERSONAL_INFO.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
          <button
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-white hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
