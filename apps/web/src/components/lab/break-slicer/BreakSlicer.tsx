"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import * as Tone from "tone";
import {
  BreakSlicerPattern,
  createBreakSlicerEngine,
} from "@/lib/audio/breakSlicerEngine";
import { Button } from "@/components/ui/Button";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import WaveformViewer from "@/components/lab/break-slicer/WaveformViewer";
import SliceGrid from "@/components/lab/break-slicer/SliceGrid";

const SAMPLE_OPTIONS: SelectOption[] = [
  {
    value: "/audio/breaks/amen-break.wav",
    label: "Amen Break (Synth)",
    description: "Built-in synthetic break for fast load.",
  },
  {
    value: "/audio/breaks/real-amen-break.wav",
    label: "Real Amen Break",
    description: "User-provided break sample.",
  },
];

const createEmptyPattern = (): BreakSlicerPattern =>
  Array.from({ length: 16 }, (_item, index) => ({ slice: index, pitch: 0 }));

type EngineRef = ReturnType<typeof createBreakSlicerEngine> | null;

export default function BreakSlicer() {
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const t = useTranslations("lab.breakSlicer");
  const engineRef = useRef<EngineRef>(null);
  const [pattern, setPattern] = useState<BreakSlicerPattern>(createEmptyPattern());
  const patternRef = useRef<BreakSlicerPattern>(pattern);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [activeSlice, setActiveSlice] = useState<number | null>(null);
  const [sampleUrl, setSampleUrl] = useState(SAMPLE_OPTIONS[0].value);
  const [tempo, setTempo] = useState(120);

  const ensureEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = createBreakSlicerEngine({
        onStep: (stepIndex) => setCurrentStep(stepIndex),
        onSliceTriggered: (sliceIndex) => setActiveSlice(sliceIndex),
      });
      engineRef.current.setPattern(patternRef.current);
      engineRef.current.setTempo(tempo);
    }
  }, [tempo]);

  const handlePlay = useCallback(async () => {
    ensureEngine();
    await Tone.start();
    await engineRef.current?.init(sampleUrl);
    engineRef.current?.start();
    setIsPlaying(true);
  }, [ensureEngine, sampleUrl]);

  const handleStop = useCallback(() => {
    engineRef.current?.stop();
    setIsPlaying(false);
    setCurrentStep(null);
    setActiveSlice(null);
  }, []);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      handleStop();
      return;
    }

    void handlePlay();
  }, [handlePlay, handleStop, isPlaying]);

  const handleRandomize = useCallback(() => {
    ensureEngine();
    const nextPattern = engineRef.current?.randomizePattern();
    if (!nextPattern) return;
    engineRef.current?.setPattern(nextPattern);
    setPattern(nextPattern);
  }, [ensureEngine]);

  const handleJungleChop = useCallback(() => {
    ensureEngine();
    const nextPattern = engineRef.current?.generateJungleChop();
    if (!nextPattern) return;
    engineRef.current?.setPattern(nextPattern);
    setPattern(nextPattern);
  }, [ensureEngine]);

  const handleSliceChange = useCallback((stepIndex: number, nextSlice: number) => {
    setPattern((prev) => {
      const next = prev.map((step) => ({ ...step }));
      if (!next[stepIndex]) return prev;
      next[stepIndex].slice = nextSlice;
      engineRef.current?.setPattern(next);
      return next;
    });
  }, []);

  const handlePitchChange = useCallback((stepIndex: number, nextPitch: number) => {
    setPattern((prev) => {
      const next = prev.map((step) => ({ ...step }));
      if (!next[stepIndex]) return prev;
      next[stepIndex].pitch = nextPitch;
      engineRef.current?.setPattern(next);
      return next;
    });
  }, []);

  const handleSampleChange = useCallback(
    async (value: string) => {
      setSampleUrl(value);
      ensureEngine();
      await engineRef.current?.setSample(value);
    },
    [ensureEngine]
  );

  const handleTempoChange = useCallback(
    (value: number) => {
      setTempo(value);
      engineRef.current?.setTempo(value);
    },
    []
  );

  const handleSlicePreview = useCallback(
    async (sliceIndex: number) => {
      // 确保 AudioContext 已启动（需要用户手势触发）
      await Tone.start();
      setActiveSlice(sliceIndex);
      ensureEngine();
      await engineRef.current?.init(sampleUrl);
      engineRef.current?.playSlice(sliceIndex);
    },
    [ensureEngine, sampleUrl]
  );

  const handleStepPreview = useCallback(
    (stepIndex: number) => {
      const step = patternRef.current[stepIndex];
      if (!step) return;
      void handleSlicePreview(step.slice);
    },
    [handleSlicePreview]
  );

  const sliceSummary = useMemo(
    () => pattern.map((step) => step.slice + 1).join(" "),
    [pattern]
  );
  const activeStepLabel = currentStep !== null ? String(currentStep + 1).padStart(2, "0") : "--";
  const activeSliceLabel = activeSlice !== null ? String(activeSlice + 1).padStart(2, "0") : "--";
  const sampleLabel =
    SAMPLE_OPTIONS.find((option) => option.value === sampleUrl)?.label ?? "Break Buffer";

  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);

  useEffect(() => {
    ensureEngine();

    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [ensureEngine]);

  return (
    <section className="break-slicer-shell break-slicer-surface-backdrop space-y-8">
      <div className="break-slicer-ribbon" />

      <header className="break-slicer-header break-slicer-surface-shell ui-panel ui-frame relative overflow-hidden px-6 py-7 md:px-8 md:py-9">
        <div className="break-slicer-header-glow pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="break-slicer-header-kicker text-xs uppercase tracking-[0.34em]">
              {t("eyebrow")}
            </p>
            <div className="space-y-3">
              <h1 className="break-slicer-header-title text-4xl font-semibold uppercase tracking-[0.08em] md:text-5xl">
                {t("title")}
              </h1>
              <p className="break-slicer-header-copy max-w-3xl text-sm leading-relaxed md:text-base">
                {t("description")}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <p className="break-slicer-header-meta text-xs uppercase tracking-[0.3em]">
              {isZh ? "硬件修订: SLICE_BUFFER_16" : "Hardware Revision: SLICE_BUFFER_16"}
            </p>
            <div className="break-slicer-status break-slicer-header-status justify-end text-xs uppercase tracking-[0.24em]">
              <span className="break-slicer-status-dot" />
              <span>{isPlaying ? (isZh ? "实时运行中" : "Live Playback") : (isZh ? "缓冲待命" : "Buffer Ready")}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="break-slicer-wave-shell break-slicer-surface-shell ui-panel ui-frame relative overflow-hidden px-4 py-4 md:px-6">
        <div className="break-slicer-wave-glow pointer-events-none absolute inset-x-0 top-0 h-24" />
        <div className="relative z-10 space-y-4">
          <div className="break-slicer-wave-meta-row flex flex-col gap-3 border-b border-[var(--border-default)] pb-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-1">
              <p className="break-slicer-wave-kicker text-xs uppercase tracking-[0.24em]">
                {isZh ? "实时波形总线" : "Live Waveform Bus"}
              </p>
              <p className="break-slicer-wave-sample text-xs uppercase tracking-[0.24em]">
                {sampleLabel}
              </p>
            </div>
            <div className="break-slicer-wave-stats flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
              <span>{`${isZh ? "激活切片" : "Active Slice"} // ${activeSliceLabel}`}</span>
              <span>{`${isZh ? "当前步进" : "Current Step"} // ${activeStepLabel}`}</span>
            </div>
          </div>

          <div className="break-slicer-wave-screen break-slicer-surface-screen relative overflow-hidden border border-[var(--border-default)] px-3 py-4 md:px-4">
            <div className="break-slicer-wave-grid" />
            <WaveformViewer
              sampleUrl={sampleUrl}
              activeSlice={activeSlice}
              onSliceClick={handleSlicePreview}
            />
          </div>

          <div className="break-slicer-wave-footer flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-default)] pt-3">
            <span>{`${t("sliceOrder")}: ${sliceSummary}`}</span>
            <div className="break-slicer-wave-footer-stats flex flex-wrap gap-4">
              <span>{`Tempo // ${tempo} BPM`}</span>
              <span>{`Slices // 16/16`}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_340px]">
        <section className="break-slicer-matrix-shell break-slicer-surface-shell ui-panel ui-frame overflow-hidden px-4 py-5 md:px-5">
          <div className="mb-4 flex flex-col gap-2 border-b border-[var(--border-default)] pb-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="break-slicer-panel-kicker text-xs uppercase tracking-[0.26em]">
                {isZh ? "切片矩阵" : "Slice Matrix"}
              </p>
              <p className="break-slicer-panel-copy mt-1 text-sm">
                {isZh ? "16 个片段节点，逐步重排与预听。" : "Sixteen slice nodes for step-by-step reordering and preview."}
              </p>
            </div>
            <p className="break-slicer-panel-meta text-xs uppercase tracking-[0.24em]">
              {isZh ? "网格模式 // 16-step sync" : "Grid Mode // 16-step sync"}
            </p>
          </div>

          <SliceGrid
            pattern={pattern}
            currentStep={currentStep}
            onSliceChange={handleSliceChange}
            onPitchChange={handlePitchChange}
            onPreviewSlice={handleStepPreview}
          />
        </section>

        <aside className="break-slicer-control-shell break-slicer-surface-shell ui-panel ui-frame overflow-hidden px-4 py-5 md:px-5">
          <div className="mb-4 border-b border-[var(--border-default)] pb-3">
            <p className="break-slicer-panel-kicker text-xs uppercase tracking-[0.26em]">
              {isZh ? "控制机架" : "Control Rack"}
            </p>
          </div>

          <div className="break-slicer-control-stack">
            <div className="break-slicer-control-block break-slicer-surface-raised">
              <div className="break-slicer-control-label">
                <span>{isZh ? "传输控制" : "Transport"}</span>
                <span>{isPlaying ? "RUN" : "IDLE"}</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Button className="break-slicer-rack-button break-slicer-rack-button-primary break-slicer-surface-dark-button" onClick={handleToggle}>
                  {isPlaying ? t("stop") : t("play")}
                </Button>
                <Button className="break-slicer-rack-button break-slicer-rack-button-secondary break-slicer-surface-raised" onClick={handleRandomize}>
                  {t("randomize")}
                </Button>
                <Button className="break-slicer-rack-button break-slicer-rack-button-tertiary break-slicer-surface-dark-button" onClick={handleJungleChop}>
                  {t("jungleChop")}
                </Button>
              </div>
            </div>

            <div className="break-slicer-control-block break-slicer-surface-raised">
              <div className="break-slicer-control-label">
                <span>{t("tempo")}</span>
                <span>{tempo} BPM</span>
              </div>
              <Slider
                min={80}
                max={180}
                value={tempo}
                onChange={(event) => handleTempoChange(Number(event.target.value))}
                accentColor="secondary"
              />
            </div>

            <div className="break-slicer-control-block break-slicer-surface-raised">
              <div className="break-slicer-control-label">
                <span>{t("breakSelect")}</span>
                <span>{isZh ? "内部缓冲" : "Internal Buffer"}</span>
              </div>
              <Select
                value={sampleUrl}
                onValueChange={handleSampleChange}
                options={SAMPLE_OPTIONS}
                className="break-slicer-select break-slicer-surface-screen"
              />
            </div>

            <div className="break-slicer-control-block break-slicer-surface-raised">
              <div className="break-slicer-control-label">
                <span>{isZh ? "系统状态" : "System State"}</span>
                <span>{isZh ? "稳定" : "Stable"}</span>
              </div>
              <div className="break-slicer-system-readout space-y-2 text-sm">
                <p>{`${isZh ? "活动切片" : "Active Slice"}: ${activeSliceLabel}`}</p>
                <p>{`${isZh ? "播放步进" : "Playhead Step"}: ${activeStepLabel}`}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="break-slicer-footer break-slicer-surface-shell ui-panel ui-frame px-4 py-4">
        <div className="break-slicer-footer-row flex flex-col justify-between gap-3 text-xs uppercase tracking-[0.22em] md:flex-row md:items-center">
          <p className="break-slicer-footer-note">{t("note")}</p>
          <p className="break-slicer-footer-status">
            {isZh ? "样本缓冲 // 16-bit / 44.1 kHz" : "Sample Buffer // 16-bit / 44.1 kHz"}
          </p>
        </div>
      </footer>
    </section>
  );
}
