import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

type BgVariant = "dark" | "cream" | "rose";
type RatioVariant = "vertical" | "instagram" | "square";

const BG_VARIANTS: Record<
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

const RATIO_DIMENSIONS: Record<
  RatioVariant,
  { width: number; height: number; padding: number; quoteSize: number }
> = {
  vertical: { width: 1080, height: 1920, padding: 110, quoteSize: 72 },
  instagram: { width: 1080, height: 1350, padding: 100, quoteSize: 64 },
  square: { width: 1080, height: 1080, padding: 96, quoteSize: 60 },
};

function parseBg(value: string | null): BgVariant {
  if (value === "cream" || value === "rose") return value;
  return "dark";
}

function parseRatio(value: string | null): RatioVariant {
  if (value === "vertical" || value === "square") return value;
  return "instagram";
}

function sanitizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function loadFont(filename: string): Buffer {
  const filePath = path.join(process.cwd(), "public", "fonts", filename);
  return fs.readFileSync(filePath);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawText = searchParams.get("text");
  if (!rawText) {
    return new Response("Missing text parameter", { status: 400 });
  }

  const text = sanitizeText(rawText);
  if (text.length < 15 || text.length > 400) {
    return new Response("Text length out of range (15-400)", { status: 400 });
  }

  const title = sanitizeText(searchParams.get("title") ?? "");
  const author = sanitizeText(searchParams.get("author") ?? "");
  const bg = parseBg(searchParams.get("bg"));
  const ratio = parseRatio(searchParams.get("ratio"));

  const colors = BG_VARIANTS[bg];
  const dims = RATIO_DIMENSIONS[ratio];

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://notitasdegracia.com";
  const domain = siteUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .toUpperCase();

  const playfairFont = loadFont("PlayfairDisplay-Bold.ttf");
  const interFont = loadFont("Inter-Regular.ttf");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: colors.bg,
        padding: dims.padding,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          fontFamily: "Playfair Display",
          fontSize: dims.quoteSize * 1.8,
          color: colors.accent,
          lineHeight: 1,
          opacity: 0.85,
        }}
      >
        “
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: dims.padding * 0.15,
          paddingRight: dims.padding * 0.15,
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display",
            fontSize: dims.quoteSize,
            lineHeight: 1.35,
            color: colors.fg,
            textAlign: "left",
            fontWeight: 700,
          }}
        >
          {text}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 72,
            height: 2,
            backgroundColor: colors.accent,
          }}
        />
        {author && (
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.fg,
              fontWeight: 500,
            }}
          >
            {author}
          </div>
        )}
        {title && (
          <div
            style={{
              fontSize: 24,
              color: colors.muted,
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 12,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: colors.muted,
              opacity: 0.85,
            }}
          >
            {domain}
          </div>
        </div>
      </div>
    </div>,
    {
      width: dims.width,
      height: dims.height,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairFont,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: interFont,
          weight: 400,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
