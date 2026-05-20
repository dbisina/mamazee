"use client";

import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "phablet" | "tablet" | "desktop";

function getBreakpoint(w: number): Breakpoint {
  if (w <= 480) return "mobile";
  if (w <= 768) return "phablet";
  if (w <= 1024) return "tablet";
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => setBp(getBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

export function useIsMobile(): boolean {
  const bp = useBreakpoint();
  return bp === "mobile" || bp === "phablet";
}
