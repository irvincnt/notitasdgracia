import MdxLayout from "@/app/components/mdx-layout";
import { getAllBlogPosts } from "@/lib/blog";

export const generateStaticParams = async () => {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post no encontrado",
      description: "El post que buscas no existe",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postModule = await import(`@/content/blog/${slug}.mdx`);
  const PostContent = postModule.default;
  const metadata = postModule.metadata;

  return (
    <MdxLayout metadata={metadata}>
      <PostContent />
    </MdxLayout>
  );
}
