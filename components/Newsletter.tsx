"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      style={{
        background: "#EDE8DF",
        padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,4vw,4rem)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <ScrollReveal>
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2D5A16",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            Stay Connected
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 0.97,
              color: "#0E0D09",
              margin: "0 0 1.5rem",
            }}
          >
            New arrivals, recipes{" "}
            <span style={{ fontStyle: "italic", color: "#C4813A" }}>&amp; deals.</span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#5C5B54",
              marginBottom: "3rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 300,
              lineHeight: 1.65,
            }}
          >
            Join the Mamazee community. No spam — just updates on new products,
            seasonal specials, and Nigerian recipes.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: "0.75rem",
                maxWidth: "480px",
                margin: "0 auto",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: "1 1 240px",
                  padding: "1rem 1.25rem",
                  border: "1px solid rgba(14,13,9,0.2)",
                  borderRadius: "100px",
                  background: "#F8F4EE",
                  fontSize: "0.9375rem",
                  color: "#0E0D09",
                  outline: "none",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#2D5A16"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(14,13,9,0.2)"; }}
              />
              <button
                type="submit"
                style={{
                  padding: "1rem 1.75rem",
                  background: "#2D5A16",
                  color: "#F8F4EE",
                  border: "none",
                  borderRadius: "100px",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  transition: "background 0.3s, transform 0.2s",
                  whiteSpace: "nowrap",
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
                Subscribe
              </button>
            </form>
          ) : (
            <div
              style={{
                padding: "1.5rem 2rem",
                background: "#D4E8C4",
                borderRadius: "1rem",
                display: "inline-block",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "#1A3A0A",
                  margin: 0,
                }}
              >
                Welcome to the family. ✓
              </p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
