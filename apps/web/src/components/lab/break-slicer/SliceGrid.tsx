import { BreakSlicerPattern } from "@/lib/audio/breakSlicerEngine";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

const stepIndexes = Array.from({ length: 16 }, (_, index) => index);

const formatSlice = (slice: number) => String(slice + 1).padStart(2, "0");

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

type SliceGridProps = {
  pattern: BreakSlicerPattern;
  currentStep: number | null;
  onSliceChange: (stepIndex: number, nextSlice: number) => void;
  onPitchChange: (stepIndex: number, nextPitch: number) => void;
  onPreviewSlice: (stepIndex: number) => void;
};

export default function SliceGrid({
  pattern,
  currentStep,
  onSliceChange,
  onPitchChange,
  onPreviewSlice,
}: SliceGridProps) {
  return (
    <div className="space-y-4">
      <div className="break-slicer-sequencer">
        {stepIndexes.map((step) => {
          const slice = pattern[step]?.slice ?? 0;
          const pitch = pattern[step]?.pitch ?? 0;
          const isCurrent = currentStep === step;

          return (
            <button
              key={`sequence-${step}`}
              type="button"
              onClick={() => onPreviewSlice(step)}
              className={`break-slicer-sequencer-step break-slicer-surface-raised ${isCurrent ? "is-current" : ""}`}
              aria-label={`Sequence step ${step + 1} slice ${slice + 1}`}
            >
              <span className="break-slicer-sequencer-index">
                {String(step + 1).padStart(2, "0")}
              </span>
              <span className="break-slicer-sequencer-slice">
                {formatSlice(slice)}
              </span>
              <span className="break-slicer-sequencer-pitch">
                {pitch > 0 ? `+${pitch}` : pitch}
              </span>
            </button>
          );
        })}
      </div>

      <div className="break-slicer-matrix-grid">
        {stepIndexes.map((step) => {
          const slice = pattern[step]?.slice ?? 0;
          const pitch = pattern[step]?.pitch ?? 0;
          const isCurrent = currentStep === step;
          return (
            <div
              key={`slice-${step}`}
              onClick={(event) => {
                event.stopPropagation();
                onPreviewSlice(step);
              }}
              className={`break-slicer-step-card break-slicer-surface-screen group cursor-pointer ${isCurrent ? "is-current" : ""}`}
              aria-label={`Step ${step + 1} slice ${slice + 1}`}
            >
              <div className="break-slicer-step-id">
                <span>{`ID:${String(step + 1).padStart(2, "0")}`}</span>
              </div>

              <div className="break-slicer-step-value">{formatSlice(slice)}</div>

              <div className="break-slicer-step-controls">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSliceChange(step, clamp(slice - 1, 0, 15));
                  }}
                  className="break-slicer-nav-button break-slicer-surface-dark-button"
                  aria-label={`Previous slice for step ${step + 1}`}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSliceChange(step, clamp(slice + 1, 0, 15));
                  }}
                  className="break-slicer-nav-button break-slicer-surface-dark-button"
                  aria-label={`Next slice for step ${step + 1}`}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="break-slicer-step-pitch-row">
                <span className="break-slicer-step-pitch-label">Pitch</span>
                <span className="break-slicer-step-pitch-value">
                  {pitch > 0 ? `+${pitch}` : pitch}
                </span>
              </div>

              <div className="break-slicer-step-pitch-actions">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onPitchChange(step, clamp(pitch - 1, -3, 3));
                  }}
                  className="break-slicer-pitch-button break-slicer-surface-dark-button"
                  aria-label={`Lower pitch for step ${step + 1}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onPitchChange(step, clamp(pitch + 1, -3, 3));
                  }}
                  className="break-slicer-pitch-button break-slicer-surface-dark-button"
                  aria-label={`Raise pitch for step ${step + 1}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="break-slicer-note-strip">
        Click to preview slice • Per-step slice and pitch editing stays live
      </p>
    </div>
  );
}
