import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  author?: string;
  content?: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    const post = require(`../content/blog/${file}`);
    return {
      slug,
      title: post.metadata?.title || "",
      description: post.metadata?.description || "",
      date: post.metadata?.date || new Date().toISOString(),
      image: post.metadata?.image || "",
      author: post.metadata?.author || "Anónimo",
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = require(`../content/blog/${slug}.mdx`);
    return {
      slug,
      title: post.metadata?.title || "",
      description: post.metadata?.description || "",
      date: post.metadata?.date || new Date().toISOString(),
      image: post.metadata?.image || "",
      author: post.metadata?.author || "Anónimo",
      content: post.default?.toString() || "",
    };
  } catch {
    return null;
  }
}
