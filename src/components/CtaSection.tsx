import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/config/site";

export function CtaSection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      style={{
        padding: "100px 0", background: "var(--lime)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Background watermark */}
      <div style={{
        position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)",
        fontFamily: "var(--font-bebas), sans-serif",
        fontSize: "clamp(160px, 20vw, 300px)", lineHeight: 1,
        color: "rgba(0,0,0,0.04)", pointerEvents: "none", letterSpacing: "-0.02em",
      }} aria-hidden>
        START
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="cta-grid" data-gsap-fade>
          <div>
            <h2 id="cta-heading" style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "clamp(52px, 6vw, 100px)", lineHeight: 0.92,
              letterSpacing: "0.02em", color: "#000",
            }}>
              Ready to<br />Transform<br />Your Life?
            </h2>
            <p style={{
              fontSize: 15, color: "rgba(0,0,0,0.55)", marginTop: 16,
              maxWidth: 420, lineHeight: 1.7,
            }}>
              Spots are limited to ensure every client gets the attention they deserve.
              Apply today and lock in your transformation.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <Link
              href={whatsappUrl("Hi Arbaz, I'm ready to start my transformation")}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-dark"
            >
              <span>Apply via WhatsApp</span>
            </Link>

            <Link
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-outline"
            >
              DM on Instagram
            </Link>

            <p style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", letterSpacing: "0.05em", marginTop: 4 }}>
              Free 15-minute consultation included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
