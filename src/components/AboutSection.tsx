"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { credentials } from "@/data/content";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

export function AboutSection() {
  const [photoVisible, setPhotoVisible] = useState(false);

  const showPhoto = () => setPhotoVisible(true);

  useEffect(() => {
    const img = document.getElementById("aboutPhoto") as HTMLImageElement | null;
    if (img?.complete && img.naturalWidth > 0) {
      showPhoto();
    }
  }, []);

  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual reveal" id="aboutVisual">
            <div className="about-frame" id="aboutFrame">
              <div
                className={`about-placeholder${photoVisible ? " about-placeholder-hidden" : ""}`}
                aria-hidden={photoVisible}
              >
                <div className="about-mono">AA</div>
                <svg
                  className="about-svg"
                  width="240"
                  height="360"
                  viewBox="0 0 240 360"
                  fill="none"
                  aria-hidden
                >
                  <ellipse
                    cx="120"
                    cy="40"
                    rx="26"
                    ry="28"
                    fill="rgba(200,255,0,.05)"
                    stroke="rgba(200,255,0,.2)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M56 68C56 68 92 60 120 60C148 60 184 68 184 68L192 168C192 168 156 175 120 175C84 175 48 168 48 168Z"
                    fill="rgba(200,255,0,.04)"
                    stroke="rgba(200,255,0,.15)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M56 72l-28 62 8 10 12 24 20-58z"
                    fill="rgba(200,255,0,.03)"
                    stroke="rgba(200,255,0,.1)"
                    strokeWidth="1"
                  />
                  <path
                    d="M184 72l28 62-8 10-12 24-20-58z"
                    fill="rgba(200,255,0,.03)"
                    stroke="rgba(200,255,0,.1)"
                    strokeWidth="1"
                  />
                  <path
                    d="M48 168h144l-12 72H60z"
                    fill="rgba(200,255,0,.03)"
                    stroke="rgba(200,255,0,.1)"
                    strokeWidth="1"
                  />
                  <path
                    d="M60 240l12 80h28l4-80z"
                    fill="rgba(200,255,0,.03)"
                    stroke="rgba(200,255,0,.08)"
                    strokeWidth="1"
                  />
                  <path
                    d="M180 240l-12 80h-28l-4-80z"
                    fill="rgba(200,255,0,.03)"
                    stroke="rgba(200,255,0,.08)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id="aboutPhoto"
                src="/arbaz2.png"
                alt="Arbaz Arif coaching in the gym"
                className={`about-photo${photoVisible ? " about-photo-visible" : ""}`}
                onLoad={showPhoto}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="about-badge">
              <div className="num">10+</div>
              <div className="label">
                Years Elite
                <br />
                Coaching
              </div>
            </div>
            <div className="about-tag">{siteConfig.instagram.handle}</div>
          </div>
          <div className="about-content reveal" id="aboutContent">
            <p className="section-tag">About the Coach</p>
            <h2 className="section-title" id="about-heading">
              The Man Behind
              <br />
              the <span className="outline">Results</span>
            </h2>
            <p className="section-lead" style={{ marginBottom: 28 }}>
              Science-backed coaching for serious transformations.
            </p>
            <p className="about-body">
              Arbaz Arif is Pakistan&apos;s{" "}
              <strong>most trusted online fitness coach</strong>, with 500+{" "}
              transformations across Pakistan, UAE, UK. His approach blends elite
              programming with lifestyle adaptation — so you{" "}
              <strong>keep your results.</strong>
            </p>
            <p className="about-body">
              Certified trainer specializing in metabolic conditioning, body
              recomposition, and sustainable nutrition.
            </p>
            <div className="credentials">
              {credentials.map((item) => (
                <div key={item} className="cred-item">
                  <div className="cred-bullet" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <Link href="#plans" className="btn-primary">
              <span>Explore Plans</span> <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
