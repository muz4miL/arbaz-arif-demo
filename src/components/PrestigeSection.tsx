"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { whatsappUrl } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#c9a227";
const GOLD_BRIGHT = "#e8d48b";

const PRESTIGE_FEATURES = [
  {
    title: "Complete Transformation Blueprint",
    desc: "Custom fat loss / muscle gain strategy based on body type, lifestyle & schedule. Periodised training phases (not random workouts). Several meal options so your food stays enjoyable.",
  },
  {
    title: "Weekly Check-ins + Progress Adjustments",
    desc: "Macro adjustments, cardio manipulation, plateau-breaking strategy — done every single week.",
  },
  {
    title: "24/7 WhatsApp Access (Priority Support)",
    desc: "Direct accountability with Arbaz — no gatekeepers, no delays.",
  },
  {
    title: "Habit & Mindset Coaching",
    desc: "Discipline building, craving control, and travel strategy so consistency is never an excuse.",
  },
  {
    title: "Supplement Guidance",
    desc: "Exact supplement protocol: protein, creatine, fat burners if needed — nothing generic.",
  },
];

const PRESTIGE_CARD_ITEMS = [
  "Complete Transformation Blueprint",
  "Weekly 1-on-1 Check-ins",
  "24/7 WhatsApp Priority",
  "Habit & Mindset Coaching",
  "Supplement Protocol",
];

function GoldCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8L6.5 11.5L13 4.5"
        stroke={GOLD_BRIGHT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoldStar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="prestige-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e6a3" />
          <stop offset="35%" stopColor="#e8d48b" />
          <stop offset="55%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#7a5c12" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="url(#prestige-star-grad)"
        stroke={GOLD}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PrestigeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headLines = section.querySelectorAll<HTMLElement>(".prestige-head-line");
    if (headLines.length) {
      gsap.fromTo(
        headLines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
        },
      );
    }

    const rows = featuresRef.current?.querySelectorAll<HTMLElement>(".prestige-feature-row");
    if (rows?.length) {
      gsap.fromTo(
        rows,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 82%", toggleActions: "play none none none" },
        },
      );
    }

    gsap.fromTo(
      ".prestige-cta",
      { scale: 0.92, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".prestige-cta", start: "top 90%", toggleActions: "play none none none" },
      },
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="prestige" aria-labelledby="prestige-heading">
      {/* Background texture — overflow scoped here so sticky card + CTA still work */}
      <div className="prestige-bg" aria-hidden />

      <div className="container" style={{ paddingTop: 96, paddingBottom: 96, position: "relative", zIndex: 1 }}>
        <div className="prestige-layout">
          {/* LEFT — scrolling content */}
          <div>
            <p className="section-tag prestige-eyebrow" style={{ marginBottom: 32 }}>
              <span className="prestige-eyebrow-dot" style={{ width: 6, height: 6, borderRadius: "50%", display: "inline-block" }} aria-hidden />
              <span>By Application Only — 3 Clients Per Quarter</span>
            </p>

            <h2
              id="prestige-heading"
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 900,
                fontStyle: "italic",
                textTransform: "uppercase",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginBottom: 24,
                overflow: "visible",
              }}
            >
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="prestige-head-line prestige-title-gold" style={{ display: "block" }}>
                  The Prestige
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="prestige-head-line prestige-title-gold outline" style={{ display: "block" }}>
                  Experience
                </span>
              </span>
            </h2>

            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text3)", maxWidth: 520, marginBottom: 56 }}>
              This is not just a diet plan or a workout routine. This is a{" "}
              <strong style={{ color: "var(--prestige-cream, #f5f0e6)", fontWeight: 600 }}>
                high-accountability body transformation system
              </strong>{" "}
              with direct access to Arbaz Arif. He only takes 3 clients every 3 months.
            </p>

            <div ref={featuresRef} style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 56 }}>
              {PRESTIGE_FEATURES.map((feat, i) => (
                <div key={i} className="prestige-feature-row">
                  <div className="prestige-hex-badge" aria-hidden>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 className="prestige-feature-title" style={{ marginBottom: 6 }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text3)", margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="prestige-spots-note" style={{ textAlign: "left" }}>
              3 spots only — next intake by application
            </p>
          </div>

          {/* RIGHT — sticky: card, gold CTA, and intake note scroll together */}
          <div className="prestige-sticky">
            <div className="prestige-sticky-panel">
            <div className="prestige-card">
              <div className="prestige-card-topline" aria-hidden />

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                <div className="prestige-star-wrap">
                  <GoldStar />
                </div>
                <div>
                  <span className="prestige-card-name" style={{ display: "block" }}>
                    Prestige
                  </span>
                  <span className="prestige-card-tier" style={{
                    display: "block",
                    fontSize: 10,
                    fontFamily: "var(--font-mono), monospace",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                    Elite Coaching Tier
                  </span>
                </div>
              </div>

              <p className="prestige-included-label">What&apos;s Included:</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                {PRESTIGE_CARD_ITEMS.map((item, i) => (
                  <div key={i} className="prestige-card-item">
                    <GoldCheck />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: 20, borderTop: "1px solid rgba(201, 162, 39, 0.12)", textAlign: "center" }}>
                <div className="prestige-badge-pill">
                  <span className="prestige-badge-pill-dot" aria-hidden />
                  <span className="prestige-badge-pill-text">By Application Only</span>
                </div>
              </div>

              <div className="prestige-corner prestige-corner--tl" aria-hidden />
              <div className="prestige-corner prestige-corner--br" aria-hidden />
            </div>

            <div className="prestige-cta">
              <Link
                href={whatsappUrl("Hi Arbaz, I'd like to apply for the Prestige Experience")}
                target="_blank"
                rel="noopener noreferrer"
                className="prestige-btn-gold"
              >
                <span>Apply for Prestige</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <p className="prestige-intake">
              <strong>Next intake:</strong> Q3 2025
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
