import type { Metadata } from "next";
import { Bangers } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const bangersFont = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TollyPips - Ultimate Tools",
  description: "The ultimate tools bagpack for college students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bangersFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        <main className="grow pt-[80px]">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
