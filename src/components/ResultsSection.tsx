import Link from "next/link";
import { clientAvatars, resultsMarqueeItems } from "@/data/content";
import { whatsappUrl } from "@/config/site";
import { ResultAvatar } from "./ResultAvatar";

function ClientAvatar({ name }: { name: string }) {
  const client = clientAvatars[name];
  if (!client) return null;
  return (
    <ResultAvatar
      src={client.image}
      alt={`${name} — client transformation`}
      initials={client.initials}
    />
  );
}

function StatCard({ item }: { item: { value: string; label: string; name: string; plan: string } }) {
  return (
    <div style={{
      flexShrink: 0, width: 260, background: "var(--bg3)",
      border: "1px solid var(--border)", borderRadius: 20, padding: 24,
      transition: "all 0.3s var(--ease)", cursor: "default",
    }} className="plan-card-new">
      <p style={{
        fontFamily: "var(--font-bebas), sans-serif",
        fontSize: "clamp(2rem, 3vw, 2.6rem)", fontWeight: 900,
        color: "var(--lime)", lineHeight: 1, marginBottom: 4,
      }}>
        {item.value}
      </p>
      <p style={{
        fontFamily: "var(--font-mono), monospace", fontSize: 9,
        letterSpacing: "0.15em", textTransform: "uppercase" as const,
        color: "var(--text4)", marginBottom: 16,
      }}>
        {item.label}
      </p>
      <div style={{ paddingTop: 12, borderTop: "1px solid var(--border)" }} className="result-client-row">
        <ClientAvatar name={item.name} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{item.name}</p>
          <p style={{
            fontFamily: "var(--font-mono), monospace", fontSize: 9,
            letterSpacing: "0.1em", color: "var(--lime)", marginTop: 2,
          }}>
            {item.plan}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ item }: { item: { quote: string; name: string } }) {
  return (
    <div style={{
      flexShrink: 0, width: 300, background: "var(--bg3)",
      border: "1px solid var(--border)", borderRadius: 20, padding: 24,
      transition: "all 0.3s var(--ease)", cursor: "default",
    }} className="plan-card-new">
      <div style={{
        fontFamily: "var(--font-bebas), sans-serif", fontSize: 40, lineHeight: 1,
        color: "var(--lime)", opacity: 0.25, marginBottom: 8,
      }} aria-hidden>
        &ldquo;
      </div>
      <blockquote style={{
        fontSize: 13, lineHeight: 1.7, color: "var(--text3)",
        fontStyle: "italic", marginBottom: 16,
      }}>
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="result-client-row" style={{ paddingTop: 12, borderTop: "1px solid var(--border)" }}>
        <ClientAvatar name={item.name} />
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{item.name}</p>
      </div>
    </div>
  );
}

export function ResultsSection() {
  const items = [...resultsMarqueeItems, ...resultsMarqueeItems];

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      style={{
        padding: "112px 0", background: "var(--bg)",
        borderTop: "1px solid var(--border)", overflow: "hidden",
      }}
    >
      <div className="container" style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p className="section-tag" data-gsap-fade>Client Results</p>
            <h2 className="section-title" id="results-heading" data-gsap-heading>
              <span style={{ display: "block", overflow: "visible" }}>
                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                  <span className="gsap-heading-word" style={{ display: "inline-block" }}>Real</span>
                </span>
              </span>
              <span style={{ display: "block", overflow: "visible" }}>
                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                  <span className="gsap-heading-word outline" style={{ display: "inline-block" }}>Transformations</span>
                </span>
              </span>
            </h2>
          </div>
          <div data-gsap-fade>
            <Link
              href={whatsappUrl("Hi Arbaz, I want results like these")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Get Your Results</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal marquee */}
      <div style={{ position: "relative" }}>
        {/* Left/right fades */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
          background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none",
        }} aria-hidden />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
          background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none",
        }} aria-hidden />

        <div className="animate-marquee-scroll" style={{ display: "flex", gap: 16 }}>
          {items.map((item, i) =>
            item.type === "stat" ? (
              <StatCard key={`stat-${i}`} item={item as { type: "stat"; value: string; label: string; name: string; plan: string }} />
            ) : (
              <QuoteCard key={`quote-${i}`} item={item as { type: "quote"; quote: string; name: string }} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
