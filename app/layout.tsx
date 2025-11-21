import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import ScrollProgress from "../components/scroll-progress";
import BackToTop from "../components/back-to-top";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rayhanahmedshis.me"),
  title: {
    default: "Md. Rayhan Ahmed Shis — Full-Stack Developer",
    template: "%s — Rayhan Ahmed Shis",
  },
  description:
    "Full-stack developer crafting innovative web applications with blockchain and modern technologies.",
  openGraph: {
    title: "Md. Rayhan Ahmed Shis",
    description:
      "Full-stack developer crafting innovative web applications with blockchain and modern technologies.",
    url: "https://rayhanahmedshis.me",
    siteName: "Rayhan Ahmed Shis Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Md. Rayhan Ahmed Shis Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Rayhan Ahmed Shis",
    description:
      "Full-stack developer crafting innovative web applications with blockchain and modern technologies.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background text-foreground`}> 
        <ScrollProgress />
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
        <BackToTop />
      </body>
    </html>
  );
}
