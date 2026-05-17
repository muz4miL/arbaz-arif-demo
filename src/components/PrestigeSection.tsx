"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { prestigeFeatures, prestigeCard, whatsappUrl } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   PREMIUM SVG ICONS (using your lime accent)
───────────────────────────────────────────── */
function FeatureIcon({ type }: { type: string }) {
  const style: React.CSSProperties = { width: 20, height: 20 };
  
  switch (type) {
    case "blueprint":
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--lime)" strokeWidth="1.3" opacity="0.7" />
          <path d="M7 7h10M7 12h10M7 17h6" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="18" cy="6" r="2" fill="var(--lime)" opacity="0.8" />
        </svg>
      );
    case "checkins":
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="var(--lime)" strokeWidth="1.3" opacity="0.5" />
          <path d="M12 7v5l3 2" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 3a9 9 0 0 1 6 2.5" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 11.5a9 9 0 1 1-6.2-8.6" stroke="var(--lime)" strokeWidth="1.3" opacity="0.6" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 3l-4 4" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="18" r="3" fill="var(--lime)" opacity="0.25" />
        </svg>
      );
    case "mindset":
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3.5 3-3.5c2-1.5 4-4 4-7a7 7 0 0 0-7-7z" 
                stroke="var(--lime)" strokeWidth="1.4" />
          <circle cx="12" cy="10" r="2" fill="var(--lime)" opacity="0.8" />
        </svg>
      );
    case "supplement":
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M10.5 3L4 14a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L13.5 3a2 2 0 0 0-3 0z" 
                stroke="var(--lime)" strokeWidth="1.4" />
          <path d="M12 9v4M12 17h.01" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="6" r="1" fill="var(--lime)" />
        </svg>
      );
    default:
      return null;
  }
}

