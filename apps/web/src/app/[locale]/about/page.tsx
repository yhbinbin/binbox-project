import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContentLayout from '@/components/layout/ContentLayout';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <ContentLayout className="space-y-10">
      <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent-secondary)]">
        {t('eyebrow')}
      </p>
      <h1 className="text-3xl font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)] md:text-4xl">
        {t('title')}
      </h1>
      <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
        {t('description')}
      </p>
      <div className="space-y-6 text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
        <p>{t('body.p1')}</p>
        <p>{t('body.p2')}</p>
        <p>{t('body.p3')}</p>
        <p>{t('body.p4')}</p>
        <p className="text-[var(--text-primary)]">{t('body.p5')}</p>
        <p>{t('body.p6')}</p>
        <p>{t('body.p7')}</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[var(--accent-secondary)]">
          {t('contact')}
        </h2>
        <div className="grid gap-3 text-sm text-[var(--text-secondary)] md:text-base">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[var(--text-muted)]">{t('email')}</span>
            <a
              href="mailto:hello@binbox.art"
              className="underline-offset-4 hover:underline"
            >
              hello@binbox.art
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[var(--text-muted)]">{t('github')}</span>
            <a
              href="https://github.com/binbox"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              github.com/binbox
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[var(--text-muted)]">{t('social')}</span>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://x.com/binbox"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                X / Twitter
              </a>
              <a
                href="https://instagram.com/binbox"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                Instagram
              </a>
              <a
                href="https://soundcloud.com/binbox"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                SoundCloud
              </a>
              <a
                href="https://www.youtube.com/@binbox"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
