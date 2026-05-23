"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PRESTIGE_TRANSFORMATIONS = [
  {
    src: "/prestigeResults/1.png",
    title: "Transformation I",
    subtitle: "Prestige client · documented results",
  },
  {
    src: "/prestigeResults/2.png",
    title: "Transformation II",
    subtitle: "Prestige client · documented results",
  },
] as const;

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function PrestigeResultsViewer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useBodyScrollLock(open);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const lightbox =
    open && mounted
      ? createPortal(
          <div
            className="prestige-results-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
          >
            <button
              type="button"
              className="prestige-results-lightbox__backdrop"
              onClick={close}
              aria-label="Close transformations gallery"
            />

            <div className="prestige-results-lightbox__panel">
              <header className="prestige-results-lightbox__header">
                <div>
                  <p className="prestige-results-lightbox__eyebrow">Prestige tier only</p>
                  <h3 id={titleId} className="prestige-results-lightbox__title">
                    Real Transformations
                  </h3>
                  <p className="prestige-results-lightbox__desc">
                    Verified before &amp; after — the standard our most exclusive clients achieve.
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="prestige-results-lightbox__close"
                  onClick={close}
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </header>

              <div className="prestige-results-gallery">
                {PRESTIGE_TRANSFORMATIONS.map((item, i) => (
                  <figure key={item.src} className="prestige-results-frame">
                    <div className="prestige-results-frame__chrome" aria-hidden>
                      <span className="prestige-results-frame__index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="prestige-results-frame__line" />
                    </div>
                    <div className="prestige-results-frame__media">
                      <Image
                        src={item.src}
                        alt={`${item.title} — before and after body transformation`}
                        fill
                        sizes="(max-width: 768px) 100vw, 48vw"
                        className="prestige-results-frame__img"
                        priority={i === 0}
                      />
                    </div>
                    <figcaption className="prestige-results-frame__caption">
                      <span className="prestige-results-frame__title">{item.title}</span>
                      <span className="prestige-results-frame__subtitle">{item.subtitle}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <p className="prestige-results-lightbox__footer">
                Results vary. Prestige is by application — 3 clients per quarter.
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        className="prestige-results-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="prestige-results-trigger__icon" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <rect x="13" y="5" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M11 12h2" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
        <span className="prestige-results-trigger__text">
          <span className="prestige-results-trigger__label">View Prestige Results</span>
          <span className="prestige-results-trigger__hint">Before &amp; after · 2 clients</span>
        </span>
        <span className="prestige-results-trigger__arrow" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {lightbox}
    </>
  );
}
