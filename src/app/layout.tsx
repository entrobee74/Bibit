import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Bibit - Crypto Investment Platform",
  description: "Professional crypto trading and investment platform",
};

export const viewport = {
  themeColor: "#000000",
  userScalable: "no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
