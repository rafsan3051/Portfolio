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
    default: "Md. Rayhan Ahmed Shis — Developer / Technologist",
    template: "%s — MRAS",
  },
  description:
    "Passionate about building modern web experiences, automation, and emerging tech.",
  openGraph: {
    title: "Md. Rayhan Ahmed Shis",
    description:
      "Passionate about building modern web experiences, automation, and emerging tech.",
    url: "https://rayhanahmedshis.me",
    siteName: "MRAS Portfolio",
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
      "Passionate about building modern web experiences, automation, and emerging tech.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
