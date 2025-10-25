import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Notitas de Gracia - Blog",
  description: "Un blog hermoso sobre arte, fotografía y creatividad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-linear-to-br from-rose-50 via-white to-purple-50`}
      >
        <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <a
                href="/"
                className="text-2xl font-bold bg-linear-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity font-playfair"
              >
                ✨ Notitas de Gracia
              </a>
              <div className="flex gap-8">
                <a
                  href="/"
                  className="text-slate-700 hover:text-rose-500 transition-colors font-medium"
                >
                  Inicio
                </a>
                <a
                  href="/blog"
                  className="text-slate-700 hover:text-rose-500 transition-colors font-medium"
                >
                  Blog
                </a>
              </div>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-white/50 border-t border-rose-100 backdrop-blur-sm mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-slate-600">
              © 2025 Notitas de Gracia. Hecho con ❤️ y creatividad.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
