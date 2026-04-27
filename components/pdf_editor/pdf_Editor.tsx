"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb, StandardFonts, PDFFont } from "pdf-lib";
import {
  Type,
  ImagePlus,
  Eraser,
  MousePointer2,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Trash2,
  X,
  Undo2,
  Redo2,
  RotateCcw,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import fontkit from "@pdf-lib/fontkit";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const generateId = () => Math.random().toString(36).substring(2, 11);

// --- Types ---
type ToolMode = "cursor" | "text" | "image" | "whiteout";

interface TextAnnotation {
  id: string;
  type: "text";
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fontFamily: "Helvetica" | "TimesRoman" | "Courier" | "Roboto" | "Montserrat" | "Poppins";
  color: string;
  page: number;
}

interface ImageAnnotation {
  id: string;
  type: "image";
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  page: number;
}

interface WhiteoutAnnotation {
  id: string;
  type: "whiteout";
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
}

type Annotation = TextAnnotation | ImageAnnotation | WhiteoutAnnotation;

// --- Toolbar Button ---
function ToolBtn({
  active,
  onClick,
  children,
  label,
  color = "bg-white",
  disabled = false,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      disabled={disabled}
      className={`shrink-0 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl border-3 border-black font-black uppercase tracking-wider text-xs md:text-sm transition-all duration-200 ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 shadow-none border-gray-500"
          : active
          ? "bg-pink-400 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5"
          : `${color} text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5`
      }`}
    >
      {children}
      {label && <span className="hidden md:inline">{label}</span>}
    </button>
  );
}

// --- Main Component ---
export default function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [fileBytes, setFileBytes] = useState<ArrayBuffer | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return 0.6;
    return 1.2;
  });
  const [tool, setTool] = useState<ToolMode>("cursor");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [drawCurrent, setDrawCurrent] = useState<{ x: number; y: number } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [textFontSize, setTextFontSize] = useState(16);
  const [textFontFamily, setTextFontFamily] = useState<"Helvetica" | "TimesRoman" | "Courier" | "Roboto" | "Montserrat" | "Poppins">("Helvetica");
  const [textColor, setTextColor] = useState("#000000");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; w: number; h: number; ax: number; ay: number; fontSize?: number } | null>(null);

  // --- Pinch-to-Zoom Refs ---
  const initialPinchDist = useRef<number | null>(null);
  const initialFontSize = useRef<number | null>(null);

  // --- Undo / Redo State ---
  const [history, setHistory] = useState<Annotation[][]>([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const historyRef = useRef<Annotation[][]>([[]]);
  const historyStepRef = useRef<number>(0);

  useEffect(() => {
    historyRef.current = history;
    historyStepRef.current = historyStep;
  }, [history, historyStep]);

  const commitAnnotations = useCallback((nextState: Annotation[]) => {
    const currentHistory = historyRef.current;
    const currentStep = historyStepRef.current;
    if (JSON.stringify(currentHistory[currentStep]) === JSON.stringify(nextState)) return;
    const newHistory = currentHistory.slice(0, currentStep + 1);
    newHistory.push(nextState);
    setHistory(newHistory);
    setHistoryStep(currentStep + 1);
  }, []);

  const setAnnotationsAndCommit = useCallback((action: React.SetStateAction<Annotation[]>) => {
    setAnnotations((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      setTimeout(() => commitAnnotations(next), 0);
      return next;
    });
  }, [commitAnnotations]);

  const handleUndo = useCallback(() => {
    if (historyStepRef.current > 0) {
      const newStep = historyStepRef.current - 1;
      setHistoryStep(newStep);
      setAnnotations(historyRef.current[newStep]);
      setSelectedId(null);
      setEditingId(null);
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (historyStepRef.current < historyRef.current.length - 1) {
      const newStep = historyStepRef.current + 1;
      setHistoryStep(newStep);
      setAnnotations(historyRef.current[newStep]);
      setSelectedId(null);
      setEditingId(null);
    }
  }, []);

  const clearAll = useCallback(() => {
    setAnnotationsAndCommit([]);
    setSelectedId(null);
    setEditingId(null);
  }, [setAnnotationsAndCommit]);
  // -------------------------

  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === "application/pdf") {
      setFile(f);
      f.arrayBuffer().then((buf) => setFileBytes(buf));
      setAnnotations([]);
      setHistory([[]]);
      setHistoryStep(0);
      setCurrentPage(1);
      setSelectedId(null);
    }
  };

  // Drop handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type === "application/pdf") {
      setFile(f);
      f.arrayBuffer().then((buf) => setFileBytes(buf));
      setAnnotations([]);
      setHistory([[]]);
      setHistoryStep(0);
      setCurrentPage(1);
    }
  };

  const onDocumentLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
  }, []);

  // Get click position relative to the page canvas
  const getRelPos = (e: React.PointerEvent) => {
    const rect = pageWrapperRef.current?.querySelector(".react-pdf__Page")?.getBoundingClientRect();
    if (!rect) return null;
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // Stop editing and remove the annotation if its text is empty
  const stopEditing = useCallback(() => {
    setAnnotationsAndCommit((prev) => prev.filter((a) => !(a.type === "text" && (a as TextAnnotation).text.trim() === "")));
    setEditingId(null);
  }, [setAnnotationsAndCommit, setEditingId]);

  // --- Page overlay click ---
  const handleOverlayPointerDown = (e: React.PointerEvent) => {
    const pos = getRelPos(e);
    if (!pos) return;

    // Clean up any empty text annotations first
    stopEditing();

    if (tool === "text") {
      const id = `text-${generateId()}`;
      setAnnotations((prev) => [
        // filter out empty texts from previous clicks
        ...prev.filter((a) => !(a.type === "text" && (a as TextAnnotation).text.trim() === "")),
        {
          id,
          type: "text",
          x: pos.x,
          y: pos.y,
          text: "",
          fontSize: textFontSize,
          fontFamily: textFontFamily,
          color: textColor,
          page: currentPage,
        },
      ]);
      setEditingId(id);
      setSelectedId(id);
    } else if (tool === "whiteout") {
      setDrawStart(pos);
      setDrawCurrent(pos);
    } else if (tool === "image") {
      imageInputRef.current?.click();
      // store click position for image placement
      (imageInputRef.current as HTMLInputElement & { _pos?: { x: number; y: number } })._pos = pos;
    } else if (tool === "cursor") {
      setSelectedId(null);
    }
  };

  const handleOverlayPointerMove = (e: React.PointerEvent) => {
    if (tool === "whiteout" && drawStart && !isDragging && !isResizing) {
      const pos = getRelPos(e);
      if (pos) setDrawCurrent(pos);
    }
    if (isResizing && selectedId && resizeStart && resizeCorner) {
      const pos = getRelPos(e);
      if (!pos) return;
      const dx = pos.x - resizeStart.x;
      const dy = pos.y - resizeStart.y;
      setAnnotations((prev) =>
        prev.map((a) => {
          if (a.id !== selectedId) return a;
          if (a.type === "image") {
            const img = a as ImageAnnotation;
            let newW = resizeStart.w;
            let newH = resizeStart.h;
            let newX = resizeStart.ax;
            let newY = resizeStart.ay;
            if (resizeCorner === "se") { newW = Math.max(30, resizeStart.w + dx); newH = Math.max(30, resizeStart.h + dy); }
            else if (resizeCorner === "sw") { newW = Math.max(30, resizeStart.w - dx); newH = Math.max(30, resizeStart.h + dy); newX = resizeStart.ax + (resizeStart.w - newW); }
            else if (resizeCorner === "ne") { newW = Math.max(30, resizeStart.w + dx); newH = Math.max(30, resizeStart.h - dy); newY = resizeStart.ay + (resizeStart.h - newH); }
            else if (resizeCorner === "nw") { newW = Math.max(30, resizeStart.w - dx); newH = Math.max(30, resizeStart.h - dy); newX = resizeStart.ax + (resizeStart.w - newW); newY = resizeStart.ay + (resizeStart.h - newH); }
            return { ...img, x: newX, y: newY, width: newW, height: newH };
          } else if (a.type === "text") {
            const txt = a as TextAnnotation;
            let dSize = 0;
            if (resizeCorner === "se") dSize = dy;
            else if (resizeCorner === "sw") dSize = dy;
            else if (resizeCorner === "ne") dSize = -dy;
            else if (resizeCorner === "nw") dSize = -dy;
            const newSize = Math.max(8, (resizeStart.fontSize || 16) + dSize * 0.5);
            return { ...txt, fontSize: newSize };
          }
          return a;
        })
      );
      return;
    }
    if (isDragging && selectedId) {
      const pos = getRelPos(e);
      if (!pos) return;
      setAnnotations((prev) =>
        prev.map((a) =>
          a.id === selectedId ? { ...a, x: pos.x - dragOffset.x, y: pos.y - dragOffset.y } : a
        )
      );
    }
  };

  const handleOverlayPointerUp = () => {
    if (tool === "whiteout" && drawStart && drawCurrent) {
      const x = Math.min(drawStart.x, drawCurrent.x);
      const y = Math.min(drawStart.y, drawCurrent.y);
      const w = Math.abs(drawCurrent.x - drawStart.x);
      const h = Math.abs(drawCurrent.y - drawStart.y);
      if (w > 5 && h > 5) {
        setAnnotationsAndCommit((prev) => [
          ...prev,
          { id: `wo-${generateId()}`, type: "whiteout", x, y, width: w, height: h, page: currentPage },
        ]);
      }
      setDrawStart(null);
      setDrawCurrent(null);
    } else if (isDragging || isResizing) {
      setAnnotationsAndCommit((prev) => prev);
    }
    setIsDragging(false);
    setIsResizing(false);
    setResizeCorner(null);
    setResizeStart(null);
  };

  // Image upload callback
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const pos = (imageInputRef.current as HTMLInputElement & { _pos?: { x: number; y: number } })?._pos || { x: 50, y: 50 };
      const img = new window.Image();
      img.onload = () => {
        const maxW = 200;
        const ratio = img.height / img.width;
        setAnnotationsAndCommit((prev) => [
          ...prev,
          {
            id: `img-${generateId()}`,
            type: "image",
            x: pos.x,
            y: pos.y,
            width: maxW,
            height: maxW * ratio,
            src: reader.result as string,
            page: currentPage,
          },
        ]);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(f);
    e.target.value = "";
  };

  // Annotation click (select/drag) — works in any tool mode
  const handleAnnotationPointerDown = (e: React.PointerEvent, ann: Annotation) => {
    e.stopPropagation();

    // If we're already editing this annotation's text, don't interfere
    if (editingId === ann.id) return;

    // If in text mode and clicking an existing text annotation → enter edit mode
    if (tool === "text" && ann.type === "text") {
      setSelectedId(ann.id);
      setEditingId(ann.id);
      return;
    }

    setSelectedId(ann.id);
    setEditingId(null);
    const pos = getRelPos(e);
    if (pos) {
      setIsDragging(true);
      setDragOffset({ x: pos.x - ann.x, y: pos.y - ann.y });
    }
  };

  // Resize handle mousedown
  const handleResizePointerDown = (e: React.PointerEvent, ann: ImageAnnotation | TextAnnotation, corner: string) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(ann.id);
    setIsResizing(true);
    setResizeCorner(corner);
    const pos = getRelPos(e);
    if (pos) {
      if (ann.type === "image") {
        setResizeStart({ x: pos.x, y: pos.y, w: ann.width, h: ann.height, ax: ann.x, ay: ann.y });
      } else {
        setResizeStart({ x: pos.x, y: pos.y, w: 0, h: 0, ax: ann.x, ay: ann.y, fontSize: ann.fontSize });
      }
    }
  };

  const handleTextTouchStart = (e: React.TouchEvent, ann: TextAnnotation) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      initialPinchDist.current = dist;
      initialFontSize.current = ann.fontSize;
      setSelectedId(ann.id);
      e.stopPropagation();
    }
  };

  const handleTextTouchMove = (e: React.TouchEvent, ann: TextAnnotation) => {
    if (e.touches.length === 2 && initialPinchDist.current && initialFontSize.current) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const scale = dist / initialPinchDist.current;
      const newSize = Math.max(8, initialFontSize.current * scale);
      setAnnotations(prev => prev.map(a => a.id === ann.id ? { ...a, fontSize: newSize } : a));
      e.stopPropagation();
    }
  };

  const handleTextTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2 && initialPinchDist.current) {
      initialPinchDist.current = null;
      setAnnotationsAndCommit(prev => prev);
    }
  };

  // Delete selected
  const deleteSelected = useCallback(() => {
    if (selectedId) {
      setAnnotationsAndCommit((prev) => prev.filter((a) => a.id !== selectedId));
      setSelectedId(null);
      setEditingId(null);
    }
  }, [selectedId, setAnnotationsAndCommit, setSelectedId, setEditingId]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        if (editingId) return; // don't delete while typing
        deleteSelected();
      }
      if (e.key === "Escape") {
        stopEditing();
        setSelectedId(null);
        setTool("cursor");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [deleteSelected, editingId, stopEditing, handleUndo, handleRedo]);

  // --- EXPORT ---
  const handleExport = async () => {
    if (!fileBytes) return;
    setIsExporting(true);
    try {
      const pdfDoc = await PDFDocument.load(fileBytes);
      pdfDoc.registerFontkit(fontkit);

      const fonts: Record<string, PDFFont> = {
        Helvetica: await pdfDoc.embedFont(StandardFonts.Helvetica),
        TimesRoman: await pdfDoc.embedFont(StandardFonts.TimesRoman),
        Courier: await pdfDoc.embedFont(StandardFonts.Courier),
      };

      // Helper to fetch and embed custom TTF fonts
      const loadCustomFont = async (name: string, path: string) => {
        if (!fonts[name]) {
          const res = await fetch(path);
          const fontBytes = await res.arrayBuffer();
          fonts[name] = await pdfDoc.embedFont(fontBytes);
        }
      };

      for (const ann of annotations) {
        if (ann.type === "text") {
          const txtAnn = ann as TextAnnotation;
          if (txtAnn.fontFamily === "Roboto") await loadCustomFont("Roboto", "/fonts/Roboto-Regular.ttf");
          else if (txtAnn.fontFamily === "Montserrat") await loadCustomFont("Montserrat", "/fonts/Montserrat-Regular.ttf");
          else if (txtAnn.fontFamily === "Poppins") await loadCustomFont("Poppins", "/fonts/Poppins-Regular.ttf");
        }
      }

      for (const ann of annotations) {
        const pageIndex = ann.page - 1;
        if (pageIndex < 0 || pageIndex >= pdfDoc.getPageCount()) continue;
        const page = pdfDoc.getPage(pageIndex);
        const { width: pw, height: ph } = page.getSize();

        // Get rendered page dimensions for coordinate mapping
        const renderedEl = pageWrapperRef.current?.querySelector(".react-pdf__Page");
        const rw = renderedEl?.clientWidth || pw;
        const rh = renderedEl?.clientHeight || ph;
        const sx = pw / rw;
        const sy = ph / rh;

        if (ann.type === "whiteout") {
          page.drawRectangle({
            x: ann.x * sx,
            y: ph - (ann.y + ann.height) * sy,
            width: ann.width * sx,
            height: ann.height * sy,
            color: rgb(1, 1, 1),
          });
        } else if (ann.type === "text") {
          const hex = ann.color.replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16) / 255;
          const g = parseInt(hex.substring(2, 4), 16) / 255;
          const b = parseInt(hex.substring(4, 6), 16) / 255;
          page.drawText(ann.text, {
            x: ann.x * sx,
            y: ph - ann.y * sy - ann.fontSize * sy,
            size: ann.fontSize * sx,
            font: fonts[ann.fontFamily] || fonts.Helvetica,
            color: rgb(r, g, b),
          });
        } else if (ann.type === "image") {
          const res = await fetch(ann.src);
          const imgBytes = await res.arrayBuffer();
          let embeddedImg;
          if (ann.src.includes("image/png")) {
            embeddedImg = await pdfDoc.embedPng(imgBytes);
          } else {
            embeddedImg = await pdfDoc.embedJpg(imgBytes);
          }
          page.drawImage(embeddedImg, {
            x: ann.x * sx,
            y: ph - (ann.y + ann.height) * sy,
            width: ann.width * sx,
            height: ann.height * sy,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file?.name?.replace(".pdf", "-edited.pdf") || "edited.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Check console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  const pageAnnotations = annotations.filter((a) => a.page === currentPage);

  // --- Render ---
  if (!file) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="cursor-pointer flex flex-col items-center justify-center gap-6 w-full max-w-xl h-80 border-4 border-dashed border-foreground rounded-3xl bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
        >
          <div className="w-24 h-24 bg-pink-400 border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Upload className="w-12 h-12 text-black" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black uppercase tracking-widest text-foreground">
              Drop your PDF here
            </p>
            <p
              className="text-lg font-bold text-foreground/60 mt-2"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              or click to browse
            </p>
          </div>
          <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="flex overflow-x-auto items-center gap-2 px-2 md:px-4 py-2 md:py-3 border-b-4 border-foreground bg-green-200 dark:bg-green-900/40 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Tool Modes */}
        <ToolBtn active={tool === "cursor"} onClick={() => setTool("cursor")} label="Select">
          <MousePointer2 size={18} strokeWidth={2.5} />
        </ToolBtn>
        <ToolBtn active={tool === "text"} onClick={() => setTool("text")} label="Text">
          <Type size={18} strokeWidth={2.5} />
        </ToolBtn>
        <ToolBtn active={tool === "image"} onClick={() => setTool("image")} label="Image">
          <ImagePlus size={18} strokeWidth={2.5} />
        </ToolBtn>
        <ToolBtn active={tool === "whiteout"} onClick={() => setTool("whiteout")} label="White-out">
          <Eraser size={18} strokeWidth={2.5} />
        </ToolBtn>

        <div className="shrink-0 w-px h-8 bg-foreground/30 mx-1" />

        {/* Text Options (visible when text tool active) */}
        {tool === "text" && (
          <div className="flex items-center gap-2">
            <select
              value={textFontFamily}
              onChange={(e) => setTextFontFamily(e.target.value as "Helvetica" | "TimesRoman" | "Courier" | "Roboto" | "Montserrat" | "Poppins")}
              className="px-2 py-1.5 rounded-lg border-3 border-black bg-white text-black font-bold text-sm max-w-[100px] truncate"
            >
              <option value="Helvetica">Sans</option>
              <option value="TimesRoman">Serif</option>
              <option value="Courier">Mono</option>
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
            </select>
            <select
              value={textFontSize}
              onChange={(e) => setTextFontSize(Number(e.target.value))}
              className="px-2 py-1.5 rounded-lg border-3 border-black bg-white text-black font-bold text-sm"
            >
              {[10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48].map((s) => (
                <option key={s} value={s}>
                  {s}px
                </option>
              ))}
            </select>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="shrink-0 w-9 h-9 rounded-lg border-3 border-black cursor-pointer"
            />
          </div>
        )}

        {/* Delete selected */}
        {selectedId && (
          <ToolBtn onClick={deleteSelected} label="Delete" color="bg-red-300">
            <Trash2 size={18} strokeWidth={2.5} />
          </ToolBtn>
        )}

        <div className="grow" />

        {/* Undo / Redo */}
        <ToolBtn onClick={handleUndo} label="Undo" disabled={historyStep === 0}>
          <Undo2 size={18} strokeWidth={2.5} />
        </ToolBtn>
        <ToolBtn onClick={handleRedo} label="Redo" disabled={historyStep === history.length - 1}>
          <Redo2 size={18} strokeWidth={2.5} />
        </ToolBtn>
        <ToolBtn onClick={clearAll} label="Clear" disabled={annotations.length === 0} color="bg-orange-300">
          <RotateCcw size={18} strokeWidth={2.5} />
        </ToolBtn>

        <div className="shrink-0 w-px h-8 bg-foreground/30 mx-1" />

        {/* Zoom */}
        <ToolBtn onClick={() => setScale((s) => Math.max(0.5, s - 0.2))} label="">
          <ZoomOut size={18} strokeWidth={2.5} />
        </ToolBtn>
        <span className="shrink-0 font-black text-sm text-foreground tabular-nums min-w-14 text-center">
          {Math.round(scale * 100)}%
        </span>
        <ToolBtn onClick={() => setScale((s) => Math.min(3, s + 0.2))} label="">
          <ZoomIn size={18} strokeWidth={2.5} />
        </ToolBtn>

        <div className="shrink-0 w-px h-8 bg-foreground/30 mx-1" />

        {/* Export */}
        <ToolBtn onClick={handleExport} label={isExporting ? "Saving..." : "Export"} color="bg-yellow-400">
          <Download size={18} strokeWidth={2.5} />
        </ToolBtn>

        {/* New file */}
        <ToolBtn
          onClick={() => {
            setFile(null);
            setFileBytes(null);
            setAnnotations([]);
            setHistory([[]]);
            setHistoryStep(0);
          }}
          label="New"
          color="bg-blue-300"
        >
          <X size={18} strokeWidth={2.5} />
        </ToolBtn>
      </div>

      {/* Main Canvas Area */}
      <div 
        className="flex-1 overflow-auto bg-[#e5e5e5] dark:bg-[#1a1a1a] flex justify-center py-8"
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            setTool("cursor");
            setSelectedId(null);
            stopEditing();
          }
        }}
      >
        <div
          ref={pageWrapperRef}
          className={`relative inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] ${tool !== "cursor" ? "touch-none" : ""}`}
          style={{ cursor: tool === "text" ? "text" : tool === "whiteout" ? "crosshair" : tool === "image" ? "copy" : "default" }}
          onPointerDown={handleOverlayPointerDown}
          onPointerMove={handleOverlayPointerMove}
          onPointerUp={handleOverlayPointerUp}
          onPointerCancel={handleOverlayPointerUp}
        >
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={currentPage} scale={scale} />
          </Document>

          {/* Annotation Overlay - z-10 to sit above react-pdf text layer */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {pageAnnotations.map((ann) => {
              if (ann.type === "whiteout") {
                return (
                  <div
                    key={ann.id}
                    onPointerDown={(e) => handleAnnotationPointerDown(e, ann)}
                    className={`absolute bg-white pointer-events-auto touch-none ${
                      selectedId === ann.id ? "ring-2 ring-pink-500 ring-offset-1" : ""
                    }`}
                    style={{ left: ann.x, top: ann.y, width: ann.width, height: ann.height }}
                  />
                );
              }
              if (ann.type === "text") {
                const isSelected = selectedId === ann.id;
                return (
                  <div
                    key={ann.id}
                    onPointerDown={(e) => handleAnnotationPointerDown(e, ann)}
                    onTouchStart={(e) => handleTextTouchStart(e, ann as TextAnnotation)}
                    onTouchMove={(e) => handleTextTouchMove(e, ann as TextAnnotation)}
                    onTouchEnd={handleTextTouchEnd}
                    className={`absolute pointer-events-auto cursor-move p-1 rounded touch-none ${
                      isSelected ? "ring-2 ring-pink-500 ring-offset-1 bg-pink-50/30" : "hover:bg-blue-50/30"
                    }`}
                    style={{ left: ann.x - 4, top: ann.y - 4, minWidth: 30, minHeight: 20 }}
                  >
                    {editingId === ann.id ? (
                      <textarea
                        ref={(el) => { if (el) setTimeout(() => el.focus(), 0); }}
                        value={ann.text}
                        placeholder="Type here..."
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          setAnnotations((prev) =>
                            prev.map((a) => (a.id === ann.id ? { ...a, text: e.target.value } : a))
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Escape") stopEditing();
                          e.stopPropagation();
                        }}
                        className="bg-yellow-100/80 border-2 border-pink-400 outline-none resize-both min-w-[120px] min-h-[40px] p-2 rounded"
                        style={{
                          fontSize: ann.fontSize,
                          color: ann.color,
                          fontFamily: ann.fontFamily === "TimesRoman" ? "Times New Roman, serif" : ann.fontFamily === "Courier" ? "Courier New, monospace" : ann.fontFamily === "Roboto" ? "'Roboto', sans-serif" : ann.fontFamily === "Montserrat" ? "'Montserrat', sans-serif" : ann.fontFamily === "Poppins" ? "'Poppins', sans-serif" : "Helvetica, Arial, sans-serif",
                        }}
                      />
                    ) : (
                      <span
                        className="whitespace-pre-wrap select-none cursor-move"
                        style={{
                          fontSize: ann.fontSize,
                          color: ann.color,
                          fontFamily: ann.fontFamily === "TimesRoman" ? "Times New Roman, serif" : ann.fontFamily === "Courier" ? "Courier New, monospace" : ann.fontFamily === "Roboto" ? "'Roboto', sans-serif" : ann.fontFamily === "Montserrat" ? "'Montserrat', sans-serif" : ann.fontFamily === "Poppins" ? "'Poppins', sans-serif" : "Helvetica, Arial, sans-serif",
                        }}
                      >
                        {ann.text || "(click to edit)"}
                      </span>
                    )}
                    {isSelected && editingId !== ann.id && (
                      <>
                        {["nw", "ne", "sw", "se"].map((corner) => (
                          <div
                            key={corner}
                            onPointerDown={(e) => handleResizePointerDown(e, ann as TextAnnotation, corner)}
                            className="absolute w-4 h-4 bg-pink-500 border-2 border-white rounded-full shadow-md z-20"
                            style={{
                              cursor: corner === "nw" || corner === "se" ? "nwse-resize" : "nesw-resize",
                              top: corner.startsWith("n") ? -6 : undefined,
                              bottom: corner.startsWith("s") ? -6 : undefined,
                              left: corner.endsWith("w") ? -6 : undefined,
                              right: corner.endsWith("e") ? -6 : undefined,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                );
              }
              if (ann.type === "image") {
                const isSelected = selectedId === ann.id;
                return (
                  <div
                    key={ann.id}
                    onPointerDown={(e) => handleAnnotationPointerDown(e, ann)}
                    className={`absolute pointer-events-auto cursor-move rounded touch-none ${
                      isSelected ? "ring-2 ring-pink-500 ring-offset-2 shadow-lg" : "hover:ring-2 hover:ring-blue-400 hover:ring-offset-1"
                    }`}
                    style={{ left: ann.x, top: ann.y, width: ann.width, height: ann.height }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ann.src}
                      alt="annotation"
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                    {/* Resize handles */}
                    {isSelected && (
                      <>
                        {["nw", "ne", "sw", "se"].map((corner) => (
                          <div
                            key={corner}
                            onPointerDown={(e) => handleResizePointerDown(e, ann as ImageAnnotation, corner)}
                            className="absolute w-5 h-5 bg-pink-500 border-2 border-white rounded-full shadow-md z-20"
                            style={{
                              cursor: corner === "nw" || corner === "se" ? "nwse-resize" : "nesw-resize",
                              top: corner.startsWith("n") ? -8 : undefined,
                              bottom: corner.startsWith("s") ? -8 : undefined,
                              left: corner.endsWith("w") ? -8 : undefined,
                              right: corner.endsWith("e") ? -8 : undefined,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                );
              }
              return null;
            })}

            {/* Drawing preview for whiteout */}
            {tool === "whiteout" && drawStart && drawCurrent && (
              <div
                className="absolute bg-white/70 border-2 border-dashed border-pink-500"
                style={{
                  left: Math.min(drawStart.x, drawCurrent.x),
                  top: Math.min(drawStart.y, drawCurrent.y),
                  width: Math.abs(drawCurrent.x - drawStart.x),
                  height: Math.abs(drawCurrent.y - drawStart.y),
                }}
              />
            )}
          </div>
        </div>

        {/* Hidden image input */}
        <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      {/* Bottom Page Nav */}
      <div className="flex items-center justify-center gap-4 px-4 py-3 border-t-4 border-foreground bg-blue-200 dark:bg-blue-900/40">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="p-2 rounded-xl border-3 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:shadow-none hover:-translate-y-0.5 transition-all"
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
        <span className="font-black text-lg tracking-widest text-foreground uppercase">
          Page {currentPage} / {numPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
          disabled={currentPage >= numPages}
          className="p-2 rounded-xl border-3 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:shadow-none hover:-translate-y-0.5 transition-all"
        >
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
