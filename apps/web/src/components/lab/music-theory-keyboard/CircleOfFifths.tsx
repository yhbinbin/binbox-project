"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  normalizeNoteName,
  getMajorTriad,
  getMinorTriad,
  getMajorSeventhChord,
  getMinorSeventhChord,
} from "@/lib/music-theory/chordUtils";
import {
  initAudio,
  getIsInitialized,
  playNote,
  playChord,
  playArpeggio,
} from "@/lib/audio/pianoEngine";
import { useKeyboardStore } from "@/store/keyboardStore";

export type PlayMode =
  | "root"
  | "triad"
  | "triad-arpeggio"
  | "seventh"
  | "seventh-arpeggio";

interface KeyInfo {
  name: string;
  description: string;
  x?: number;
  y?: number;
  radius?: number;
  isMinor?: boolean;
}

interface CircleOfFifthsProps {
  playMode?: PlayMode;
}

const outerKeysData: KeyInfo[] = [
  { name: "C", description: "C大调\n无升降号", isMinor: false },
  { name: "G", description: "G大调\n1个升号", isMinor: false },
  { name: "D", description: "D大调\n2个升号", isMinor: false },
  { name: "A", description: "A大调\n3个升号", isMinor: false },
  { name: "E", description: "E大调\n4个升号", isMinor: false },
  { name: "B/Cb", description: "B大调\n5个升号\nCb大调\n7个降号", isMinor: false },
  { name: "F#/Gb", description: "F#大调\n6个升号\nGb大调\n6个降号", isMinor: false },
  { name: "Db/C#", description: "Db大调\n5个降号\nC#大调\n7个升号", isMinor: false },
  { name: "Ab", description: "Ab大调\n4个降号", isMinor: false },
  { name: "Eb", description: "Eb大调\n3个降号", isMinor: false },
  { name: "Bb", description: "Bb大调\n2个降号", isMinor: false },
  { name: "F", description: "F大调\n1个降号", isMinor: false },
];

const innerKeysData: KeyInfo[] = [
  { name: "a", description: "a小调\n无升降号", isMinor: true },
  { name: "e", description: "e小调\n1个升号", isMinor: true },
  { name: "b", description: "b小调\n2个升号", isMinor: true },
  { name: "f#", description: "f#小调\n3个升号", isMinor: true },
  { name: "c#", description: "c#小调\n4个升号", isMinor: true },
  { name: "g#/ab", description: "g#小调\n5个升号\nab小调\n7个降号", isMinor: true },
  { name: "d#/eb", description: "d#小调\n6个升号\neb小调\n6个降号", isMinor: true },
  { name: "bb/a#", description: "bb小调\n5个降号\na#小调\n7个升号", isMinor: true },
  { name: "f", description: "f小调\n4个降号", isMinor: true },
  { name: "c", description: "c小调\n3个降号", isMinor: true },
  { name: "g", description: "g小调\n2个降号", isMinor: true },
  { name: "d", description: "d小调\n1个降号", isMinor: true },
];

const outerGradientColors = [
  "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#312e81",
  "#4c1d95", "#581c87", "#701a75", "#831843", "#881337", "#9f1239",
];

