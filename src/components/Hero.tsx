"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

function IconYears() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 2h12M6 22h12M8 2v5l4 5-4 5v5M16 2v5l-4 5 4 5v5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconTransformations() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 12c0-2.761 2.239-5 5-5s5 2.239 5 5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 22V14M15 22V14M9 14h6"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 8l-2 4h3l-2 4"
        stroke="#c8ff00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCertified() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6L12 2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5"
        stroke="#c8ff00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconOnline() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18.5" cy="5.5" r="3.5" fill="#080808" />
      <path d="M17 5.5c0-.83.67-1.5 1.5-1.5"
        stroke="#c8ff00" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="18.5" cy="5.5" r="1" fill="#c8ff00" />
    </svg>
  );
}

const STATS = [
  { value: "12+", numeric: 12, suffix: "+", label: "Years of Experience", Icon: IconYears },
  { value: "500+", numeric: 500, suffix: "+", label: "Transformations", Icon: IconTransformations },
  { value: "Certified", numeric: null, suffix: "", label: "Trainer & Nutrition", Icon: IconCertified },
  { value: "Online", numeric: null, suffix: "", label: "Coaching Worldwide", Icon: IconOnline },
] as const;

const HEADLINE_LINES: { words: { text: string; accent?: boolean }[] }[] = [
  { words: [{ text: "The" }, { text: "Man" }] },
  { words: [{ text: "Behind" }] },
  { words: [{ text: "The" }, { text: "Results", accent: true }] },
];

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function MaskedWord({ text, accent, isLast }: { text: string; accent?: boolean; isLast?: boolean }) {
  return (
    <span
      className="hero-word-mask inline-block align-bottom"
      style={{
        // ─── ITALIC CLIP FIX ───────────────────────────────────────────────
        // iOS Safari has bugs with `em` units inside inset(), and needs the
        // -webkit- prefix. We use PERCENTAGE values (relative to the element's
        // own border-box width) which are always reliable cross-browser.
        //
        // inset(top  right  bottom  left)
        //   top   = 0  → vertical clip at mask top edge (hides word during yPercent:110 animation)
        //   right = -30% → expands clip 30% of element width to the RIGHT (covers italic overhang)
        //   bottom = 0  → vertical clip at mask bottom edge (hides word when below mask)
        //   left  = -10% → small left expansion for italic leftward lean
        //
        // The GSAP yPercent:110→0 animation still works because top=0 / bottom=0
        // clips the translated word until it slides into the visible zone.
        clipPath: "inset(0 -30% 0 -10%)",
        WebkitClipPath: "inset(0 -30% 0 -10%)",
        // Word spacing — clip-path handles right-side glyph overflow, padding
        // just provides gap between adjacent words on the same line.
        paddingRight: isLast ? "0.1em" : "0.42em",
      }}
    >
      <span
        className={`hero-word inline-block will-change-transform ${accent ? "text-[#c8ff00]" : "text-white"}`}
      >
        {text}
      </span>
    </span>
  );
}

function StatCounter({ value, numeric, suffix }: { value: string; numeric: number | null; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current || numeric === null) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: numeric,
      duration: 2,
      ease: "power2.out",
      delay: 1.2,
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val) + suffix;
        }
      },
    });
  }, { scope: ref });

  if (numeric === null) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>0{suffix}</span>;
}

