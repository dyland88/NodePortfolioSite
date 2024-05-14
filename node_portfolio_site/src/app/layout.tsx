import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dylan Coben | Software Developer",
  description:
    "Hi, I am Dylan, an honors software developer attending the University of Florida. I have experience in React, Next, C++, Python, and Java",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <SpeedInsights />
      <Suspense>
        <body className={inter.className}>{children}</body>
      </Suspense>
    </html>
  );
}
