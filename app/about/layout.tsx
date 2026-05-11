import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | TollyPips",
  description:
    "What TollyPips is, who it is for, how our tools work, and the ideas behind the platform — fast, free utilities for real work.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
