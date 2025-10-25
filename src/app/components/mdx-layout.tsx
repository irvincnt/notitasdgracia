import Image from "next/image";

interface MdxLayoutProps {
  children: React.ReactNode;
  metadata?: {
    title?: string;
    description?: string;
    date?: string;
    image?: string;
    author?: string;
  };
}

export default function MdxLayout({ children, metadata }: MdxLayoutProps) {
  return (
    <article className="min-h-screen">
      {/* Article Header Image */}
      {metadata?.image && (
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <Image
            src={metadata.image}
            alt={metadata.title || "Featured image"}
            fill
            className="object-cover  object-center"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Metadata */}
        <div className="mb-12 pb-8 border-b border-rose-100">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-playfair leading-tight">
            {metadata?.title}
          </h1>

          {metadata?.description && (
            <p className="text-xl text-slate-600 mb-6 font-light leading-relaxed">
              {metadata.description}
            </p>
          )}

          <div className="flex items-center gap-6 flex-wrap">
            {metadata?.date && (
              <div className="flex items-center gap-2 text-rose-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.75 13a3.75 3.75 0 002.677-6.36L10 5.581V5a2 2 0 012 2v5a2 2 0 11-4 0v-.5a.75.75 0 111.5 0v.5a.5.5 0 101 0v-5a.5.5 0 00-.5-.5h-.676c.15-1.368.7-2.236 1.948-2.236.904 0 1.685.458 2.502 1.153.315-.233.617-.468.904-.686C11.922 2.331 10.957 1.5 9.5 1.5c-1.933 0-3.285 1.373-3.454 3.5H4.75a.75.75 0 000 1.5h.592c-.08.467-.147.972-.147 1.5 0 .528.067 1.033.147 1.5h-.592a.75.75 0 000 1.5h1.592c.169 2.127 1.521 3.5 3.454 3.5 1.457 0 2.422-.831 3.085-1.779-.287-.218-.589-.453-.904-.686-.817.695-1.598 1.153-2.502 1.153-1.248 0-1.798-.868-1.948-2.236h.676z" />
                </svg>
                <span className="font-medium">
                  {new Date(metadata.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {metadata?.author && (
              <div className="flex items-center gap-2 text-slate-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{metadata.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Prose Content - Optimized for readability */}
        <div
          className="prose prose-lg max-w-none
          prose-headings:font-playfair prose-headings:font-bold prose-headings:text-slate-900
          prose-h1:text-5xl prose-h1:mt-12 prose-h1:mb-6
          prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg
          prose-a:text-rose-500 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-purple-600
          prose-strong:text-slate-900 prose-strong:font-semibold
          prose-em:text-slate-800 prose-em:italic
          prose-code:text-rose-600 prose-code:bg-rose-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
          prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:p-4
          prose-blockquote:border-l-4 prose-blockquote:border-rose-400 prose-blockquote:text-slate-700 prose-blockquote:pl-6 prose-blockquote:font-light
          prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
          prose-li:text-slate-700 prose-li:leading-relaxed
          prose-ul:space-y-3 prose-ol:space-y-3
          prose-table:border-collapse prose-table:w-full prose-th:bg-rose-100 prose-th:text-slate-900 prose-th:font-semibold prose-th:p-3 prose-th:text-left
          prose-td:border prose-td:border-rose-200 prose-td:p-3
          prose-tr:border-b prose-tr:border-rose-100
        "
        >
          {children}
        </div>
      </div>
    </article>
  );
}
