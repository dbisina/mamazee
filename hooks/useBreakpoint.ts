"use client";

import { useEffect, useState } from "react";

// foldable      ≤375px  — cover/outer screen of folded phones (Z Fold, Z Flip, Pixel Fold)
// mobile        ≤480px  — standard small phones
// phablet       ≤768px  — large phones / small phablets
// foldable-open ≤932px  — unfolded inner screen (Z Fold 6 ~832px, OnePlus Open ~932px)
// tablet        ≤1024px — standard tablets
// desktop       >1024px
type Breakpoint = "foldable" | "mobile" | "phablet" | "foldable-open" | "tablet" | "desktop";

function getBreakpoint(w: number): Breakpoint {
  if (w <= 375) return "foldable";
  if (w <= 480) return "mobile";
  if (w <= 768) return "phablet";
  if (w <= 932) return "foldable-open";
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
  return bp === "foldable" || bp === "mobile" || bp === "phablet";
}
