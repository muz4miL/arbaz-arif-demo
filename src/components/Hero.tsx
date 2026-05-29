"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeCheck, Clock, Globe, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "12+", numeric: 12, suffix: "+", label: "Years of Experience", Icon: Clock },
  { value: "500+", numeric: 500, suffix: "+", label: "Transformations", Icon: TrendingUp },
  { value: "Certified", numeric: null, suffix: "", label: "Trainer & Nutrition", Icon: BadgeCheck },
  { value: "Online", numeric: null, suffix: "", label: "Coaching Worldwide", Icon: Globe },
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
        // ─── ITALIC CLIP FIX (definitive) ─────────────────────────────────
        // iOS Safari silently ignores negative values in clip-path:inset(),
        // treating them as 0 — which is identical to overflow:hidden.
        //
        // Solution: polygon() with LARGE pixel x-extents + percentage y-extents.
        //   x: -200px → 2000px  (effectively infinite — italic overhang is ~10px)
        //   y: 0%     → 100%    (clips at mask top/bottom for GSAP yPercent reveal)
        clipPath: "polygon(-200px 0%, 2000px 0%, 2000px 100%, -200px 100%)",
        WebkitClipPath: "polygon(-200px 0%, 2000px 0%, 2000px 100%, -200px 100%)",
      }}
    >
      <span
        className={`hero-word inline-block will-change-transform ${accent ? "text-[#c8ff00]" : "text-white"}`}
        style={{
          // Critical fix for italic glyph clipping in hardware-accelerated layers:
          // When an element has `will-change-transform` or active GSAP transforms,
          // the browser creates a composited layer matching the element's bounds.
          // For italic text, the slant overhangs outside the standard layout box.
          // Adding padding directly to the animated child element extends its
          // painted bounds, ensuring the italic slant renders completely inside
          // the layer. A small negative margin compensates for layout spacing.
          paddingRight: isLast ? "0.25em" : "0.55em",
          marginRight: isLast ? "-0.15em" : "-0.13em",
        }}
      >
        {text}
      </span>
    </span>
  );
}

function StatCounter({ value, numeric, suffix }: { value: string; numeric: number | null; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || numeric === null || hasAnimated.current) return;
    hasAnimated.current = true;

    const el = ref.current;
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: numeric,
      duration: 2.5,
      ease: "power3.out",
      delay: 1.2,
      onUpdate: () => {
        if (el) {
          el.textContent = Math.round(obj.val) + suffix;
        }
      },
      onComplete: () => {
        if (el) {
          gsap.fromTo(
            el,
            { scale: 1 },
            { scale: 1.08, duration: 0.25, ease: "back.out(2)", yoyo: true, repeat: 1 }
          );
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [numeric, suffix]);

  if (numeric === null) {
    return <span>{value}</span>;
  }

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
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
        style={{
          overflow: "visible",
          // Force full container width so the h1 never shrink-wraps to exactly
          // the text's layout width (which puts the last char's edge right at
          // the clip boundary). With full width there is always room for italic
          // glyph overhang on every line regardless of viewport size.
          width: "100%",
        }}
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
        className="hero-copy__sub font-medium leading-relaxed tracking-wide text-[#a0a0a0]"
      >
        Pakistan&apos;s most trusted online fitness coach — 500+ transformations across Pakistan, UAE, UK, US &amp; Ireland!
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
          <div className="hero-stats-desktop__panel relative flex items-stretch overflow-hidden rounded-lg border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
            {/* Top accent line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-[#c8ff00]/60 to-transparent" aria-hidden />
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`relative flex min-w-[180px] flex-col items-center justify-center gap-2.5 px-10 py-7 text-center ${i < STATS.length - 1 ? "border-r border-white/[0.06]" : ""}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c8ff00]/20 bg-[#111] text-[#c8ff00]">
                  <stat.Icon size={18} strokeWidth={1.5} />
                </span>
                <p className="text-[1.5rem] font-black leading-none tracking-tight text-white tabular-nums" style={{ textShadow: "0 2px 16px rgba(255,255,255,0.08)" }}>
                  <StatCounter value={stat.value} numeric={stat.numeric} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#bbb] whitespace-nowrap">
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
          <div className="w-full">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-center justify-between px-5 py-4 ${i < STATS.length - 1 ? "border-b border-white/[0.05]" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#c8ff00] text-lg">
                    <stat.Icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className="text-white font-extrabold text-xl tracking-tight tabular-nums" style={{ textShadow: "0 2px 12px rgba(255,255,255,0.06)" }}>
                    <StatCounter value={stat.value} numeric={stat.numeric} suffix={stat.suffix} />
                  </span>
                </div>
                <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.16em] text-right">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
