"use client";

import { useEffect, useRef } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Image from "next/image";
import Link from "next/link";

const HERO_WORDS = ["Taste", "of", "Home."];

export default function Hero() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile" || bp === "phablet";
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { animate, stagger } = await import("animejs");

      if (cancelled) return;

      // Split headline words — already in DOM as spans
      animate("#hero-word span", {
        translateY: ["110%", "0%"],
        opacity: [0, 1],
        ease: "cubicBezier(0.16, 1, 0.3, 1)",
        duration: 1100,
        delay: stagger(120, { start: 200 }),
      });

      if (subtitleRef.current) {
        animate(subtitleRef.current, {
          translateY: [24, 0],
          opacity: [0, 1],
          ease: "cubicBezier(0.16, 1, 0.3, 1)",
          duration: 900,
          delay: 700,
        });
      }

      if (ctaRef.current) {
        animate(ctaRef.current, {
          translateY: [20, 0],
          opacity: [0, 1],
          ease: "cubicBezier(0.16, 1, 0.3, 1)",
          duration: 900,
          delay: 900,
        });
      }

      if (imageRef.current) {
        animate(imageRef.current, {
          scale: [1.08, 1],
          opacity: [0, 1],
          ease: "cubicBezier(0.16, 1, 0.3, 1)",
          duration: 1600,
          delay: 100,
        });
      }

      if (tagRef.current) {
        animate(tagRef.current, {
          translateX: ["-8px", "0px"],
          opacity: [0, 1],
          ease: "cubicBezier(0.16, 1, 0.3, 1)",
          duration: 700,
          delay: 1200,
        });
      }
    };

    init();
    return () => { cancelled = true; };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#0E0D09",
      }}
    >
      {/* Full-bleed background — desktop image */}
      <div
        ref={imageRef}
        style={{ position: "absolute", inset: 0, opacity: 0 }}
      >
        {/* Desktop / tablet landscape */}
        <Image
          src="/hero.png"
          alt="Nigerian pantry staples — spices, palm oil, wooden mortar, wicker basket"
          fill
          priority
          className="hero-img-desktop"
          style={{ objectFit: "cover", objectPosition: "60% center" }}
        />
        {/* Mobile portrait */}
        <Image
          src="/hero-mobile.png"
          alt="Nigerian pantry staples"
          fill
          priority
          className="hero-img-mobile"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />

        {/* Desktop: left→right cream fade */}
        <div className="hero-overlay-desktop" style={{ position: "absolute", inset: 0 }} />
        {/* Mobile: bottom→top cream fade */}
        <div className="hero-overlay-mobile" style={{ position: "absolute", inset: 0 }} />

        {/* Bottom edge fade (both) */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "20%",
            background: "linear-gradient(to top, rgba(248,244,238,0.55) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Text panel */}
      <div
        className="hero-text-wrap"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(2rem,5vw,5rem) clamp(1.5rem,4vw,4rem) clamp(4rem,7vw,7rem)",
          paddingTop: "clamp(6rem,12vw,10rem)",
          position: "relative",
          zIndex: 2,
          maxWidth: "680px",
          minHeight: "100svh",
        }}
      >
        {/* Tag */}
        <div
          ref={tagRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            opacity: 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "28px",
              height: "1px",
              background: "#2D5A16",
            }}
          />
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#2D5A16",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            Nigerian Groceries · Melbourne, AU
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3.5rem, 7vw, 7.5rem)",
            fontWeight: 400,
            lineHeight: 0.93,
            letterSpacing: "-0.03em",
            color: "#0E0D09",
            margin: 0,
          }}
        >
          <span style={{ display: "block" }}>Your Naija</span>
          <div id="hero-word" style={{ display: "flex", gap: "0.3em", flexWrap: "wrap" }}>
            {HERO_WORDS.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    transform: "translateY(110%)",
                    color: i === HERO_WORDS.length - 1 ? "#2D5A16" : "#0E0D09",
                    fontStyle: i === 1 ? "italic" : "normal",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="hero-subtitle"
          style={{
            marginTop: "2rem",
            maxWidth: "400px",
            fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
            lineHeight: 1.65,
            color: "#5C5B54",
            opacity: 0,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 300,
          }}
        >
          Premium authentic Nigerian pantry staples, spices, and
          snacks — shipped to your door anywhere in Australia.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2rem",
              background: "#2D5A16",
              color: "#F8F4EE",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              textDecoration: "none",
              borderRadius: "100px",
              transition: "background 0.3s ease, transform 0.25s ease",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1A3A0A";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#2D5A16";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            Shop the Collection
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>

          <Link
            href="/about"
            className="link-underline"
            style={{
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0E0D09",
              textDecoration: "none",
              fontWeight: 400,
              opacity: 0.65,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            Our Story
          </Link>
        </div>

        {/* Bottom meta — hidden on mobile */}
        <div
          style={{
            display: isMobile ? "none" : "flex",
            marginTop: "clamp(3rem,6vw,6rem)",
            gap: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(14,13,9,0.1)",
          }}
        >
          {[
            { num: "200+", label: "Products" },
            { num: "100%", label: "Authentic" },
            { num: "AU-Wide", label: "Shipping" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "#0E0D09",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#5C5B54",
                  marginTop: "0.375rem",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#5C5B54",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, rgba(92,91,84,0.6), transparent)",
            animation: "scrollLine 1.8s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes scrollLine {
            0% { transform: scaleY(0); transform-origin: top; }
            50% { transform: scaleY(1); transform-origin: top; }
            51% { transform: scaleY(1); transform-origin: bottom; }
            100% { transform: scaleY(0); transform-origin: bottom; }
          }
        `}</style>
      </div>

    </section>
  );
}
