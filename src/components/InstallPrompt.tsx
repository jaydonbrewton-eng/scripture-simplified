"use client";

import { Download, Share, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISSED_KEY = "scripture-simplified-install-dismissed";

type Platform = "ios" | "android" | null;

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return null;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as unknown as { standalone: boolean }).standalone === true)
  );
}

export default function InstallPrompt() {
  const [platform] = useState<Platform>(() => {
    if (typeof window === "undefined") return null;
    if (isStandalone()) return null;
    if (localStorage.getItem(DISMISSED_KEY)) return null;
    return detectPlatform();
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!platform) return;
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [platform]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISSED_KEY, "true");
  };

  if (!visible || !platform) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] animate-fade-in sm:left-auto sm:right-4 sm:w-[360px]">
      <div className="rounded-2xl border border-primary/20 bg-card p-4 shadow-2xl shadow-primary/10">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Download size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <p className="font-semibold text-sm">Get the app experience</p>
              <button onClick={dismiss} className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors shrink-0 -mt-0.5 -mr-1">
                <X size={16} />
              </button>
            </div>
            {platform === "ios" ? (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Tap <Share size={11} className="inline text-primary -mt-0.5" /> at the bottom of Safari, then tap <strong className="text-foreground">&quot;Add to Home Screen.&quot;</strong> Opens full screen like a real app.
              </p>
            ) : (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Tap the <strong className="text-foreground">menu (three dots)</strong> in your browser, then tap <strong className="text-foreground">&quot;Add to Home Screen&quot;</strong> or <strong className="text-foreground">&quot;Install App.&quot;</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
