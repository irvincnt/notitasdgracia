import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent mb-4 font-playfair">
          Reflexiones Inspiradoras
          </h1>
          <p className="text-xl text-slate-600 font-light">
          Descubre las reflexiones más inspiradoras para nutrir tu alma y fortalecer tu fe
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              No hay posts disponibles aún. ✨
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-rose-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-rose-300"
              >
                {post.image && (
                  <div className="relative h-56 overflow-hidden bg-linear-to-br from-rose-100 to-purple-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-rose-500 transition-colors font-playfair line-clamp-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-rose-500 mb-4">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.75 13a3.75 3.75 0 002.677-6.36L10 5.581V5a2 2 0 012 2v5a2 2 0 11-4 0v-.5a.75.75 0 111.5 0v.5a.5.5 0 101 0v-5a.5.5 0 00-.5-.5h-.676c.15-1.368.7-2.236 1.948-2.236.904 0 1.685.458 2.502 1.153.315-.233.617-.468.904-.686C11.922 2.331 10.957 1.5 9.5 1.5c-1.933 0-3.285 1.373-3.454 3.5H4.75a.75.75 0 000 1.5h.592c-.08.467-.147.972-.147 1.5 0 .528.067 1.033.147 1.5h-.592a.75.75 0 000 1.5h1.592c.169 2.127 1.521 3.5 3.454 3.5 1.457 0 2.422-.831 3.085-1.779-.287-.218-.589-.453-.904-.686-.817.695-1.598 1.153-2.502 1.153-1.248 0-1.798-.868-1.948-2.236h.676z" />
                    </svg>
                    <span className="font-medium">
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-3 font-light leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
