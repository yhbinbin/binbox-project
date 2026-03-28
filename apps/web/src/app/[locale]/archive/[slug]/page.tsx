import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ContentLayout from '@/components/layout/ContentLayout';
import BreakSlicer from '@/components/lab/break-slicer/BreakSlicer';
import MusicTheoryKeyboard from '@/components/lab/music-theory-keyboard/MusicTheoryKeyboard';
import { getArchivePost, getArchiveSlugs } from '@/lib/archive';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = getArchiveSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArchiveEntryPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let post;
  try {
    post = getArchivePost(slug);
  } catch {
    notFound();
  }

  return (
    <ContentLayout className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent-secondary)]">
          Archive
        </p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)] md:text-4xl">
          {post.frontmatter.title}
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          {post.frontmatter.date}
        </p>
        {post.frontmatter.description ? (
          <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            {post.frontmatter.description}
          </p>
        ) : null}
        {post.frontmatter.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {post.frontmatter.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border-default)] px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <article className="space-y-6 text-[var(--text-secondary)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-[0.2em] [&_h2]:text-[var(--text-primary)] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-[0.2em] [&_h3]:text-[var(--text-primary)] [&_p]:leading-relaxed [&_a]:text-[var(--accent-secondary)] [&_a]:underline-offset-4 [&_a:hover]:underline">
        <MDXRemote
          source={post.content}
          components={{
            BreakSlicer,
            MusicTheoryKeyboard,
          }}
        />
      </article>
    </ContentLayout>
  );
}
