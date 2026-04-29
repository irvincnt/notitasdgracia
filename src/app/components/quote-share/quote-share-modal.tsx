"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import QuotePreview, {
  type BgVariant,
  type RatioVariant,
} from "./quote-preview";

interface QuoteShareModalProps {
  quote: string;
  title: string;
  slug: string;
  onClose: () => void;
}

const BG_OPTIONS: Array<{ id: BgVariant; swatch: string; label: string }> = [
  {
    id: "retro",
    swatch:
      "radial-gradient(ellipse at 30% 30%, rgba(220, 230, 255, 0.5) 0%, transparent 60%), linear-gradient(155deg, #142a7a 0%, #0a1548 100%)",
    label: "Fondo retro",
  },
  { id: "dark", swatch: "#1c1a18", label: "Fondo oscuro" },
  { id: "cream", swatch: "#fff7ed", label: "Fondo claro" },
  { id: "gold", swatch: "#c9a671", label: "Fondo dorado" },
];

const RATIO_OPTIONS: Array<{ id: RatioVariant; label: string; hint: string }> =
  [
    { id: "vertical", label: "Vertical", hint: "9:16" },
    { id: "instagram", label: "Instagram", hint: "4:5" },
    { id: "square", label: "Cuadrado", hint: "1:1" },
  ];

function getDomain(): string {
  if (typeof window === "undefined") return "notitasdegracia.com";
  return window.location.host;
}

export default function QuoteShareModal({
  quote,
  title,
  slug,
  onClose,
}: QuoteShareModalProps) {
  const [bg, setBg] = useState<BgVariant>("retro");
  const [ratio, setRatio] = useState<RatioVariant>("instagram");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const domain = useMemo(() => getDomain(), []);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        text: quote,
        title,
        slug,
        bg,
        ratio,
      });
      const res = await fetch(`/api/quote-og?${params.toString()}`);
      if (!res.ok) throw new Error("No se pudo generar la imagen");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cita-${slug}-${ratio}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (_err) {
      setError("Ocurrió un error al descargar. Intenta de nuevo.");
    } finally {
      setDownloading(false);
    }
  }, [quote, title, slug, bg, ratio]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-share-title"
    >
      <button
        type="button"
        aria-label="Cerrar modal"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-border bg-cream shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2
            id="quote-share-title"
            className="font-playfair text-lg font-bold text-foreground"
          >
            Generar cita
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-background hover:text-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6 p-5 sm:p-6">
          <div className="mx-auto w-full max-w-[300px]">
            <QuotePreview
              quote={quote}
              title={title}
              bg={bg}
              ratio={ratio}
              domain={domain.toUpperCase()}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.15em] text-gold">
              Fondo
            </span>
            <div className="flex items-center gap-3">
              {BG_OPTIONS.map((option) => {
                const selected = bg === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setBg(option.id)}
                    aria-label={option.label}
                    aria-pressed={selected}
                    className={`relative h-10 w-10 rounded-full border transition-all ${
                      selected
                        ? "border-foreground scale-105"
                        : "border-border hover:border-foreground/40"
                    }`}
                    style={{ background: option.swatch }}
                  >
                    {selected && (
                      <svg
                        viewBox="0 0 24 24"
                        className="absolute inset-0 m-auto h-4 w-4"
                        fill="none"
                        stroke={option.id === "cream" ? "#1c1917" : "#ffffff"}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.15em] text-gold">
              Formato
            </span>
            <div className="flex flex-wrap gap-2">
              {RATIO_OPTIONS.map((option) => {
                const selected = ratio === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setRatio(option.id)}
                    aria-pressed={selected}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                    <span
                      className={`text-xs ${
                        selected ? "text-background/70" : "text-foreground/40"
                      }`}
                    >
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-rose-deep">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-sm font-medium uppercase leading-none tracking-[0.12em] text-background transition-opacity hover:opacity-90 disabled:opacity-60 [isolation:isolate]"
          >
            {downloading ? (
              <svg
                key="spinner"
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="2.5"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                key="download"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
              </svg>
            )}
            <span className="whitespace-nowrap">
              {downloading ? "Generando…" : "Descargar"}
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
