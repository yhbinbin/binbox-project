"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import PianoKeyboard from "@/components/lab/music-theory-keyboard/PianoKeyboard";
import CircleOfFifths, {
  PlayMode,
} from "@/components/lab/music-theory-keyboard/CircleOfFifths";
import KeyboardControls from "@/components/lab/music-theory-keyboard/KeyboardControls";

export default function MusicTheoryKeyboard() {
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const t = useTranslations("lab.experiments.musicTheoryKeyboard");
  const [playMode, setPlayMode] = useState<PlayMode>("root");
  const playModeOptions = [
    { value: "root", label: isZh ? "根音" : "Root" },
    { value: "triad", label: isZh ? "三和弦" : "Triad" },
    { value: "triad-arpeggio", label: isZh ? "分解三和弦" : "Triad Arp" },
    { value: "seventh", label: isZh ? "七和弦" : "Seventh" },
    { value: "seventh-arpeggio", label: isZh ? "分解七和弦" : "Seventh Arp" },
  ] as const;

  return (
    <section className="theory-shell theory-surface-backdrop relative flex min-h-[70vh] flex-col gap-8 pb-24 md:pb-40">
      <div className="theory-ribbon" />

      <header className="theory-header theory-surface-shell ui-panel ui-frame relative overflow-hidden px-6 py-7 md:px-8 md:py-9">
        <div className="theory-header-glow pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="theory-header-kicker text-xs uppercase tracking-[0.34em]">
              {isZh ? "Music Theory Keyboard – binbox 实验室" : "Music Theory Keyboard – binbox lab"}
            </p>
            <div className="space-y-3">
              <h1 className="theory-header-title text-4xl font-semibold uppercase tracking-[0.08em] md:text-5xl">
                {t("title")}
              </h1>
              <p className="theory-header-copy max-w-3xl text-sm leading-relaxed md:text-base">
                {isZh
                  ? "将根音、和弦、调式与五度圈收纳进同一台理论工作站里。点击列表或五度圈扇区试听，再在底部键盘观察按键映射。"
                  : "Bring roots, chords, modes, and the circle of fifths into one harmonic workstation. Trigger lists or fifths sectors above, then follow the note map on the keyboard below."}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <p className="theory-header-meta text-xs uppercase tracking-[0.3em]">
              {isZh ? "和声修订: THEORY_BUFFER_12" : "Harmony Revision: THEORY_BUFFER_12"}
            </p>
            <div className="theory-header-status text-xs uppercase tracking-[0.24em]">
              <span className="theory-status-dot" />
              <span>{isZh ? "键盘映射待命" : "Keyboard Map Ready"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
        <KeyboardControls />

        <section className="theory-circle-shell theory-surface-shell ui-panel ui-frame overflow-visible px-4 py-5 md:px-5">
          <div className="mb-4 flex flex-col gap-2 border-b border-[var(--border-default)] pb-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="theory-panel-kicker text-xs uppercase tracking-[0.26em]">
                {isZh ? "五度圈总线" : "Circle Of Fifths Bus"}
              </p>
              <p className="theory-panel-copy mt-1 text-sm">
                {isZh
                  ? "以点击扇区的方式试听主音、三和弦、七和弦与分解型。"
                  : "Tap sectors to audition roots, triads, sevenths, and arpeggiated variants."}
              </p>
            </div>
            <p className="theory-panel-meta text-xs uppercase tracking-[0.24em]">
              {isZh ? "环形模式 // 12-key orbit" : "Orbital Mode // 12-key orbit"}
            </p>
          </div>

          <div className="theory-circle-column grid gap-4">
            <aside className="theory-mode-rack theory-sticky-compact theory-surface-raised border border-[var(--border-default)] p-4">
              <div className="space-y-1 border-b border-[var(--border-default)] pb-2">
                <p className="theory-panel-kicker text-xs uppercase tracking-[0.24em]">
                  {isZh ? "播放模式" : "Play Mode"}
                </p>
              </div>

              <div className="theory-mode-grid mt-3">
                {playModeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPlayMode(option.value)}
                    className={`theory-mode-button ${
                      playMode === option.value
                        ? "theory-surface-dark-button is-active"
                        : "theory-surface-raised"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </aside>

            <div className="theory-circle-screen theory-surface-screen relative overflow-hidden border border-[var(--border-default)] px-4 py-4 md:px-5">
              <div className="theory-circle-grid" />
              <div className="relative">
                <CircleOfFifths playMode={playMode} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="md:sticky md:bottom-0 md:z-20">
        <section className="theory-keyboard-shell theory-surface-shell ui-panel ui-frame overflow-hidden px-4 py-5 md:px-6">
          <PianoKeyboard defaultOctaves={4} defaultStartOctave={2} centerOctave={3} />
        </section>
      </div>
    </section>
  );
}
