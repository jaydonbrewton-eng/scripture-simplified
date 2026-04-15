"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="prose-sm">
          <h1 className="mb-2 text-2xl font-bold">Privacy Policy</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: April 2026</p>

          <div className="space-y-6 text-sm leading-relaxed text-secondary-foreground">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">What We Collect</h2>
              <p>
                Scripture Simplified is designed with your privacy in mind. We collect
                as little data as possible:
              </p>
              <ul className="mt-2 ml-4 list-disc space-y-1">
                <li><strong className="text-foreground">No accounts required.</strong> You don&apos;t need to sign up or log in to use the app.</li>
                <li><strong className="text-foreground">Local storage only.</strong> Your bookmarks, reading progress, streaks, and preferences are stored on your device using your browser&apos;s local storage. We never see this data.</li>
                <li><strong className="text-foreground">No tracking or analytics.</strong> We do not use Google Analytics, Facebook Pixel, or any other tracking tools.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">AI Features</h2>
              <p>
                When you use &quot;Break It Down,&quot; word definitions, or chapter commentary,
                the verse text you selected is sent to OpenAI&apos;s API to generate a response.
                We do not store your requests or the AI responses on any server beyond
                temporary caching to reduce costs and improve speed. OpenAI&apos;s data usage
                policies apply to the processing of these requests.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Bible Text</h2>
              <p>
                Bible text is fetched from third-party APIs (bible-api.com and API.Bible)
                when you read chapters. These services may log standard web request data
                (like IP addresses) per their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Donations</h2>
              <p>
                Donations are processed through PayPal. We do not see or store your
                payment information. PayPal&apos;s privacy policy governs how your payment
                data is handled.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Cookies</h2>
              <p>
                We do not use cookies. All user preferences are stored in your
                browser&apos;s local storage, which stays on your device and is never
                transmitted to us.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Changes</h2>
              <p>
                If this policy changes, we&apos;ll update it here with a new date.
                For questions, reach out through the{" "}
                <Link href="/support" className="text-primary hover:underline">support page</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
