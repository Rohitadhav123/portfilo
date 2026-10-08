"use client";

import React, { useState } from "react";
import { ExternalLink, Sparkles, Activity, FileText, BookOpen, Utensils, Shield, Bell } from "lucide-react";
import { PROJECTS, Project } from "@/data/content";
import { SectionHeading } from "@/components/animation/SectionHeading";
import { Reveal } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

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

export function HealthcareVisual() {
  const [activeRole, setActiveRole] = useState<"doctor" | "admin" | "patient">("doctor");

  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl bg-[#07070A] border border-white/10 p-5 overflow-hidden flex flex-col justify-between select-none">
      {/* Top Bar with Role Switcher & Emergency Alert */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
          {(["doctor", "admin", "patient"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-3 py-1 text-xs font-mono rounded-lg capitalize transition-all cursor-pointer ${
                activeRole === role
                  ? "bg-[#22D3EE] text-black font-bold shadow-md shadow-[#22D3EE]/20"
                  : "text-[#9A9AB0] hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Emergency Alert Indicator */}
        <div className="flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-mono text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <Bell className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">EMERGENCY DISPATCH</span>
        </div>
      </div>

      {/* Dynamic Role Dashboard Content Mock */}
      <div className="my-4 flex-1 flex flex-col justify-center gap-3">
        {activeRole === "doctor" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/5">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-[#22D3EE]" />
                <div>
                  <div className="text-xs font-mono text-white font-semibold">FHIR Patient Stream #8402</div>
                  <div className="text-[10px] font-mono text-[#9A9AB0]">NAMASTE ICD-11 Mapping Active</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">STABLE VITAL</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                <div className="text-[10px] font-mono text-[#9A9AB0]">Heart Rate</div>
                <div className="text-sm font-mono text-[#22D3EE] font-bold">72 BPM</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                <div className="text-[10px] font-mono text-[#9A9AB0]">SpO2</div>
                <div className="text-sm font-mono text-emerald-400 font-bold">98%</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                <div className="text-[10px] font-mono text-[#9A9AB0]">Telemedicine</div>
                <div className="text-sm font-mono text-[#8B5CF6] font-bold">READY</div>
              </div>
            </div>
          </div>
        )}

        {activeRole === "admin" && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-white/5 p-3 border border-white/5 flex justify-between items-center">
              <span className="text-xs font-mono text-white">Multi-Hospital Node Cluster</span>
              <span className="text-xs font-mono text-[#22D3EE]">4 Hospitals Connected</span>
            </div>
            <div className="h-24 w-full rounded-xl bg-white/5 border border-white/5 p-3 flex items-end gap-1.5">
              {[40, 65, 45, 90, 75, 80, 60, 95, 85].map((h, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-[#22D3EE]/20 to-[#22D3EE] rounded-t transition-all duration-500"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {activeRole === "patient" && (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 p-3 text-xs font-mono text-[#22D3EE]">
              Appointment Confirmed: Telemedicine Consult with Dr. Sharma
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/5 text-xs font-mono text-white">
              <span>Razorpay Prescription Billing</span>
              <span className="text-emerald-400 font-bold">PAID</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9AB0] border-t border-white/10 pt-3">
        <span>FHIR & NAMASTE COMPLIANT</span>
        <span>SAMPLE DASHBOARD PREVIEW</span>
      </div>
    </div>
  );
}

export function InvoHydraVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl bg-[#07070A] border border-white/10 p-5 overflow-hidden flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#8B5CF6]">
          <FileText className="h-4 w-4" />
          <span>INVOHYDRA // GST INVOICE GENERATOR</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
          GST 18% APPLIED
        </span>
      </div>

      <div className="my-4 flex flex-col gap-2 rounded-xl bg-white/5 p-4 border border-white/5 font-mono text-xs">
        <div className="flex justify-between text-[#9A9AB0] border-b border-white/10 pb-2">
          <span>ITEM DESCRIPTION</span>
          <span>QTY</span>
          <span>AMOUNT (INR)</span>
        </div>

        <div className="flex justify-between text-white py-1">
          <span>Enterprise SaaS License</span>
          <span>01</span>
          <span className="text-[#8B5CF6]">₹24,999.00</span>
        </div>

        <div className="flex justify-between text-white py-1">
          <span>Custom Integration Service</span>
          <span>02</span>
          <span className="text-[#8B5CF6]">₹12,000.00</span>
        </div>

        <div className="mt-2 flex justify-between text-emerald-400 font-bold border-t border-white/10 pt-2">
          <span>TOTAL (INCL. GST)</span>
          <span>₹43,658.82</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9AB0] border-t border-white/10 pt-3">
        <span>CASHFREE PAYMENT GATEWAY SYNCED</span>
        <span>SAMPLE UI VALUES</span>
      </div>
    </div>
  );
}

export function LMSVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl bg-[#07070A] border border-white/10 p-5 overflow-hidden flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#EC4899]">
          <BookOpen className="h-4 w-4" />
          <span>LUPIRA LMS // LEARNING & LEAD PLATFORM</span>
        </div>
        <span className="text-[10px] font-mono text-white/60">CLIENT PIPELINE ACTIVE</span>
      </div>

      <div className="my-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 p-3 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-[#9A9AB0]">Active Lead Conversions</span>
          <span className="text-xl font-mono font-bold text-[#EC4899]">88.4%</span>
        </div>

        <div className="rounded-xl bg-white/5 p-3 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-[#9A9AB0]">Course Modules Delivered</span>
          <span className="text-xl font-mono font-bold text-white">124</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9AB0] border-t border-white/10 pt-3">
        <span>MONGODB + REST API ENGINE</span>
        <span>LMS PORTAL MOCK</span>
      </div>
    </div>
  );
}

export function RecipeVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl bg-[#07070A] border border-white/10 p-5 overflow-hidden flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#F59E0B]">
          <Utensils className="h-4 w-4" />
          <span>RECIPE PLATFORM // COMMUNITY FEED</span>
        </div>
        <span className="text-[10px] font-mono text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-0.5 rounded">
          JWT AUTH
        </span>
      </div>

      <div className="my-4 flex flex-col gap-3">
        <div className="rounded-xl bg-gradient-to-r from-[#F59E0B]/10 to-transparent p-4 border border-[#F59E0B]/20">
          <span className="text-xs font-mono text-[#F59E0B] font-bold">FEATURED RECIPE POST</span>
          <h5 className="font-display text-lg font-bold text-white mt-1">Artisanal Sourdough & Truffle Oil</h5>
          <p className="text-xs text-[#9A9AB0] mt-1">Uploaded by Chef Community User • 12 Shares</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9AB0] border-t border-white/10 pt-3">
        <span>IMAGE UPLOAD & FILTER FEED</span>
        <span>EDITORIAL UI</span>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const renderVisual = (type: Project["visualType"]) => {
    switch (type) {
      case "healthcare":
        return <HealthcareVisual />;
      case "invohydra":
        return <InvoHydraVisual />;
      case "lms":
        return <LMSVisual />;
      case "recipe":
        return <RecipeVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative z-10 py-24 px-6 sm:px-12 md:px-20 bg-[#07070A]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="03"
          title="FEATURED PROJECTS"
          subtitle="Signature full-stack web applications built for production."
          accentColor="#EC4899"
        />

        <div className="flex flex-col gap-24 mt-12">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              data-cursor="project"
              data-cursor-label="VIEW"
              className="group relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 rounded-3xl border border-white/10 bg-[#0E0E14] p-6 sm:p-10 hover:border-[#8B5CF6]/40 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              <div className="w-full lg:w-1/2 min-h-[340px]">
                {renderVisual(project.visualType)}
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#9A9AB0] uppercase tracking-wider mb-2">
                    <span className="text-[#8B5CF6]">0{idx + 1}</span>
                    <span>//</span>
                    <span>{project.category}</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-[#22D3EE] mt-1 mb-4">
                    {project.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-[#9A9AB0] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-2 mb-6">
                    {project.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-white/90 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-[#F4F4F8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {project.liveUrl && (
                    <Magnetic strength={0.2}>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#22D3EE] px-6 py-2.5 font-mono text-xs font-bold text-black shadow-lg shadow-[#22D3EE]/20 hover:bg-white transition-all"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Magnetic>
                  )}

                  {project.githubUrl && (
                    <Magnetic strength={0.2}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-5 py-2.5 font-mono text-xs font-medium text-white hover:bg-white/20 transition-all"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GITHUB</span>
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
