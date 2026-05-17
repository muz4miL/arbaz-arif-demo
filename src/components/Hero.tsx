"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   SVG ICONS — hand-crafted, 24×24 viewport
───────────────────────────────────────────── */
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
  { value: "10+", label: "Years of Experience", Icon: IconYears },
  { value: "500+", label: "Transformations", Icon: IconTransformations },
  { value: "Certified", label: "Trainer & Nutrition", Icon: IconCertified },
  { value: "Online", label: "Coaching Worldwide", Icon: IconOnline },
] as const;

const HEADLINE_LINES: { words: { text: string; accent?: boolean }[] }[] = [
  { words: [{ text: "The" }, { text: "Man" }] },
  { words: [{ text: "Behind" }] },
  { words: [{ text: "The" }, { text: "Results", accent: true }] },
];

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ─────────────────────────────────────────────
   MASKED WORD — Y-only clip for italic safety
───────────────────────────────────────────── */
function MaskedWord({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <span
      className="hero-word-mask inline-block align-bottom"
      style={{
        overflow: "hidden",
        paddingBottom: "0.07em",
        marginBottom: "-0.07em",
        paddingLeft: "0.05em",
        marginLeft: "-0.05em",
        paddingRight: "0.18em",
        marginRight: "-0.06em",
      }}
    >
      <span
        className={`hero-word inline-block will-change-transform ${accent ? "text-[#c8ff00]" : "text-white"
          }`}
      >
        {text}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────────── */
export function Hero() {
  const [imgReady, setImgReady] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
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

      /* ── MOUNT REVEAL ── */
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
        mount.to(imageClip,
          { clipPath: "inset(0% 0 0 0)", duration: 2.1, ease: "expo.inOut" }, 0.05);
        mount.to(imageParallax,
          { filter: "brightness(1) saturate(1)", duration: 1.8, ease: "power2.out" }, 0.4);
      }

      gsap.set(words, { yPercent: 115, rotate: 4, skewX: 3 });
      mount.to(words, {
        yPercent: 0,
        rotate: 0,
        skewX: 0,
        duration: 1.2,
        stagger: 0.06,
        ease: "expo.out",
      }, 0.2);

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

      /* ── SCROLL STORYTELLING (desktop) ── */
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

        scrollTl.to(content, {
          y: -170,
          opacity: 0,
          filter: "blur(12px)",
          ease: "none",
        }, 0);

        if (stats) {
          scrollTl.to(stats, { y: -80, opacity: 0, ease: "none" }, 0.06);
        }

        if (scrollCue) {
          scrollTl.to(scrollCue, { opacity: 0, y: -20, ease: "none" }, 0);
        }

        scrollTl.to(imageParallax, {
          y: 70,
          ease: "none",
        }, 0);

        return () => {
          scrollTl.scrollTrigger?.kill();
          scrollTl.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const mobileMedia = root.querySelector<HTMLElement>(".hero-mobile-media");
        if (!mobileMedia) return;
        gsap.to(mobileMedia, {
          y: 55,
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
    <section
      ref={rootRef}
      id="home"
      aria-label="Introduction"
      className="relative w-full bg-[#080808]"
    >
      {/* Film grain */}
      <div
        ref={grainRef}
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 mix-blend-overlay"
        style={{ backgroundImage: GRAIN_BG, backgroundRepeat: "repeat", backgroundSize: "180px" }}
        aria-hidden
      />

      <div ref={pinRef} className="relative z-10 min-h-screen w-full">
        <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col lg:flex-row">

          {/* ── LEFT: Copy ── */}
          <div
            ref={contentRef}
            className="relative z-20 flex w-full flex-col justify-center
                       px-6 pb-8 pt-28
                       sm:px-8
                       lg:w-[50%] lg:px-16 lg:pb-44 lg:pt-[128px]
                       xl:px-24"
          >
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <span
                ref={accentLineRef}
                className="inline-block h-px w-8 flex-shrink-0 bg-[#c8ff00]"
                style={{ transformOrigin: "left center" }}
                aria-hidden
              />
              <p className="text-[9px] font-bold uppercase tracking-[0.36em] text-[#444]">
                Strategy.{" "}
                <span className="text-[#c8ff00]">Transformation.</span>
              </p>
            </div>

            {/* HEADLINE — scaled down per spec */}
            <h1
              className="font-black uppercase italic leading-[0.93] tracking-[-0.02em]
                         text-[clamp(2.2rem,4.5vw,3.8rem)]"
              style={{ overflow: "visible" }}
            >
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="block" style={{ overflow: "visible" }}>
                  {line.words.map((w, wi) => (
                    <MaskedWord
                      key={`${i}-${wi}-${w.text}`}
                      text={w.text}
                      accent={w.accent}
                    />
                  ))}
                </span>
              ))}
            </h1>

            {/* Sub-headline */}
            <p
              data-hero-fade
              className="mt-9 max-w-[22rem] text-[0.92rem] font-semibold leading-relaxed
                         tracking-wide text-[#c2c2c2]"
            >
              Science-backed coaching for serious transformations.
            </p>

            {/* Body copy */}
            <p
              data-hero-fade
              className="mt-4 max-w-[22rem] text-[0.88rem] leading-[1.95] text-[#555]
                         lg:max-w-[24rem] lg:text-[0.9rem]"
            >
              Pakistan&apos;s{" "}
              <span className="font-semibold text-[#c8ff00]">
                most trusted online fitness coach
              </span>{" "}
              — 500+ transformations across Pakistan, UAE, and the UK. Elite
              programming built for real life, so you{" "}
              <span className="font-semibold text-[#c8ff00]">keep your results</span>.
            </p>

            {/* CTAs */}
            <div data-hero-fade className="mt-10 flex items-center gap-6">
              <Link
                href="#plans"
                className="group inline-flex items-center gap-3
                           bg-[#c8ff00] px-7 py-[0.85rem]
                           text-[10px] font-black uppercase tracking-[0.18em] text-black
                           transition-all duration-300
                           hover:bg-white hover:shadow-[0_0_60px_rgba(200,255,0,0.18)]"
              >
                Start Your Transformation
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
              <Link
                href="#results"
                className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3a3a3a]
                           transition-colors duration-200 hover:text-[#c8ff00]"
              >
                See Results
              </Link>
            </div>

            {/* Scroll indicator */}
            <div
              ref={scrollCueRef}
              className="mt-14 hidden items-center gap-3 opacity-0 lg:flex"
              aria-hidden
            >
              <div
                className="flex h-9 w-5 items-start justify-center rounded-full
                           border border-white/10 p-1.5"
              >
                <div className="h-1.5 w-[1.5px] rounded-full bg-[#c8ff00]" />
              </div>
              <span className="text-[8.5px] font-bold uppercase tracking-[0.3em] text-[#2e2e2e]">
                Scroll
              </span>
            </div>
          </div>

          {/* ── RIGHT: Image (50%) ── */}
          <div
            ref={imageColRef}
            className="relative hidden lg:block lg:h-screen lg:w-[50%] lg:shrink-0"
          >
            {/* Organic feathered mask */}
            <div
              ref={imageClipRef}
              className="absolute inset-0"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 88% 98% at 62% 42%, #000 32%, transparent 70%)",
                maskImage:
                  "radial-gradient(ellipse 88% 98% at 62% 42%, #000 32%, transparent 70%)",
              }}
            >
              <div
                ref={imageParallaxRef}
                className="absolute will-change-transform"
                style={{ inset: "-10% 0 0 0" }}
              >
                <Image
                  src="/arbaz1.png"
                  alt="Arbaz Arif — elite online fitness coach"
                  fill
                  priority
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-700 ${imgReady ? "opacity-100" : "opacity-0"
                    }`}
                  style={{ objectPosition: "50% 12%" }}
                  onLoad={() => setImgReady(true)}
                />
              </div>
            </div>

            {/* Left vignette */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(100deg, rgba(8,8,8,1) 0%, rgba(8,8,8,0.65) 20%, rgba(8,8,8,0.1) 48%, transparent 65%)",
              }}
              aria-hidden
            />

            {/* Top vignette */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, transparent 100%)",
              }}
              aria-hidden
            />

            {/* Bottom vignette */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-52"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 45%, transparent 100%)",
              }}
              aria-hidden
            />

            {/* Accent glow */}
            <div
              className="pointer-events-none absolute inset-0 z-[5]"
              style={{
                background:
                  "radial-gradient(ellipse 35% 30% at 68% 55%, rgba(200,255,0,0.05) 0%, transparent 70%)",
              }}
              aria-hidden
            />
          </div>
        </div>

        {/* ── STATS PANEL — desktop ── */}
        <div
          ref={statsRef}
          className="absolute bottom-8 z-30 hidden lg:flex"
          style={{ left: "clamp(2rem, 4vw, 6rem)" }}
          role="group"
          aria-label="Coach credentials"
        >
          <div
            className="flex items-stretch overflow-hidden rounded-2xl
                       border border-white/[0.07]
                       bg-[rgba(8,8,8,0.8)]
                       shadow-[0_16px_64px_rgba(0,0,0,0.7)]
                       backdrop-blur-2xl"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex min-w-[122px] flex-col justify-center gap-[7px] px-6 py-5 ${i < STATS.length - 1 ? "border-r border-white/[0.06]" : ""
                  }`}
              >
                <span className="text-[#c8ff00]/55">
                  <stat.Icon />
                </span>
                <p className="text-[1.1rem] font-black leading-none tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#383838]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: image ── */}
      <div
        className="hero-mobile-media relative z-0 w-full overflow-hidden lg:hidden
                   h-[68vw] min-h-[280px] max-h-[420px]"
      >
        <Image
          src="/arbaz1.png"
          alt="Arbaz Arif — elite online fitness coach"
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${imgReady ? "opacity-100" : "opacity-0"
            }`}
          style={{ objectPosition: "50% 8%" }}
          onLoad={() => setImgReady(true)}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.15) 60%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* ── MOBILE: stats ── */}
      <div
        ref={statsMobileRef}
        className="relative z-20 mx-5 mb-14 mt-5 overflow-hidden rounded-2xl
                   border border-white/[0.07]
                   bg-[rgba(8,8,8,0.88)]
                   shadow-[0_16px_64px_rgba(0,0,0,0.6)]
                   backdrop-blur-2xl
                   lg:hidden"
      >
        <ul className="grid grid-cols-2">
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`flex flex-col gap-2 p-5
                ${i % 2 === 0 ? "border-r border-white/[0.06]" : ""}
                ${i < 2 ? "border-b border-white/[0.06]" : ""}`}
            >
              <span className="text-[#c8ff00]/55">
                <stat.Icon />
              </span>
              <p className="text-[1rem] font-black tracking-tight text-white">{stat.value}</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#383838]">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}