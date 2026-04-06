import { BreakbeatPattern } from "@/lib/audio/breakbeatEngine";

const stepIndexes = Array.from({ length: 16 }, (_, index) => index);

const instrumentRows = [
  { key: "kick", label: "Kick" },
  { key: "snare", label: "Snare" },
  { key: "hat", label: "Hi-hat" },
] as const;

type InstrumentKey = (typeof instrumentRows)[number]["key"];

type SequencerGridProps = {
  pattern: BreakbeatPattern;
  currentStep: number | null;
  onToggleStep: (row: InstrumentKey, step: number) => void;
};

export default function SequencerGrid({
  pattern,
  currentStep,
  onToggleStep,
}: SequencerGridProps) {
  return (
    <div className="space-y-4">
      {instrumentRows.map((row) => (
        <section
          key={row.key}
          className="breakbeat-row-shell breakbeat-surface-shell space-y-2.5 border border-[var(--border-default)] px-3 py-2"
        >
          <div className="breakbeat-row-bar flex items-center justify-between">
            <span className="breakbeat-row-label text-xs uppercase tracking-[0.28em]">
              {row.label}
            </span>
            <span className="breakbeat-row-key text-xs uppercase tracking-[0.22em]">
              {row.key.toUpperCase()}
            </span>
          </div>

          <div
            className="breakbeat-row-grid grid gap-1"
            style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
            aria-label={`${row.label} pattern`}
          >
            {stepIndexes.map((step) => {
              const isActive = pattern[step]?.[row.key];
              const isCurrent = currentStep === step;
              return (
                <button
                  type="button"
                  key={`${row.key}-${step}`}
                  onClick={() => onToggleStep(row.key, step)}
                  data-instrument={row.key}
                  className={`breakbeat-step-pad group relative cursor-pointer ${isActive ? "is-active" : ""} ${isCurrent ? "is-current" : ""}`}
                  aria-pressed={isActive}
                >
                  <span className={`breakbeat-step-screen ${isActive ? "is-active" : ""} ${isCurrent ? "is-current" : ""}`}>
                    <span className="breakbeat-step-index">{step + 1}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
