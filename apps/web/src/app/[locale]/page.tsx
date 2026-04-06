import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const featuredCards = [
    {
      href: '/lab/breakbeat-generator',
      eyebrow: 'LAB_01',
      title: t('highlights.breakbeatLab.title'),
      description: t('highlights.breakbeatLab.description'),
    },
    {
      href: '/archive',
      eyebrow: 'ARCHIVE_02',
      title: t('highlights.archive.title'),
      description: t('highlights.archive.description'),
    },
    {
      href: '/store',
      eyebrow: 'STORE_03',
      title: t('highlights.store.title'),
      description: t('highlights.store.description'),
    },
  ];

  return (
    <main className="home-shell relative overflow-hidden px-6 pb-20 pt-10 md:pt-12">
      <div className="home-backdrop pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-10">
        <div className="home-ribbon flex items-center justify-between gap-4 overflow-hidden px-4 py-3 text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">
          <span>{t('hero.eyebrow')}</span>
          <span className="hidden md:inline">Signal Relay // binbox.home</span>
        </div>

        <section className="home-hero-panel ui-panel ui-frame relative overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div className="home-hero-wave pointer-events-none absolute inset-x-0 bottom-0 h-24" />
          <div className="pointer-events-none absolute right-4 top-4 flex gap-2 md:right-6 md:top-6">
            <span className="home-led bg-[var(--accent-tertiary)]" />
            <span className="home-led bg-[var(--accent-secondary)]" />
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.8fr)] lg:items-end">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="home-section-tag inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-[0.34em]">
                  <span className="home-tag-dot" />
                  {t('hero.eyebrow')}
                </p>
                <div className="space-y-4">
                  <span className="home-ghost-title">BINBOX.SYS</span>
                  <h1 className="max-w-4xl text-5xl font-semibold uppercase leading-[0.9] tracking-[0.14em] text-[var(--text-primary)] md:text-7xl">
                    binbox
                  </h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-[var(--accent-primary)] md:text-2xl">
                    {t('hero.title')}
                  </p>
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                  {t('hero.description')}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/lab" className="home-cta home-cta-primary">
                  {t('hero.enterLab')}
                </Link>
                <Link href="/music" className="home-cta home-cta-secondary">
                  {t('hero.listen')}
                </Link>
              </div>
            </div>

            <aside className="home-status-panel ui-ghost-border space-y-5 px-5 py-5">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  {t('currentFocus.title')}
                </p>
                <h2 className="text-2xl font-semibold uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                  {t('mission.title')}
                </h2>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                <li>{t('currentFocus.items.webAudio')}</li>
                <li>{t('currentFocus.items.streaming')}</li>
                <li>{t('currentFocus.items.archiving')}</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="home-manifesto ui-panel ui-frame relative overflow-hidden px-6 py-8 md:px-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--accent-tertiary)]">
              {t('mission.eyebrow')}
            </p>
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Archive Protocol
            </span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.8fr)] lg:items-start">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl">
              {t('mission.description')}
            </p>
            <div className="home-quote-panel ui-ghost-border px-5 py-4">
              <p className="text-sm italic leading-relaxed text-[var(--text-secondary)]">
                &quot;The terminal is not a tool; it is an environment for focused creation.&quot;
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-[var(--accent-secondary)]">
                SYS_ADMIN_ROOT
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold uppercase tracking-[0.24em] text-[var(--accent-secondary)]">
              {t('highlights.featured')}
            </h3>
            <span className="hidden text-xs uppercase tracking-[0.28em] text-[var(--text-muted)] md:inline">
              Modules // 03
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredCards.map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                className="home-feature-card ui-panel ui-frame group relative overflow-hidden p-4"
              >
                <div className="home-card-bar mb-4 flex items-center justify-between gap-3 px-3 py-2">
                  <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    {card.eyebrow}
                  </span>
                  <div className="flex gap-1.5">
                    <span className="home-led h-2.5 w-2.5 bg-[var(--outline-variant)]" />
                    <span
                      className="home-led h-2.5 w-2.5"
                      style={{
                        backgroundColor:
                          index === 0
                            ? 'var(--accent-secondary)'
                            : index === 1
                              ? 'var(--accent-tertiary)'
                              : 'var(--accent-primary)',
                      }}
                    />
                  </div>
                </div>
                <div className="relative flex min-h-[240px] flex-col justify-between gap-6">
                  <div className="home-card-wave pointer-events-none absolute inset-x-0 top-0 h-24 opacity-80" />
                  <div className="relative space-y-3">
                    <h4 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
                      {card.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {card.description}
                    </p>
                  </div>
                  <span className="relative text-xs uppercase tracking-[0.28em] text-[var(--accent-secondary)]">
                    {t('highlights.open')} -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="home-meta-strip flex flex-col justify-between gap-4 px-4 py-4 text-xs uppercase tracking-[0.26em] text-[var(--text-muted)] md:flex-row md:items-end">
          <div className="space-y-1">
            <p>System Version // Home v2</p>
            <p className="text-[var(--accent-secondary)]">Buffer Status // Stable</p>
          </div>
          <p className="text-left md:text-right">binbox genesis core</p>
        </footer>
      </div>
    </main>
  );
}
