"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

gsap.registerPlugin(ScrollTrigger);

const PRELOADER_RING_CIRCUMFERENCE = 722.57;

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
    const preRingProgress = document.getElementById("preRingProgress") as SVGCircleElement | null;
    const preStatus = document.getElementById("preStatus");
    const preFlash = document.getElementById("preFlash");
    let preDone = false;
    let preFinished = false;

    const preGlow = document.getElementById("preGlow");
    const preOrbits = document.querySelectorAll<HTMLElement>(".pre-orbit-ring");

    const statusForProgress = (v: number) => {
      if (v < 28) return "Initializing systems";
      if (v < 55) return "Loading programs";
      if (v < 82) return "Preparing your experience";
      if (v < 100) return "Almost ready";
      return "Welcome";
    };

    if (preEl) {
      gsap.fromTo(
        preEl.querySelector(".pre-core"),
        { opacity: 0, y: 28, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out", delay: 0.12 },
      );
      gsap.from(".pre-particle", {
        opacity: 0,
        scale: 0,
        duration: 1.2,
        stagger: { each: 0.05, from: "random" },
        ease: "back.out(2)",
        delay: 0.2,
      });
      preOrbits.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i === 0 ? 360 : -360,
          duration: i === 0 ? 22 : 14,
          repeat: -1,
          ease: "none",
        });
      });
      gsap.to(".pre-corner", {
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.25,
      });
      gsap.to(".pre-brand", { opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 });
    }

    const dismissPreloader = () => {
      if (preDone || !preEl) return;
      preDone = true;

      const tl = gsap.timeline({
        onComplete: () => {
          preEl.classList.add("done");
          setTimeout(() => {
            preEl.style.display = "none";
          }, 850);
        },
      });

      tl.to(preFlash, { opacity: 0.85, duration: 0.12, ease: "power2.out" })
        .to(preFlash, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0.12)
        .to(
          ".pre-ring-stage",
          { scale: 1.12, opacity: 0, duration: 0.55, ease: "power3.in" },
          0,
        )
        .to(preEl.querySelector(".pre-meta"), { opacity: 0, y: 16, duration: 0.4, ease: "power2.in" }, 0.08)
        .to(preGlow, { opacity: 0, scale: 1.5, duration: 0.5, ease: "power2.in" }, 0)
        .to(preEl, { scale: 1.02, duration: 0.5, ease: "power2.in" }, 0);
    };

    const finishLoading = () => {
      if (preFinished) return;
      preFinished = true;
      if (preCount) preCount.textContent = "100";
      if (preRingProgress) preRingProgress.style.strokeDashoffset = "0";
      if (preFill) preFill.style.transform = "scaleX(1)";
      if (preStatus) preStatus.textContent = statusForProgress(100);
      gsap.fromTo(
        ".pre-ring-stage",
        { scale: 1 },
        { scale: 1.04, duration: 0.35, ease: "power2.out", yoyo: true, repeat: 1 },
      );
      window.setTimeout(dismissPreloader, 420);
    };

    const timeout = window.setTimeout(finishLoading, 4500);

    let frame = 0;
    const duration = 2600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = 1 - Math.pow(1 - Math.min(1, elapsed / duration), 2.4);
      const v = Math.min(100, eased * 100);
      const rounded = Math.round(v);

      if (preCount) preCount.textContent = String(rounded);
      if (preFill) preFill.style.transform = `scaleX(${v / 100})`;
      if (preGlow) preGlow.style.opacity = String(0.2 + (v / 100) * 0.65);
      if (preRingProgress) {
        preRingProgress.style.strokeDashoffset = String(
          PRELOADER_RING_CIRCUMFERENCE * (1 - v / 100),
        );
      }
      if (preStatus) preStatus.textContent = statusForProgress(rounded);

      if (v < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        clearTimeout(timeout);
        finishLoading();
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
      gsap.killTweensOf(".pre-ring-stage, .pre-orbit-ring, .pre-particle, .pre-corner, .pre-brand, #preGlow, #preFlash");
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
      <div className="preloader" id="preloader" aria-hidden="true" aria-busy="true">
        <div className="pre-grid" aria-hidden="true" />
        <div className="pre-vignette" aria-hidden="true" />
        <div className="pre-particles" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="pre-particle" style={{ ["--i" as string]: i }} />
          ))}
        </div>
        <div className="pre-ambient" aria-hidden="true">
          <div className="pre-glow" id="preGlow" />
          <div className="pre-orbit" aria-hidden="true">
            <span className="pre-orbit-ring" />
            <span className="pre-orbit-ring pre-orbit-ring--reverse" />
          </div>
        </div>
        <span className="pre-corner pre-corner--tl" aria-hidden="true" />
        <span className="pre-corner pre-corner--tr" aria-hidden="true" />
        <span className="pre-corner pre-corner--bl" aria-hidden="true" />
        <span className="pre-corner pre-corner--br" aria-hidden="true" />
        <div className="pre-brand" aria-hidden="true">
          ARBAZ<span>.</span>ARIF
        </div>
        <div className="pre-core">
          <div className="pre-ring-stage">
            <svg className="pre-ring-svg" viewBox="0 0 260 260" aria-hidden="true">
              <defs>
                <linearGradient id="preRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(200,255,0,0.5)" />
                  <stop offset="50%" stopColor="#c8ff00" />
                  <stop offset="100%" stopColor="rgba(200,255,0,0.85)" />
                </linearGradient>
                <filter id="preRingGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {Array.from({ length: 36 }, (_, i) => {
                const angle = (i * 10 * Math.PI) / 180;
                const x1 = 130 + Math.cos(angle) * 108;
                const y1 = 130 + Math.sin(angle) * 108;
                const x2 = 130 + Math.cos(angle) * 118;
                const y2 = 130 + Math.sin(angle) * 118;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className="pre-ring-tick"
                    opacity={i % 3 === 0 ? 0.45 : 0.18}
                  />
                );
              })}
              <circle className="pre-ring-track" cx="130" cy="130" r="115" />
              <circle
                id="preRingProgress"
                className="pre-ring-progress"
                cx="130"
                cy="130"
                r="115"
                strokeDasharray={PRELOADER_RING_CIRCUMFERENCE}
                strokeDashoffset={PRELOADER_RING_CIRCUMFERENCE}
              />
            </svg>
            <div className="pre-radar" aria-hidden="true" />
            <div className="pre-count-wrap">
              <div className="pre-count" id="preCount">
                0
              </div>
              <span className="pre-count-unit">%</span>
            </div>
          </div>
          <div className="pre-meta">
            <p className="pre-status" id="preStatus">
              Initializing systems
            </p>
            <div className="pre-bar">
              <div className="pre-fill" id="preFill" />
            </div>
            <div className="pre-label">Arbaz Arif Fitness Programs</div>
            <div className="pre-tagline">Elite Online Coaching</div>
          </div>
        </div>
        <div className="pre-flash" id="preFlash" aria-hidden="true" />
        <div className="pre-scanline" aria-hidden="true" />
      </div>
    </div>,
    document.body,
  );
}
