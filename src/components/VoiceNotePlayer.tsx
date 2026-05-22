"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ResultAvatar } from "./ResultAvatar";
import { clientAvatars } from "@/data/content";

let activeAudio: HTMLAudioElement | null = null;
let activeOnPlayingChange: ((playing: boolean) => void) | null = null;

function stopActiveAudio(notify = true) {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  if (notify && activeOnPlayingChange) {
    activeOnPlayingChange(false);
    activeOnPlayingChange = null;
  }
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const WAVE_HEIGHTS = [4, 7, 11, 8, 14, 10, 16, 12, 18, 14, 10, 16, 8, 12, 6, 14, 9, 17, 11, 7, 13, 8, 15, 10];

type VoiceNotePlayerProps = {
  name: string;
  plan: string;
  location: string;
  duration: string;
  transcript: string;
  audioSrc: string;
  onPlayingChange?: (playing: boolean) => void;
};

export function VoiceNoteCard({
  name,
  plan,
  location,
  duration: durationFallback,
  transcript,
  audioSrc,
  onPlayingChange,
}: VoiceNotePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationLabel, setDurationLabel] = useState(durationFallback);
  const [expanded, setExpanded] = useState(false);
  const labelId = useId();
  const client = clientAvatars[name];

  const notifyPlaying = useCallback(
    (isPlaying: boolean) => {
      onPlayingChange?.(isPlaying);
    },
    [onPlayingChange],
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      if (activeAudio === audio) {
        activeAudio = null;
        activeOnPlayingChange = null;
      }
      setPlaying(false);
      setProgress(0);
      notifyPlaying(false);
      return;
    }

    stopActiveAudio(false);
    activeAudio = audio;
    activeOnPlayingChange = onPlayingChange ?? null;
    notifyPlaying(true);

    void audio.play().then(() => {
      setPlaying(true);
      setExpanded(true);
    }).catch(() => {
      setPlaying(false);
      setExpanded(true);
      if (activeAudio === audio) {
        activeAudio = null;
        activeOnPlayingChange = null;
      }
      notifyPlaying(false);
    });
  }, [playing, onPlayingChange, notifyPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        setDurationLabel(formatDuration(audio.duration));
      }
    };
    const onTime = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      if (activeAudio === audio) {
        activeAudio = null;
        activeOnPlayingChange = null;
      }
      notifyPlaying(false);
    };
    const onError = () => {
      setPlaying(false);
      if (activeAudio === audio) {
        activeAudio = null;
        activeOnPlayingChange = null;
      }
      notifyPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
      if (activeAudio === audio) stopActiveAudio();
    };
  }, [notifyPlaying]);

  return (
    <article
      className={`voice-note-card plan-card-new${playing ? " is-voice-active" : ""}`}
      aria-labelledby={labelId}
    >
      <audio ref={audioRef} preload="metadata" src={audioSrc} />

      <div className="voice-note-card__top">
        <span className="voice-note-card__badge">
          <span className="voice-note-card__badge-dot" aria-hidden />
          Client voice note
        </span>
        <span className="voice-note-card__duration">{durationLabel}</span>
      </div>

      <div className="voice-note-card__player">
        <button
          type="button"
          className={`voice-note-card__play ${playing ? "is-playing" : ""}`}
          onClick={togglePlay}
          aria-label={playing ? `Pause voice note from ${name}` : `Play voice note from ${name}`}
          aria-pressed={playing}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="voice-note-card__wave" aria-hidden>
          {WAVE_HEIGHTS.map((h, i) => {
            const lit = progress > 0 && i / WAVE_HEIGHTS.length <= progress;
            return (
              <span
                key={i}
                className={`voice-note-card__bar ${playing ? "is-animated" : ""} ${lit ? "is-lit" : ""}`}
                style={{ height: h }}
              />
            );
          })}
        </div>

        <span className="voice-note-card__wa-icon" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
      </div>

      <p
        id={labelId}
        className={`voice-note-card__transcript ${expanded ? "is-expanded" : ""}`}
      >
        &ldquo;{transcript}&rdquo;
      </p>
      {!expanded && (
        <button
          type="button"
          className="voice-note-card__read-more"
          onClick={() => setExpanded(true)}
        >
          Read full message
        </button>
      )}

      <div className="voice-note-card__footer result-client-row">
        {client && (
          <ResultAvatar src={client.image} alt={name} initials={client.initials} />
        )}
        <div>
          <p className="voice-note-card__name">{name}</p>
          <p className="voice-note-card__meta">
            <span>{location}</span>
            <span aria-hidden> · </span>
            <span>{plan}</span>
          </p>
        </div>
        <span className="voice-note-card__verified" title="Verified client">
          Verified
        </span>
      </div>
    </article>
  );
}
