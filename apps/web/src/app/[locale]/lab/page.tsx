import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AudioWaveform, CircleDot, Scissors } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('lab');

  const experiments = [
    {
      code: 'LAB_01',
      module: 'DRUM_ENGINE',
      title: t('experiments.breakbeatGenerator.title'),
      description: t('experiments.breakbeatGenerator.description'),
      href: '/lab/breakbeat-generator',
      accent: 'var(--accent-secondary)',
      signalBars: 2,
      icon: AudioWaveform,
      coverClass: 'lab-cover-breakbeat',
      metrics: ['16 step', 'swing', 'midi'],
    },
    {
      code: 'LAB_02',
      module: 'SAMPLE_PROC',
      title: t('experiments.breakSlicer.title'),
      description: t('experiments.breakSlicer.description'),
      href: '/lab/break-slicer',
      accent: 'var(--accent-tertiary)',
      signalBars: 3,
      icon: Scissors,
      coverClass: 'lab-cover-slicer',
      metrics: ['slice', 'pitch', 'reorder'],
    },
    {
      code: 'LAB_03',
      module: 'THEORY_MOD',
      title: t('experiments.musicTheoryKeyboard.title'),
      description: t('experiments.musicTheoryKeyboard.description'),
      href: '/lab/music-theory-keyboard',
      accent: 'var(--accent-primary)',
      signalBars: 1,
      icon: CircleDot,
      coverClass: 'lab-cover-theory',
      metrics: ['chords', 'modes', 'fifths'],
    },
  ];

  return (
    <Container className="lab-shell max-w-[1180px] space-y-10 pb-12 pt-10 md:pb-16 md:pt-12">
      <div className="lab-ribbon" />

      <header className="lab-header ui-panel ui-frame relative overflow-hidden px-6 py-8 md:px-8 md:py-10">
        <div className="lab-header-glow pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_280px] lg:items-end">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.34em] text-[var(--accent-secondary)]">
                {t('eyebrow')}
              </p>
              <h1 className="text-4xl font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] md:text-6xl">
                {t('title')}
              </h1>
              <div className="lab-title-signal" aria-hidden="true">
                {Array.from({ length: 10 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                {t('description')}
              </p>
            </div>
          </div>

          <aside className="lab-status-panel ui-ghost-border space-y-4 px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
                System Feed
              </span>
              <span className="lab-led" />
            </div>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <p>Audio Engine // Ready</p>
              <p>Signal Cache // Active</p>
              <p>Operator Mode // Live</p>
            </div>
          </aside>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {experiments.map((experiment) => (
          <Link
            key={experiment.href}
            href={experiment.href}
            className="lab-module-card ui-panel ui-frame group relative overflow-hidden p-5"
          >
            <div className="lab-card-bar mb-5 flex items-center justify-between gap-3 px-3 py-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                {experiment.code}
              </span>
              <span className="lab-card-module-chip text-xs uppercase tracking-[0.24em]" style={{ color: experiment.accent }}>
                {experiment.module}
              </span>
            </div>

            <div className="relative flex min-h-[280px] flex-col">
              <div className="lab-module-wave pointer-events-none absolute inset-x-0 top-0 h-24 opacity-80" />
              <div className={`lab-card-cover ${experiment.coverClass}`}>
                <div className="lab-card-cover-grid" />
                <div className="lab-card-cover-rings" />
                <experiment.icon
                  className="lab-card-cover-icon"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <div className="lab-card-cover-metrics">
                  {experiment.metrics.map((metric) => (
                    <span key={metric}>{metric}</span>
                  ))}
                </div>
              </div>

              <div className="relative space-y-4">
                <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
                  {experiment.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                  {experiment.description}
                </p>
              </div>

              <div className="relative mt-auto flex items-end justify-between gap-5 pt-8">
                <div className="space-y-2">
                  <div className="flex gap-1.5">
                    {Array.from({ length: 4 }).map((_, barIndex) => (
                      <span
                        key={barIndex}
                        className="lab-signal-bar"
                        style={{
                          backgroundColor:
                            barIndex < experiment.signalBars
                              ? experiment.accent
                              : 'color-mix(in srgb, var(--outline) 85%, transparent)',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Sync Ready
                  </span>
                </div>

                <span
                  className="lab-launch inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-[0.28em] transition-transform duration-200 group-hover:-translate-y-0.5"
                  style={{ color: experiment.accent }}
                >
                  {t('launch')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.9fr)]">
        <div className="lab-monitor ui-panel ui-frame space-y-5 px-6 py-6">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border-default)] pb-3">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Active Signal Monitor
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--accent-secondary)]">
              Status: Ready
            </span>
          </div>

          <div className="space-y-4">
            <div className="lab-metric-row">
              <span>Bit Depth</span>
              <span className="lab-meter lab-meter-cold">24-BIT</span>
            </div>
            <div className="lab-metric-row">
              <span>Latency</span>
              <span className="lab-meter lab-meter-hot">4.2ms</span>
            </div>
            <div className="lab-metric-row">
              <span>Flutter</span>
              <span className="lab-meter lab-meter-warm">Low Noise</span>
            </div>
          </div>

          <div className="lab-monitor-graph">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <aside className="lab-sidebar ui-panel ui-frame space-y-5 px-6 py-6">
          <div className="space-y-2 border-b border-[var(--border-default)] pb-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-primary)]">
              Internal Storage
            </p>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Experimental modules, cached patterns, and interactive signal drafts are available from this entry point.
            </p>
          </div>

          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Sample Rate</p>
              <p className="mt-1 text-lg font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">44.1kHz</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Channel Config</p>
              <p className="mt-1 text-lg font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">Dual Mono</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Kernel</p>
              <p className="mt-1 text-lg font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">binbox.lab</p>
            </div>
          </div>
        </aside>
      </section>
    </Container>
  );
}
