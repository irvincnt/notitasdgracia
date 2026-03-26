import fs from "node:fs";
import path from "node:path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  active: boolean;
  image?: string;
  author?: string;
  content?: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const post = require(`../content/blog/${file}`);
      return {
        slug,
        title: post.metadata?.title || "",
        description: post.metadata?.description || "",
        date: post.metadata?.date || new Date().toISOString().split("T")[0],
        active: post.metadata?.active === true,
        image: post.metadata?.image || "",
        author: post.metadata?.author || "Anónimo",
      };
    })
    .filter((post) => post.active);

  return posts.sort(
    (a, b) => getPostDateTimestamp(b.date) - getPostDateTimestamp(a.date),
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = require(`../content/blog/${slug}.mdx`);
    const active = post.metadata?.active === true;

    if (!active) {
      return null;
    }

    return {
      slug,
      title: post.metadata?.title || "",
      description: post.metadata?.description || "",
      date: post.metadata?.date || new Date().toISOString().split("T")[0],
      active,
      image: post.metadata?.image || "",
      author: post.metadata?.author || "Anónimo",
      content: post.default?.toString() || "",
    };
  } catch {
    return null;
  }
}

const DATE_ONLY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function getPostDateTimestamp(value: string): number {
  if (DATE_ONLY_REGEX.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day, 12).getTime();
  }

  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}
