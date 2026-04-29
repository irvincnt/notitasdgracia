"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QuoteShareModal from "./quote-share-modal";

interface SelectionTriggerProps {
  title: string;
  slug: string;
}

interface TriggerState {
  quote: string;
  top: number;
  left: number;
}

const MIN_LENGTH = 15;
const MAX_LENGTH = 400;
const DEBOUNCE_MS = 150;

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function rangeInsideArticle(range: Range): boolean {
  const article = document.querySelector(".article-prose");
  if (!article) return false;
  const container = range.commonAncestorContainer;
  const element =
    container.nodeType === Node.ELEMENT_NODE
      ? (container as Element)
      : container.parentElement;
  return !!element && article.contains(element);
}

export default function SelectionTrigger({
  title,
  slug,
}: SelectionTriggerProps) {
  const [trigger, setTrigger] = useState<TriggerState | null>(null);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const debounceRef = useRef<number | null>(null);

  const evaluateSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setTrigger(null);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!rangeInsideArticle(range)) {
      setTrigger(null);
      return;
    }

    const quote = normalize(selection.toString());
    if (quote.length < MIN_LENGTH || quote.length > MAX_LENGTH) {
      setTrigger(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setTrigger(null);
      return;
    }

    const buttonHeight = 40;
    const gap = 10;
    const viewportTop = 12;
    const placeAbove = rect.top > buttonHeight + gap + viewportTop;
    const top = placeAbove ? rect.top - buttonHeight - gap : rect.bottom + gap;
    const left = Math.min(
      Math.max(rect.left + rect.width / 2, 90),
      window.innerWidth - 90,
    );

    setTrigger({ quote, top, left });
  }, []);

  useEffect(() => {
    const schedule = () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(evaluateSelection, DEBOUNCE_MS);
    };

    const clearIfOutsideButton = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && buttonRef.current?.contains(target)) return;
      schedule();
    };

    document.addEventListener("selectionchange", schedule);
    document.addEventListener("mouseup", clearIfOutsideButton);
    document.addEventListener("touchend", clearIfOutsideButton);
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      document.removeEventListener("selectionchange", schedule);
      document.removeEventListener("mouseup", clearIfOutsideButton);
      document.removeEventListener("touchend", clearIfOutsideButton);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [evaluateSelection]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTrigger(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleOpen = useCallback(() => {
    if (!trigger) return;
    setActiveQuote(trigger.quote);
    setTrigger(null);
    window.getSelection()?.removeAllRanges();
  }, [trigger]);

  const handleClose = useCallback(() => {
    setActiveQuote(null);
  }, []);

  return (
    <>
      {trigger && (
        <button
          ref={buttonRef}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleOpen}
          className="fixed z-[90] flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-background shadow-lg transition-transform hover:-translate-y-[1px] hover:-translate-x-1/2"
          style={{ top: trigger.top, left: trigger.left }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 8h10M7 12h6M5 20l3-3h11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l2 2z" />
          </svg>
          Generar cita
        </button>
      )}

      {activeQuote && (
        <QuoteShareModal
          quote={activeQuote}
          title={title}
          slug={slug}
          onClose={handleClose}
        />
      )}
    </>
  );
}
