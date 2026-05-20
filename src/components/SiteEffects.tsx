"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

gsap.registerPlugin(ScrollTrigger);

/**
 * Centralized GSAP scroll animation system.
 * Applies cinematic reveal animations to every section globally.
 */
function useScrollAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Wait for DOM + images to settle
    const timer = setTimeout(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1px)", () => {
        /* ── Section Headings: word-by-word reveal ── */
        document.querySelectorAll<HTMLElement>(".gsap-heading-word").forEach((word) => {
          gsap.set(word, { yPercent: 110 });
        });

        document.querySelectorAll<HTMLElement>("[data-gsap-heading]").forEach((heading) => {
          const words = heading.querySelectorAll<HTMLElement>(".gsap-heading-word");
          if (!words.length) return;

          gsap.to(words, {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.05,
            ease: "expo.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ── Accent lines: scaleX reveal ── */
        document.querySelectorAll<HTMLElement>("[data-gsap-line]").forEach((line) => {
          gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(line, {
            scaleX: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ── Cards: stagger fade-up with blur ── */
        document.querySelectorAll<HTMLElement>("[data-gsap-stagger]").forEach((container) => {
          const items = container.children;
          if (!items.length) return;

          gsap.set(items, { y: 50, opacity: 0, filter: "blur(8px)" });
          gsap.to(items, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ── Fade-up elements ── */
        document.querySelectorAll<HTMLElement>("[data-gsap-fade]").forEach((el) => {
          gsap.set(el, { y: 40, opacity: 0, filter: "blur(6px)" });
          gsap.to(el, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ── Slide from left ── */
        document.querySelectorAll<HTMLElement>("[data-gsap-slide-left]").forEach((el) => {
          gsap.set(el, { x: -40, opacity: 0 });
          gsap.to(el, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ── Scale-in elements ── */
        document.querySelectorAll<HTMLElement>("[data-gsap-scale]").forEach((el) => {
          gsap.set(el, { scale: 0.92, opacity: 0, rotate: -1 });
          gsap.to(el, {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ── Stagger rows (features etc) ── */
        document.querySelectorAll<HTMLElement>("[data-gsap-stagger-rows]").forEach((container) => {
          const rows = container.querySelectorAll<HTMLElement>("[data-gsap-row]");
          if (!rows.length) return;

          gsap.set(rows, { x: -30, opacity: 0 });
          gsap.to(rows, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        });

        /* ── Pulsing dots ── */
        document.querySelectorAll<HTMLElement>("[data-gsap-pulse]").forEach((dot) => {
          gsap.to(dot, {
            scale: 1.5,
            repeat: -1,
            yoyo: true,
            duration: 0.8,
            ease: "sine.inOut",
          });
        });

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);
}

export function SiteEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize centralized scroll animations
  useScrollAnimations();

  useEffect(() => {
    if (!mounted) return;

    const preEl = document.getElementById("preloader");
    const preCount = document.getElementById("preCount");
    const preFill = document.getElementById("preFill");
    let preDone = false;

    const dismissPreloader = () => {
      if (preDone || !preEl) return;
      preDone = true;
      preEl.classList.add("done");
      setTimeout(() => {
        preEl.style.display = "none";
      }, 900);
    };

    const timeout = window.setTimeout(dismissPreloader, 4000);

    let frame = 0;
    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const v = Math.min(100, (elapsed / duration) * 100);
      if (preCount) preCount.textContent = String(Math.round(v));
      if (preFill) preFill.style.transform = `scaleX(${v / 100})`;
      if (v < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        dismissPreloader();
      }
    };
    frame = requestAnimationFrame(tick);

    /* ── Custom cursor ── */
    const cursor = document.getElementById("cursor");
    const hoverSelector =
      "a,button,.plan-card-new,.btn-primary,.btn-ghost,.nav-cta-btn,.social-link,.method-card,.prestige-feature,.plan-cta-link,.plan-cta-featured,.cta-btn-dark,.cta-btn-outline";

    const onMouseMove = (e: MouseEvent) => {
      if (!cursor) return;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onEnter = () => cursor?.classList.add("hover");
    const onLeave = () => cursor?.classList.remove("hover");

    document.addEventListener("mousemove", onMouseMove);
    document.querySelectorAll(hoverSelector).forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    /* ── Scroll progress bar ── */
    const onScroll = () => {
      const scrollBar = document.getElementById("scrollBar");
      if (scrollBar) {
        const doc = document.documentElement;
        const progress =
          doc.scrollHeight - doc.clientHeight > 0
            ? doc.scrollTop / (doc.scrollHeight - doc.clientHeight)
            : 0;
        scrollBar.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ── Smooth anchor scrolling ── */
    const onAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    };

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", onAnchorClick);
    });

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll(hoverSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      window.removeEventListener("scroll", onScroll);
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener("click", onAnchorClick);
      });
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div id="site-effects-root" suppressHydrationWarning>
      <div className="noise" aria-hidden />
      <div className="scroll-bar" id="scrollBar" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="preloader" id="preloader" aria-hidden="true">
        <div className="pre-count" id="preCount">0</div>
        <div className="pre-bar">
          <div className="pre-fill" id="preFill" />
        </div>
        <div className="pre-label">Arbaz Arif Fitness Programs</div>
      </div>
    </div>,
    document.body,
  );
}
