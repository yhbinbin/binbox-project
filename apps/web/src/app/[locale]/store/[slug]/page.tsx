import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import ContentLayout from '@/components/layout/ContentLayout';
import { getStoreProduct, storeProducts } from '@/lib/store';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return storeProducts.map((product) => ({ slug: product.slug }));
}

export default async function StoreDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('store');

  const product = getStoreProduct(slug);
  if (!product) {
    notFound();
  }

  return (
    <ContentLayout className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent-secondary)]">
          {product.type.replace('-', ' ')}
        </p>
        <h1 className="text-3xl font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)] md:text-4xl">
          {product.title}
        </h1>
        <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
          {product.description}
        </p>
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">
          {product.price}
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]">
        <Image
          src={product.image}
          alt={product.title}
          width={960}
          height={540}
          className="h-72 w-full object-cover md:h-96"
        />
      </div>

      <div className="space-y-4 text-sm text-[var(--text-secondary)] md:text-base">
        <p>
          This is a placeholder product page for early visual validation. Share
          feedback on the artwork, description, and pricing before checkout is built.
        </p>
        <button
          type="button"
          className="cursor-pointer rounded-full border border-[var(--accent-secondary)] px-6 py-2 text-xs uppercase tracking-[0.3em] text-[var(--accent-secondary)] transition hover:bg-[var(--accent-secondary)] hover:text-[var(--bg-primary)]"
        >
          {t('cta')}
        </button>
      </div>
    </ContentLayout>
  );
}
