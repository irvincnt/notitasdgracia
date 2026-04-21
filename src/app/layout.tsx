import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Playfair_Display } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "./components/theme-toggle";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://notitasdegracia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Notitas de Gracia - Devocionales de Fe",
  description:
    "Reflexiones diarias y devocionales para nutrir tu alma y fortalecer tu fe. Encuentra inspiración, esperanza y gracia en cada palabra.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Notitas de Gracia - Devocionales de Fe",
    description:
      "Reflexiones diarias y devocionales para nutrir tu alma y fortalecer tu fe. Encuentra inspiración, esperanza y gracia en cada palabra.",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/notitas-de-gracia-share.jpeg",
        width: 1024,
        height: 1024,
        alt: "Notitas de Gracia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notitas de Gracia - Devocionales de Fe",
    description:
      "Reflexiones diarias y devocionales para nutrir tu alma y fortalecer tu fe. Encuentra inspiración, esperanza y gracia en cada palabra.",
    images: ["/notitas-de-gracia-share.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${lora.variable} ${cormorant.variable} antialiased bg-background`}
      >
        {/* Header */}
        <header className="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-border">
          <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18 sm:h-20">
              <Link
                href="/"
                className="font-playfair text-xl sm:text-2xl font-bold tracking-tight text-foreground hover:text-gold-dark transition-colors"
              >
                Notitas <span className="text-gold">de Gracia</span>
              </Link>
              <div className="flex items-center gap-1 sm:gap-5">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  Inicio
                </Link>
                <Link
                  href="/blog"
                  className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  Reflexiones
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-cream border-t border-border mt-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Footer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-14 pb-14">
              <div>
                <h4 className="font-playfair text-foreground font-bold text-lg mb-4">
                  Notitas <span className="text-gold">de Gracia</span>
                </h4>
                <p className="text-muted text-sm leading-relaxed">
                  Devocionales y reflexiones para fortalecer tu fe, nutrir tu
                  alma y recordarte que la gracia de Dios es nueva cada mañana.
                </p>
                <a
                  href="https://www.instagram.com/notitasdegracia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2.5 text-muted/80 transition-colors hover:text-foreground/80 group"
                  aria-label="Instagram de Notitas de Gracia"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border/70 text-muted/75 transition-colors group-hover:border-gold/35 group-hover:text-gold/80">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <title>Instagram</title>
                      <rect
                        x="3.5"
                        y="3.5"
                        width="17"
                        height="17"
                        rx="5"
                        strokeWidth="1.8"
                      />
                      <circle cx="12" cy="12" r="4.1" strokeWidth="1.8" />
                      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="text-sm tracking-[0.01em]">
                    @notitasdegracia
                  </span>
                </a>
              </div>
              <div>
                <h4 className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-5">
                  Navegación
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-muted hover:text-foreground transition-colors text-sm"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-muted hover:text-foreground transition-colors text-sm"
                    >
                      Reflexiones
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-5">
                  Versículo del día
                </h4>
                <blockquote className="text-muted text-sm italic leading-relaxed border-l border-gold pl-4">
                  &ldquo;Porque por gracia ustedes han sido salvados mediante la
                  fe; esto no procede de ustedes, sino que es el regalo de
                  Dios.&rdquo;
                  <span className="block text-muted/60 mt-2 not-italic text-xs">
                    — Efesios 2:8
                  </span>
                </blockquote>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-border py-6 text-center">
              <p className="text-muted/60 text-xs tracking-wide">
                © {new Date().getFullYear()} Notitas de Gracia. Hecho con fe y
                amor.
              </p>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