export default function CircleOfFifths({ playMode = "root" }: CircleOfFifthsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outerKeysRef = useRef<KeyInfo[]>(outerKeysData.map((k) => ({ ...k })));
  const innerKeysRef = useRef<KeyInfo[]>(innerKeysData.map((k) => ({ ...k })));
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });
  const [hovered, setHovered] = useState<{
    ring: "outer" | "inner" | null;
    index: number | null;
  }>({ ring: null, index: null });
  const radiiRef = useRef({ outer: 220, inner: 130 });
  const [theme, setTheme] = useState<"vhs-tape" | "rom-cd">("vhs-tape");

  const { pressKeys, releaseAllKeys } = useKeyboardStore();
  const outerKeys = outerKeysRef.current;
  const innerKeys = innerKeysRef.current;

  const drawCircleOfFifths = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = Math.min(centerX, centerY) - 20;
    const innerRadius = outerRadius * 0.58;
    radiiRef.current = { outer: outerRadius, inner: innerRadius };

    const palette =
      theme === "rom-cd"
        ? {
            backdrop: "#0e141a",
            border: "#8ea6c1",
            outerHover: "#32b8ff",
            innerHover: "#7dff9b",
            centerFill: "#101922",
            centerText: "#cfe1f3",
            outerText: "#eef5ff",
            innerText: "#b9d0e6",
            outer: [
              "#123a63", "#154f7d", "#0c4c72", "#265b66", "#285053", "#324b49",
              "#1d3a56", "#2b3f69", "#29385b", "#2e435b", "#29464d", "#244859",
            ],
            inner: [
              "#101922", "#0f1c26", "#10212b", "#14222d", "#17212a", "#111a22",
              "#121e27", "#12212a", "#13212b", "#101822", "#0f1821", "#101d27",
            ],
          }
        : {
            backdrop: "#0f1411",
            border: "#8aa59a",
            outerHover: "#60f8ff",
            innerHover: "#ffe178",
            centerFill: "#101612",
            centerText: "#dcffc7",
            outerText: "#f3f7ff",
            innerText: "#d5ffc2",
            outer: [
              "#2f3c48", "#38454c", "#324149", "#414952", "#3d424f", "#353d48",
              "#2f3642", "#39424b", "#34404a", "#373d46", "#3a434c", "#313742",
            ],
            inner: [
              "#142118", "#15241a", "#17261c", "#15231a", "#16211a", "#131d16",
              "#15221a", "#142019", "#15211a", "#131d17", "#142119", "#15231b",
            ],
          };

    const drawSector = (
      startAngle: number,
      endAngle: number,
      inner: number,
      outer: number,
      color: string,
      isHovered: boolean
    ) => {
      ctx.beginPath();
      ctx.moveTo(
        centerX + inner * Math.cos(startAngle),
        centerY + inner * Math.sin(startAngle)
      );
      ctx.arc(centerX, centerY, outer, startAngle, endAngle);
      ctx.lineTo(
        centerX + inner * Math.cos(endAngle),
        centerY + inner * Math.sin(endAngle)
      );
      ctx.arc(centerX, centerY, inner, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = isHovered ? palette.outerHover : palette.border;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawCircle = (radius: number) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = palette.border;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawLines = (radius: number, angleOffset: number) => {
      outerKeys.forEach((_, index) => {
        const angle =
          (Math.PI * 2 / outerKeys.length) * index - Math.PI / 2 + angleOffset;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = palette.border;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    const drawKeys = (keys: KeyInfo[], radius: number, fontSize: number, color: string) => {
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      keys.forEach((key, index) => {
        const angle = (Math.PI * 2 / keys.length) * index - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        key.x = x;
        key.y = y;
        key.radius = fontSize * 1.5;
        ctx.fillStyle = color;
        ctx.fillText(key.name, x, y);
      });
    };

    ctx.fillStyle = palette.backdrop;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    outerKeys.forEach((_, index) => {
      const startAngle =
        (Math.PI * 2 / outerKeys.length) * index - Math.PI / 2 + Math.PI / 12;
      const endAngle = startAngle + (Math.PI * 2) / outerKeys.length;
      const isHovered =
        hovered.ring === "outer" && hovered.index === index;
      const baseColor = palette.outer[index] || outerGradientColors[index];
      drawSector(
        startAngle,
        endAngle,
        innerRadius,
        outerRadius,
        isHovered ? palette.outerHover : baseColor,
        isHovered
      );
    });

    innerKeys.forEach((_, index) => {
      const startAngle =
        (Math.PI * 2 / innerKeys.length) * index - Math.PI / 2 + Math.PI / 12;
      const endAngle = startAngle + (Math.PI * 2) / innerKeys.length;
      const isHovered =
        hovered.ring === "inner" && hovered.index === index;
      drawSector(
        startAngle,
        endAngle,
        0,
        innerRadius,
        isHovered ? palette.innerHover : palette.inner[index],
        isHovered
      );
    });

    drawCircle(outerRadius);
    drawCircle(innerRadius);
    drawLines(outerRadius, Math.PI / 12);

    drawKeys(outerKeys, outerRadius * 0.78, 16, palette.outerText);
    drawKeys(innerKeys, innerRadius * 0.65, 14, palette.innerText);

    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = palette.centerFill;
    ctx.fill();
    ctx.strokeStyle = palette.border;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "bold 12px Arial";
    ctx.fillStyle = palette.centerText;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("五度圈", centerX, centerY);
  }, [hovered, innerKeys, outerKeys, theme]);

  useEffect(() => {
    drawCircleOfFifths();
  }, [drawCircleOfFifths]);

  useEffect(() => {
    const updateTheme = () => {
      const nextTheme =
        document.documentElement.getAttribute("data-theme") === "rom-cd"
          ? "rom-cd"
          : "vhs-tape";
      setTheme(nextTheme);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const getKeyFromPoint = (
    mouseX: number,
    mouseY: number
  ): { ring: "outer" | "inner"; index: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const slice = (Math.PI * 2) / outerKeys.length;
    // Sectors are drawn starting at -PI/2 + PI/12 (half-slice offset).
    const startAngle = -Math.PI / 2 + slice / 2;
    const adjustedAngle = (angle - startAngle + Math.PI * 2) % (Math.PI * 2);
    const index = Math.floor(adjustedAngle / slice);

    if (distance <= radiiRef.current.inner) {
      return { ring: "inner", index };
    }
    if (distance > radiiRef.current.inner && distance <= radiiRef.current.outer) {
      return { ring: "outer", index };
    }
    return null;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const hit = getKeyFromPoint(mouseX, mouseY);
    const foundKey = hit
      ? hit.ring === "outer"
        ? outerKeys[hit.index]
        : innerKeys[hit.index]
      : null;

    if (foundKey && hit) {
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      const tooltipWidth = 72;
      const tooltipHeight = 88;
      const margin = 12;
      const localX = wrapperRect ? event.clientX - wrapperRect.left : mouseX;
      const localY = wrapperRect ? event.clientY - wrapperRect.top : mouseY;
      const maxX = wrapperRect ? wrapperRect.width - tooltipWidth - margin : localX;
      const maxY = wrapperRect ? wrapperRect.height - tooltipHeight - margin : localY;

      setHovered({ ring: hit.ring, index: hit.index });
      setTooltip({
        visible: true,
        x: Math.max(margin, Math.min(localX + 14, maxX)),
        y: Math.max(margin, Math.min(localY + 14, maxY)),
        content: foundKey.description,
      });
    } else {
      setHovered({ ring: null, index: null });
      setTooltip((prev) => ({ ...prev, visible: false }));
    }
  };

  const handleMouseLeave = () => {
    setHovered({ ring: null, index: null });
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleClick = async (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const hit = getKeyFromPoint(mouseX, mouseY);
    const foundKey = hit
      ? hit.ring === "outer"
        ? outerKeys[hit.index]
        : innerKeys[hit.index]
      : null;

    if (!foundKey) return;

    if (!getIsInitialized()) {
      await initAudio();
    }

    const noteName = normalizeNoteName(foundKey.name);
    const rootNote = `${noteName}3`;
    const isMinor = foundKey.isMinor;

    let notes: string[] = [];

    switch (playMode) {
      case "root":
        notes = [rootNote];
        break;
      case "triad":
      case "triad-arpeggio":
        notes = isMinor ? getMinorTriad(rootNote) : getMajorTriad(rootNote);
        break;
      case "seventh":
      case "seventh-arpeggio":
        notes = isMinor ? getMinorSeventhChord(rootNote) : getMajorSeventhChord(rootNote);
        break;
    }

    if (playMode === "triad-arpeggio" || playMode === "seventh-arpeggio") {
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
    } else if (playMode === "root") {
      pressKeys(notes);
      playNote(notes[0], "4n");
      setTimeout(() => {
        releaseAllKeys();
      }, 500);
    } else {
      pressKeys(notes);
      playChord(notes, "2n");
      setTimeout(() => {
        releaseAllKeys();
      }, 1000);
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex items-center justify-center overflow-visible">
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        className="w-full max-w-[420px] cursor-pointer rounded-[var(--radius-panel)]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      {tooltip.visible && (
        <div
          className="theory-circle-tooltip absolute z-30 border border-[var(--border-default)] px-3 py-2 text-sm shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            width: "86px",
          }}
        >
          {tooltip.content.split("\n").map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}
