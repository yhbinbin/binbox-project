'use client';

import { useSyncExternalStore } from 'react';
import { useLocale } from 'next-intl';
import { useThemeStore, themes, themeMetadata } from '@/lib/theme';
import SegmentedSwitch from './SegmentedSwitch';

export default function ThemeSwitcher() {
  const locale = useLocale();
  const { theme, setTheme } = useThemeStore();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="seg-switch seg-switch-theme seg-switch-placeholder" aria-hidden="true" />
    );
  }

  const isZh = locale === 'zh';
  const options = themes.map((item) => {
    const meta = themeMetadata[item];

    return {
      value: item,
      label: item === 'vhs-tape'
        ? (
            <span className="seg-switch-theme-label">
              <span className="theme-mark theme-mark-tape" aria-hidden="true" />
              <span>VHS-Tape</span>
            </span>
          )
        : (
            <span className="seg-switch-theme-label">
              <span className="theme-mark theme-mark-disc" aria-hidden="true" />
              <span>ROM-CD</span>
            </span>
          ),
      title: isZh ? meta.name : meta.nameEn,
    };
  });

  return (
    <SegmentedSwitch
      ariaLabel={isZh ? '切换主题' : 'Switch theme'}
      className="seg-switch-theme"
      options={options}
      value={theme}
      onChange={setTheme}
    />
  );
}
