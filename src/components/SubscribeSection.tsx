"use client";

import { FormEvent, useState } from "react";

export function SubscribeSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      form.reset();
    }, 3000);
  };

  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      style={{ padding: "80px 0", background: "var(--bg)", position: "relative", overflow: "hidden" }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(200,255,0,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} aria-hidden />

      <div className="container">
        <div data-gsap-fade style={{
          background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 24,
          padding: 64, textAlign: "center" as const, position: "relative", overflow: "hidden",
          maxWidth: 720, margin: "0 auto",
        }}>
          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, var(--lime), transparent)",
          }} aria-hidden />

          <p className="section-tag" style={{ justifyContent: "center", marginBottom: 16 }}>
            Newsletter
          </p>

          <h2
            id="subscribe-heading"
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700, marginBottom: 12,
            }}
          >
            Get Free Fitness Insights
          </h2>

          <p style={{
            fontSize: 14, color: "var(--text3)", marginBottom: 36,
            maxWidth: 400, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7,
          }}>
            Weekly training tips, nutrition hacks, and exclusive offers. No spam, ever.
          </p>

          <form style={{ display: "flex", gap: 12, maxWidth: 480, margin: "0 auto" }} onSubmit={handleSubmit}>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" type="email" name="email" className="sub-input" placeholder="Enter your email" required autoComplete="email" />
            <button
              type="submit"
              className="sub-btn"
              style={submitted ? { background: "#1a1a1a", color: "var(--lime)" } : undefined}
            >
              <span>{submitted ? "Subscribed ✓" : "Subscribe"}</span>
            </button>
          </form>

          <p style={{ fontSize: 11, color: "var(--text4)", marginTop: 16, letterSpacing: "0.03em" }}>
            Join 2,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
