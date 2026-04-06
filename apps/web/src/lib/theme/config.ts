// 主题类型定义
export const themes = ['vhs-tape', 'rom-cd'] as const;

export type Theme = (typeof themes)[number];

// 默认主题
export const defaultTheme: Theme = 'vhs-tape';

const legacyThemeMap = {
  vaporwave: 'vhs-tape',
  cnretro: 'vhs-tape',
  vintage: 'vhs-tape',
  y2k: 'rom-cd',
  win95: 'rom-cd',
  'future-retro': 'vhs-tape',
  'digital-future': 'rom-cd',
  vinyl: 'vhs-tape',
} as const;

export const normalizeTheme = (value: string | null | undefined): Theme => {
  if (!value) return defaultTheme;
  if ((themes as readonly string[]).includes(value)) {
    return value as Theme;
  }
  if (value in legacyThemeMap) {
    return legacyThemeMap[value as keyof typeof legacyThemeMap];
  }
  return defaultTheme;
};

// 主题元数据
export const themeMetadata: Record<Theme, {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}> = {
  'vhs-tape': {
    name: 'VHS-Tape',
    nameEn: 'VHS-Tape',
    description: '蒸汽波、中式旧核与受损录像带质感',
    descriptionEn: 'Vaporwave, CN retrocore, and damaged tape atmosphere',
    icon: '📼',
  },
  'rom-cd': {
    name: 'ROM-CD',
    nameEn: 'ROM-CD',
    description: '冷蓝数码未来与 Win95 银灰设备壳',
    descriptionEn: 'Cold digital future with Win95 silver chassis language',
    icon: '💽',
  },
};
