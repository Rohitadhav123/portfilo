"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/data/content";
import { useSmoothScroll } from "./SmoothScrollProvider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Active section observer
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, -70);
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[80] h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#EC4899] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[70] flex justify-center pt-4 sm:pt-6 px-4 transition-all duration-300 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-6 rounded-full px-5 py-2.5 transition-all duration-500 ${
            isScrolled
              ? "bg-[#0E0E14]/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group font-display font-bold text-sm tracking-wider text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-300">
              RA
            </span>
            <span className="hidden sm:inline-block font-mono text-xs tracking-widest text-[#9A9AB0] group-hover:text-white transition-colors">
              ROHIT ADHAV
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-black/20 rounded-full p-1 border border-white/5">
            {NAV_LINKS.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-mono transition-colors duration-300 rounded-full ${
                    isActive ? "text-white font-semibold" : "text-[#9A9AB0] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B5CF6]/30 to-[#22D3EE]/30 border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-[#8B5CF6] px-4 py-1.5 text-xs font-mono font-medium text-white transition-all duration-300 border border-white/10 hover:border-[#8B5CF6]"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex md:hidden items-center justify-center h-9 w-9 rounded-full bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-[#07070A]/95 p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-[#8B5CF6] tracking-widest uppercase">
                // NAVIGATION
              </span>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    className="font-display text-3xl font-bold tracking-tight text-white hover:text-[#22D3EE] transition-colors flex items-center justify-between border-b border-white/5 pb-3"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-[#9A9AB0]">0{idx + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-[#9A9AB0]">DIRECT CONTACT</span>
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="text-sm font-mono text-[#22D3EE] underline"
              >
                {PERSONAL_INFO.contact.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
