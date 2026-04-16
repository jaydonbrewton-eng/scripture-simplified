"use client";

import { ArrowRight, BookOpen, Heart, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Step {
  targetId: string | null;
  title: string;
  description: string;
  icon: typeof BookOpen;
  cta?: { label: string; href: string };
}

const STEPS: Step[] = [
  {
    targetId: null,
    title: "Welcome to Scripture Simplified",
    description: "The Bible in plain language -- without losing a single drop of the message. Here's a quick look around.",
    icon: BookOpen,
  },
  {
    targetId: "tour-topics",
    title: "Start with what you're feeling",
    description: "Tap any topic -- anxiety, identity, purpose -- and we'll show you verses that speak directly to it.",
    icon: Heart,
  },
  {
    targetId: "tour-breakdown",
    title: "Break It Down with AI",
    description: "While reading, tap any verse and hit \"Break it down\" for a plain-language explanation. Tap any word for its biblical definition.",
    icon: Sparkles,
    cta: { label: "Try it on John 3", href: "/read?book=John&chapter=3" },
  },
  {
    targetId: "tour-actions",
    title: "You're all set",
    description: "Read in 17 translations, follow reading plans, save verses, and track your progress. Dive in whenever you're ready.",
    icon: BookOpen,
  },
];

interface WalkthroughProps {
  onComplete: () => void;
}

export default function Walkthrough({ onComplete }: WalkthroughProps) {
  const [step, setStep] = useState(0);
  const [layout, setLayout] = useState<{
    tooltip: React.CSSProperties;
    arrow: "top" | "bottom" | "none";
    highlight: { top: number; left: number; width: number; height: number } | null;
  }>({
    tooltip: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "fixed" },
    arrow: "none",
    highlight: null,
  });

  const current = STEPS[step];
  const Icon = current.icon;
  const isLast = step === STEPS.length - 1;

  const reposition = useCallback(() => {
    const { targetId } = STEPS[step];
    if (!targetId) {
      setLayout({
        tooltip: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "fixed" },
        arrow: "none",
        highlight: null,
      });
      return;
    }

    const el = document.getElementById(targetId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const tooltipH = 240;
    const pad = 16;
    const showBelow = window.innerHeight - rect.bottom > tooltipH + pad;
    const leftPos = Math.max(pad, Math.min(rect.left + rect.width / 2 - 175, window.innerWidth - 350 - pad));
    const hl = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };

    setLayout({
      tooltip: showBelow
        ? { position: "fixed" as const, top: rect.bottom + 14, left: leftPos }
        : { position: "fixed" as const, bottom: window.innerHeight - rect.top + 14, left: leftPos },
      arrow: showBelow ? "top" : "bottom",
      highlight: hl,
    });
  }, [step]);

  useEffect(() => {
    const { targetId } = STEPS[step];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const timer = setTimeout(reposition, 400);
    const onUpdate = () => reposition();
    window.addEventListener("resize", onUpdate);
    window.addEventListener("scroll", onUpdate, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onUpdate);
      window.removeEventListener("scroll", onUpdate, true);
    };
  }, [step, reposition]);

  const { tooltip: tooltipPos, arrow: arrowSide, highlight: highlightRect } = layout;

  const handleNext = () => (isLast ? onComplete() : setStep(step + 1));

  return (
    <>
      {/* Dark overlay with cutout */}
      <div className="fixed inset-0 z-[70]" style={{ pointerEvents: "none" }}>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "auto" }}>
          <defs>
            <mask id="tour-mask">
              <rect width="100%" height="100%" fill="white" />
              {highlightRect && (
                <rect
                  x={highlightRect.left - 8}
                  y={highlightRect.top - 8}
                  width={highlightRect.width + 16}
                  height={highlightRect.height + 16}
                  rx={16}
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.7)" mask="url(#tour-mask)" />
        </svg>

        {highlightRect && (
          <div
            className="absolute rounded-2xl ring-2 ring-primary/60 animate-pulse-glow"
            style={{
              top: highlightRect.top - 8,
              left: highlightRect.left - 8,
              width: highlightRect.width + 16,
              height: highlightRect.height + 16,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Tooltip card */}
      <div className="fixed z-[71] w-[350px] max-w-[calc(100vw-32px)] animate-fade-in" style={tooltipPos} key={step}>
        <div className="relative rounded-2xl border border-primary/30 bg-card p-5 shadow-2xl shadow-primary/10">

          {arrowSide === "top" && (
            <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-card border-l border-t border-primary/30" />
          )}

          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">{current.title}</h3>
                <p className="text-[11px] text-muted-foreground">{step + 1} of {STEPS.length}</p>
              </div>
            </div>
            <button onClick={onComplete} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors shrink-0">
              <X size={16} />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-secondary-foreground mb-4">{current.description}</p>

          <div className="flex items-center gap-2">
            <button onClick={onComplete} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
              Skip
            </button>
            <div className="flex-1" />
            {current.cta && (
              <a href={current.cta.href} onClick={onComplete} className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors">
                {current.cta.label}
              </a>
            )}
            <button onClick={handleNext} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-accent transition-colors">
              {isLast ? "Done" : "Next"} <ArrowRight size={13} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === step ? "w-5 bg-primary" : i < step ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"}`} />
            ))}
          </div>

          {arrowSide === "bottom" && (
            <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-card border-r border-b border-primary/30" />
          )}
        </div>
      </div>
    </>
  );
}
