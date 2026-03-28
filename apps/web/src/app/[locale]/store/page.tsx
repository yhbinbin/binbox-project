import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ContentLayout from '@/components/layout/ContentLayout';
import { storeProducts } from '@/lib/store';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('store');

  return (
    <ContentLayout className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent-secondary)]">
          {t('eyebrow')}
        </p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)] md:text-4xl">
          {t('title')}
        </h1>
        <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
          {t('description')}
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {storeProducts.map((product) => (
          <article key={product.slug} className="space-y-4">
            <Link href={`/store/${product.slug}`} className="block cursor-pointer">
              <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={640}
                  height={420}
                  className="h-52 w-full object-cover"
                />
              </div>
            </Link>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <span>{product.type.replace('-', ' ')}</span>
                <span>{product.price}</span>
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                <Link
                  href={`/store/${product.slug}`}
                  className="cursor-pointer underline-offset-4 hover:underline"
                >
                  {product.title}
                </Link>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] md:text-base">
                {product.description}
              </p>
            </div>
            <button
              type="button"
              className="cursor-pointer rounded-full border border-[var(--accent-secondary)] px-5 py-2 text-xs uppercase tracking-[0.3em] text-[var(--accent-secondary)] transition hover:bg-[var(--accent-secondary)] hover:text-[var(--bg-primary)]"
            >
              {t('cta')}
            </button>
          </article>
        ))}
      </div>
    </ContentLayout>
  );
}
