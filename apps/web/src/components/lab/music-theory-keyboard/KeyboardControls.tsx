"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import {
  getRootNotes,
  deriveTriads,
  deriveSeventhChords,
} from "@/lib/music-theory/chordUtils";
import { deriveModes } from "@/lib/music-theory/modeUtils";
import {
  initAudio,
  getIsInitialized,
  playChord,
  playArpeggio,
} from "@/lib/audio/pianoEngine";
import { useKeyboardStore } from "@/store/keyboardStore";

interface KeyboardControlsProps {
  defaultRootOctave?: number;
}

export default function KeyboardControls({ defaultRootOctave = 3 }: KeyboardControlsProps) {
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const rootNotes = useMemo(() => getRootNotes(defaultRootOctave), [defaultRootOctave]);
  const [selectedRoot, setSelectedRoot] = useState(rootNotes[0]);
  const [openSections, setOpenSections] = useState({
    triads: true,
    sevenths: false,
    western: false,
    chinese: false,
  });
  const { pressKeys, releaseAllKeys } = useKeyboardStore();

  const triads = useMemo(() => deriveTriads(selectedRoot), [selectedRoot]);
  const seventhChords = useMemo(() => deriveSeventhChords(selectedRoot), [selectedRoot]);
  const modes = useMemo(() => deriveModes(selectedRoot), [selectedRoot]);
  const westernModes = modes.filter((m) => m.category === "western");
  const chineseModes = modes.filter((m) => m.category === "chinese");

  const ensureAudio = async () => {
    if (!getIsInitialized()) {
      await initAudio();
    }
  };

  const handlePlayChord = async (notes: string[], duration: string | number = "2n") => {
    await ensureAudio();
    pressKeys(notes);
    playChord(notes, duration);
    setTimeout(() => {
      releaseAllKeys();
    }, 1000);
  };

  const handlePlayArpeggio = async (notes: string[]) => {
    await ensureAudio();
    const interval = 250;
    notes.forEach((note, index) => {
      setTimeout(() => {
        pressKeys([note]);
      }, index * interval);
    });
    playArpeggio(notes, "8n", interval);
    setTimeout(() => {
      releaseAllKeys();
    }, notes.length * interval + 300);
  };

  const getNotesWithHighOctave = (notes: string[]) => {
    if (notes.length === 0) return notes;
    const rootNote = notes[0];
    const noteName = rootNote.replace(/\d+$/, "");
    const octave = parseInt(rootNote.match(/\d+$/)?.[0] || "3");
    const highOctaveRoot = `${noteName}${octave + 1}`;
    return [...notes, highOctaveRoot];
  };

  const handlePlayMode = async (notes: string[], descending = false) => {
    await ensureAudio();
    const playNotes = getNotesWithHighOctave(notes);
    const seq = descending ? [...playNotes].reverse() : playNotes;
    const interval = 220;
    seq.forEach((note, index) => {
      setTimeout(() => {
        pressKeys([note]);
      }, index * interval);
    });
    playArpeggio(seq, "8n", interval);
    setTimeout(() => {
      releaseAllKeys();
    }, seq.length * interval + 300);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="theory-control-shell theory-surface-shell ui-panel ui-frame overflow-visible px-4 py-5 md:px-5">
      <div className="mb-4 border-b border-[var(--border-default)] pb-3">
        <p className="theory-panel-kicker text-xs uppercase tracking-[0.26em]">
          {isZh ? "和声控制台" : "Harmony Rack"}
        </p>
        <p className="theory-panel-copy mt-1 text-sm">
          {isZh
            ? "先设定根音，再快速试听三和弦、七和弦与调式。"
            : "Set a root first, then audition triads, sevenths, and modes from one rack."}
        </p>
      </div>

      <div className="space-y-4">
        <section className="theory-control-block theory-sticky-panel theory-sticky-compact theory-surface-raised">
          <div className="theory-control-label">
            <span>{isZh ? "根音选择" : "Root Select"}</span>
            <span>{selectedRoot.replace(/\d+$/, "")}</span>
          </div>
          <div className="theory-root-grid">
            {rootNotes.map((note) => {
              const noteLabel = note.replace(/\d+$/, "");
              const isSelected = selectedRoot === note;
              return (
                <button
                  key={note}
                  type="button"
                  onClick={() => setSelectedRoot(note)}
                  className={`theory-root-button ${isSelected ? "theory-surface-dark-button is-active" : "theory-surface-raised"}`}
                >
                  {noteLabel}
                </button>
              );
            })}
          </div>
        </section>

        <section className="theory-control-block theory-surface-raised">
          <div className="theory-control-label">
            <span>{isZh ? "和弦库" : "Chord Bank"}</span>
            <span>{isZh ? "Triad + 7th" : "Triad + 7th"}</span>
          </div>

          <div className="theory-list-section theory-surface-screen border border-[var(--border-default)]">
            <button
              type="button"
              className="theory-list-header theory-list-toggle"
              onClick={() => toggleSection("triads")}
              aria-expanded={openSections.triads}
            >
              <span>{isZh ? "三和弦" : "Triads"}</span>
              <ChevronRight
                aria-hidden="true"
                className={`theory-list-chevron ${openSections.triads ? "is-open" : ""}`}
              />
            </button>
            {openSections.triads && <div className="theory-list-body">
              {triads.map((chord) => (
                <div key={chord.name} className="theory-list-row">
                  <div className="theory-list-main">
                    <div className="theory-list-inline">
                      <p className="theory-list-title theory-chord-title">{chord.symbol}</p>
                      <p className="theory-list-notes">{chord.notes.join(" - ")}</p>
                    </div>
                  </div>
                  <div className="theory-list-actions">
                    <button
                      type="button"
                      className="theory-action-button theory-surface-raised"
                      onClick={() => handlePlayChord(chord.notesWithOctave)}
                    >
                      {isZh ? "齐奏" : "Play"}
                    </button>
                    <button
                      type="button"
                      className="theory-action-button theory-surface-raised"
                      onClick={() => handlePlayArpeggio(chord.notesWithOctave)}
                    >
                      {isZh ? "分解" : "Arp"}
                    </button>
                  </div>
                </div>
              ))}
            </div>}
          </div>

          <div className="theory-list-section theory-surface-screen border border-[var(--border-default)]">
            <button
              type="button"
              className="theory-list-header theory-list-toggle"
              onClick={() => toggleSection("sevenths")}
              aria-expanded={openSections.sevenths}
            >
              <span>{isZh ? "七和弦" : "Sevenths"}</span>
              <ChevronRight
                aria-hidden="true"
                className={`theory-list-chevron ${openSections.sevenths ? "is-open" : ""}`}
              />
            </button>
            {openSections.sevenths && <div className="theory-list-body">
              {seventhChords.map((chord) => (
                <div key={chord.name} className="theory-list-row">
                  <div className="theory-list-main">
                    <div className="theory-list-inline">
                      <p className="theory-list-title theory-chord-title">{chord.symbol}</p>
                      <p className="theory-list-notes">{chord.notes.join(" - ")}</p>
                    </div>
                  </div>
                  <div className="theory-list-actions">
                    <button
                      type="button"
                      className="theory-action-button theory-surface-raised"
                      onClick={() => handlePlayChord(chord.notesWithOctave)}
                    >
                      {isZh ? "齐奏" : "Play"}
                    </button>
                    <button
                      type="button"
                      className="theory-action-button theory-surface-raised"
                      onClick={() => handlePlayArpeggio(chord.notesWithOctave)}
                    >
                      {isZh ? "分解" : "Arp"}
                    </button>
                  </div>
                </div>
              ))}
            </div>}
          </div>
        </section>

        <section className="theory-control-block theory-surface-raised">
          <div className="theory-control-label">
            <span>{isZh ? "调式库" : "Mode Bank"}</span>
            <span>{isZh ? "Western + CN" : "Western + CN"}</span>
          </div>

          <div className="grid gap-3 xl:grid-cols-1">
            <div className="theory-list-section theory-surface-screen border border-[var(--border-default)]">
              <button
                type="button"
                className="theory-list-header theory-list-toggle"
                onClick={() => toggleSection("western")}
                aria-expanded={openSections.western}
              >
                <span>{isZh ? "中古调式" : "Western Modes"}</span>
                <ChevronRight
                  aria-hidden="true"
                  className={`theory-list-chevron ${openSections.western ? "is-open" : ""}`}
                />
              </button>
              {openSections.western && <div className="theory-list-body">
                {westernModes.map((mode) => (
                  <div key={mode.symbol} className="theory-list-row">
                    <div className="theory-list-main">
                      <div className="theory-list-inline">
                        <p className="theory-list-title theory-mode-title">{mode.modeName}</p>
                        <p className="theory-list-notes">{mode.notes.join(" - ")}</p>
                      </div>
                    </div>
                    <div className="theory-list-actions">
                      <button
                        type="button"
                        className="theory-action-button theory-surface-raised"
                        onClick={() => handlePlayMode(mode.notesWithOctave, false)}
                      >
                        {isZh ? "升序" : "Up"}
                      </button>
                      <button
                        type="button"
                        className="theory-action-button theory-surface-raised"
                        onClick={() => handlePlayMode(mode.notesWithOctave, true)}
                      >
                        {isZh ? "降序" : "Down"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>}
            </div>

            <div className="theory-list-section theory-surface-screen border border-[var(--border-default)]">
              <button
                type="button"
                className="theory-list-header theory-list-toggle"
                onClick={() => toggleSection("chinese")}
                aria-expanded={openSections.chinese}
              >
                <span>{isZh ? "五声调式" : "Pentatonic Modes"}</span>
                <ChevronRight
                  aria-hidden="true"
                  className={`theory-list-chevron ${openSections.chinese ? "is-open" : ""}`}
                />
              </button>
              {openSections.chinese && <div className="theory-list-body">
                {chineseModes.map((mode) => (
                  <div key={mode.symbol} className="theory-list-row">
                    <div className="theory-list-main">
                      <div className="theory-list-inline">
                        <p className="theory-list-title theory-mode-title">{mode.modeName}</p>
                        <p className="theory-list-notes">{mode.notes.join(" - ")}</p>
                      </div>
                    </div>
                    <div className="theory-list-actions">
                      <button
                        type="button"
                        className="theory-action-button theory-surface-raised"
                        onClick={() => handlePlayMode(mode.notesWithOctave, false)}
                      >
                        {isZh ? "升序" : "Up"}
                      </button>
                      <button
                        type="button"
                        className="theory-action-button theory-surface-raised"
                        onClick={() => handlePlayMode(mode.notesWithOctave, true)}
                      >
                        {isZh ? "降序" : "Down"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
