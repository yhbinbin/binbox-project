'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';

type SegmentedOption<T extends string> = {
  value: T;
  label: ReactNode;
  title?: string;
};

type Props<T extends string> = {
  ariaLabel: string;
  className?: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function SegmentedSwitch<T extends string>({
  ariaLabel,
  className,
  options,
  value,
  onChange,
}: Props<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const selectedIndex = useMemo(() => {
    const activeIndex = options.findIndex((option) => option.value === value);
    return activeIndex >= 0 ? activeIndex : 0;
  }, [options, value]);

  const visualIndex = dragIndex ?? selectedIndex;

  const getIndexFromClientX = (clientX: number) => {
    const root = rootRef.current;
    if (!root) return selectedIndex;

    const rect = root.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const segmentWidth = rect.width / options.length;
    const rawIndex = Math.floor(relativeX / segmentWidth);

    return Math.min(options.length - 1, Math.max(0, rawIndex));
  };

  const commitIndex = (index: number) => {
    const nextValue = options[index]?.value;
    if (!nextValue || nextValue === value) return;
    onChange(nextValue);
  };

  return (
    <div
      ref={rootRef}
      className={`seg-switch${className ? ` ${className}` : ''}`}
      role="tablist"
      aria-label={ariaLabel}
      style={
        {
          '--seg-count': options.length,
          '--seg-index': visualIndex,
        } as CSSProperties
      }
      onPointerDown={(event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragIndex(getIndexFromClientX(event.clientX));
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        setDragIndex(getIndexFromClientX(event.clientX));
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        const nextIndex = getIndexFromClientX(event.clientX);
        setDragIndex(null);
        commitIndex(nextIndex);
      }}
      onPointerCancel={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        setDragIndex(null);
      }}
    >
      <div className="seg-switch-thumb" aria-hidden="true" />
      {options.map((option, index) => {
        const isActive = index === selectedIndex;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            title={option.title}
            className={`seg-switch-option ${isActive ? 'is-active' : ''}`}
            onClick={() => commitIndex(index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
