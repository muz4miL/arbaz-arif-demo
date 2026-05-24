"use client";

import { useState } from "react";
import { ResultsMarquee } from "./ResultsMarquee";
import { MoreResultsGallery } from "./MoreResultsGallery";

export function ResultsSection() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="results-section"
    >
      <div className="container results-section__header">
        <div className="results-section__header-row">
          <div>
            <p className="section-tag results-section__tag" data-gsap-fade>Client Results</p>
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
            <button
              type="button"
              className="btn-primary"
              onClick={() => setGalleryOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={galleryOpen}
            >
              <span>See More Results</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ResultsMarquee />
      <MoreResultsGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </section>
  );
}
