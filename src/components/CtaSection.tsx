"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const orb = orbRef.current;
    const content = contentRef.current;
    if (!section || !orb || !content) return;

    /* ── Lime orb rises from bottom on scroll ── */
    gsap.fromTo(
      orb,
      { clipPath: "circle(0% at 50% 110%)" },
      {
        clipPath: "circle(160% at 50% 110%)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center 25%",
          scrub: 1.5,
        },
      }
    );

    /* ── Content fades in once lime bg is established ── */
    gsap.fromTo(
      content,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 35%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="cta"
      aria-labelledby="cta-heading"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Expanding lime orb */}
      <div
        ref={orbRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--lime)",
          clipPath: "circle(0% at 50% 110%)",
          zIndex: 0,
        }}
      />

      {/* Grid texture over lime */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -40,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: "clamp(180px, 26vw, 360px)",
          lineHeight: 1,
          color: "rgba(0,0,0,0.05)",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 2,
        }}
      >
        NOW
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="container"
        style={{ position: "relative", zIndex: 3, opacity: 0, width: "100%", paddingTop: 110, paddingBottom: 110 }}
      >
        <div className="cta-inner-grid">
          {/* LEFT */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 28,
                background: "rgba(0,0,0,0.1)",
                padding: "6px 16px",
                borderRadius: 100,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(0,0,0,0.45)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
                Limited — 3 Spots / Quarter
              </span>
            </div>

            <h2
              id="cta-heading"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: "clamp(58px, 7.5vw, 116px)",
                lineHeight: 0.9,
                letterSpacing: "0.01em",
                color: "#000",
                marginBottom: 24,
              }}
            >
              Ready to<br />Transform<br />Your Life?
            </h2>

            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.52)", maxWidth: 440, lineHeight: 1.78 }}>
              Spots are limited so every client gets the full attention they deserve.
              Apply today and lock in your transformation.
            </p>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
            <Link
              href={whatsappUrl("Hi Arbaz, I'm ready to start my transformation")}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-dark"
              style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              <IconWhatsApp />
              <span>Apply via WhatsApp</span>
            </Link>

            <Link
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              <IconInstagram />
              <span>DM on Instagram</span>
            </Link>

            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "rgba(0,0,0,0.4)", letterSpacing: "0.06em", marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Free 15-minute consultation included
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .cta-inner-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .cta-inner-grid { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
    </section>
  );
}
