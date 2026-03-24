import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-cream border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4">
            Reflexiones de Fe
          </h1>
          <p className="text-foreground/60 max-w-lg mx-auto leading-relaxed">
            Cada reflexión es una invitación a detenerte, respirar y encontrar
            la gracia de Dios en lo cotidiano.
          </p>
          <div className="w-12 h-px bg-gold mx-auto mt-6" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {posts.length === 0 ? (
          <div className="text-center py-24 bg-surface rounded-2xl border border-border">
            <div className="w-8 h-px bg-gold mx-auto mb-6" />
            <p className="text-foreground/50">
              Pronto compartiremos nuevas reflexiones.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block bg-surface rounded-2xl overflow-hidden border border-border hover:border-gold-light hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 mb-14"
              >
                <div className="grid md:grid-cols-5">
                  {featuredPost.image && (
                    <div className="relative h-64 md:h-full min-h-[300px] md:col-span-3 overflow-hidden">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-8 sm:p-10 md:col-span-2 flex flex-col justify-center">
                    <span className="text-xs text-gold font-semibold uppercase tracking-[0.2em] mb-4">
                      Más reciente
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-foreground mb-4 leading-tight group-hover:text-gold-dark transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-foreground/55 mb-6 leading-relaxed line-clamp-3 text-sm">
                      {featuredPost.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <time className="text-xs text-foreground/40">
                        {new Date(featuredPost.date).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </time>
                      <span className="text-sm text-gold group-hover:text-gold-dark transition-colors inline-flex items-center gap-2">
                        Leer
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Post Grid */}
            {remainingPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    {post.image && (
                      <div className="rounded-xl overflow-hidden mb-5 border border-border group-hover:border-gold-light transition-colors">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={1200}
                          height={800}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <time className="text-xs text-gold uppercase tracking-[0.15em] mb-3 block">
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="text-lg font-playfair font-bold text-foreground mb-2 leading-snug group-hover:text-gold-dark transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-foreground/50 text-sm line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
