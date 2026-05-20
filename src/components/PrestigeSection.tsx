"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { whatsappUrl } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

/* ─── INLINE DATA (no config import needed) ─── */
const PRESTIGE_FEATURES = [
  {
    icon: "blueprint",
    title: "Complete Transformation Blueprint",
    desc: "Custom fat loss / muscle gain strategy based on body type, lifestyle & schedule. Periodised training phases (not random workouts). Several meal options so your food stays enjoyable.",
  },
  {
    icon: "checkins",
    title: "Weekly Check-ins + Progress Adjustments",
    desc: "Macro adjustments, cardio manipulation, plateau-breaking strategy — done every single week.",
  },
  {
    icon: "whatsapp",
    title: "24/7 WhatsApp Access (Priority Support)",
    desc: "Direct accountability with Arbaz — no gatekeepers, no delays.",
  },
  {
    icon: "mindset",
    title: "Habit & Mindset Coaching",
    desc: "Discipline building, craving control, and travel strategy so consistency is never an excuse.",
  },
  {
    icon: "supplement",
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

/* ─── ICONS ─── */
function Icon({ type }: { type: string }) {
  const s = { width: 20, height: 20 };
  switch (type) {
    case "blueprint": return <svg style={s} viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2" stroke="#c8ff00" strokeWidth="1.4" opacity=".7"/><path d="M7 7h10M7 12h10M7 17h6" stroke="#c8ff00" strokeWidth="1.6" strokeLinecap="round"/></svg>;
    case "checkins": return <svg style={s} viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="12" r="9" stroke="#c8ff00" strokeWidth="1.4" opacity=".5"/><path d="M12 7v5l3 2" stroke="#c8ff00" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case "whatsapp": return <svg style={s} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M21 11.5a9 9 0 1 1-6.2-8.6" stroke="#c8ff00" strokeWidth="1.4" opacity=".6"/><path d="M8 10h.01M12 10h.01M16 10h.01" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round"/></svg>;
    case "mindset": return <svg style={s} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 3a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3.5 3-3.5c2-1.5 4-4 4-7a7 7 0 0 0-7-7z" stroke="#c8ff00" strokeWidth="1.4"/><circle cx="12" cy="10" r="2" fill="#c8ff00" opacity=".8"/></svg>;
    case "supplement": return <svg style={s} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M10.5 3L4 14a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L13.5 3a2 2 0 0 0-3 0z" stroke="#c8ff00" strokeWidth="1.4"/><path d="M12 9v4M12 17h.01" stroke="#c8ff00" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    default: return null;
  }
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8L6.5 11.5L13 4.5" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   PRESTIGE SECTION — sticky right card
───────────────────────────────────────────── */
export function PrestigeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  /* Entrance animations for left content rows */
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Heading lines */
    const headLines = section.querySelectorAll<HTMLElement>(".prestige-head-line");
    if (headLines.length) {
      gsap.fromTo(headLines,
        { yPercent: 110 },
        {
          yPercent: 0, duration: 1.1, stagger: 0.08, ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none none" },
        },
      );
    }

    /* Feature rows stagger in from left */
    const rows = featuresRef.current?.querySelectorAll<HTMLElement>(".prestige-feature-row");
    if (rows?.length) {
      gsap.fromTo(rows,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 82%", toggleActions: "play none none none" },
        },
      );
    }

    /* CTA pulse-in */
    gsap.fromTo(".prestige-cta",
      { scale: 0.92, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".prestige-cta", start: "top 90%", toggleActions: "play none none none" },
      },
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="prestige"
      aria-labelledby="prestige-heading"
      style={{
        background: "var(--bg)",
        borderTop: "2px solid var(--lime)",
        position: "relative",
      }}
    >
      {/* Faint radial glow — overflow hidden scoped here so it doesn't block sticky */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        overflow: "hidden", pointerEvents: "none",
      }} aria-hidden>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse 60% 50% at 15% 50%, rgba(200,255,0,0.03) 0%, transparent 70%)",
        }} />
      </div>

      <div className="container" style={{ paddingTop: 96, paddingBottom: 96 }}>
        {/* ── TWO COLUMN LAYOUT: left scrolls, right sticks ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 80,
          alignItems: "start",
        }}>

          {/* ══════════════ LEFT — scrolling content ══════════════ */}
          <div>
            {/* Eyebrow */}
            <p className="section-tag" style={{ marginBottom: 32 }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--lime)", display: "inline-block",
                animation: "pulse 2s infinite",
              }} aria-hidden />
              <span>By Application Only — 3 Clients Per Quarter</span>
            </p>

            {/* Heading */}
            <h2 id="prestige-heading" style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              fontWeight: 900, fontStyle: "italic",
              textTransform: "uppercase",
              lineHeight: 0.95, letterSpacing: "-0.02em",
              marginBottom: 24, overflow: "visible",
            }}>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="prestige-head-line" style={{ display: "block", color: "var(--text)" }}>The Prestige</span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="prestige-head-line outline" style={{ display: "block", WebkitTextStroke: "1.5px rgba(200,255,0,0.4)" }}>Experience</span>
              </span>
            </h2>

            <p style={{
              fontSize: 15, lineHeight: 1.85,
              color: "var(--text3)", maxWidth: 520, marginBottom: 56,
            }}>
              This is not just a diet plan or a workout routine. This is a{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                high-accountability body transformation system
              </strong>{" "}
              with direct access to Arbaz Arif. He only takes 3 clients every 3 months.
            </p>

            {/* ── Feature rows ── */}
            <div ref={featuresRef} style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 56 }}>
              {PRESTIGE_FEATURES.map((feat, i) => (
                <div
                  key={i}
                  className="prestige-feature-row"
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 18,
                    padding: "22px 20px", borderRadius: 16,
                    background: "var(--bg3)", border: "1px solid var(--border)",
                    transition: "all 0.35s var(--ease)", cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(200,255,0,0.2)";
                    e.currentTarget.style.background = "rgba(200,255,0,0.03)";
                    e.currentTarget.style.transform = "translateX(6px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--bg3)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {/* Icon box */}
                  <div style={{
                    flexShrink: 0, width: 46, height: 46, borderRadius: 14,
                    background: "rgba(200,255,0,0.06)", border: "1px solid rgba(200,255,0,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                  }}>
                    <Icon type={feat.icon} />
                  </div>

                  <div style={{ flex: 1 }}>
                    {/* Step number + title */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 9, letterSpacing: "0.2em", color: "var(--lime)", opacity: 0.5,
                      }}>
                        0{i + 1}
                      </span>
                      <h3 style={{
                        fontFamily: "var(--font-space), sans-serif",
                        fontSize: 14, fontWeight: 700, color: "var(--lime)", margin: 0,
                      }}>
                        {feat.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text3)", margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="prestige-cta" style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Link
                href={whatsappUrl("Hi Arbaz, I'd like to apply for the Prestige Experience")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Apply for Prestige</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10, color: "var(--text4)",
                letterSpacing: "0.2em", textTransform: "uppercase",
              }}>
                3 spots only.
              </p>
            </div>
          </div>

          {/* ══════════════ RIGHT — STICKY CARD ══════════════ */}
          <div style={{ position: "sticky", top: 96 }}>
            <div style={{
              background: "var(--bg3)",
              border: "1px solid rgba(200,255,0,0.15)",
              borderRadius: 24, padding: 32,
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(200,255,0,0.05)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Top gradient line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, var(--lime), transparent)",
              }} aria-hidden />

              {/* Glow orb */}
              <div style={{
                position: "absolute", top: -60, right: -60,
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,255,0,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} aria-hidden />

              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 20px rgba(200,255,0,0.1)",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <span style={{
                    display: "block",
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: 22, fontWeight: 900, letterSpacing: "0.02em", color: "var(--lime)",
                  }}>Prestige</span>
                  <span style={{
                    display: "block", fontSize: 10, fontFamily: "var(--font-mono), monospace",
                    letterSpacing: "0.12em", color: "var(--text4)", textTransform: "uppercase",
                  }}>Elite Coaching Tier</span>
                </div>
              </div>

              {/* Divider */}
              <p style={{
                fontFamily: "var(--font-mono), monospace", fontSize: 9,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "var(--text4)", marginBottom: 16,
                paddingBottom: 16, borderBottom: "1px solid var(--border)",
              }}>
                What&apos;s Included:
              </p>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                {PRESTIGE_CARD_ITEMS.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", borderRadius: 12,
                    background: "rgba(200,255,0,0.03)", border: "1px solid var(--border)",
                    transition: "all 0.3s var(--ease)",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(200,255,0,0.06)";
                      e.currentTarget.style.borderColor = "rgba(200,255,0,0.15)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(200,255,0,0.03)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <Check />
                    <span style={{ fontSize: 13, color: "var(--text2)", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                paddingTop: 20, borderTop: "1px solid var(--border)",
                textAlign: "center",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 100,
                  background: "rgba(200,255,0,0.05)", border: "1px solid rgba(200,255,0,0.1)",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", background: "var(--lime)",
                    animation: "pulse 2s infinite",
                  }} aria-hidden />
                  <span style={{
                    fontFamily: "var(--font-mono), monospace", fontSize: 9,
                    letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,255,0,0.7)",
                  }}>
                    By Application Only
                  </span>
                </div>
              </div>

              {/* Corner accents */}
              <div style={{
                position: "absolute", top: 16, left: 16,
                width: 20, height: 20,
                borderTop: "1.5px solid rgba(200,255,0,0.2)",
                borderLeft: "1.5px solid rgba(200,255,0,0.2)",
                borderRadius: "4px 0 0 0",
              }} aria-hidden />
              <div style={{
                position: "absolute", bottom: 16, right: 16,
                width: 20, height: 20,
                borderBottom: "1.5px solid rgba(200,255,0,0.2)",
                borderRight: "1.5px solid rgba(200,255,0,0.2)",
                borderRadius: "0 0 4px 0",
              }} aria-hidden />
            </div>

            {/* Below-card urgency note */}
            <p style={{
              marginTop: 20, textAlign: "center",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10, color: "var(--text4)",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Next intake: Q3 2025
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 1024px) {
          #prestige .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          #prestige .container > div > div:last-child {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </section>
  );
}