"use client";

import Header from "@/components/Header";
import { Heart, Coffee, Users, Mail } from "lucide-react";

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
        <div className="animate-fade-in text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Heart size={36} className="text-primary" />
          </div>

          <h1 className="mb-3 text-3xl font-bold">Support This Project</h1>
          <p className="mx-auto mb-10 max-w-md text-muted-foreground">
            Scripture Simplified is free and always will be. The Word of God
            shouldn&apos;t have a paywall. But running the AI features and
            keeping the servers on does cost money.
          </p>

          <div className="space-y-4 text-left">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Coffee size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Buy Me a Coffee</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    A one-time donation of any amount helps cover AI and server
                    costs. Even $3 keeps the lights on for dozens of users.
                  </p>
                  <a
                    href="https://www.paypal.com/donate/?hosted_button_id=536ALRTC7YK86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors"
                  >
                    <Coffee size={16} /> Support with a donation
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Users size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Church Partnerships</h3>
                  <p className="text-sm text-muted-foreground">
                    Is your church or youth group interested in using Scripture
                    Simplified? Reach out and we can set up a partnership.
                    Churches that sponsor this project help keep it free for
                    everyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Get in Touch</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Have ideas, want to volunteer, or just want to say what
                    this app means to you? We&apos;d love to hear from you.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent transition-colors"
                  >
                    <Mail size={16} /> Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Where does the money go?</span>
              <br />
              100% of donations go directly to keeping this app running &mdash;
              AI costs (OpenAI API for Break It Down, word definitions, and
              commentary), server hosting, and Bible API access. This is a
              ministry, not a business.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
