"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already visited in this session
    const hasVisited = sessionStorage.getItem("rohit_portfolio_intro_seen");
    if (hasVisited) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("rohit_portfolio_intro_seen", "true");
            onComplete();
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem("rohit_portfolio_intro_seen", "true");
    onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#07070A] p-8 select-none"
        >
          <div className="flex w-full justify-between text-xs font-mono text-[#9A9AB0]">
            <span className="tracking-widest uppercase text-[#8B5CF6]">ROHIT ADHAV // PORTFOLIO</span>
            <button
              onClick={handleSkip}
              className="hover:text-white transition-colors cursor-pointer underline underline-offset-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] rounded px-1"
            >
              SKIP INTRO [ESC]
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
            >
              ROHIT ADHAV
            </motion.h1>
            <div className="flex items-center gap-3 text-sm font-mono text-[#9A9AB0]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span>FULL-STACK WEB DEVELOPER</span>
            </div>
          </div>

          <div className="w-full max-w-md flex flex-col gap-2">
            <div className="flex justify-between text-xs font-mono text-[#9A9AB0]">
              <span>SYSTEM INITIALIZING</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 w-full bg-[#0E0E14] overflow-hidden rounded-full border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#EC4899]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
