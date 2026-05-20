"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/data/content";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ── Step icons — full SVG illustrations ── */
function IconConsult() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100" height="100" aria-hidden>
      <rect x="34" y="46" width="100" height="132" rx="7" fill="#e0e0e0" opacity="0.5" />
      <rect x="28" y="40" width="100" height="132" rx="7" fill="white" stroke="#F15A29" strokeWidth="5" />
      <rect x="62" y="30" width="32" height="22" rx="6" fill="#29ABE2" stroke="#0082C8" strokeWidth="2" />
      <rect x="70" y="35" width="16" height="10" rx="3" fill="white" opacity="0.35" />
      <rect x="44" y="66" width="9" height="9" rx="2" fill="#29ABE2" />
      <rect x="58" y="68" width="38" height="4" rx="2" fill="#1565C0" />
      <rect x="58" y="73" width="28" height="3" rx="2" fill="#90CAF9" />
      <rect x="44" y="84" width="9" height="9" rx="2" fill="#29ABE2" />
      <rect x="58" y="86" width="34" height="4" rx="2" fill="#1565C0" />
      <rect x="58" y="91" width="24" height="3" rx="2" fill="#90CAF9" />
      <rect x="44" y="102" width="9" height="9" rx="2" fill="#29ABE2" />
      <rect x="58" y="104" width="30" height="4" rx="2" fill="#1565C0" />
      <rect x="58" y="109" width="20" height="3" rx="2" fill="#90CAF9" />
      <rect x="44" y="120" width="9" height="9" rx="2" fill="#29ABE2" />
      <rect x="58" y="122" width="36" height="4" rx="2" fill="#1565C0" />
      <rect x="58" y="127" width="22" height="3" rx="2" fill="#90CAF9" />
      <line x1="100" y1="148" x2="72" y2="178" stroke="#0090E0" strokeWidth="13" strokeLinecap="round" />
      <line x1="100" y1="148" x2="72" y2="178" stroke="#29C5F6" strokeWidth="7" strokeLinecap="round" />
      <circle cx="132" cy="108" r="46" fill="#8A90B8" opacity="0.4" />
      <circle cx="130" cy="106" r="46" fill="#9DA3CC" />
      <circle cx="130" cy="106" r="40" fill="#BCC4E8" />
      <circle cx="130" cy="106" r="34" fill="#E8F4FB" />
      <ellipse cx="118" cy="94" rx="9" ry="5" fill="white" opacity="0.55" transform="rotate(-35 118 94)" />
      <polyline points="112,108 124,122 152,90" fill="none" stroke="#6DC060" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBlueprint() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 220" width="120" height="95" aria-hidden>
      <defs>
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#1A4B8C", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0D2F5E", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="scrollLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#0A2040", stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: "#163D78", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1A4B8C", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="scrollRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#1A4B8C", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#163D78", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#0A2040", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="rollGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#0A2040" }} />
          <stop offset="50%" style={{ stopColor: "#1A5A9A" }} />
          <stop offset="100%" style={{ stopColor: "#0A2040" }} />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="3" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      <ellipse cx="24" cy="110" rx="14" ry="84" fill="url(#scrollLeft)" filter="url(#shadow)" />
      <ellipse cx="30" cy="110" rx="9" ry="80" fill="#163D78" />
      <ellipse cx="33" cy="110" rx="5" ry="76" fill="#1E5299" opacity="0.7" />

      <ellipse cx="256" cy="110" rx="14" ry="84" fill="url(#scrollRight)" filter="url(#shadow)" />
      <ellipse cx="250" cy="110" rx="9" ry="80" fill="#163D78" />
      <ellipse cx="247" cy="110" rx="5" ry="76" fill="#1E5299" opacity="0.7" />

      <rect x="30" y="26" width="220" height="168" rx="3" fill="url(#paperGrad)" filter="url(#shadow)" />

      <rect x="30" y="26" width="220" height="10" rx="3" fill="url(#rollGrad)" opacity="0.6" />
      <rect x="30" y="184" width="220" height="10" rx="3" fill="url(#rollGrad)" opacity="0.6" />

      <g stroke="#3A6FAA" strokeWidth="0.4" opacity="0.5">
        <line x1="50" y1="36" x2="50" y2="184" />
        <line x1="70" y1="36" x2="70" y2="184" />
        <line x1="90" y1="36" x2="90" y2="184" />
        <line x1="110" y1="36" x2="110" y2="184" />
        <line x1="130" y1="36" x2="130" y2="184" />
        <line x1="150" y1="36" x2="150" y2="184" />
        <line x1="170" y1="36" x2="170" y2="184" />
        <line x1="190" y1="36" x2="190" y2="184" />
        <line x1="210" y1="36" x2="210" y2="184" />
        <line x1="230" y1="36" x2="230" y2="184" />
        <line x1="30" y1="52" x2="250" y2="52" />
        <line x1="30" y1="68" x2="250" y2="68" />
        <line x1="30" y1="84" x2="250" y2="84" />
        <line x1="30" y1="100" x2="250" y2="100" />
        <line x1="30" y1="116" x2="250" y2="116" />
        <line x1="30" y1="132" x2="250" y2="132" />
        <line x1="30" y1="148" x2="250" y2="148" />
        <line x1="30" y1="164" x2="250" y2="164" />
      </g>

      <g transform="translate(45, 42)">
        <rect x="0" y="8" width="24" height="6" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="2" y="6" width="4" height="10" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="18" y="6" width="4" height="10" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="0" y="7" width="3" height="8" fill="white" opacity="0.8" />
        <rect x="21" y="7" width="3" height="8" fill="white" opacity="0.8" />
      </g>

      <g transform="translate(210, 40)">
        <line x1="0" y1="10" x2="40" y2="10" stroke="white" strokeWidth="1.5" />
        <rect x="0" y="4" width="5" height="12" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="35" y="4" width="5" height="12" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="-2" y="5" width="3" height="10" fill="white" opacity="0.8" />
        <rect x="39" y="5" width="3" height="10" fill="white" opacity="0.8" />
      </g>

      <g transform="translate(115, 38)">
        <circle cx="12" cy="6" r="5" fill="none" stroke="white" strokeWidth="1.2" />
        <rect x="6" y="12" width="12" height="16" rx="2" fill="none" stroke="white" strokeWidth="1.2" />
        <line x1="6" y1="14" x2="0" y2="20" stroke="white" strokeWidth="1.2" />
        <line x1="18" y1="14" x2="24" y2="20" stroke="white" strokeWidth="1.2" />
        <line x1="8" y1="28" x2="4" y2="38" stroke="white" strokeWidth="1.2" />
        <line x1="16" y1="28" x2="20" y2="38" stroke="white" strokeWidth="1.2" />
      </g>

      <g transform="translate(95, 82)">
        <polyline points="0,8 8,8 12,2 16,14 20,6 24,10 30,8 38,8"
          fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="42" y="10" fontFamily="monospace" fontSize="5" fill="#FF6B6B" fontWeight="bold">BPM</text>
      </g>

      <g transform="translate(45, 95)">
        <rect x="0" y="0" width="80" height="50" fill="none" stroke="#7EC8E3" strokeWidth="0.8" />
        <line x1="0" y1="8" x2="80" y2="8" stroke="#7EC8E3" strokeWidth="0.8" />
        <text x="10" y="6" fontFamily="monospace" fontSize="4" fill="#A8D4F5">MON</text>
        <text x="26" y="6" fontFamily="monospace" fontSize="4" fill="#A8D4F5">WED</text>
        <text x="42" y="6" fontFamily="monospace" fontSize="4" fill="#A8D4F5">FRI</text>
        <text x="58" y="6" fontFamily="monospace" fontSize="4" fill="#A8D4F5">SUN</text>
        <text x="10" y="18" fontFamily="monospace" fontSize="6" fill="#4ECDC4">✓</text>
        <text x="26" y="18" fontFamily="monospace" fontSize="6" fill="#4ECDC4">✓</text>
        <text x="42" y="18" fontFamily="monospace" fontSize="6" fill="#4ECDC4">✓</text>
        <text x="58" y="18" fontFamily="monospace" fontSize="6" fill="#7EC8E3">○</text>
        <text x="4" y="28" fontFamily="monospace" fontSize="4" fill="#A8D4F5">UPPER</text>
        <text x="4" y="38" fontFamily="monospace" fontSize="4" fill="#A8D4F5">LOWER</text>
        <text x="4" y="48" fontFamily="monospace" fontSize="4" fill="#A8D4F5">CARDIO</text>
      </g>

      <g transform="translate(185, 95)">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#7EC8E3" strokeWidth="1" />
        <line x1="20" y1="2" x2="20" y2="38" stroke="#7EC8E3" strokeWidth="0.8" />
        <line x1="2" y1="20" x2="38" y2="20" stroke="#7EC8E3" strokeWidth="0.8" />
        <path d="M20,20 L32,8" stroke="#7EC8E3" strokeWidth="0.8" />
        <text x="20" y="12" fontFamily="monospace" fontSize="3.5" fill="#A8D4F5" textAnchor="middle">PRO</text>
        <text x="10" y="28" fontFamily="monospace" fontSize="3.5" fill="#A8D4F5" textAnchor="middle">CARB</text>
        <text x="30" y="28" fontFamily="monospace" fontSize="3.5" fill="#A8D4F5" textAnchor="middle">VEG</text>
      </g>

      <g transform="translate(45, 152)">
        <rect x="0" y="0" width="50" height="28" fill="none" stroke="#7EC8E3" strokeWidth="0.8" />
        <rect x="4" y="18" width="6" height="8" fill="#4ECDC4" opacity="0.8" />
        <rect x="13" y="14" width="6" height="12" fill="#4ECDC4" opacity="0.8" />
        <rect x="22" y="10" width="6" height="16" fill="#4ECDC4" opacity="0.8" />
        <rect x="31" y="6" width="6" height="20" fill="#4ECDC4" opacity="0.8" />
        <rect x="40" y="3" width="6" height="23" fill="#FFD700" opacity="0.9" />
        <line x1="0" y1="4" x2="50" y2="4" stroke="#FFD700" strokeWidth="0.5" strokeDasharray="2,1" />
      </g>

      <g transform="translate(165, 152)">
        <rect x="0" y="0" width="60" height="28" fill="none" stroke="#7EC8E3" strokeWidth="0.8" />
        <text x="4" y="6" fontFamily="monospace" fontSize="4" fill="#A8D4F5">WEIGHT</text>
        <text x="4" y="14" fontFamily="monospace" fontSize="5" fill="#FFD700" fontWeight="bold">75.5 KG</text>
        <text x="4" y="22" fontFamily="monospace" fontSize="4" fill="#A8D4F5">BODY FAT</text>
        <text x="42" y="14" fontFamily="monospace" fontSize="5" fill="#4ECDC4" fontWeight="bold">12%</text>
        <text x="42" y="22" fontFamily="monospace" fontSize="4" fill="#A8D4F5">↓2%</text>
      </g>

      <g transform="translate(105, 120)">
        <polygon points="0,0 8,-4 8,4" fill="#4ECDC4" opacity="0.8" />
        <line x1="8" y1="0" x2="20" y2="0" stroke="#4ECDC4" strokeWidth="1" />
        <polygon points="20,0 28,-4 28,4" fill="#4ECDC4" opacity="0.8" />
      </g>

      <rect x="50" y="177" width="170" height="12" rx="0" fill="none" stroke="#7EC8E3" strokeWidth="0.8" />
      <line x1="100" y1="177" x2="100" y2="189" stroke="#7EC8E3" strokeWidth="0.8" />
      <line x1="170" y1="177" x2="170" y2="189" stroke="#7EC8E3" strokeWidth="0.8" />
      <text x="75" y="185" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#A8D4F5">TRAINING</text>
      <text x="135" y="185" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#A8D4F5">12 WEEKS</text>
      <text x="198" y="185" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#A8D4F5">V2.0</text>

      <rect x="30" y="26" width="80" height="168" rx="3" fill="white" opacity="0.03" />
    </svg>
  );
}

