import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ArchiveFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  description: string;
};

export type ArchivePost = {
  slug: string;
  frontmatter: ArchiveFrontmatter;
  content: string;
};

const ARCHIVE_DIR = path.join(process.cwd(), "content", "archive");

const ensureArchiveDir = () => {
  if (!fs.existsSync(ARCHIVE_DIR)) {
    fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  }
};

export const getArchiveSlugs = (): string[] => {
  ensureArchiveDir();
  return fs
    .readdirSync(ARCHIVE_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
};

export const getArchivePost = (slug: string): ArchivePost => {
  ensureArchiveDir();
  const filePath = path.join(ARCHIVE_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    frontmatter: {
      title: data.title ?? slug,
      date: data.date ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      description: data.description ?? "",
    },
    content,
  };
};

export const getArchivePosts = (): ArchivePost[] => {
  const slugs = getArchiveSlugs();
  const posts = slugs.map((slug) => getArchivePost(slug));

  return posts.sort((a, b) => {
    const aTime = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const bTime = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return bTime - aTime;
  });
};
