"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
import { navLinks } from "@/data/content";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── GSAP: scrolled state via GSAP (not CSS toggle) ── */
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      let scrolled = false;

      const onScroll = () => {
        const isScrolled = window.scrollY > 80;
        if (isScrolled === scrolled) return;
        scrolled = isScrolled;

        if (scrolled) {
          gsap.to(nav, {
            backgroundColor: "rgba(8,8,8,0.92)",
            backdropFilter: "blur(20px)",
            borderBottomColor: "rgba(255,255,255,0.06)",
            paddingTop: "14px",
            paddingBottom: "14px",
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(nav, {
            backgroundColor: "rgba(8,8,8,0)",
            backdropFilter: "blur(0px)",
            borderBottomColor: "rgba(255,255,255,0)",
            paddingTop: "20px",
            paddingBottom: "20px",
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    },
    { scope: navRef },
  );

  /* ── Mobile menu toggle ── */
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (next) {
      document.body.style.overflow = "hidden";
      // Stagger links in after opening
      requestAnimationFrame(() => {
        gsap.fromTo(
          ".mobile-nav-link",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "expo.out", delay: 0.1 },
        );
      });
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <nav
        ref={navRef}
        id="mainNav"
        aria-label="Main navigation"
        style={{ backgroundColor: "rgba(8,8,8,0)", borderBottomColor: "rgba(255,255,255,0)" }}
      >
        <Link href="/" className="nav-logo" style={{ position: "relative", zIndex: 110 }}>
          ARBAZ<span>.</span>ARIF
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: undefined }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — clip-path */}
        <Link href="#plans" className="nav-cta-btn hidden lg:inline-block">
          <span>Start Now</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative flex flex-col items-center justify-center gap-[5px]
                     bg-transparent border-none cursor-pointer w-8 h-8"
          style={{ zIndex: 110 }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
            style={menuOpen ? { transform: "rotate(45deg) translateY(3.25px)" } : {}}
          />
          <span
            className="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
            style={menuOpen ? { transform: "rotate(-45deg) translateY(-3.25px)" } : {}}
          />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[#080808] flex flex-col items-center justify-center lg:hidden"
          style={{ zIndex: 105 }}
        >
          <ul className="flex flex-col items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href} className="mobile-nav-link" style={{ opacity: 0 }}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[clamp(1.4rem,4vw,2rem)] font-black uppercase italic tracking-[0.05em]
                             text-white no-underline transition-colors duration-300 hover:text-[#c8ff00]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#plans"
            onClick={closeMenu}
            className="nav-cta-btn mt-12 mobile-nav-link"
            style={{ opacity: 0 }}
          >
            <span>Start Now</span>
          </Link>
        </div>
      )}
    </>
  );
}