function IconExecute() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" width="110" height="70" aria-hidden>
      <g transform="rotate(-20, 70, 80)">
        <ellipse cx="70" cy="108" rx="26" ry="10" fill="#1565C0" />
        <ellipse cx="70" cy="104" rx="26" ry="10" fill="#1E88E5" />
        <ellipse cx="70" cy="101" rx="26" ry="9" fill="#42A5F5" />
        <ellipse cx="70" cy="92" rx="18" ry="7" fill="#1976D2" />
        <ellipse cx="70" cy="89" rx="18" ry="7" fill="#2196F3" />
        <rect x="63" y="46" width="14" height="44" rx="4" fill="#E0E0E0" />
        <rect x="65" y="46" width="6" height="44" rx="2" fill="white" opacity="0.5" />
        <ellipse cx="70" cy="50" rx="18" ry="7" fill="#1976D2" />
        <ellipse cx="70" cy="47" rx="18" ry="7" fill="#2196F3" />
        <ellipse cx="70" cy="40" rx="26" ry="10" fill="#1565C0" />
        <ellipse cx="70" cy="37" rx="26" ry="10" fill="#1E88E5" />
        <ellipse cx="70" cy="34" rx="26" ry="9" fill="#42A5F5" />
        <ellipse cx="64" cy="33" rx="8" ry="3" fill="white" opacity="0.25" />
      </g>
      <g transform="rotate(15, 155, 75)">
        <ellipse cx="155" cy="112" rx="28" ry="11" fill="#B71C1C" />
        <ellipse cx="155" cy="108" rx="28" ry="11" fill="#E53935" />
        <ellipse cx="155" cy="104" rx="28" ry="10" fill="#EF5350" />
        <ellipse cx="155" cy="94" rx="18" ry="7" fill="#C62828" />
        <ellipse cx="155" cy="91" rx="18" ry="7" fill="#EF5350" />
        <rect x="148" y="46" width="14" height="46" rx="4" fill="#BDBDBD" />
        <rect x="150" y="46" width="6" height="46" rx="2" fill="white" opacity="0.45" />
        <ellipse cx="155" cy="50" rx="18" ry="7" fill="#C62828" />
        <ellipse cx="155" cy="47" rx="18" ry="7" fill="#EF5350" />
        <ellipse cx="155" cy="40" rx="28" ry="11" fill="#B71C1C" />
        <ellipse cx="155" cy="36" rx="28" ry="11" fill="#E53935" />
        <ellipse cx="155" cy="32" rx="28" ry="10" fill="#EF5350" />
        <ellipse cx="148" cy="31" rx="9" ry="3" fill="white" opacity="0.22" />
      </g>
    </svg>
  );
}

