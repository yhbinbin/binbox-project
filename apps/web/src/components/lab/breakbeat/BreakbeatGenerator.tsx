"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import * as Tone from "tone";
import {
  BreakbeatPattern,
  createBreakbeatEngine,
} from "@/lib/audio/breakbeatEngine";
import { drumKits, DrumKitId } from "@/lib/audio/drumKits";
import { downloadMidi, exportPatternToMidi } from "@/lib/audio/midiExport";
import ControlsPanel from "@/components/lab/breakbeat/ControlsPanel";
import SequencerGrid from "@/components/lab/breakbeat/SequencerGrid";

const createEmptyPattern = (): BreakbeatPattern =>
  Array.from({ length: 16 }, () => ({ kick: false, snare: false, hat: false }));

type EngineRef = ReturnType<typeof createBreakbeatEngine> | null;

type InstrumentKey = "kick" | "snare" | "hat";

// 默认值常量，避免在 ref 内引用 state
const DEFAULT_TEMPO = 120;
const DEFAULT_SWING = 25;
const DEFAULT_HUMANIZE = true;

export default function BreakbeatGenerator() {
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const t = useTranslations("lab.breakbeatGenerator");
  const engineRef = useRef<EngineRef>(null);
  const [pattern, setPattern] = useState<BreakbeatPattern>(createEmptyPattern());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const [swing, setSwing] = useState(DEFAULT_SWING);
  const [humanize, setHumanize] = useState(DEFAULT_HUMANIZE);
  const [kitId, setKitId] = useState<DrumKitId>("classic-909");

  // ensureEngine 不依赖于任何会变化的参数，只负责创建 engine
  // 具体参数通过 setter 方法设置，避免 engine 被重复销毁/重建
  const ensureEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = createBreakbeatEngine({
        onStep: (stepIndex) => setCurrentStep(stepIndex),
      });
      const initial = engineRef.current.generatePattern();
      engineRef.current.setPattern(initial);
      setPattern(initial);
      // 使用默认值初始化，之后通过 setter 更新
      engineRef.current.setTempo(DEFAULT_TEMPO);
      engineRef.current.setSwing(DEFAULT_SWING / 100);
      engineRef.current.setHumanize(DEFAULT_HUMANIZE);
    }
  }, []);

  const handlePlay = useCallback(async () => {
    ensureEngine();

    // AudioContext must be resumed from a user gesture.
    await Tone.start();
    await engineRef.current?.init();
    engineRef.current?.start();
    setIsPlaying(true);
  }, [ensureEngine]);

  const handleStop = useCallback(() => {
    engineRef.current?.stop();
    setIsPlaying(false);
    setCurrentStep(null);
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handleStop();
      return;
    }

    void handlePlay();
  }, [handlePlay, handleStop, isPlaying]);

  const handleGenerate = useCallback(() => {
    ensureEngine();
    const nextPattern = engineRef.current?.generatePattern();
    if (!nextPattern) return;
    engineRef.current?.setPattern(nextPattern);
    setPattern(nextPattern);
  }, [ensureEngine]);

  const handleExportMidi = useCallback(() => {
    const { blob } = exportPatternToMidi(pattern, tempo);
    downloadMidi(blob, "binbox-breakbeat.mid");
  }, [pattern, tempo]);

  const handleTempoChange = useCallback((value: number) => {
    setTempo(value);
    engineRef.current?.setTempo(value);
  }, []);

  const handleSwingChange = useCallback((value: number) => {
    setSwing(value);
    engineRef.current?.setSwing(value / 100);
  }, []);

  const handleHumanizeChange = useCallback((value: boolean) => {
    setHumanize(value);
    engineRef.current?.setHumanize(value);
  }, []);

  const handleKitChange = useCallback(async (value: DrumKitId) => {
    setKitId(value);
    ensureEngine();
    await engineRef.current?.setKit(value);
  }, [ensureEngine]);

  const handleToggleStep = useCallback(
    (row: InstrumentKey, step: number) => {
      setPattern((prev) => {
        const next = prev.map((item) => ({ ...item }));
        if (!next[step]) return prev;
        next[step][row] = !next[step][row];
        engineRef.current?.setPattern(next);
        return next;
      });
    },
    []
  );

  const filledSteps = useMemo(
    () => pattern.filter((step) => step.kick || step.snare || step.hat).length,
    [pattern]
  );
  const currentKit = drumKits.find((kit) => kit.id === kitId);

  useEffect(() => {
    ensureEngine();

    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [ensureEngine]);

  return (
    <section className="breakbeat-shell breakbeat-surface-backdrop space-y-8">
      <div className="breakbeat-ribbon" />

      <header className="breakbeat-header breakbeat-surface-shell ui-panel ui-frame relative overflow-hidden px-6 py-7 md:px-8 md:py-9">
        <div className="breakbeat-header-glow pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="breakbeat-header-kicker text-xs uppercase tracking-[0.34em]">
              {t("eyebrow")}
            </p>
            <div className="space-y-3">
              <h1 className="breakbeat-header-title text-4xl font-semibold uppercase tracking-[0.08em] md:text-5xl">
                {t("title")}
              </h1>
              <p className="breakbeat-header-copy max-w-3xl text-sm leading-relaxed md:text-base">
                {t("description")}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <p className="breakbeat-header-meta text-xs uppercase tracking-[0.3em]">
              {isZh ? "节奏修订: RHYTHM_BUFFER_16" : "Rhythm Revision: RHYTHM_BUFFER_16"}
            </p>
            <div className="breakbeat-header-status text-xs uppercase tracking-[0.24em]">
              <span className="breakbeat-status-dot" />
              <span>{isPlaying ? (isZh ? "实时运行中" : "Live Playback") : (isZh ? "缓冲待命" : "Buffer Ready")}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1.55fr)]">
        <ControlsPanel
          isPlaying={isPlaying}
          tempo={tempo}
          swing={swing}
          humanize={humanize}
          kitId={kitId}
          onTogglePlay={handleTogglePlay}
          onGenerate={handleGenerate}
          onExportMidi={handleExportMidi}
          onTempoChange={handleTempoChange}
          onSwingChange={handleSwingChange}
          onHumanizeChange={handleHumanizeChange}
          onKitChange={handleKitChange}
        />

        <section className="breakbeat-sequencer-shell breakbeat-surface-shell ui-panel ui-frame overflow-hidden px-4 py-5 md:px-5">
          <div className="mb-4 flex flex-col gap-2 border-b border-[var(--border-default)] pb-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="breakbeat-panel-kicker text-xs uppercase tracking-[0.26em]">
                {isZh ? "鼓机矩阵" : "Drum Matrix"}
              </p>
              <p className="breakbeat-panel-copy mt-1 text-sm">
                {isZh ? "16 步节奏格，逐行切换 Kick、Snare 与 Hat。" : "Sixteen-step groove grid for kick, snare, and hat toggling."}
              </p>
            </div>
            <p className="breakbeat-panel-meta text-xs uppercase tracking-[0.24em]">
              {isZh ? "网格模式 // 16-step sync" : "Grid Mode // 16-step sync"}
            </p>
          </div>

          <SequencerGrid
            pattern={pattern}
            currentStep={currentStep}
            onToggleStep={handleToggleStep}
          />
        </section>
      </div>

      <section className="breakbeat-monitor-shell breakbeat-surface-shell ui-panel ui-frame relative overflow-hidden px-4 py-4 md:px-6">
        <div className="breakbeat-monitor-glow pointer-events-none absolute inset-x-0 top-0 h-24" />
        <div className="relative z-10 space-y-4">
          <div className="breakbeat-monitor-meta-row flex flex-col gap-3 border-b border-[var(--border-default)] pb-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-1">
              <p className="breakbeat-monitor-kicker text-xs uppercase tracking-[0.24em]">
                {isZh ? "节奏监视总线" : "Rhythm Monitor Bus"}
              </p>
              <p className="breakbeat-monitor-copy text-xs uppercase tracking-[0.24em]">
                {currentKit?.name ?? kitId}
              </p>
            </div>
            <div className="breakbeat-monitor-stats flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
              <span>{`${isZh ? "激活步进" : "Active Step"} // ${currentStep !== null ? String(currentStep + 1).padStart(2, "0") : "--"}`}</span>
              <span>{`${isZh ? "命中数" : "Filled Steps"} // ${filledSteps}`}</span>
            </div>
          </div>

          <div className="breakbeat-monitor-screen breakbeat-surface-screen relative overflow-hidden border border-[var(--border-default)] px-4 py-5">
            <div className="breakbeat-monitor-grid" />
            <div className="breakbeat-monitor-columns">
              {pattern.map((step, index) => {
                const hits = Number(step.kick) + Number(step.snare) + Number(step.hat);
                const isCurrent = currentStep === index;
                return (
                  <div
                    key={`monitor-${index}`}
                    className={`breakbeat-monitor-column ${isCurrent ? "is-current" : ""}`}
                    style={{ height: `${Math.max(18, hits * 28)}px` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="breakbeat-monitor-footer flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-default)] pt-3">
            <span>{t("hitsLoaded", { count: filledSteps })}</span>
            <div className="breakbeat-monitor-footer-stats flex flex-wrap gap-4">
              <span>{`Tempo // ${tempo} BPM`}</span>
              <span>{`Swing // ${swing}%`}</span>
              <span>{`Humanize // ${humanize ? "ON" : "OFF"}`}</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="breakbeat-footer breakbeat-surface-shell ui-panel ui-frame px-4 py-4">
        <div className="breakbeat-footer-row flex flex-col justify-between gap-3 text-xs uppercase tracking-[0.22em] md:flex-row md:items-center">
          <p className="breakbeat-footer-note">{t("grooveNote")}</p>
          <p className="breakbeat-footer-status">
            {isZh ? "导出缓冲 // MIDI / Pattern / Grid" : "Export Buffer // MIDI / Pattern / Grid"}
          </p>
        </div>
      </footer>
    </section>
  );
}
