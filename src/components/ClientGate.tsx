"use client";

import { useEffect, useState } from "react";

/**
 * Defers page UI until after mount so extension-injected DOM attrs
 * cannot mismatch SSR output during hydration.
 */
export function ClientGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main
        className="client-gate-placeholder min-h-screen bg-[#080808]"
        aria-hidden
        suppressHydrationWarning
      />
    );
  }

  return <>{children}</>;
}
