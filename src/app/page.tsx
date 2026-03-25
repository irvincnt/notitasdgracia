import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getAllBlogPosts();
  const featuredPost = posts[0];
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream">
        {/* Halos decorativos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[700px] h-[700px] rounded-full bg-rose-blush opacity-20 blur-[180px]" />
        <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-gold opacity-10 blur-[160px]" />
        <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-gold opacity-8 blur-[140px]" />
        {/* Circulos decorativos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-gold/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-rose-blush/15" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Devocionales y reflexiones
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold leading-[1.15] mb-6 max-w-3xl mx-auto text-foreground">
            Pequeñas Notas{" "}
            <em className="text-gold not-italic font-playfair">de Gracia</em>
            <br />
            para tu alma
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Reflexiones bíblicas que iluminan tu día, fortalecen tu fe y te
            recuerdan el amor incondicional de Dios.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-full text-sm font-medium transition-colors"
            >
              Explorar reflexiones
            </Link>
            <Link
              href={featuredPost ? `/blog/${featuredPost.slug}` : "/blog"}
              className="px-8 py-3 bg-transparent hover:bg-foreground/5 text-foreground rounded-full text-sm font-medium transition-colors border border-border"
            >
              Leer la más reciente
            </Link>
          </div>
          <div className="w-16 h-px bg-gold mx-auto mt-12" />
        </div>
      </section>

      {/* Bienvenida Personal */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-px bg-gold mx-auto mb-8" />
          <p className="text-foreground/80 font-playfair text-xl sm:text-2xl leading-relaxed mb-2">
            Bienvenido(a) a{" "}
            <span className="text-gold font-semibold">Notitas de Gracia</span>.
          </p>
          <div className="w-6 h-px bg-gold-light mx-auto my-8" />
          <div className="space-y-5 text-foreground/60 leading-[1.9] text-base sm:text-lg">
            <p>
              Este es un espacio creado para compartir pequeños devocionales y
              recordatorios del amor de Dios en medio de la vida diaria.
            </p>
            <p>
              A veces todo puede sentirse pesado… la rutina, las preocupaciones,
              el cansancio. Pero aun en medio de todo, siempre hay{" "}
              <em className="text-gold not-italic font-medium">
                gracia disponible
              </em>{" "}
              para nosotros.
            </p>
            <p>
              Mi oración es que cada notita fortalezca tu fe, traiga paz a tu
              corazón y te recuerde que nunca estás solo(a), porque Dios siempre
              está contigo.
            </p>
          </div>
          <p className="text-foreground/50 text-sm mt-8 italic">
            Gracias por estar aquí.
          </p>
          <div className="w-10 h-px bg-gold mx-auto mt-8" />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3 block">
                Últimas publicaciones
              </span>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground">
                Reflexiones recientes
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dark transition-colors"
            >
              Ver todas
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
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

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gold"
            >
              Ver todas las reflexiones
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
