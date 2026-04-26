"use client";

import dynamic from "next/dynamic";

const PdfEditor = dynamic(
  () => import("@/components/pdf_editor/pdf_Editor"),
  { ssr: false }
);

export default function PdfEditorPage() {
  return <PdfEditor />;
}
