"use client";

import { useState } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import ScrollReveal from "./ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "foldable" || bp === "mobile" || bp === "phablet";

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
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2.5rem" : "clamp(4rem,8vw,8rem)",
          alignItems: "center",
        }}
      >
        {/* Left — text */}
        <ScrollReveal>
          <div>
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
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                lineHeight: 0.97,
                color: "#0E0D09",
                margin: "0 0 1.5rem",
              }}
            >
              New arrivals,{" "}
              <span style={{ fontStyle: "italic", color: "#C4813A" }}>recipes</span>
              <br />& deals.
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#5C5B54",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 300,
                lineHeight: 1.65,
                maxWidth: "380px",
              }}
            >
              Join the Mamazee community. No spam, just updates on new products,
              seasonal specials, and Nigerian recipes.
            </p>
          </div>
        </ScrollReveal>

        {/* Right — form */}
        <ScrollReveal delay={150}>
          <div>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                  maxWidth: "440px",
                }}
              >
                <input
                  type="email"
                  suppressHydrationWarning
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    border: "1px solid rgba(14,13,9,0.2)",
                    borderRadius: "100px",
                    background: "#F8F4EE",
                    fontSize: "0.9375rem",
                    color: "#0E0D09",
                    outline: "none",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#2D5A16"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(14,13,9,0.2)"; }}
                />
                <button
                  type="submit"
                  style={{
                    alignSelf: "flex-start",
                    padding: "1rem 2rem",
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
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#A0A097",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 300,
                    marginTop: "0.25rem",
                  }}
                >
                  Unsubscribe any time. We respect your inbox.
                </p>
              </form>
            ) : (
              <div
                style={{
                  padding: "2rem",
                  background: "rgba(45,90,22,0.08)",
                  borderRadius: "1.25rem",
                  borderLeft: "3px solid #2D5A16",
                  maxWidth: "440px",
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
                  Welcome to the family.
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#5C5B54",
                    marginTop: "0.5rem",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Check your email to confirm your subscription.
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
