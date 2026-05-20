"use client";

import ScrollReveal from "./ScrollReveal";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Story() {
  const bp = useBreakpoint();
  const isMobile = bp === "foldable" || bp === "mobile" || bp === "phablet";
  const storyCols = isMobile ? "1fr" : "1fr 1fr";
  const storyGap = isMobile ? "3rem" : "clamp(3rem, 8vw, 8rem)";
  const statsCols = isMobile ? "1fr" : "1fr 1fr";

  return (
    <section
      style={{
        background: "#1A3A0A",
        padding: "clamp(6rem,12vw,12rem) clamp(1.5rem,4vw,4rem)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background text */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(8rem, 20vw, 22rem)",
          fontWeight: 300,
          color: "rgba(248,244,238,0.03)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.05em",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        Naija
      </div>

      <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: storyCols, gap: storyGap, alignItems: "center" }}>
          {/* Left */}
          <div>
            <ScrollReveal>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C4813A",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                Our Story
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  lineHeight: 0.97,
                  color: "#F8F4EE",
                  margin: "0 0 2.5rem",
                }}
              >
                Built by the{" "}
                <span style={{ fontStyle: "italic", color: "#C4813A" }}>diaspora,</span>
                <br />
                for the diaspora.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p
                style={{
                  fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
                  lineHeight: 1.75,
                  color: "rgba(248,244,238,0.65)",
                  maxWidth: "440px",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 300,
                  marginBottom: "2rem",
                }}
              >
                Mamazee started from a simple truth: the taste of home shouldn't be hard to find.
                We source directly from trusted suppliers in Nigeria and West Africa,
                so every packet of garri, every bottle of palm oil carries the real thing.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p
                style={{
                  fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
                  lineHeight: 1.75,
                  color: "rgba(248,244,238,0.65)",
                  maxWidth: "440px",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 300,
                }}
              >
                No compromise. No substitutes. Just your childhood favourites,
                ready to order online or pick up in Melbourne.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — Stats */}
          <div style={{ display: "grid", gridTemplateColumns: statsCols, gap: "1rem" }}>
            {[
              { num: "200+", label: "Products in stock", sub: "Groceries, spices, beauty" },
              { num: "4.9", label: "Customer rating", sub: "Google & Facebook" },
              { num: "2019", label: "Founded", sub: "Melbourne, Victoria" },
              { num: "AU-Wide", label: "Shipping", sub: "Fast & tracked delivery" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 80}>
                <div
                  style={{
                    padding: "2rem",
                    borderRadius: "1.25rem",
                    border: "1px solid rgba(248,244,238,0.1)",
                    background: "rgba(248,244,238,0.04)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 400,
                      color: "#C4813A",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#F8F4EE",
                      marginTop: "0.75rem",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(248,244,238,0.45)",
                      marginTop: "0.25rem",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
