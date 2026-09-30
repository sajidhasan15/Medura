import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Core Gutenberg block styles (front-end build of @wordpress/block-library).
// Keeps every block that comes out of WordPress — columns, galleries, tables,
// buttons, quotes, embeds, alignment classes — styled and correctly aligned.
import "@wordpress/block-library/build-style/style.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Metropolitan Health System",
    default: "Metropolitan Health System | Leading Patient Care & Medical Excellence",
  },
  description:
    "World-class hospital management system with specialized doctors, outpatient appointments, emergency care, and AI clinical triage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-[#0f4cda]">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
