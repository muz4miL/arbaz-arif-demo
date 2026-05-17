import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/config/site";
import { navLinks } from "@/data/content";

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <p className="footer-logo">
            ARBAZ<span>.</span>ARIF
          </p>
          <p className="footer-tagline">
            Elite fitness coaching for people who are serious about their results.
          </p>
        </div>
        <div className="footer-links" role="navigation" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="#cta">Contact</Link>
        </div>
        <div className="footer-social">
          <Link
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            IG
          </Link>
          <Link
            href={whatsappUrl("Hi Arbaz")}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="WhatsApp"
          >
            WA
          </Link>
          <Link href="#" className="social-link" aria-label="TikTok">
            TT
          </Link>
          <Link href="#" className="social-link" aria-label="YouTube">
            YT
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; {siteConfig.copyrightYear} {siteConfig.name} Coaching
        </p>
        <div className="footer-accent" aria-hidden />
        <p className="footer-copy">Designed with precision</p>
      </div>
    </footer>
  );
}
