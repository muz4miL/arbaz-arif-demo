import Link from "next/link";
import { siteConfig } from "@/config/site";

export function InstagramSection() {
  return (
    <section className="ig-section" aria-labelledby="ig-heading">
      <div className="container">
        <header className="ig-header reveal" id="igHeader">
          <div>
            <p className="section-tag" style={{ marginBottom: 8 }}>
              Social
            </p>
            <h2 className="section-title" id="ig-heading" style={{ fontSize: "clamp(2rem,3vw,2.5rem)" }}>
              Follow
              <br />
              the Journey
            </h2>
          </div>
          <Link
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            {siteConfig.instagram.handle} &rarr;
          </Link>
        </header>
        <div className="ig-grid reveal" id="igGrid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="ig-item">
              <div className="ig-placeholder">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="ig-overlay">
                <span className="ig-label">IG</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
