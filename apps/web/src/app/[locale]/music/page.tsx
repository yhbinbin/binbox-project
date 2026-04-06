import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MusicPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('music');
  const isZh = locale.startsWith('zh');

  const releases = [
    {
      catalog: 'BBX-091',
      title: 'Neural Drift',
      bpm: '160 BPM',
      key: 'Cm',
      tags: isZh ? ['Jungle', '碎拍', '夜航'] : ['Jungle', 'Breakbeat', 'Night Signal'],
      note: isZh
        ? '一段偏冷的 jungle 草图，鼓组像旧接收器里漏出来的信号。'
        : 'A cold jungle sketch with drums leaking through a damaged receiver.',
      accent: 'var(--accent-secondary)',
      artwork: 'music-artwork-cyan',
      offset: '',
    },
    {
      catalog: 'BBX-092',
      title: 'Cold Form',
      bpm: '128 BPM',
      key: 'Am',
      tags: isZh ? ['Techno', '工业', '硬件感'] : ['Techno', 'Industrial', 'Hardware'],
      note: isZh
        ? '低温底盘上的四拍作品，强调金属空间和压缩过的空气感。'
        : 'A four-on-the-floor chassis piece shaped by metallic space and compressed air.',
      accent: 'var(--accent-tertiary)',
      artwork: 'music-artwork-amber',
      offset: 'lg:mt-10',
    },
    {
      catalog: 'BBX-093',
      title: 'Vapor Lock',
      bpm: '95 BPM',
      key: 'F#',
      tags: isZh ? ['环境', 'IDM', '漂移'] : ['Ambient', 'IDM', 'Drift'],
      note: isZh
        ? '更慢、更雾化的一条支线，像录像带最后一段残留的亮度。'
        : 'A slower fogged-out branch, like the last surviving luminance on a tape.',
      accent: 'var(--accent-primary)',
      artwork: 'music-artwork-fog',
      offset: '',
    },
    {
      catalog: 'BBX-094',
      title: 'Static Void',
      bpm: '174 BPM',
      key: 'Dm',
      tags: isZh ? ['鼓打贝斯', '极简', '断裂'] : ['Drum & Bass', 'Minimal', 'Fracture'],
      note: isZh
        ? '高速 break 的占位作品，保留极简低频和空白区。'
        : 'A fast break study that keeps the low end minimal and the void exposed.',
      accent: 'var(--accent-secondary)',
      artwork: 'music-artwork-grid',
      offset: 'md:col-start-2',
    },
    {
      catalog: 'BBX-095',
      title: 'Analog Memory',
      bpm: '110 BPM',
      key: 'G',
      tags: isZh ? ['Lo-Fi', '实验', '磁带'] : ['Lo-Fi', 'Experimental', 'Tape'],
      note: isZh
        ? '偏暖色的回忆样本，给这一页一个更接近实体介质的角落。'
        : 'A warmer memory sample that gives the page one corner closer to physical media.',
      accent: 'var(--accent-tertiary)',
      artwork: 'music-artwork-tape',
      offset: '',
    },
    {
      catalog: 'BBX-096',
      title: 'Night Drive',
      bpm: '88 BPM',
      key: 'Bm',
      tags: isZh ? ['Dub', 'Trip Hop', '城市'] : ['Dub', 'Trip Hop', 'City Glow'],
      note: isZh
        ? '更松弛的收尾轨道，用来平衡前面的速度和张力。'
        : 'A looser closing sketch that balances the speed and tension above.',
      accent: 'var(--accent-primary)',
      artwork: 'music-artwork-night',
      offset: 'lg:-mt-10',
    },
  ];

  return (
    <Container className="music-shell max-w-[1180px] space-y-10 pb-12 pt-10 md:pb-16 md:pt-12">
      <div className="music-ribbon" />

      <header className="music-header ui-panel ui-frame relative overflow-hidden px-6 py-8 md:px-8 md:py-10">
        <div className="music-header-glow pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="relative z-10 space-y-5">
          <div className="space-y-2 border-l-4 border-[var(--accent-tertiary)] pl-5">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--accent-tertiary)]">
              {t('eyebrow')}
            </p>
            <h1 className="text-4xl font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] md:text-6xl">
              {t('title')}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
            <span className="music-status">
              <span className="music-status-dot" />
              {isZh ? '信号稳定' : 'Signal Stable'}
            </span>
            <span>{isZh ? '目录数: 06 单元' : 'Catalog Count: 06 Units'}</span>
            <span>{isZh ? '状态: 概念发布' : 'State: Concept Releases'}</span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {releases.map((release) => (
          <article key={release.catalog} className={`music-release-card group ${release.offset}`.trim()}>
            <div className="music-artwork-shell ui-panel ui-frame relative mb-5 aspect-square">
              <div className="music-artwork-clip absolute inset-0 overflow-hidden">
                <div className={`music-artwork ${release.artwork}`} />
                <div className="music-artwork-overlay" />
              </div>
              <div className="music-catalog-tag text-xs uppercase tracking-[0.22em]" style={{ color: release.accent }}>
                {release.catalog}
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold uppercase tracking-[0.06em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
                  {release.title}
                </h2>
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">binbox</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: release.accent }}>
                {release.bpm}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              {release.note}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {release.tags.map((tag) => (
                <span key={tag} className="archive-tag music-tag text-xs uppercase tracking-[0.18em]">
                  {tag}
                </span>
              ))}
              <span className="archive-tag music-tag music-tag-key text-xs uppercase tracking-[0.18em]">
                Key: {release.key}
              </span>
            </div>
          </article>
        ))}
      </section>

      <aside className="music-meta grid gap-8 border-t border-[var(--border-default)] pt-10 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
            {isZh ? '系统状态' : 'System Status'}
          </h3>
          <div className="music-status-panel ui-panel ui-frame px-4 py-4">
            <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.18em]">
              <span>Audio Engine</span>
              <span className="music-status-value">{isZh ? '运行中' : 'Running'}</span>
            </div>
            <div className="music-progress">
              <div className="music-progress-fill" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
            {isZh ? '当前阶段' : 'Current Phase'}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {t('placeholder')}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
            {isZh ? '制作信息' : 'Credits'}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {isZh
              ? '制作：binbox\n混音：central_unit_01\n母带：tape_saturation_v3'
              : 'Production: binbox\nMixing: central_unit_01\nMastering: tape_saturation_v3'}
          </p>
        </div>

        <div className="flex items-end md:justify-end">
          <div className="music-load-more inline-flex items-center justify-center px-5 py-3 text-xs uppercase tracking-[0.24em]">
            {isZh ? '更多作品稍后加载' : 'More Releases Later'}
          </div>
        </div>
      </aside>
    </Container>
  );
}
