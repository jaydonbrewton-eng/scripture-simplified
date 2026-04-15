"use client";

import { TOPICS, type Topic } from "@/lib/topics";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface FeelingsOnboardProps {
  onSelect: (topic: Topic) => void;
  onSkip: () => void;
}

export default function FeelingsOnboard({ onSelect, onSkip }: FeelingsOnboardProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <p className="mb-2 text-center text-sm text-muted-foreground">Before you start</p>
        <h2 className="mb-2 text-center text-2xl font-bold">What are you going through?</h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          We&apos;ll take you straight to the verses that speak to it.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelected(topic.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                selected === topic.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className="text-2xl">{topic.emoji}</span>
              <p className="mt-2 text-sm font-semibold">{topic.label}</p>
              <p className="text-xs text-muted-foreground">{topic.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {selected && (
            <button
              onClick={() => {
                const topic = TOPICS.find((t) => t.id === selected);
                if (topic) onSelect(topic);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors"
            >
              Show me verses <ArrowRight size={16} />
            </button>
          )}
          <button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            I just want to browse
          </button>
        </div>
      </div>
    </div>
  );
}
