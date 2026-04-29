"use client";

export type BgVariant = "retro" | "dark" | "cream" | "gold";
export type RatioVariant = "vertical" | "instagram" | "square";

interface QuotePreviewProps {
  quote: string;
  title: string;
  bg: BgVariant;
  ratio: RatioVariant;
  domain: string;
}

interface BgStyle {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  backgroundImage?: string;
}

const RETRO_GRADIENT =
  "radial-gradient(ellipse 55% 40% at 22% 22%, rgba(230, 238, 255, 0.75) 0%, rgba(230, 238, 255, 0) 65%), radial-gradient(ellipse 70% 55% at 85% 78%, rgba(255, 214, 170, 0.45) 0%, rgba(255, 214, 170, 0) 70%), radial-gradient(ellipse 45% 40% at 65% 15%, rgba(180, 200, 255, 0.4) 0%, rgba(180, 200, 255, 0) 65%), radial-gradient(circle at 15% 95%, rgba(100, 140, 230, 0.55) 0%, rgba(100, 140, 230, 0) 55%), linear-gradient(155deg, #1d3aa8 0%, #142780 35%, #0c1655 70%, #070f3a 100%)";

const BG_STYLES: Record<BgVariant, BgStyle> = {
  retro: {
    bg: "#0e1c5a",
    backgroundImage: RETRO_GRADIENT,
    fg: "#f5efe7",
    muted: "#c9d0f0",
    accent: "#f5deb3",
  },
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
  gold: {
    bg: "#c9a671",
    fg: "#1f1a12",
    muted: "#5c4a2e",
    accent: "#fff7ed",
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
        backgroundImage: colors.backgroundImage,
        color: colors.fg,
        containerType: "inline-size",
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-[8%]">
        <div
          className="leading-none"
          style={{
            color: colors.accent,
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(48px, 14cqw, 180px)",
            opacity: 0.9,
          }}
        >
          &ldquo;
        </div>

        <div className="flex flex-1 items-center">
          <p
            className="leading-snug"
            style={{
              color: colors.fg,
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(15px, 5.4cqw, 52px)",
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
          {title && (
            <div
              style={{
                color: colors.muted,
                fontSize: "clamp(8px, 1.6cqw, 16px)",
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
