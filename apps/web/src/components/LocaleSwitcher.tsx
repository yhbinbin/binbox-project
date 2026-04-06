'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, Locale } from '@/i18n/config';

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <label className="site-locale-select-shell">
      <span className="sr-only">{locale === 'zh' ? '切换语言' : 'Switch language'}</span>
      <select
        aria-label={locale === 'zh' ? '切换语言' : 'Switch language'}
        className="site-locale-select"
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {item === 'zh' ? '中文' : 'English'}
          </option>
        ))}
      </select>
    </label>
  );
}
