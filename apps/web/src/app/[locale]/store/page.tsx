import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Container from '@/components/ui/Container';
import { storeProducts } from '@/lib/store';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function StorePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('store');
  const isZh = locale.startsWith('zh');

  return (
    <Container className="store-shell max-w-[1180px] space-y-10 pb-12 pt-10 md:pb-16 md:pt-12">
      <div className="store-ribbon" />

      <header className="store-header ui-panel ui-frame relative overflow-hidden px-6 py-8 md:px-8 md:py-10">
        <div className="store-header-glow pointer-events-none absolute inset-x-0 bottom-0 h-24" />
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
            <span className="store-status">
              <span className="store-status-dot" />
              {isZh ? '目录在线' : 'Catalog Online'}
            </span>
            <span>{isZh ? `条目数: ${storeProducts.length.toString().padStart(2, '0')}` : `Entries: ${storeProducts.length.toString().padStart(2, '0')}`}</span>
            <span>{isZh ? '阶段: 视觉验证' : 'State: Visual Validation'}</span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {storeProducts.map((product, index) => (
          <article key={product.slug} className={`store-card group ${index % 3 === 1 ? 'lg:mt-8' : ''}`.trim()}>
            <Link href={`/store/${product.slug}`} className="block cursor-pointer">
              <div className="store-artwork-shell ui-panel ui-frame relative mb-5 aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={640}
                  height={640}
                  className="h-full w-full object-cover opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div className="store-artwork-overlay" />
                <span className="store-catalog-tag text-xs uppercase tracking-[0.2em]" style={{ color: product.accent }}>
                  {product.catalog}
                </span>
              </div>
            </Link>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <span>{isZh ? product.eyebrow : product.type.replace('-', ' ')}</span>
                <span style={{ color: product.accent }}>{product.price}</span>
              </div>

              <h2 className="text-2xl font-semibold uppercase tracking-[0.06em] text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
                <Link href={`/store/${product.slug}`} className="cursor-pointer underline-offset-4 hover:underline">
                  {product.title}
                </Link>
              </h2>

              <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {product.tags.map((tag) => (
                  <span key={tag} className="archive-tag store-tag text-xs uppercase tracking-[0.18em]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <p>{product.format}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{product.size}</p>
                </div>
                <span className="store-open-link text-xs uppercase tracking-[0.24em]" style={{ color: product.accent }}>
                  {isZh ? '查看详情' : 'Open Detail'} -&gt;
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="store-meta grid gap-8 border-t border-[var(--border-default)] pt-10 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
            {isZh ? '系统状态' : 'System Status'}
          </h3>
          <div className="store-status-panel ui-panel ui-frame px-4 py-4">
            <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.18em]">
              <span>Archive Store</span>
              <span className="store-status-value">{isZh ? '就绪' : 'Ready'}</span>
            </div>
            <div className="store-progress">
              <div className="store-progress-fill" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
            {isZh ? '商品类型' : 'Catalog Types'}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {isZh
              ? '采样包、预设包与教程模块共用统一目录，但详情页展示逻辑会根据商品类型分化。'
              : 'Sample packs, preset packs, and tutorial modules share one catalog but branch into different detail layouts.'}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
            {isZh ? '当前阶段' : 'Current Phase'}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {isZh
              ? '当前主要用于验证视觉、文案和信息组织，不接支付。'
              : 'This stage focuses on validating visual direction, product language, and information architecture without checkout.'}
          </p>
        </div>

        <div className="flex items-end md:justify-end">
          <div className="store-cta-chip inline-flex items-center justify-center px-5 py-3 text-xs uppercase tracking-[0.24em]">
            {isZh ? '支付功能暂未启用' : 'Checkout Not Enabled'}
          </div>
        </div>
      </aside>
    </Container>
  );
}
