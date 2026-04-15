import Image from "next/image";
import Link from "next/link";
import { formatPostDate } from "@/lib/date";
import SharePost from "@/app/components/share-post";

interface MdxLayoutProps {
  children: React.ReactNode;
  metadata?: {
    title?: string;
    description?: string;
    date?: string;
    image?: string;
    imageFooter?: string;
    author?: string;
  };
}

export default function MdxLayout({ children, metadata }: MdxLayoutProps) {
  const hasHeroImage = Boolean(metadata?.image);

  return (
    <article className="min-h-screen">
      {/* Back Navigation */}
      <div className="bg-cream border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dark transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver a reflexiones
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="relative bg-cream">
        <div
          className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 text-center ${
            hasHeroImage ? "pb-10 sm:pb-12" : "pb-10 sm:pb-14"
          }`}
        >
          {/* Meta */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
            {metadata?.date && (
              <time className="text-xs text-gold uppercase tracking-[0.15em]">
                {formatPostDate(metadata.date)}
              </time>
            )}
            {metadata?.author && (
              <>
                <span className="text-border">·</span>
                <span className="text-xs text-foreground/50 uppercase tracking-[0.1em]">
                  {metadata.author}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-tight mb-6">
            {metadata?.title}
          </h1>

          {/* Description */}
          {metadata?.description && (
            <p className="text-base sm:text-lg text-foreground/55 leading-relaxed max-w-2xl mx-auto">
              {metadata.description}
            </p>
          )}

          <div className="w-12 h-px bg-gold mx-auto mt-8" />
        </div>

        {/* Hero Image */}
        {metadata?.image && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border/80 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.5)]">
              <Image
                src={metadata.image}
                alt={metadata.title || "Imagen del artículo"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </header>

      {/* Article Content */}
      <div
        className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-5 ${
          hasHeroImage ? "pt-12 sm:pt-14" : ""
        }`}
      >
        <div
          className="article-prose prose prose-lg max-w-none
          prose-headings:font-playfair prose-headings:font-bold prose-headings:text-foreground
          prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-5
          prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
          prose-p:text-foreground/75 prose-p:leading-[1.85] prose-p:text-base
          prose-a:text-rose-deep prose-a:underline prose-a:underline-offset-4 prose-a:decoration-rose-blush hover:prose-a:text-gold-dark hover:prose-a:decoration-gold
          prose-strong:text-foreground prose-strong:font-semibold
          prose-em:text-foreground/70
          prose-code:text-rose-deep prose-code:bg-cream prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-cream prose-pre:text-foreground/90 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:border prose-pre:border-border
          prose-blockquote:border-l prose-blockquote:border-gold prose-blockquote:text-foreground/60 prose-blockquote:pl-6 prose-blockquote:italic
          prose-img:rounded-xl prose-img:shadow-md prose-img:border prose-img:border-border
          prose-li:text-foreground/75 prose-li:leading-[1.85] prose-li:text-base
          prose-ol:space-y-2
          prose-table:border-collapse prose-table:w-full prose-th:bg-cream prose-th:text-foreground prose-th:font-semibold prose-th:p-3 prose-th:text-left
          prose-td:border prose-td:border-border prose-td:p-3
          prose-tr:border-b prose-tr:border-border
          prose-hr:border-gold-light
        "
        >
          {children}
        </div>

        {metadata?.imageFooter && (
          <div className="flex justify-center mt-10">
            <div className="relative w-90 h-60 rounded-xl overflow-hidden border border-border/60 shadow-sm">
              <Image
                src={metadata.imageFooter}
                alt="Imagen de cierre"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <SharePost />
      </div>
    </article>
  );
}
