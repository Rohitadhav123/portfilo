import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohit Adhav — Full-Stack Web Developer",
  description:
    "Portfolio of Rohit Adhav, a Full-Stack Developer specializing in Next.js, React, Node.js, PostgreSQL, MongoDB and scalable web applications.",
  keywords: [
    "Rohit Adhav",
    "Full-Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Portfolio",
  ],
  authors: [{ name: "Rohit Adhav" }],
  creator: "Rohit Adhav",
  metadataBase: new URL("https://rohitadhav.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohitadhav.vercel.app",
    title: "Rohit Adhav — Full-Stack Web Developer",
    description:
      "Building scalable digital products with Next.js, React, Node.js and modern backend architecture.",
    siteName: "Rohit Adhav Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Adhav — Full-Stack Web Developer",
    description:
      "Building scalable digital products with Next.js, React, Node.js and modern backend architecture.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#07070A] text-[#F4F4F8] font-sans antialiased bg-noise selection:bg-[#8B5CF6]/30 selection:text-white">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