function IconTransform() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 205" width="95" height="100" aria-hidden>

      {/* Achievement star */}
      <circle cx="100" cy="20" r="22" fill="#FFC107" opacity="0.12" />
      <polygon
        points="100,8 103.5,17 113,17 105.5,23 108,32 100,26.5 92,32 94.5,23 87,17 96.5,17"
        fill="#FFC107" stroke="#E65100" strokeWidth="0.8"
      />

      {/* Head */}
      <circle cx="100" cy="50" r="18" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" />
      <path d="M83,45 Q100,30 117,45 Q110,36 100,34 Q90,36 83,45 Z" fill="#3E2723" />
      <line x1="92" y1="50" x2="96" y2="50" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="104" y1="50" x2="108" y2="50" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M93,57 Q100,62 107,57" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />

      {/* Neck */}
      <rect x="94" y="66" width="12" height="13" rx="3" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="2" />

      {/* Torso V-taper */}
      <path d="M68,78 L132,78 L122,132 L78,132 Z"
        fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M100,84 Q88,93 78,84" fill="none" stroke="#1a1a1a" strokeWidth="1.8" opacity="0.45" strokeLinecap="round" />
      <path d="M100,84 Q112,93 122,84" fill="none" stroke="#1a1a1a" strokeWidth="1.8" opacity="0.45" strokeLinecap="round" />
      <line x1="100" y1="82" x2="100" y2="120" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.22" />
      <line x1="90" y1="100" x2="110" y2="100" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.32" />
      <line x1="88" y1="112" x2="112" y2="112" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.32" />

      {/* Left arm - double bicep flex */}
      <path d="M70,83 Q54,72 44,84 Q37,96 49,106 Q60,114 70,107"
        fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M41,80 Q36,90 43,98" fill="none" stroke="#1a1a1a" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" />
      <path d="M44,84 Q46,66 58,60 Q66,56 70,62"
        fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Right arm - mirror */}
      <path d="M130,83 Q146,72 156,84 Q163,96 151,106 Q140,114 130,107"
        fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M159,80 Q164,90 157,98" fill="none" stroke="#1a1a1a" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" />
      <path d="M156,84 Q154,66 142,60 Q134,56 130,62"
        fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Gold shorts */}
      <path d="M78,132 L122,132 L118,162 L82,162 Z"
        fill="#FFC107" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
      <line x1="100" y1="132" x2="100" y2="162" stroke="#1a1a1a" strokeWidth="2" opacity="0.55" />

      {/* Legs */}
      <path d="M82,162 L78,205 L96,205 L100,162 Z"
        fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M118,162 L122,205 L104,205 L100,162 Z"
        fill="#FFCC99" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M86,170 Q83,185 84,198" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.28" strokeLinecap="round" />
      <path d="M114,170 Q117,185 116,198" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.28" strokeLinecap="round" />
    </svg>
  );
}
const STEP_ICON_COMPONENTS = [IconConsult, IconBlueprint, IconExecute, IconTransform];

