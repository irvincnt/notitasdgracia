"use client";

export type BgVariant = "dark" | "cream" | "rose";
export type RatioVariant = "vertical" | "instagram" | "square";

interface QuotePreviewProps {
  quote: string;
  title: string;
  author: string;
  bg: BgVariant;
  ratio: RatioVariant;
  domain: string;
}

const BG_STYLES: Record<
  BgVariant,
  { bg: string; fg: string; muted: string; accent: string }
> = {
  dark: {
    bg: "#1c1a18",
    fg: "#f5efe7",
    muted: "#c9bfb1",
    accent: "#d4a574",
  },
  cream: {
    bg: "#fff7ed",
    fg: "#1c1917",
    muted: "#78716c",
    accent: "#b8956a",
  },
  rose: {
    bg: "#e11d48",
    fg: "#fff7ed",
    muted: "#fecdd3",
    accent: "#ffe4e6",
  },
};

const RATIO_ASPECTS: Record<RatioVariant, string> = {
  vertical: "9 / 16",
  instagram: "4 / 5",
  square: "1 / 1",
};

export default function QuotePreview({
  quote,
  title,
  author,
  bg,
  ratio,
  domain,
}: QuotePreviewProps) {
  const colors = BG_STYLES[bg];
  const aspect = RATIO_ASPECTS[ratio];

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]"
      style={{
        aspectRatio: aspect,
        backgroundColor: colors.bg,
        color: colors.fg,
        containerType: "inline-size",
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-[8%]">
        <div
          className="font-playfair leading-none"
          style={{
            color: colors.accent,
            fontSize: "clamp(48px, 14cqw, 180px)",
            opacity: 0.85,
          }}
        >
          &ldquo;
        </div>

        <div className="flex flex-1 items-center">
          <p
            className="font-playfair font-bold leading-snug"
            style={{
              color: colors.fg,
              fontSize: "clamp(14px, 5cqw, 48px)",
            }}
          >
            {quote}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="h-[2px] w-12"
            style={{ backgroundColor: colors.accent }}
          />
          {author && (
            <div
              className="uppercase tracking-[0.2em]"
              style={{
                color: colors.fg,
                fontSize: "clamp(8px, 1.6cqw, 16px)",
              }}
            >
              {author}
            </div>
          )}
          {title && (
            <div
              style={{
                color: colors.muted,
                fontSize: "clamp(8px, 1.5cqw, 15px)",
                lineHeight: 1.3,
              }}
            >
              {title}
            </div>
          )}
          <div
            className="mt-2 self-end uppercase tracking-[0.25em]"
            style={{
              color: colors.muted,
              opacity: 0.85,
              fontSize: "clamp(7px, 1.2cqw, 12px)",
            }}
          >
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}
