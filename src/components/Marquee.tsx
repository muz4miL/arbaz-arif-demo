import { marqueeItems } from "@/data/content";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {items.map((label, i) => (
          <span key={`${label}-${i}`} className="marquee-item">
            {label} <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
