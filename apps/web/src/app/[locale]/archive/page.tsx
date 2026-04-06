import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { getArchivePosts } from '@/lib/archive';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ArchivePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('archive');
  const posts = getArchivePosts();
  const isZh = locale.startsWith('zh');

  const fallbackEntries = [
    {
      slug: 'warm-frequency-through-the-room',
      title: isZh ? '一段温热频率穿过了房间' : 'A warm frequency passed through the room',
      date: '199X-05-22',
      log: 'LOG_042',
      description: isZh
        ? 'Korg M1 在今晚重新发声。滤波包络停在半衰减时，房间里像出现了一个会呼吸的幽灵。制作备注：保留底噪，不要清得太干净。'
        : 'The Korg M1 finally breathed again tonight. At half-decay the filter felt like a living ghost in the room. Production note: keep the noise floor.',
      tags: isZh ? ['模拟漂移', '深夜', '制作笔记'] : ['Analog Drift', 'Late Night', 'Production Notes'],
    },
    {
      slug: 'dust-on-the-head-of-the-four-track',
      title: isZh ? '四轨机磁头上的灰尘' : 'Dust on the head of the four-track',
      date: '199X-04-15',
      log: 'LOG_039',
      description: isZh
        ? '凌晨两点，磁带回放开始轻微跑调。本来是问题，后来变成了天然的 chorus。那一刻再次确认：不完美不是瑕疵，而是证据。'
        : 'At 2 AM the cassette playback started warbling. It began as a problem and turned into a natural chorus. Imperfection remains the only trustworthy evidence.',
      tags: isZh ? ['磁带变形', '失真研究'] : ['Tape Warp', 'Glitch Study'],
    },
    {
      slug: 'blue-led-reflections-on-the-window',
      title: isZh ? '窗面上的蓝色 LED 反光' : 'Blue LED reflections on the window',
      date: '199X-03-02',
      log: 'LOG_031',
      description: isZh
        ? '外面在下雨，Dark Matter 的鼓组终于坐进正确位置。我绕过主调音台直进前级，已经红灯了，但它终于听起来像活物。'
        : 'It was raining outside and the drums for Dark Matter finally sat right. I bypassed the main mixer and went straight into the preamp. It was redlining, but alive.',
      tags: isZh ? ['过载', '雨夜', '鼓组'] : ['Overdrive', 'Rainstorm', 'Rhythm Section'],
    },
  ];

  const entries =
    posts.length > 0
      ? posts.map((post, index) => ({
          slug: post.slug,
          title: post.frontmatter.title,
          date: post.frontmatter.date,
          log: `LOG_${String(index + 1).padStart(3, '0')}`,
          description: post.frontmatter.description,
          tags: post.frontmatter.tags ?? [],
        }))
      : fallbackEntries;

  const formatDisplayDate = (date: string) => {
    const parts = date.split('-');
    if (parts.length !== 3) return date;
    return `${parts[1]}-${parts[2]}-${parts[0]}`;
  };

  return (
    <Container className="archive-shell max-w-[1000px] space-y-10 pb-12 pt-10 md:pb-20 md:pt-12">
      <div className="archive-ribbon" />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_280px] lg:items-start">
        <header className="archive-header space-y-3 border-l border-[var(--border-default)] pl-6">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--accent-tertiary)]">
            {t('eyebrow')}
          </p>
          <h1 className="text-4xl font-semibold tracking-[0.04em] text-[var(--text-primary)] md:text-6xl">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            {t('description')}
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="h-px w-12 bg-[var(--border-default)]" />
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Mem Module: ARCH_022
            </span>
          </div>
        </header>

        <aside className="archive-aside ui-panel ui-frame space-y-5 px-5 py-5">
          <div className="space-y-2 border-b border-[var(--border-default)] pb-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-secondary)]">
              {isZh ? '目录状态' : 'Index Status'}
            </p>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {isZh
                ? '这里收纳教程、制作思考与创意写作，作为 binbox 的思考层。'
                : 'This log holds tutorials, production thinking, and creative writing as the reflective layer of binbox.'}
            </p>
          </div>

          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{isZh ? '条目数' : 'Entries'}</p>
              <p className="mt-1 text-lg font-semibold tracking-[0.04em] text-[var(--text-primary)]">{String(entries.length).padStart(2, '0')}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{isZh ? '主轴' : 'Axis'}</p>
              <p className="mt-1">{isZh ? '教程 / 制作笔记 / 创意写作' : 'Tutorials / Notes / Creative Writing'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{isZh ? '模式' : 'Mode'}</p>
              <p className="mt-1">{isZh ? '按时间展开，按标签回想' : 'Expanded by time, recalled by tags'}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-14">
        {entries.map((entry, index) => (
          <div key={entry.slug}>
            {index === 2 ? (
              <div className="archive-break py-2">
                <div className="h-px w-full bg-[var(--border-default)]" />
                <div className="flex justify-between py-2 text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  <span>Sect Break 01</span>
                  <span>Buffer Clear</span>
                </div>
              </div>
            ) : null}

            <article
              className="archive-entry group relative flex flex-col gap-4 md:flex-row md:gap-12"
              style={{ animationDelay: `${120 + index * 60}ms` }}
            >
              <div className="archive-date-col md:w-32 md:flex-shrink-0">
                <time className="block text-sm font-semibold tracking-[0.04em] text-[var(--accent-tertiary)] md:text-right">
                  {formatDisplayDate(entry.date)}
                </time>
                <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-[var(--text-muted)] md:text-right">
                  {entry.log}
                </span>
              </div>

              <div className="flex-grow space-y-4">
                <h2 className="text-2xl font-medium leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)] md:text-3xl">
                  <Link href={`/archive/${entry.slug}`} className="cursor-pointer underline-offset-4 hover:underline">
                    {entry.title}
                  </Link>
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                  {entry.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="archive-tag text-xs uppercase tracking-[0.18em]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="archive-entry-dot hidden md:block" />
            </article>
          </div>
        ))}
      </section>

      <footer className="archive-footer flex flex-col justify-between gap-5 border-t border-[var(--border-default)] pt-8 md:flex-row md:items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="archive-record-dot" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--destructive)]">
              {isZh ? '录制已停止' : 'Recording Stopped'}
            </span>
          </div>
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {isZh ? '当前段落结束 ARCH_V1' : 'End of Segment ARCH_V1'}
          </p>
        </div>

        <div className="archive-load-more inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.24em]">
          {isZh ? '更多信号稍后加载' : 'Load More Signals'}
        </div>
      </footer>
    </Container>
  );
}