/* ── Mouse-tracking glow card ── */
function ProcessCard({
  step,
  index,
  cardRef,
}: {
  step: { num: string; title: string; desc: string };
  index: number;
  cardRef: (el: HTMLElement | null) => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.setProperty("--glow-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = innerRef.current;
    if (card) card.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <div
        ref={innerRef}
        className="process-card"
        style={{
          /* CSS custom props for glow */
          ["--glow-x" as string]: "50%",
          ["--glow-y" as string]: "50%",
          ["--glow-opacity" as string]: "0",
        }}
      >
        {/* Mouse-tracking glow */}
        <div className="process-card-glow" aria-hidden />

        {/* Top sliding accent */}
        <div className="process-card-top-line" aria-hidden />

        {/* Icon showcase — prominent, centred, framed */}
        <div className="process-icon-showcase">
          <div className="process-icon-frame">
            {(() => { const IC = STEP_ICON_COMPONENTS[index]; return <IC />; })()}
          </div>
        </div>

        {/* Step badge row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, position: "relative", zIndex: 1 }}>
          <div className="process-step-badge">
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--lime)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="process-badge-dash" />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h3 className="process-card-title">{step.title}</h3>
          <p className="process-card-desc">{step.desc}</p>
        </div>
      </div>
    </article>
  );
}

/* ── Main section ── */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    /* Heading word reveal */
    const words = headingRef.current?.querySelectorAll<HTMLElement>(".proc-word");
    if (words?.length) {
      gsap.fromTo(
        words,
        { y: 90, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", toggleActions: "play none none none" },
        }
      );
    }

    /* Lead text */
    gsap.fromTo(
      ".process-lead",
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      }
    );

    /* Cards — staggered upward fade */
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: cards[0], start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ background: "var(--bg)", padding: "120px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Faint radial bg */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,255,0,0.03) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative" }}>

        {/* ── Header ── */}
        <div ref={headingRef} style={{ marginBottom: 72 }}>
          <span className="section-tag">How It Works</span>

          <h2
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "clamp(3.8rem, 9.5vw, 9rem)",
              lineHeight: 0.88,
              letterSpacing: "0.01em",
              marginTop: 16,
              overflow: "visible",
            }}
          >
            {/* "THE" — full white */}
            <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: 4 }}>
              <span className="proc-word" style={{ display: "block", color: "var(--text)" }}>THE</span>
            </span>
            {" "}
            {/* "PROCESS" — ultra-thin stroke, near-invisible fill */}
            <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: 4 }}>
              <span
                className="proc-word"
                style={{
                  display: "block",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.28)",
                }}
              >
                PROCESS
              </span>
            </span>
          </h2>

          <p className="process-lead section-lead" style={{ marginTop: 24, opacity: 0 }}>
            A science-backed system designed for serious transformations. No guesswork, just results.
          </p>
        </div>

        {/* ── Cards grid with connector line ── */}
        <div style={{ position: "relative" }}>
          {/* Horizontal dashed connector line behind icons */}
          <div className="process-connector" aria-hidden />

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <ProcessCard
                key={step.num}
                step={step}
                index={index}
                cardRef={(el) => { cardsRef.current[index] = el; }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scoped styles — zero global changes */}
      <style>{`
        /* Grid */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* Glass card */
        .process-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 28px 28px 36px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(16px);
          overflow: hidden;
          min-height: 380px;
          cursor: none;
          transition: border-color 0.4s, box-shadow 0.4s;
        }

        .process-card:hover {
          border-color: rgba(200,255,0,0.18);
          box-shadow: 0 0 48px rgba(200,255,0,0.05);
        }

        /* Mouse-tracking radial glow */
        .process-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            280px circle at var(--glow-x) var(--glow-y),
            rgba(200,255,0,0.07),
            transparent 70%
          );
          opacity: var(--glow-opacity);
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: 0;
        }

        /* Top sliding accent line */
        .process-card-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: var(--lime);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
          z-index: 1;
        }

        .process-card:hover .process-card-top-line {
          transform: scaleX(1);
        }

        /* Step badge */
        .process-step-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--bg);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.4s, background 0.4s;
          position: relative;
          z-index: 1;
        }

        .process-card:hover .process-step-badge {
          border-color: rgba(200,255,0,0.3);
          background: rgba(200,255,0,0.06);
        }

        /* Badge dash */
        .process-badge-dash {
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,0.1);
          transition: width 0.4s, background 0.4s;
          position: relative;
          z-index: 1;
        }

        .process-card:hover .process-badge-dash {
          width: 32px;
          background: rgba(200,255,0,0.4);
        }

        /* Icon showcase area */
        .process-icon-showcase {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        .process-icon-frame {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          height: 140px;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.4s, background 0.4s, box-shadow 0.4s;
          position: relative;
          overflow: hidden;
        }

        .process-icon-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 60%, rgba(200,255,0,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .process-card:hover .process-icon-frame {
          border-color: rgba(200,255,0,0.2);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 24px rgba(200,255,0,0.06);
        }

        /* Card title */
        .process-card-title {
          font-family: var(--font-space), sans-serif;
          font-size: clamp(1.1rem, 1.4vw, 1.35rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
          margin-bottom: 14px;
          transition: color 0.35s;
          position: relative;
          z-index: 1;
          line-height: 1.2;
        }

        .process-card:hover .process-card-title {
          color: var(--lime);
        }

        /* Card description */
        .process-card-desc {
          font-size: 13px;
          line-height: 1.8;
          color: var(--text3);
          position: relative;
          z-index: 1;
          margin: 0;
          transition: color 0.35s;
        }

        .process-card:hover .process-card-desc {
          color: rgba(255,255,255,0.45);
        }

        /* Dashed horizontal connector behind icon frames */
        .process-connector {
          position: absolute;
          top: 84px;
          left: calc(12.5% + 10px);
          right: calc(12.5% + 10px);
          height: 1px;
          border-top: 1px dashed rgba(200,255,0,0.1);
          pointer-events: none;
          z-index: 0;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .process-connector { display: none; }
        }
        @media (max-width: 580px) {
          .process-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}