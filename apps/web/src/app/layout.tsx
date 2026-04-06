import type { Metadata } from "next";
import { Space_Grotesk, VT323 } from "next/font/google";
import "./globals.css";

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = VT323({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "binbox斌盒子 - 数字音乐实验室",
  description:
    "binbox斌盒子是一个数字音乐实验室，融合了90年代的怀旧情怀与现代网页音频实验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 内联脚本防止主题闪烁 (FOUC)
  const themeScript = `
    (function() {
      try {
        var stored = localStorage.getItem('binbox-theme');
        var legacyMap = {
          vaporwave: 'vhs-tape',
          cnretro: 'vhs-tape',
          vintage: 'vhs-tape',
          y2k: 'rom-cd',
          win95: 'rom-cd',
          'future-retro': 'vhs-tape',
          'digital-future': 'rom-cd',
          vinyl: 'vhs-tape'
        };
        if (stored) {
          var parsed = JSON.parse(stored);
          if (parsed.state && parsed.state.theme) {
            var nextTheme = legacyMap[parsed.state.theme] || parsed.state.theme;
            document.documentElement.setAttribute('data-theme', nextTheme);
          }
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
