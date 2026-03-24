import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Notitas de Gracia - Devocionales de Fe",
  description:
    "Reflexiones diarias y devocionales para nutrir tu alma y fortalecer tu fe. Encuentra inspiración, esperanza y gracia en cada palabra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lora.variable} antialiased bg-background`}
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
              <div className="flex items-center gap-1 sm:gap-6">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Inicio
                </Link>
                <Link
                  href="/blog"
                  className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Reflexiones
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-foreground text-white/70 mt-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Footer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-14 pb-14">
              <div>
                <h4 className="font-playfair text-white font-bold text-lg mb-4">
                  Notitas <span className="text-gold">de Gracia</span>
                </h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Devocionales y reflexiones para fortalecer tu fe, nutrir tu
                  alma y recordarte que la gracia de Dios es nueva cada mañana.
                </p>
              </div>
              <div>
                <h4 className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-5">
                  Navegación
                </h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-white/50 hover:text-white transition-colors text-sm"
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
                <blockquote className="text-white/50 text-sm italic leading-relaxed border-l border-gold pl-4">
                  &ldquo;Porque por gracia ustedes han sido salvados mediante la
                  fe; esto no procede de ustedes, sino que es el regalo de
                  Dios.&rdquo;
                  <span className="block text-white/30 mt-2 not-italic text-xs">
                    — Efesios 2:8
                  </span>
                </blockquote>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 py-6 text-center">
              <p className="text-white/30 text-xs tracking-wide">
                © {new Date().getFullYear()} Notitas de Gracia. Hecho con fe y
                amor.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