export function PrestigeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const featureRowsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const features = featureRowsRef.current?.querySelectorAll("[data-feature-row]");
    const cardItems = cardRef.current?.querySelectorAll("[data-card-item]");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Reveal left column
    tl.from(leftColRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "var(--ease)"
    }, 0);
    
    // Stagger feature rows
    if (features && features.length > 0) {
      tl.from(Array.from(features), {
        x: -15,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out"
      }, 0.2);
    }
    
    // Reveal card with scale
    tl.from(rightColRef.current, {
      scale: 0.97,
      opacity: 0,
      duration: 0.9,
      ease: "var(--ease)"
    }, 0.15);
    
    // Card internal items
    if (cardItems && cardItems.length > 0) {
      tl.from(Array.from(cardItems), {
        y: 12,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out"
      }, 0.4);
    }
    
    // CTA button pop
    tl.from(".prestige-cta", {
      scale: 0.95,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, 0.6);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="prestige"
      aria-labelledby="prestige-heading"
      style={{
        padding: "112px 0",
        background: "var(--bg)",
        borderTop: "2px solid var(--lime)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Subtle gradient glow behind card area */}
      <div 
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, var(--lime-glow) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.15,
          pointerEvents: "none"
        }} 
      />

      <div className="container">
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(12, 1fr)", 
          gap: "64px",
          alignItems: "start"
        }}>
          
          {/* ── LEFT COLUMN ── */}
          <div ref={leftColRef} style={{ gridColumn: "span 7" }}>
            
            {/* Section tag (using your existing .section-tag) */}
            <div className="section-tag" style={{ marginBottom: "32px" }}>
              <span 
                data-gsap-pulse 
                style={{ 
                  width: "6px", 
                  height: "6px", 
                  borderRadius: "50%", 
                  background: "var(--lime)",
                  display: "inline-block",
                  animation: "pulse 2s ease-in-out infinite"
                }} 
                aria-hidden 
              />
              <span style={{ letterSpacing: "0.25em" }}>
                By Application Only — 3 Clients Per Quarter
              </span>
            </div>

            {/* Heading (using your .section-title + .outline) */}
            <h2
              id="prestige-heading"
              className="section-title"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontStyle: "italic",
                textTransform: "uppercase" as const,
                lineHeight: 0.95,
                marginBottom: "24px"
              }}
            >
              <span style={{ display: "block", color: "var(--text)" }}>The Prestige</span>
              <span className="outline" style={{ display: "block", WebkitTextStroke: "1px var(--lime)" }}>
                Experience
              </span>
            </h2>

            <p className="section-lead" style={{ marginBottom: "48px", maxWidth: "440px" }}>
              This is not a plan. This is a transformation system with direct access to{" "}
              <span style={{ color: "var(--text)", fontWeight: 600 }}>Arbaz Arif</span>.
            </p>

            {/* Feature rows */}
            <div 
              ref={featureRowsRef} 
              style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}
            >
              {prestigeFeatures.map((feat) => (
                <div 
                  key={feat.title} 
                  data-feature-row
                  className="prestige-feature"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "16px",
                    borderRadius: "14px",
                    transition: "all 0.3s var(--ease)",
                    border: "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border2)";
                    e.currentTarget.style.background = "var(--bg3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: "42px",
                    height: "42px",
                    borderRadius: "14px",
                    background: "var(--lime-dim)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FeatureIcon type={feat.icon} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-space), sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      marginBottom: "4px",
                      color: "var(--text)"
                    }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--text3)" }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA using your .btn-primary */}
            <div>
              <Link
                href={whatsappUrl("Hi Arbaz, I'd like to apply for the Prestige Experience")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary prestige-cta"
                style={{ cursor: "none" }}
              >
                <span>Apply for Prestige</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px",
                color: "var(--text4)",
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                marginTop: "16px"
              }}>
                3 spots. Serious inquiries only.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Premium Card (using your bg3 + border vars) ── */}
          <div 
            ref={rightColRef} 
            style={{ 
              gridColumn: "span 5",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            <div
              ref={cardRef}
              style={{
                width: "100%",
                maxWidth: "400px",
                background: "var(--bg3)",
                border: "1px solid var(--border2)",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 20px 80px rgba(0,0,0,0.6), 0 0 60px var(--lime-glow)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.4s var(--ease)",
                cursor: "none"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--lime)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border2)";
              }}
            >
              {/* Subtle lime glow accent */}
              <div 
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-20%",
                  width: "200px",
                  height: "200px",
                  background: "radial-gradient(circle, var(--lime) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  opacity: 0.08,
                  pointerEvents: "none"
                }} 
              />
              
              {/* Card header */}
              <div data-card-item style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "12px",
                  background: "var(--lime-dim)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: "18px",
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  color: "var(--lime)"
                }}>
                  Prestige
                </span>
              </div>

              <p 
                data-card-item
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase" as const,
                  color: "var(--text4)",
                  marginBottom: "20px"
                }}
              >
                What&apos;s included:
              </p>

              {/* Feature pills */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {prestigeCard.map((item, index) => (
                  <div
                    key={item}
                    data-card-item
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      background: "var(--lime-dim)",
                      border: "1px solid var(--border)",
                      transition: "all 0.3s var(--ease)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--bg4)";
                      e.currentTarget.style.borderColor = "var(--lime)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--lime-dim)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: "13px", color: "var(--text2)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div 
                data-card-item
                style={{ 
                  paddingTop: "20px", 
                  borderTop: "1px solid var(--border)", 
                  textAlign: "center" as const 
                }}
              >
                <p style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase" as const,
                  color: "var(--lime-sub)"
                }}>
                  By Application Only
                </p>
              </div>
              
              {/* Decorative corner accents */}
              <div style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                width: "24px",
                height: "24px",
                borderLeft: "1px solid var(--border2)",
                borderTop: "1px solid var(--border2)",
                borderRadius: "4px 0 0 0",
                pointerEvents: "none"
              }} aria-hidden />
              <div style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                width: "24px",
                height: "24px",
                borderRight: "1px solid var(--border2)",
                borderBottom: "1px solid var(--border2)",
                borderRadius: "0 0 4px 0",
                pointerEvents: "none"
              }} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}