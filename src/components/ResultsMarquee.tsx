"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
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

function DesktopMarquee({ items, onVoicePlayingChange }: { items: ResultsMarqueeItem[]; onVoicePlayingChange: (playing: boolean) => void }) {
  const doubled = [...items, ...items];
  const [paused, setPaused] = useState(false);

  const handleVoicePlayingChange = useCallback((playing: boolean) => {
    setPaused(playing);
    onVoicePlayingChange(playing);
  }, [onVoicePlayingChange]);

  return (
    <div className="results-marquee-wrap hidden lg:block">
      <div className="results-marquee-fade results-marquee-fade--left" aria-hidden />
      <div className="results-marquee-fade results-marquee-fade--right" aria-hidden />

      <div
        className={`animate-marquee-scroll results-marquee-track${paused ? " is-paused" : ""}`}
        aria-live="off"
      >
        {doubled.map((item, i) => (
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

function MobileCarousel({ items, onVoicePlayingChange }: { items: ResultsMarqueeItem[]; onVoicePlayingChange: (playing: boolean) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const handleVoicePlayingChange = useCallback((playing: boolean) => {
    setPaused(playing);
    onVoicePlayingChange(playing);
  }, [onVoicePlayingChange]);

  return (
    <div className="lg:hidden">
      <div className="results-carousel overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, i) => (
            <div key={`${item.type}-${item.name}-${i}`} className="flex-[0_0_85%] min-w-0 px-2">
              <MarqueeCard
                item={item}
                onVoicePlayingChange={handleVoicePlayingChange}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-5 bg-[#c8ff00]"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ResultsMarquee() {
  const items = resultsMarqueeItems;
  const [marqueePaused, setMarqueePaused] = useState(false);

  const handleVoicePlayingChange = useCallback((playing: boolean) => {
    setMarqueePaused(playing);
  }, []);

  return (
    <>
      <DesktopMarquee items={items} onVoicePlayingChange={handleVoicePlayingChange} />
      <MobileCarousel items={items} onVoicePlayingChange={handleVoicePlayingChange} />
    </>
  );
}
