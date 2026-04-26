import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Editor - TollyPups",
  description:
    "Edit PDFs in your browser. Add text, images, and redact content — no uploads required.",
};

export default function PdfEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`nav { display: none !important; } main { padding-top: 0 !important; }`}</style>
      {children}
    </>
  );
}
