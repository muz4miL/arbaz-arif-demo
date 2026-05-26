"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { whatsappUrl } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const PRESTIGE_TRANSFORMATIONS = [
  { src: "/prestigeResults/1.png", title: "Transformation I", subtitle: "Prestige client · documented results" },
  { src: "/prestigeResults/2.png", title: "Transformation II", subtitle: "Prestige client · documented results" },
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

export function PrestigeInfoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
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

  useGSAP(() => {
    if (!open || !panelRef.current) return;

    const sections = panelRef.current.querySelectorAll<HTMLElement>(".prestige-modal-section");
    if (sections.length) {
      gsap.fromTo(
        sections,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }
  }, { scope: panelRef, dependencies: [open] });

  const lightbox =
    open && mounted
      ? createPortal(
          <div
            className="prestige-info-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
          >
            <button
              type="button"
              className="prestige-info-lightbox__backdrop"
              onClick={close}
              aria-label="Close prestige experience"
            />

            <div ref={panelRef} className="prestige-info-lightbox__panel">
              {/* Header */}
              <header className="prestige-info-lightbox__header">
                <div>
                  <p className="prestige-info-lightbox__eyebrow">The Prestige Experience</p>
                  <h3 id={titleId} className="prestige-info-lightbox__title">
                    Real Transformations
                  </h3>
                  <p className="prestige-info-lightbox__desc">
                    Verified before &amp; after — the standard our most exclusive clients achieve.
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="prestige-info-lightbox__close"
                  onClick={close}
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </header>

              <div className="prestige-info-content">
                {/* Block 1: Transformations Gallery */}
                <section className="prestige-modal-section prestige-modal-images">
                  <p className="prestige-modal-section-label">Documented Results</p>
                  <div className="prestige-modal-images-grid">
                    {PRESTIGE_TRANSFORMATIONS.map((item, i) => (
                      <figure key={item.src} className="prestige-modal-frame">
                        <div className="prestige-modal-frame__chrome" aria-hidden>
                          <span className="prestige-modal-frame__index">{String(i + 1).padStart(2, "0")}</span>
                          <span className="prestige-modal-frame__line" />
                        </div>
                        <div className="prestige-modal-frame__media">
                          <Image
                            src={item.src}
                            alt={`${item.title} — before and after body transformation`}
                            fill
                            sizes="(max-width: 768px) 100vw, 48vw"
                            className="prestige-modal-frame__img"
                            priority={i === 0}
                          />
                        </div>
                        <figcaption className="prestige-modal-frame__caption">
                          <span className="prestige-modal-frame__title">{item.title}</span>
                          <span className="prestige-modal-frame__subtitle">{item.subtitle}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>

                {/* Block 2: Single clear CTA */}
                <section className="prestige-modal-section prestige-modal-footer-cta">
                  <p className="prestige-modal-footer-text">
                    Only 3 spots per quarter. Next intake by application.
                  </p>
                  <Link
                    href={whatsappUrl("Hi Arbaz, I'd like to apply for the Prestige Experience")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prestige-btn-gold prestige-modal-apply-btn"
                  >
                    <span>Apply for Prestige</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </section>
              </div>

              <p className="prestige-info-lightbox__footer">
                Results vary. Prestige is by application — 3 clients per quarter.
              </p>
            </div>
          </div>,
          document.body,
        )
      : null;

  return lightbox;
}
