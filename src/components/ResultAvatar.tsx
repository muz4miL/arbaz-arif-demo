"use client";

import Image from "next/image";
import { useState } from "react";

export function ResultAvatar({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="result-avatar">
      {!failed && (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          className={loaded ? "loaded" : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      <span className="initials">{initials}</span>
    </div>
  );
}
