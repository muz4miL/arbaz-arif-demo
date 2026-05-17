import { processSteps } from "@/data/content";

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      style={{ padding: "112px 0", background: "var(--bg)" }}
    >
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <p className="section-tag" data-gsap-fade>How It Works</p>

          <h2 className="section-title" id="process-heading" data-gsap-heading>
            <span style={{ display: "block", overflow: "visible" }}>
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                <span className="gsap-heading-word" style={{ display: "inline-block" }}>The</span>
              </span>
            </span>
            <span style={{ display: "block", overflow: "visible" }}>
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span className="gsap-heading-word outline" style={{ display: "inline-block" }}>Process</span>
              </span>
            </span>
          </h2>
        </div>

        <div
          data-gsap-stagger
          style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
            background: "var(--border)", borderRadius: 20, overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          {processSteps.map((step) => (
            <article key={step.num} className="method-card" style={{
              background: "var(--bg3)", padding: 32,
              position: "relative", transition: "all 0.5s var(--ease)",
              cursor: "default", overflow: "hidden",
            }}>
              <div className="method-card-accent" aria-hidden />

              <div style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: 56, fontWeight: 900, lineHeight: 1,
                color: "rgba(255,255,255,0.04)", marginBottom: 20,
              }}>
                {step.num}
              </div>

              <h3 style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 17, fontWeight: 600, letterSpacing: "0.02em", marginBottom: 10,
              }}>
                {step.title}
              </h3>

              <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text3)" }}>
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
