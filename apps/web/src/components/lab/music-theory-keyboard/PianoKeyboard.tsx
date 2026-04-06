"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { useKeyboardStore } from "@/store/keyboardStore";
import {
  initAudio,
  getIsInitialized,
  attackNote,
  releaseNote,
} from "@/lib/audio/pianoEngine";

const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
const blackKeyPositions = [0, 1, 3, 4, 5];
const blackNotes = ["C#", "D#", "F#", "G#", "A#"];

const flatToSharpMap: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Fb: "E",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  Cb: "B",
};

function isNoteInSet(noteSet: Set<string>, note: string): boolean {
  if (noteSet.has(note)) return true;

  const match = note.match(/^([A-G][#b]?)(\d+)$/);
  if (!match) return false;

  const [, noteName, octave] = match;

  if (noteName.includes("#")) {
    const sharpToFlat: Record<string, string> = {
      "C#": "Db",
      "D#": "Eb",
      "E": "Fb",
      "F#": "Gb",
      "G#": "Ab",
      "A#": "Bb",
      "B": "Cb",
    };
    const flatName = sharpToFlat[noteName];
    if (flatName && noteSet.has(`${flatName}${octave}`)) return true;
  } else if (noteName.includes("b")) {
    const sharpName = flatToSharpMap[noteName];
    if (sharpName && noteSet.has(`${sharpName}${octave}`)) return true;
  }

  return false;
}

const MAX_WHITE_KEY_WIDTH = 37;
const MIN_WHITE_KEY_WIDTH = 37;
const KEYBOARD_SCREEN_PADDING = 24;

interface PianoKeyboardProps {
  defaultOctaves?: number;
  defaultStartOctave?: number;
  enableSound?: boolean;
  centerOctave?: number;
}

export default function PianoKeyboard({
  defaultOctaves = 4,
  defaultStartOctave = 2,
  enableSound = true,
  centerOctave = 3,
}: PianoKeyboardProps) {
  const { pressedKeys, highlightedKeys, pressKey, releaseKey } =
    useKeyboardStore();

  const [keyboardRange, setKeyboardRange] = useState(() => ({
    startOctave: defaultStartOctave,
    visibleOctaves: defaultOctaves,
    whiteKeyWidth: MAX_WHITE_KEY_WIDTH,
  }));
  const containerRef = useRef<HTMLDivElement>(null);
  const keyboardBedRef = useRef<HTMLDivElement>(null);

  const { startOctave, visibleOctaves, whiteKeyWidth } = keyboardRange;

  const calculateKeyboardRange = useCallback(
    (containerWidth: number) => {
      const availableWidth = Math.max(0, containerWidth - KEYBOARD_SCREEN_PADDING);
      const getWhiteKeyWidth = (octaves: number) =>
        Math.min(
          MAX_WHITE_KEY_WIDTH,
          Math.max(MIN_WHITE_KEY_WIDTH, availableWidth / (octaves * 7))
        );

      if (availableWidth >= MIN_WHITE_KEY_WIDTH * 7 * 4) {
        return {
          startOctave: defaultStartOctave,
          visibleOctaves: 4,
          whiteKeyWidth: getWhiteKeyWidth(4),
        };
      }

      if (availableWidth >= MIN_WHITE_KEY_WIDTH * 7 * 3) {
        return {
          startOctave: defaultStartOctave,
          visibleOctaves: 3,
          whiteKeyWidth: getWhiteKeyWidth(3),
        };
      }

      return {
        startOctave: Math.max(0, Math.min(centerOctave, 6)),
        visibleOctaves: 2,
        whiteKeyWidth: getWhiteKeyWidth(2),
      };
    },
    [centerOctave, defaultStartOctave]
  );

  useLayoutEffect(() => {
    const updateVisibleOctaves = () => {
      if (!keyboardBedRef.current) return;

      const nextRange = calculateKeyboardRange(keyboardBedRef.current.clientWidth);
      setKeyboardRange((prevRange) => {
        if (
          prevRange.startOctave === nextRange.startOctave &&
          prevRange.visibleOctaves === nextRange.visibleOctaves &&
          Math.abs(prevRange.whiteKeyWidth - nextRange.whiteKeyWidth) < 0.1
        ) {
          return prevRange;
        }
        return nextRange;
      });
    };

    updateVisibleOctaves();

    if (typeof ResizeObserver !== "undefined" && keyboardBedRef.current) {
      const observer = new ResizeObserver(updateVisibleOctaves);
      observer.observe(keyboardBedRef.current);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateVisibleOctaves);
    return () => window.removeEventListener("resize", updateVisibleOctaves);
  }, [calculateKeyboardRange]);

  const shiftOctave = (delta: number) => {
    const newStartOctave = startOctave + delta;
    if (newStartOctave >= 0 && newStartOctave + visibleOctaves <= 8) {
      setKeyboardRange((prevRange) => ({
        ...prevRange,
        startOctave: newStartOctave,
      }));
    }
  };

  const blackKeyWidth = whiteKeyWidth * 0.62;
  const whiteKeyHeight = whiteKeyWidth * 3.55;
  const blackKeyHeight = whiteKeyHeight * 0.62;
  const blackKeyOffset = whiteKeyWidth - blackKeyWidth / 2;

  const getWhiteKeyClassName = (note: string) => {
    const isPressed = isNoteInSet(pressedKeys, note);
    const isHighlighted = isNoteInSet(highlightedKeys, note);

    let className =
      "relative cursor-pointer rounded-b-md border border-zinc-300 transition-colors flex items-end justify-center pb-1 ";

    if (isPressed) {
      className += "bg-blue-400";
    } else if (isHighlighted) {
      className += "bg-yellow-300";
    } else {
      className += "bg-white hover:bg-zinc-100 active:bg-zinc-200";
    }

    return className;
  };

  const getBlackKeyClassName = (note: string) => {
    const isPressed = isNoteInSet(pressedKeys, note);
    const isHighlighted = isNoteInSet(highlightedKeys, note);

    let className =
      "absolute z-10 cursor-pointer rounded-b-md transition-colors ";

    if (isPressed) {
      className += "bg-blue-500";
    } else if (isHighlighted) {
      className += "bg-yellow-500";
    } else {
      className += "bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-600";
    }

    return className;
  };

  const handleKeyDown = async (note: string) => {
    if (enableSound && !getIsInitialized()) {
      await initAudio();
    }
    pressKey(note);
    if (enableSound) {
      attackNote(note);
    }
  };

  const handleKeyUp = (note: string) => {
    releaseKey(note);
    if (enableSound) {
      releaseNote(note);
    }
  };

  const renderOctave = (octave: number) => (
    <div key={octave} className="relative flex">
      {whiteKeys.map((noteName) => {
        const note = `${noteName}${octave}`;
        const isC = noteName === "C";
        return (
          <button
            key={note}
            className={getWhiteKeyClassName(note)}
            style={{ width: `${whiteKeyWidth}px`, height: `${whiteKeyHeight}px` }}
            title={note}
            onMouseDown={() => handleKeyDown(note)}
            onMouseUp={() => handleKeyUp(note)}
            onMouseLeave={() => handleKeyUp(note)}
            onTouchStart={() => handleKeyDown(note)}
            onTouchEnd={() => handleKeyUp(note)}
          >
            {isC && (
              <span className="text-xs text-zinc-400 font-light select-none">
                C{octave}
              </span>
            )}
          </button>
        );
      })}
      {blackKeyPositions.map((pos, index) => {
        const note = `${blackNotes[index]}${octave}`;
        return (
          <button
            key={note}
            className={getBlackKeyClassName(note)}
            style={{
              left: `${pos * whiteKeyWidth + blackKeyOffset}px`,
              width: `${blackKeyWidth}px`,
              height: `${blackKeyHeight}px`,
            }}
            title={note}
            onMouseDown={() => handleKeyDown(note)}
            onMouseUp={() => handleKeyUp(note)}
            onMouseLeave={() => handleKeyUp(note)}
            onTouchStart={() => handleKeyDown(note)}
            onTouchEnd={() => handleKeyUp(note)}
          />
        );
      })}
    </div>
  );

  return (
    <div className="w-full" ref={containerRef}>
      <div className="theory-keyboard-toolbar mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => shiftOctave(-1)}
          className="theory-octave-button theory-surface-raised cursor-pointer border border-[var(--border-default)] px-3 py-2 text-xs uppercase tracking-[0.22em] transition"
        >
          ◀ {`Oct-`}
        </button>
        <button
          type="button"
          onClick={() => shiftOctave(1)}
          className="theory-octave-button theory-surface-raised cursor-pointer border border-[var(--border-default)] px-3 py-2 text-xs uppercase tracking-[0.22em] transition"
        >
          {`Oct+`} ▶
        </button>
        </div>
        <div className="theory-keyboard-range text-xs uppercase tracking-[0.22em]">
          {startOctave} - {startOctave + visibleOctaves - 1}
        </div>
      </div>
      <div
        ref={keyboardBedRef}
        className="theory-keyboard-bed theory-surface-screen border border-[var(--border-default)] px-4 py-4 overflow-hidden"
      >
        <div className="flex gap-0 overflow-hidden">
        {Array.from({ length: visibleOctaves }, (_, i) =>
          renderOctave(startOctave + i)
        )}
        </div>
      </div>
    </div>
  );
}
