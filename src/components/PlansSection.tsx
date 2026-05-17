import Link from "next/link";
import { coachingPlans, planWhatsAppUrl } from "@/config/site";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#c8ff00" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlansSection() {
  return (
    <section
      id="plans"
      aria-labelledby="plans-heading"
      style={{ padding: "112px 0", background: "var(--bg)", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute", top: "-50%", left: "-20%", width: "60%", height: "100%",
        background: "radial-gradient(ellipse, rgba(200,255,0,0.025) 0%, transparent 70%)",
        pointerEvents: "none",
      }} aria-hidden />

      <div className="container">
        {/* Header */}
        <header className="plans-header" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 48, gap: 16,
        }}>
          <div>
            <p className="section-tag" data-gsap-fade>Choose Your Path</p>
            <h2 className="section-title" id="plans-heading" data-gsap-heading>
              <span style={{ display: "block", overflow: "visible" }}>
                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                  <span className="gsap-heading-word" style={{ display: "inline-block" }}>Coaching</span>
                </span>
              </span>
              <span style={{ display: "block", overflow: "visible" }}>
                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                  <span className="gsap-heading-word outline" style={{ display: "inline-block" }}>Programs</span>
                </span>
              </span>
            </h2>
          </div>
          <p className="section-lead" data-gsap-fade style={{ maxWidth: 280, textAlign: "right" }}>
            Every plan is fully personalized. No generic templates. Just results.
          </p>
        </header>

        {/* Plans Grid */}
        <div data-gsap-stagger style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {coachingPlans.map((plan) => (
            <article
              key={plan.id}
              className="plan-card-new"
              style={{
                background: plan.featured
                  ? "linear-gradient(180deg, rgba(200,255,0,0.06) 0%, var(--bg3) 40%)"
                  : "var(--bg3)",
                border: plan.featured
                  ? "1px solid rgba(200,255,0,.15)"
                  : "1px solid var(--border)",
                borderRadius: 20,
                padding: 28,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...(plan.featured ? { boxShadow: "0 0 60px rgba(200,255,0,0.06)" } : {}),
              }}
            >
              {/* Top gradient line */}
              <div className="plan-top-line" aria-hidden />

              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "var(--font-mono), monospace", fontSize: 10, fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--lime)",
                background: "var(--lime-dim)", padding: "6px 12px", borderRadius: 100,
                marginBottom: 20, width: "fit-content",
              }}>
                {plan.pulse && (
                  <span data-gsap-pulse style={{
                    width: 5, height: 5, background: "var(--lime)", borderRadius: "50%",
                  }} aria-hidden />
                )}
                {plan.badge}
              </div>

              <h3 style={{
                fontFamily: "var(--font-space), sans-serif", fontSize: 22, fontWeight: 700,
                letterSpacing: "-0.01em", marginBottom: 8,
              }}>
                {plan.name}
              </h3>

              <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text3)", marginBottom: 24, flex: 1 }}>
                {plan.description}
              </p>

              <p style={{
                fontFamily: "var(--font-bebas), sans-serif", fontSize: 38, lineHeight: 1, marginBottom: 4,
              }}>
                {plan.price}{" "}
                <span style={{
                  fontSize: 14, fontWeight: 400, color: "var(--text3)",
                  fontFamily: "var(--font-inter), sans-serif",
                }}>{plan.currency}</span>
              </p>

              <p style={{
                fontFamily: "var(--font-mono), monospace", fontSize: 11,
                color: "var(--text4)", letterSpacing: "0.06em", marginBottom: 24,
              }}>
                {plan.tenure}
              </p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text2)" }}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={planWhatsAppUrl(plan.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={plan.featured ? "plan-cta-featured" : "plan-cta-link"}
              >
                <span>Apply on WhatsApp</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
