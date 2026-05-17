export function MethodIcon({ type }: { type: string }) {
  switch (type) {
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="method-icon">
          {/* Outer ring with accent progress arc */}
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M12 3a9 9 0 0 1 7.75 4.5" stroke="#c8ff00" strokeWidth="1.8" strokeLinecap="round" />

          {/* Center dot */}
          <circle cx="12" cy="12" r="1.2" fill="#c8ff00" />

          {/* Hour hand */}
          <path d="M12 12V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

          {/* Minute hand with accent tip */}
          <path d="M12 12l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="15.5" cy="14" r="0.8" fill="#c8ff00" />

          {/* Subtle tick marks */}
          {[0, 3, 6, 9].map((i) => (
            <path key={i} d={`M12 3v2`} stroke="currentColor" strokeWidth="1" opacity="0.4"
              transform={`rotate(${i * 90} 12 12)`} strokeLinecap="round" />
          ))}
        </svg>
      );

    case "users":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="method-icon">
          {/* Primary user - accent glow */}
          <circle cx="9" cy="7" r="3.2" stroke="#c8ff00" strokeWidth="1.6" />
          <path d="M5 20v-1.5a4.5 4.5 0 0 1 4.5-4.5h-1A4.5 4.5 0 0 0 4 18.5V20"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

          {/* Secondary user - subtle */}
          <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
          <path d="M14.5 20v-1a3.8 3.8 0 0 1 3.8-3.8"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />

          {/* Connection line - community */}
          <path d="M11 8.5c1.2-.8 2.8-1.2 4.2-1" stroke="#c8ff00" strokeWidth="1"
            strokeDasharray="2 2" opacity="0.6" strokeLinecap="round" />

          {/* Accent sparkle */}
          <path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5L19 5z" fill="#c8ff00" opacity="0.9" />
        </svg>
      );

    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="method-icon">
          {/* Shield outline with premium bevel suggestion */}
          <path d="M12 2L4 5.5v6.8c0 4.2 2.8 8 8 9.7 5.2-1.7 8-5.5 8-9.7V5.5L12 2z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.95" />

          {/* Inner highlight */}
          <path d="M12 4.5L6 7.2v5.1c0 3.2 2.1 6.2 6 7.5 3.9-1.3 6-4.3 6-7.5V7.2L12 4.5z"
            stroke="currentColor" strokeWidth="0.8" opacity="0.2" />

          {/* Checkmark badge - accent */}
          <path d="M8.5 12.5l2.2 2.2 4.8-4.8" stroke="#c8ff00" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />

          {/* Subtle glow effect suggestion */}
          <ellipse cx="12" cy="13" rx="5" ry="3" fill="#c8ff00" opacity="0.08" />
        </svg>
      );

    case "layers": // default
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="method-icon">
          {/* Bottom layer */}
          <path d="M12 20L3 15.5V8.5L12 13l9-4.5v7L12 20z"
            stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" opacity="0.6" />

          {/* Middle layer */}
          <path d="M12 16L4 12V7l8 4 8-4v5l-8 4z"
            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" opacity="0.85" />

          {/* Top layer - accent highlight */}
          <path d="M12 12L5 8.5 12 5l7 3.5L12 12z"
            stroke="#c8ff00" strokeWidth="1.7" strokeLinejoin="round" fill="rgba(200,255,0,0.04)" />

          {/* Accent connector dots */}
          <circle cx="12" cy="5" r="1" fill="#c8ff00" />
          <circle cx="5" cy="8.5" r="0.7" fill="currentColor" opacity="0.5" />
          <circle cx="19" cy="8.5" r="0.7" fill="currentColor" opacity="0.5" />

          {/* Floating accent particle */}
          <circle cx="16" cy="3" r="1.2" fill="#c8ff00" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className="method-icon">
          {/* Elegant default: star-badge */}
          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z"
            stroke="#c8ff00" strokeWidth="1.4" strokeLinejoin="round" fill="rgba(200,255,0,0.06)" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
          <path d="M12 7v3l2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}