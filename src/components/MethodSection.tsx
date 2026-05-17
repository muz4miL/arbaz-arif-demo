import { methodPillars } from "@/data/content";
import { MethodIcon } from "@/components/MethodIcon";

export function MethodSection() {
  return (
    <section
      className="method-section"
      aria-labelledby="method-heading"
      style={{ padding: "112px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        {/* ── Header with word reveal ── */}
        <div style={{ marginBottom: 48 }}>
          <p className="section-tag" data-gsap-fade>The Method</p>

          <h2
            id="method-heading"
            className="section-title"
            data-gsap-heading
          >
            <span style={{ display: "block", overflow: "visible" }}>
              {["Four", "Pillars", "of"].map((word) => (
                <span key={word} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                  <span className="gsap-heading-word" style={{ display: "inline-block" }}>{word}</span>
                </span>
              ))}
            </span>
            <span style={{ display: "block", overflow: "visible" }}>
              <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span className="gsap-heading-word outline" style={{ display: "inline-block" }}>
                  Transformation
                </span>
              </span>
            </span>
          </h2>
          <span data-gsap-line style={{ display: "block", width: 64, height: 1, background: "var(--lime)", marginTop: 20 }} aria-hidden />
        </div>

        {/* ── Cards Grid ── */}
        <div
          className="method-grid"
          data-gsap-stagger
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--border)",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          {methodPillars.map((pillar) => (
            <article key={pillar.num} className="method-card" style={{
              background: "var(--bg3)",
              padding: 32,
              position: "relative",
              transition: "all 0.5s var(--ease)",
              cursor: "default",
              overflow: "hidden",
            }}>
              {/* Hover top accent line */}
              <div className="method-card-accent" aria-hidden />

              <div style={{
                width: 44, height: 44, marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--lime-dim)", borderRadius: 14,
                border: "1px solid rgba(200,255,0,0.1)",
              }}>
                <MethodIcon type={pillar.icon} />
              </div>

              <div style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: 48, fontWeight: 900, lineHeight: 1,
                color: "rgba(255,255,255,0.04)", marginBottom: 12,
              }}>
                {pillar.num}
              </div>

              <h3 style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 17, fontWeight: 600, letterSpacing: "0.02em", marginBottom: 10,
              }}>
                {pillar.title}
              </h3>

              <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text3)" }}>
                {pillar.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