function HeroCopy({
  contentRef,
  accentLineRef,
  scrollCueRef,
}: {
  contentRef: RefObject<HTMLDivElement | null>;
  accentLineRef: RefObject<HTMLSpanElement | null>;
  scrollCueRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={contentRef} className="hero-copy">
      <div className="mb-5 flex items-center gap-3 lg:mb-8">
        <span
          ref={accentLineRef}
          className="inline-block h-px w-8 flex-shrink-0 bg-[#c8ff00]"
          style={{ transformOrigin: "left center" }}
          aria-hidden
        />
        <p className="text-[9px] font-bold uppercase tracking-[0.36em] text-[#444] lg:text-[10px]">
          Strategy.{" "}
          <span className="text-[#c8ff00]">Transformation.</span>
        </p>
      </div>

      <h1
        className="hero-copy__headline font-black uppercase italic tracking-[-0.02em]"
        style={{ overflow: "visible" }}
      >
        {HEADLINE_LINES.map((line, i) => (
          <span key={i} className="block" style={{ overflow: "visible" }}>
            {line.words.map((w, wi) => (
              <MaskedWord key={`${i}-${wi}-${w.text}`} text={w.text} accent={w.accent} isLast={wi === line.words.length - 1} />
            ))}
          </span>
        ))}
      </h1>

      <p
        data-hero-fade
        className="hero-copy__sub font-semibold leading-relaxed tracking-wide text-[#c2c2c2]"
      >
        Pakistan&apos;s{" "}
        <span className="font-semibold text-[#c8ff00]">most trusted online fitness coach</span>
        {" "}— 500+ transformations across{" "}
        <span className="font-semibold text-[#c8ff00]">Pakistan, UAE, UK, US &amp; Ireland!</span>
      </p>

      <div data-hero-fade className="hero-copy__ctas hidden flex-wrap items-center gap-4 sm:gap-5 lg:flex">
        <Link
          href="#plans"
          className="group inline-flex items-center gap-3 bg-[#c8ff00] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_60px_rgba(200,255,0,0.18)] lg:px-8 lg:py-4 lg:text-[11px]"
          style={{
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          Start Now
          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
        <Link
          href="#results"
          className="group relative inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#555] transition-colors duration-200 hover:text-white lg:text-[11px]"
        >
          <span className="relative">
            See Results
            <span
              className="absolute -bottom-1 left-0 h-px w-0 bg-[#c8ff00] transition-all duration-300 group-hover:w-full"
              aria-hidden
            />
          </span>
        </Link>
      </div>

      <div ref={scrollCueRef} className="mt-14 hidden items-center gap-3 opacity-0 lg:flex" aria-hidden>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/10 p-1.5">
          <div className="h-1.5 w-[1.5px] rounded-full bg-[#c8ff00]" />
        </div>
        <span className="text-[8.5px] font-bold uppercase tracking-[0.3em] text-[#2e2e2e]">Scroll</span>
      </div>
    </div>
  );
}

export function Hero() {
  const [imgReady, setImgReady] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageClipRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsMobileRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLSpanElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      const content = contentRef.current;
      const imageClip = imageClipRef.current;
      const imageParallax = imageParallaxRef.current;
      const grain = grainRef.current;
      const stats = statsRef.current;
      const statsMobile = statsMobileRef.current;
      const accentLine = accentLineRef.current;
      const scrollCue = scrollCueRef.current;
      if (!root || !pin || !content) return;

      const words = root.querySelectorAll<HTMLElement>(".hero-word");
      const textBlocks = root.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const statPanels = [stats, statsMobile].filter(Boolean) as HTMLElement[];

      const mount = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (grain) {
        gsap.set(grain, { opacity: 0 });
        mount.to(grain, { opacity: 0.28, duration: 2.2, ease: "power2.out" }, 0);
      }

      if (accentLine) {
        gsap.set(accentLine, { scaleX: 0, transformOrigin: "left center" });
        mount.to(accentLine, { scaleX: 1, duration: 0.6, ease: "expo.out" }, 0.1);
      }

      if (imageClip && imageParallax) {
        gsap.set(imageClip, { clipPath: "inset(100% 0 0 0)" });
        gsap.set(imageParallax, { filter: "brightness(0.2) saturate(0.2)" });
        mount.to(imageClip, { clipPath: "inset(0% 0 0 0)", duration: 2.1, ease: "expo.inOut" }, 0.05);
        mount.to(imageParallax, { filter: "brightness(1) saturate(1)", duration: 1.8, ease: "power2.out" }, 0.4);
      }

      gsap.set(words, { yPercent: 110 });
      mount.to(words, { yPercent: 0, duration: 1.1, stagger: 0.05, ease: "expo.out" }, 0.2);

      mount.eventCallback("onComplete", () => {
        gsap.set(words, { clearProps: "transform" });
        ScrollTrigger.refresh();
      });

      gsap.set(textBlocks, { y: 28, opacity: 0, filter: "blur(5px)" });
      mount.to(textBlocks, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.13,
        ease: "power3.out",
      }, 0.65);

      if (statPanels.length) {
        gsap.set(statPanels, { opacity: 0, y: 20, filter: "blur(10px)" });
        mount.to(statPanels, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        }, 1.1);
      }

      if (scrollCue) {
        gsap.set(scrollCue, { opacity: 0 });
        mount.to(scrollCue, { opacity: 1, duration: 0.8 }, 1.7);
        gsap.to(scrollCue, {
          y: 7,
          repeat: -1,
          yoyo: true,
          duration: 1.3,
          ease: "sine.inOut",
          delay: 2.2,
        });
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!imageParallax) return;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=110%",
            scrub: 1.6,
            pin,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTl.to(content, { y: -170, opacity: 0, filter: "blur(12px)", ease: "none" }, 0);
        if (stats) scrollTl.to(stats, { y: -80, opacity: 0, ease: "none" }, 0.06);
        if (scrollCue) scrollTl.to(scrollCue, { opacity: 0, y: -20, ease: "none" }, 0);
        scrollTl.to(imageParallax, { y: 70, ease: "none" }, 0);

        return () => {
          scrollTl.scrollTrigger?.kill();
          scrollTl.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const mobileMedia = root.querySelector<HTMLElement>(".hero-mobile-media");
        if (!mobileMedia) return;
        gsap.to(mobileMedia, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="home" aria-label="Introduction" className="hero-section">
      <div
        ref={grainRef}
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 mix-blend-overlay"
        style={{ backgroundImage: GRAIN_BG, backgroundRepeat: "repeat", backgroundSize: "180px" }}
        aria-hidden
      />

      <div ref={pinRef} className="hero-pin">
        <div className="hero-inner">
          <HeroCopy
            contentRef={contentRef}
            accentLineRef={accentLineRef}
            scrollCueRef={scrollCueRef}
          />

          {/* Desktop image */}
          <div className="hero-image-col hidden lg:block">
            <div
              ref={imageClipRef}
              className="absolute inset-0"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse 95% 100% at 78% 45%, #000 42%, transparent 76%)",
                maskImage: "radial-gradient(ellipse 95% 100% at 78% 45%, #000 42%, transparent 76%)",
              }}
            >
              <div ref={imageParallaxRef} className="absolute will-change-transform" style={{ inset: "-8% 0 0 0" }}>
                <Image
                  src="/arbaz3.png"
                  alt="Arbaz Arif — elite online fitness coach"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 0px"
                  className={`object-cover transition-opacity duration-700 ${imgReady ? "opacity-100" : "opacity-0"}`}
                  style={{ objectPosition: "88% 42%" }}
                  onLoad={() => setImgReady(true)}
                />
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(100deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.45) 18%, rgba(8,8,8,0.08) 38%, transparent 52%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40"
              style={{
                background: "linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48"
              style={{
                background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.5) 45%, transparent 100%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[5]"
              style={{
                background: "radial-gradient(ellipse 40% 32% at 72% 48%, rgba(200,255,0,0.07) 0%, transparent 70%)",
              }}
              aria-hidden
            />
          </div>
        </div>

        <div ref={statsRef} className="hero-stats-desktop hidden lg:flex" role="group" aria-label="Coach credentials">
          <div
            className="hero-stats-desktop__panel flex items-stretch overflow-hidden border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex min-w-[168px] flex-col items-center justify-center gap-[7px] px-9 py-6 text-center ${i < STATS.length - 1 ? "border-r border-white/[0.06]" : ""}`}
              >
                <span className="text-[#c8ff00]/70">
                  <stat.Icon />
                </span>
                <p className="text-[1.35rem] font-black leading-none tracking-tight text-white">
                  <StatCounter value={stat.value} numeric={stat.numeric} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#aaa] whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: image tucked under copy, stats overlap image bottom */}
      <div className="hero-mobile-stack lg:hidden">
        <div className="hero-mobile-media">
          <Image
            src="/arbaz3.png"
            alt="Arbaz Arif — elite online fitness coach"
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${imgReady ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: "85% 22%" }}
            onLoad={() => setImgReady(true)}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24"
            style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 100%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
            style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.4) 55%, transparent 100%)" }}
            aria-hidden
          />
        </div>

        <div ref={statsMobileRef} className="hero-stats-mobile">
          <ul className="grid grid-cols-2">
            {STATS.map((stat, i) => (
              <li
                key={stat.label}
                className={`flex flex-col items-center gap-2 p-5 text-center ${i % 2 === 0 ? "border-r border-white/[0.06]" : ""} ${i < 2 ? "border-b border-white/[0.06]" : ""}`}
              >
                <span className="text-[#c8ff00]/70">
                  <stat.Icon />
                </span>
                <p className="text-[1.05rem] font-black tracking-tight text-white">
                  <StatCounter value={stat.value} numeric={stat.numeric} suffix={stat.suffix} />
                </p>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#aaa]">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
