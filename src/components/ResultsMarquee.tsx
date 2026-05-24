"use client";

import { useCallback, useState } from "react";
import { resultsMarqueeItems, type ResultsMarqueeItem } from "@/data/content";
import { VoiceNoteCard } from "./VoiceNotePlayer";

type StatMarqueeItem = Extract<ResultsMarqueeItem, { type: "stat" }>;
type QuoteMarqueeItem = Extract<ResultsMarqueeItem, { type: "quote" }>;

function StatCard({ item }: { item: StatMarqueeItem }) {
  return (
    <div className="results-card results-card--stat plan-card-new">
      <p className="results-card__stat-value">{item.value}</p>
      <p className="results-card__stat-label">{item.label}</p>
      <div className="results-card__footer result-client-row">
        <div>
          <p className="results-card__name">{item.name}</p>
          <p className="results-card__plan">{item.plan}</p>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ item }: { item: QuoteMarqueeItem }) {
  return (
    <div className="results-card results-card--quote plan-card-new">
      <div className="results-card__quote-mark" aria-hidden>&ldquo;</div>
      <blockquote className="results-card__quote-text">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="results-card__footer result-client-row">
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

function MarqueeCard({
  item,
  onVoicePlayingChange,
}: {
  item: ResultsMarqueeItem;
  onVoicePlayingChange: (playing: boolean) => void;
}) {
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
          onPlayingChange={onVoicePlayingChange}
        />
      );
  }
}

export function ResultsMarquee() {
  const items = [...resultsMarqueeItems, ...resultsMarqueeItems];
  const [marqueePaused, setMarqueePaused] = useState(false);

  const handleVoicePlayingChange = useCallback((playing: boolean) => {
    setMarqueePaused(playing);
  }, []);

  return (
    <div className="results-marquee-wrap">
      <div className="results-marquee-fade results-marquee-fade--left" aria-hidden />
      <div className="results-marquee-fade results-marquee-fade--right" aria-hidden />

      <div
        className={`animate-marquee-scroll results-marquee-track${marqueePaused ? " is-paused" : ""}`}
        aria-live="off"
      >
        {items.map((item, i) => (
          <MarqueeCard
            key={`${item.type}-${item.name}-${i}`}
            item={item}
            onVoicePlayingChange={handleVoicePlayingChange}
          />
        ))}
      </div>
    </div>
  );
}
