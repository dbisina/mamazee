"use client";

import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const cats = [
  {
    id: "pantry",
    name: "Pantry\nStaples",
    sub: "48 products",
    color: "#C4813A",
    bg: "#EDE8DF",
    href: "/shop?cat=pantry",
    icon: "🌿",
    items: ["Garri", "Palm Oil", "Fufu", "Stockfish", "Crayfish"],
  },
  {
    id: "spices",
    name: "Spices &\nPeppers",
    sub: "32 products",
    color: "#2D5A16",
    bg: "#D4E8C4",
    href: "/shop?cat=spices",
    icon: "🌶",
    items: ["Uziza", "Ehuru", "Suya Spice", "Uda", "Ogiri"],
  },
  {
    id: "snacks",
    name: "Snacks &\nDrinks",
    sub: "24 products",
    color: "#5C3A1E",
    bg: "#EDD5BC",
    href: "/shop?cat=snacks",
    icon: "✨",
    items: ["Chin Chin", "Zobo", "Kunu", "Puff Puff", "Kilishi"],
  },
  {
    id: "beauty",
    name: "Hair &\nBeauty",
    sub: "18 products",
    color: "#1A3A0A",
    bg: "#E8DDD0",
    href: "/shop?cat=beauty",
    icon: "🌸",
    items: ["Shea Butter", "Black Soap", "Argan Oil", "Cocoa Butter"],
  },
];

export default function Categories() {
  const bp = useBreakpoint();
  const catCols =
    bp === "mobile" ? "1fr" :
    bp === "phablet" || bp === "tablet" ? "1fr 1fr" :
    "repeat(4, 1fr)";
  const catGap = bp === "mobile" || bp === "phablet" ? "0.875rem" : "1.25rem";

  return (
    <section
      style={{
        background: "#F8F4EE",
        padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,4vw,4rem)",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "clamp(3rem,5vw,5rem)",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#2D5A16",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                Browse by Category
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  lineHeight: 0.97,
                  color: "#0E0D09",
                  margin: 0,
                }}
              >
                Everything from{" "}
                <span style={{ fontStyle: "italic", color: "#2D5A16" }}>
                  home.
                </span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="link-underline"
              style={{
                fontSize: "0.8125rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#5C5B54",
                textDecoration: "none",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              View All →
            </Link>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: catCols, gap: catGap }}>
          {cats.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 80}>
              <Link
                href={cat.href}
                style={{
                  display: "block",
                  background: cat.bg,
                  borderRadius: "1.5rem",
                  padding: "clamp(1.75rem, 3vw, 2.5rem)",
                  textDecoration: "none",
                  overflow: "hidden",
                  position: "relative",
                  minHeight: "320px",
                  transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 48px rgba(14,13,9,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Tag */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.625rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: cat.color,
                    padding: "0.375rem 0.875rem",
                    background: `${cat.color}18`,
                    borderRadius: "100px",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {cat.sub}
                </span>

                {/* Category name */}
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    color: "#0E0D09",
                    margin: "1.5rem 0 0",
                    whiteSpace: "pre-line",
                  }}
                >
                  {cat.name}
                </h3>

                {/* Items list */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "2.5rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: "0.75rem",
                        color: cat.color,
                        padding: "0.25rem 0.625rem",
                        background: "rgba(255,255,255,0.5)",
                        borderRadius: "100px",
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(1.75rem,3vw,2.5rem)",
                    right: "clamp(1.75rem,3vw,2.5rem)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={cat.color} strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>

                {/* Large background number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-1rem",
                    right: "-0.5rem",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "9rem",
                    fontWeight: 300,
                    color: `${cat.color}14`,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
