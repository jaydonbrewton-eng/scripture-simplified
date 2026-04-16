import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#60a5fa",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Scripture Simplified - Bible Study for Everyone",
  description:
    "Make the Bible digestible. Read in 16 translations, get AI-powered plain-language breakdowns, and find verses for what you're going through -- without losing a single drop of the message.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Scripture Simplified",
  },
  openGraph: {
    title: "Scripture Simplified",
    description: "The Bible made digestible for a new generation. Read it, understand it, live it.",
    type: "website",
    siteName: "Scripture Simplified",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scripture Simplified",
    description: "The Bible made digestible for a new generation. Read it, understand it, live it.",
  },
  keywords: ["Bible", "Bible study", "scripture", "Gen Z", "Bible app", "Bible translations", "NIV", "KJV", "NLT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
