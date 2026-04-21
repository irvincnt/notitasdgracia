import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

type BgVariant = "retro" | "dark" | "cream" | "gold";
type RatioVariant = "vertical" | "instagram" | "square";

interface BgStyle {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  backgroundImage?: string;
}

const RETRO_GRADIENT =
  "radial-gradient(ellipse 55% 40% at 22% 22%, rgba(230, 238, 255, 0.75) 0%, rgba(230, 238, 255, 0) 65%), radial-gradient(ellipse 70% 55% at 85% 78%, rgba(255, 214, 170, 0.45) 0%, rgba(255, 214, 170, 0) 70%), radial-gradient(ellipse 45% 40% at 65% 15%, rgba(180, 200, 255, 0.4) 0%, rgba(180, 200, 255, 0) 65%), radial-gradient(circle at 15% 95%, rgba(100, 140, 230, 0.55) 0%, rgba(100, 140, 230, 0) 55%), linear-gradient(155deg, #1d3aa8 0%, #142780 35%, #0c1655 70%, #070f3a 100%)";

const BG_VARIANTS: Record<BgVariant, BgStyle> = {
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

const RATIO_DIMENSIONS: Record<
  RatioVariant,
  { width: number; height: number; padding: number; quoteSize: number }
> = {
  vertical: { width: 1080, height: 1920, padding: 110, quoteSize: 76 },
  instagram: { width: 1080, height: 1350, padding: 100, quoteSize: 68 },
  square: { width: 1080, height: 1080, padding: 96, quoteSize: 62 },
};

function parseBg(value: string | null): BgVariant {
  if (value === "dark" || value === "cream" || value === "gold") return value;
  return "retro";
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

  const cormorantFont = loadFont("CormorantGaramond-Italic.ttf");
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
        backgroundImage: colors.backgroundImage,
        padding: dims.padding,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          fontFamily: "Cormorant Garamond",
          fontStyle: "italic",
          fontSize: dims.quoteSize * 2,
          color: colors.accent,
          lineHeight: 1,
          opacity: 0.9,
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
          paddingLeft: dims.padding * 0.1,
          paddingRight: dims.padding * 0.1,
        }}
      >
        <div
          style={{
            fontFamily: "Cormorant Garamond",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: dims.quoteSize,
            lineHeight: 1.3,
            color: colors.fg,
            textAlign: "left",
          }}
        >
          {text}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 72,
            height: 2,
            backgroundColor: colors.accent,
          }}
        />
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
          name: "Cormorant Garamond",
          data: cormorantFont,
          weight: 600,
          style: "italic",
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
