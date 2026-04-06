import { getTranslations, setRequestLocale } from 'next-intl/server';
import Container from '@/components/ui/Container';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const isZh = locale.startsWith('zh');

  const statements = [
    t('body.p1'),
    t('body.p2'),
    t('body.p3'),
    t('body.p4'),
  ];

  const focusLines = [
    t('body.p5'),
    t('body.p6'),
    t('body.p7'),
  ];

  return (
    <Container className="about-shell max-w-[1020px] space-y-10 pb-12 pt-10 md:pb-20 md:pt-12">
      <div className="about-ribbon" />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-start">
        <header className="about-header space-y-5 border-l border-[var(--border-default)] pl-6">
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
              {isZh ? '人物档案: BINBOX_95' : 'Profile Node: BINBOX_95'}
            </span>
          </div>
        </header>

        <aside className="about-aside ui-panel ui-frame space-y-5 px-6 py-6">
          <div className="space-y-2 border-b border-[var(--border-default)] pb-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-secondary)]">
              {isZh ? '当前身份' : 'Current Role'}
            </p>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {isZh
                ? '卧室制作人 / 前端转向声音与互动媒体 / 数字怀旧档案整理者'
                : 'Bedroom producer / frontend-to-audio maker / digital memory archivist'}
            </p>
          </div>

          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Focus</p>
              <p className="mt-1">{isZh ? 'Web Audio, Jungle, Breakbeat, Synth Pop' : 'Web Audio, Jungle, Breakbeat, Synth Pop'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Mode</p>
              <p className="mt-1">{isZh ? '代码作为乐器，页面作为舞台' : 'Code as instrument, pages as stage'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Signal</p>
              <p className="mt-1">{isZh ? '冷设备外壳 + 热舞池幻象' : 'Cold chassis + hot dancefloor projection'}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="about-reading space-y-8">
        {statements.map((paragraph, index) => (
          <div key={index} className="about-paragraph-block">
            <div className="about-paragraph-meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className="h-px w-10 bg-[var(--border-default)]" />
            </div>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
              {paragraph}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="about-focus space-y-4 border-t border-[var(--border-default)] pt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)]">
            {isZh ? '艺术方向' : 'Artistic Direction'}
          </p>
          <div className="space-y-3">
            {focusLines.map((line, index) => (
              <p
                key={index}
                className={`text-base leading-relaxed md:text-lg ${index === 0 ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="about-contact-ledger ui-panel ui-frame space-y-4 px-6 py-6">
          <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--accent-secondary)]">
            {t('contact')}
          </h2>

          <div className="space-y-3 text-sm text-[var(--text-secondary)] md:text-base">
            <div className="about-contact-row">
              <span className="about-contact-label">{t('email')}</span>
              <a href="mailto:hello@binbox.art" className="underline-offset-4 hover:underline">
                hello@binbox.art
              </a>
            </div>
            <div className="about-contact-row">
              <span className="about-contact-label">{t('github')}</span>
              <a href="https://github.com/binbox" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                github.com/binbox
              </a>
            </div>
            <div className="about-contact-row items-start">
              <span className="about-contact-label">{t('social')}</span>
              <div className="flex flex-wrap gap-3">
                <a href="https://x.com/binbox" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  X / Twitter
                </a>
                <a href="https://instagram.com/binbox" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  Instagram
                </a>
                <a href="https://soundcloud.com/binbox" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  SoundCloud
                </a>
                <a href="https://www.youtube.com/@binbox" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
