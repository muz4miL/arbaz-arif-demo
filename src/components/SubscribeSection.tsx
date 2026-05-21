"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 1800, suffix = "") {
  const [display, setDisplay] = useState("0" + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out expo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.round(eased * target);
            setDisplay(current + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return { display, ref };
}

/* ─── Animated stat ─── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const { display, ref } = useCountUp(value, 1600 + delay, suffix);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "var(--lime)",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        <span ref={ref}>{display}</span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          color: "var(--text4)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export function SubscribeSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 3500);
    }, 1200);
  };

  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      style={{
        padding: "120px 0",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      {/* Background glow — own overflow wrapper so sticky siblings aren't affected */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,255,0,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container" style={{ position: "relative" }}>
        {/* ── Section tag ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 56,
          }}
        >
          <p className="section-tag">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--lime)",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
              aria-hidden
            />
            <span>Private Coaching Application</span>
          </p>
        </div>

        {/* ── Main card ── */}
        <div
          style={{
            position: "relative",
            border: "1px solid rgba(200,255,0,0.12)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: 32,
            overflow: "hidden",
            maxWidth: 1180,
            margin: "0 auto",
          }}
        >
          {/* Top gradient line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, var(--lime), transparent)",
            }}
          />
          {/* Corner accent TL */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              width: 24,
              height: 24,
              borderTop: "1.5px solid rgba(200,255,0,0.25)",
              borderLeft: "1.5px solid rgba(200,255,0,0.25)",
              borderRadius: "4px 0 0 0",
            }}
          />
          {/* Corner accent BR */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 24,
              height: 24,
              borderBottom: "1.5px solid rgba(200,255,0,0.25)",
              borderRight: "1.5px solid rgba(200,255,0,0.25)",
              borderRadius: "0 0 4px 0",
            }}
          />

          {/* Two-column grid */}
          <div className="subscribe-grid">
            {/* ══ LEFT ══ */}
            <div className="subscribe-left">
              {/* Heading */}
              <h2
                id="subscribe-heading"
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)",
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  marginBottom: 28,
                }}
              >
                <span style={{ display: "block", color: "var(--text)" }}>
                  Let&apos;s Build
                </span>
                <span style={{ display: "block", color: "var(--text)" }}>
                  Your Best
                </span>
                <span
                  style={{
                    display: "block",
                    color: "var(--lime)",
                    WebkitTextStroke: "0px",
                  }}
                >
                  Physique.
                </span>
              </h2>

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "var(--text3)",
                  maxWidth: 400,
                  marginBottom: 52,
                }}
              >
                Apply for elite online coaching — custom-built around your body,
                lifestyle, and transformation goals. Only{" "}
                <strong style={{ color: "var(--text2)", fontWeight: 600 }}>
                  3 spots
                </strong>{" "}
                per quarter.
              </p>

              {/* ── Animated stats ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                  paddingTop: 40,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <AnimatedStat value={500} suffix="+" label="Transformations" delay={0} />
                <AnimatedStat value={10} suffix="+" label="Years Experience" delay={200} />
                <AnimatedStat value={24} suffix="h" label="Response Time" delay={400} />
              </div>
            </div>

            {/* ══ RIGHT — Form ══ */}
            <div className="subscribe-right">
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Name + Email */}
                <div className="sub-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                    className="sub-input"
                    style={{ cursor: "none" }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="sub-input"
                    style={{ cursor: "none" }}
                  />
                </div>

                {/* Goal */}
                <input
                  type="text"
                  name="goal"
                  placeholder="Your primary fitness goal"
                  required
                  className="sub-input"
                  style={{ cursor: "none" }}
                />

                {/* Message */}
                <textarea
                  name="message"
                  placeholder="Tell Arbaz about your current physique, timeline, and biggest challenge..."
                  rows={5}
                  required
                  className="sub-input"
                  style={{
                    resize: "vertical",
                    minHeight: 150,
                    paddingTop: 20,
                    cursor: "none",
                    lineHeight: 1.7,
                  }}
                />

                {/* Submit — matches .btn-primary / .nav-cta-btn clip-path style */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "18px 32px",
                    fontSize: 12,
                    marginTop: 4,
                    opacity: status === "sending" ? 0.7 : 1,
                    cursor: status === "sending" ? "wait" : "none",
                    border: "none",
                  }}
                >
                  <span>
                    {status === "sending"
                      ? "Sending..."
                      : status === "sent"
                      ? "Application Sent ✓"
                      : "Apply for Coaching"}
                  </span>
                  {status === "idle" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                <p
                  style={{
                    marginTop: 4,
                    color: "var(--text4)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-mono), monospace",
                    textAlign: "center",
                  }}
                >
                  All applications reviewed personally · 100% confidential
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped styles — no global changes */}
      <style>{`
        .subscribe-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
        }

        .subscribe-left {
          padding: 72px 56px;
          border-right: 1px solid var(--border);
        }

        .subscribe-right {
          padding: 72px 56px;
        }

        .sub-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 900px) {
          .subscribe-grid {
            grid-template-columns: 1fr !important;
          }
          .subscribe-left {
            padding: 52px 32px 40px !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .subscribe-right {
            padding: 40px 32px 52px !important;
          }
        }

        @media (max-width: 540px) {
          .subscribe-left {
            padding: 40px 24px 32px !important;
          }
          .subscribe-right {
            padding: 32px 24px 40px !important;
          }
          .sub-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}