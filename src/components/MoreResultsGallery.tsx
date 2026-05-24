"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MORE_RESULTS = [
  { src: "/moreResults/1.png", title: "Client Story 1" },
  { src: "/moreResults/2.png", title: "Client Story 2" },
  { src: "/moreResults/3.png", title: "Client Story 3" },
  { src: "/moreResults/4.png", title: "Client Story 4" },
  { src: "/moreResults/5.png", title: "Client Story 5" },
  { src: "/moreResults/6.png", title: "Client Story 6" },
  { src: "/moreResults/7.png", title: "Client Story 7" },
  { src: "/moreResults/8.png", title: "Client Story 8" },
  { src: "/moreResults/9.png", title: "Client Story 9" },
  { src: "/moreResults/10.png", title: "Client Story 10" },
  { src: "/moreResults/11.png", title: "Client Story 11" },
  { src: "/moreResults/13.png", title: "Client Story 13" },
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

export function MoreResultsGallery({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useBodyScrollLock(open);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => onClose(), [onClose]);

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
            className="more-results-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
          >
            <button
              type="button"
              className="more-results-lightbox__backdrop"
              onClick={close}
              aria-label="Close results gallery"
            />

            <div className="more-results-lightbox__panel">
              <header className="more-results-lightbox__header">
                <div>
                  <p className="more-results-lightbox__eyebrow">Verified Results</p>
                  <h3 id={titleId} className="more-results-lightbox__title">
                    Real Client Transformations
                  </h3>
                  <p className="more-results-lightbox__desc">
                    Screenshots from actual client journeys — straight from WhatsApp.
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="more-results-lightbox__close"
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

              <div className="more-results-gallery">
                {MORE_RESULTS.map((item) => (
                  <figure key={item.src} className="more-results-frame">
                    <div className="more-results-frame__media">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="more-results-frame__img"
                      />
                    </div>
                  </figure>
                ))}
              </div>

              <p className="more-results-lightbox__footer">
                Results vary by individual. Every transformation starts with a decision.
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return lightbox;
}
