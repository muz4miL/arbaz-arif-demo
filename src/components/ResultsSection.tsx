import Link from "next/link";
import { clientAvatars, resultsMarqueeItems, type ResultsMarqueeItem } from "@/data/content";
import { whatsappUrl } from "@/config/site";
import { ResultAvatar } from "./ResultAvatar";
import { VoiceNoteCard } from "./VoiceNotePlayer";

function ClientAvatar({ name }: { name: string }) {
  const client = clientAvatars[name];
  if (!client) return null;
  return (
    <ResultAvatar
      src={client.image}
      alt={`${name} — client transformation`}
      initials={client.initials}
    />
  );
}

function StatCard({ item }: Extract<ResultsMarqueeItem, { type: "stat" }>) {
  return (
    <div
      className="results-card results-card--stat plan-card-new"
    >
      <p className="results-card__stat-value">{item.value}</p>
      <p className="results-card__stat-label">{item.label}</p>
      <div className="results-card__footer result-client-row">
        <ClientAvatar name={item.name} />
        <div>
          <p className="results-card__name">{item.name}</p>
          <p className="results-card__plan">{item.plan}</p>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ item }: Extract<ResultsMarqueeItem, { type: "quote" }>) {
  return (
    <div className="results-card results-card--quote plan-card-new">
      <div className="results-card__quote-mark" aria-hidden>&ldquo;</div>
      <blockquote className="results-card__quote-text">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="results-card__footer result-client-row">
        <ClientAvatar name={item.name} />
        <div>
          <p className="results-card__name">{item.name}</p>
          <p className="results-card__meta">
            <span>{item.location}</span>
            <span aria-hidden> · </span>
            <span className="results-card__plan">{item.plan}</span>
          </p>
        </div>
        <span className="results-card__verified" title="Verified client">
          Verified
        </span>
      </div>
    </div>
  );
}

function MarqueeCard({ item }: { item: ResultsMarqueeItem }) {
  switch (item.type) {
    case "stat":
      return <StatCard item={item} />;
    case "quote":
      return <QuoteCard item={item} />;
    case "voice":
      return (
        <VoiceNoteCard
          name={item.name}
          plan={item.plan}
          location={item.location}
          duration={item.duration}
          transcript={item.transcript}
          audioSrc={item.audioSrc}
        />
      );
  }
}

export function ResultsSection() {
  const items = [...resultsMarqueeItems, ...resultsMarqueeItems];

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="results-section"
    >
      <div className="container results-section__header">
        <div className="results-section__header-row">
          <div>
            <p className="section-tag" data-gsap-fade>Client Results</p>
            <h2 className="section-title" id="results-heading" data-gsap-heading>
              <span style={{ display: "block", overflow: "visible" }}>
                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}>
                  <span className="gsap-heading-word" style={{ display: "inline-block" }}>Real</span>
                </span>
              </span>
              <span style={{ display: "block", overflow: "visible" }}>
                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                  <span className="gsap-heading-word outline" style={{ display: "inline-block" }}>Transformations</span>
                </span>
              </span>
            </h2>
            <p className="results-section__sub" data-gsap-fade>
              Real clients. Voice notes, results, and words — straight from WhatsApp.
            </p>
          </div>
          <div data-gsap-fade>
            <Link
              href={whatsappUrl("Hi Arbaz, I want results like these")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Get Your Results</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="results-marquee-wrap">
        <div className="results-marquee-fade results-marquee-fade--left" aria-hidden />
        <div className="results-marquee-fade results-marquee-fade--right" aria-hidden />

        <div className="animate-marquee-scroll results-marquee-track">
          {items.map((item, i) => (
            <MarqueeCard key={`${item.type}-${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
