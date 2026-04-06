import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Container from '@/components/ui/Container';
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
  const isZh = locale.startsWith('zh');

  const product = getStoreProduct(slug);
  if (!product) {
    notFound();
  }

  const typeLabel =
    product.type === 'sample-pack'
      ? isZh
        ? '采样包'
        : 'Sample Pack'
      : product.type === 'preset-pack'
        ? isZh
          ? '预设包'
          : 'Preset Pack'
        : isZh
          ? '教程模块'
          : 'Tutorial Module';

  return (
    <Container className="store-detail-shell max-w-[1000px] space-y-10 py-12 md:py-16">
      <div className="store-ribbon" />

      <div className="store-detail-topbar flex flex-col justify-between gap-3 border-b border-[var(--border-default)] pb-3 text-xs uppercase tracking-[0.24em] md:flex-row md:items-end">
        <span className="text-[var(--text-muted)]">
          Entry ID: {product.catalog} {'//'} Catalog Store
        </span>
        <span style={{ color: product.accent }}>{product.status}</span>
      </div>

      <section className="grid gap-10 md:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] md:items-start">
        <div className="store-detail-visual">
          <div className="store-detail-record" />
          <div className="store-detail-cover ui-panel ui-frame relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={800}
              height={800}
              className="h-full w-full object-cover opacity-85"
            />
            <div className="store-artwork-overlay" />
            <span className="store-detail-label text-xs uppercase tracking-[0.2em]" style={{ color: product.accent }}>
              {product.catalog}
            </span>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl font-semibold uppercase tracking-[0.06em] text-[var(--text-primary)] md:text-4xl">
                {product.title}
              </h1>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                {typeLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <header className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: product.accent }}>
                {product.eyebrow}
              </p>
              <h2 className="text-4xl font-extrabold uppercase leading-tight tracking-[0.05em] text-[var(--text-primary)] md:text-5xl">
                {product.title}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                {product.detail.headline}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-semibold uppercase tracking-[0.04em]" style={{ color: product.accent }}>
                {product.price}
              </span>
              <div className="h-px flex-1 bg-[var(--border-default)]" />
            </div>
          </header>

          <div className="store-detail-summary ui-panel ui-frame space-y-4 px-6 py-5">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              {product.detail.summary}
            </p>
            <button
              type="button"
              className="store-detail-buy inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.24em]"
              style={{
                background: 'var(--button-fill-primary)',
                color: 'var(--text-inverse)',
                borderColor: product.accent,
              }}
            >
              {t('cta')}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="store-detail-spec ui-panel ui-frame px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Format</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">{product.format}</p>
            </div>
            <div className="store-detail-spec ui-panel ui-frame px-4 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Size</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">{product.size}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="store-signal-profile ui-panel ui-frame space-y-5 px-6 py-6 md:col-span-4">
          <h3 className="text-xs uppercase tracking-[0.26em]" style={{ color: product.accent }}>
            {isZh ? '信号档案' : 'Signal Profile'}
          </h3>
          {product.detail.panels.map((panel) => (
            <div key={panel.title} className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{panel.title}</p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]" style={panel.accent ? { color: panel.accent } : undefined}>
                {panel.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
          {product.detail.stats.map((stat) => (
            <div key={stat.label} className="store-stat-card ui-panel ui-frame px-5 py-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold uppercase tracking-[0.05em]" style={{ color: stat.accent ?? product.accent }}>
                {stat.value}
              </p>
              <div className="store-stat-line mt-3">
                <div className="store-stat-line-fill" style={{ backgroundColor: stat.accent ?? product.accent }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h3 className="flex items-center gap-3 text-xl font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
          <span className="h-[2px] w-8" style={{ backgroundColor: product.accent }} />
          {product.type === 'sample-pack'
            ? isZh
              ? '档案内容'
              : 'Archival Contents'
            : product.type === 'preset-pack'
              ? isZh
                ? '预设目录'
                : 'Preset Directory'
              : isZh
                ? '章节目录'
                : 'Lesson Directory'}
        </h3>

        <div className="space-y-2">
          {product.detail.items.map((item, index) => (
            <div key={item.title} className="store-item-row ui-panel ui-frame flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
                  {item.title}
                </span>
              </div>
              <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {item.metaLeft ? <span>{item.metaLeft}</span> : null}
                {item.metaRight ? <span>{item.metaRight}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
