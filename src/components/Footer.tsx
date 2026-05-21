import Link from "next/link";
import { siteConfig, whatsappFooterUrl } from "@/config/site";
import { navLinks } from "@/data/content";

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: siteConfig.instagram.url, icon: <IconInstagram />, handle: siteConfig.instagram.handle },
  { label: "WhatsApp", href: whatsappFooterUrl, icon: <IconWhatsApp />, handle: siteConfig.whatsappDisplay },
  { label: "TikTok", href: siteConfig.tiktok.url, icon: <IconTikTok />, handle: siteConfig.tiktok.handle },
  { label: "YouTube", href: siteConfig.youtube.url, icon: <IconYouTube />, handle: siteConfig.youtube.handle },
];

const footerNavLinks = [...navLinks, { href: "#subscribe", label: "Contact" }];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top lime accent line */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "50%", height: 1, background: "linear-gradient(90deg, transparent, var(--lime), transparent)", opacity: 0.5 }} />

      {/* Subtle glow at top center */}
      <div aria-hidden style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Large background wordmark */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(60px, 12vw, 160px)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.015)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>
        ARBAZ ARIF COACHING
      </div>

      {/* ── Main grid ── */}
      <div className="container" style={{ paddingTop: 80, paddingBottom: 64, position: "relative" }}>
        <div className="footer-main-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 34, letterSpacing: "0.06em", color: "var(--text)", textDecoration: "none", display: "inline-block", marginBottom: 16 }}>
              ARBAZ<span style={{ color: "var(--lime)" }}>.</span>ARIF
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text3)", marginBottom: 36, maxWidth: 260 }}>
              Elite online fitness coaching for people serious about their transformation.
            </p>
            {/* Mini CTA pill */}
            <Link
              href="#subscribe"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 100, border: "1px solid rgba(200,255,0,0.2)", background: "rgba(200,255,0,0.05)", textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(200,255,0,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,255,0,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(200,255,0,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,255,0,0.2)"; }}
            >
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--lime)" }}>Apply for Coaching</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M2 5h6M5.5 2.5l2.5 2.5-2.5 2.5" stroke="var(--lime)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text4)", marginBottom: 24 }}>Navigation</p>
            <nav aria-label="Footer navigation" style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {footerNavLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 13, fontWeight: 500, color: "var(--text3)", textDecoration: "none", letterSpacing: "0.03em", transition: "color 0.25s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text3)")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text4)", marginBottom: 24 }}>Connect</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {socials.map(({ label, href, icon, handle }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", color: "var(--text3)", transition: "color 0.25s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text3)")}
                >
                  <span style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.25s" }}>
                    {icon}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.03em" }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--text4)", letterSpacing: "0.05em" }}>{handle}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--border)", margin: "0 48px" }} />

      {/* Bottom bar */}
      <div className="container" style={{ paddingTop: 24, paddingBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, position: "relative" }}>
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--text4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          © {siteConfig.copyrightYear} {siteConfig.name} Coaching
        </p>
        <div aria-hidden style={{ flex: 1, maxWidth: 100, height: 1, background: "linear-gradient(90deg, transparent, var(--lime), transparent)", opacity: 0.2 }} />
        <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--text4)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Designed with Precision
        </p>
      </div>

      <style>{`
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: 80px;
        }
        @media (max-width: 900px) {
          .footer-main-grid { grid-template-columns: 1fr 1fr; gap: 48px; }
        }
        @media (max-width: 560px) {
          .footer-main-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </footer>
  );
}
