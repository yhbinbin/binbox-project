'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navigation() {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/music', label: t('music') },
    { href: '/lab', label: t('lab') },
    { href: '/archive', label: t('archive') },
    { href: '/store', label: t('store') },
    { href: '/about', label: t('about') },
  ];

  return (
    <header className="site-header">
      <nav className="site-nav-shell">
        <div className="site-nav-row">
          <div className="flex items-center justify-between sm:justify-start sm:gap-6">
            <Link
              href="/"
              className="site-brand cursor-pointer"
            >
              {tCommon('siteName')}
            </Link>
            <div className="site-nav-controls flex items-center sm:hidden">
              <ThemeSwitcher />
              <span className="site-nav-divider">|</span>
              <LocaleSwitcher />
            </div>
          </div>

          <div className="site-nav-links text-sm uppercase tracking-[0.18em]">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link cursor-pointer whitespace-nowrap ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="site-nav-controls hidden items-center sm:flex">
            <ThemeSwitcher />
            <span className="site-nav-divider">|</span>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
