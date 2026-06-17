"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Nav from "@/components/Nav";

const CONFETTI = [
  { angle: -100, dist: 90, size: 8, color: "#2D5A16", delay: 60, shape: "circle" },
  { angle: -55, dist: 110, size: 6, color: "#C4813A", delay: 120, shape: "rect" },
  { angle: -20, dist: 95, size: 7, color: "#0E0D09", delay: 30, shape: "circle" },
  { angle: 15, dist: 105, size: 6, color: "#2D5A16", delay: 150, shape: "rect" },
  { angle: 50, dist: 90, size: 8, color: "#C4813A", delay: 90, shape: "circle" },
  { angle: 95, dist: 100, size: 6, color: "#0E0D09", delay: 180, shape: "rect" },
  { angle: -130, dist: 80, size: 6, color: "#C4813A", delay: 200, shape: "circle" },
  { angle: 135, dist: 85, size: 7, color: "#2D5A16", delay: 110, shape: "rect" },
  { angle: -75, dist: 70, size: 5, color: "#0E0D09", delay: 230, shape: "circle" },
  { angle: 70, dist: 75, size: 5, color: "#C4813A", delay: 70, shape: "rect" },
];

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    clearCart();
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ background: "#F8F4EE", minHeight: "100vh" }}>
      <style>{`
        @keyframes successRing {
          from { stroke-dashoffset: 220; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes successCheck {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes successPop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confettiBurst {
          0% { transform: translate(-50%,-50%) rotate(0deg) scale(0); opacity: 0; }
          18% { opacity: 1; }
          100% {
            transform:
              translate(calc(-50% + var(--cx)), calc(-50% + var(--cy)))
              rotate(var(--rot))
              scale(1);
            opacity: 0;
          }
        }
        .success-rise {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .success-rise.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <Nav />
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "clamp(8rem,14vw,12rem) clamp(1.5rem,4vw,4rem) 5rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "112px",
            height: "112px",
            margin: "0 auto 2rem",
          }}
        >
          {show &&
            CONFETTI.map((c, i) => {
              const rad = (c.angle * Math.PI) / 180;
              const cx = Math.cos(rad) * c.dist;
              const cy = Math.sin(rad) * c.dist;
              return (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${c.size}px`,
                    height: `${c.size}px`,
                    background: c.color,
                    borderRadius: c.shape === "circle" ? "50%" : "2px",
                    pointerEvents: "none",
                    ["--cx" as string]: `${cx}px`,
                    ["--cy" as string]: `${cy}px`,
                    ["--rot" as string]: `${c.angle > 0 ? 220 : -220}deg`,
                    animation: `confettiBurst 0.95s cubic-bezier(0.16,1,0.3,1) ${c.delay}ms backwards`,
                  }}
                />
              );
            })}

          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            fill="none"
            style={{
              position: "relative",
              animation: show ? "successPop 0.7s cubic-bezier(0.16,1,0.3,1) 60ms backwards" : "none",
              opacity: show ? 1 : 0,
            }}
          >
            <circle cx="56" cy="56" r="50" stroke="rgba(45,90,22,0.15)" strokeWidth="4" fill="#FFFFFF" />
            <circle
              cx="56"
              cy="56"
              r="50"
              stroke="#2D5A16"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="220"
              strokeDashoffset={show ? 0 : 220}
              style={{
                transformOrigin: "56px 56px",
                transform: "rotate(-90deg)",
                animation: show ? "successRing 0.9s cubic-bezier(0.16,1,0.3,1) 60ms backwards" : "none",
              }}
            />
            <path
              d="M38 58 L51 71 L76 44"
              stroke="#2D5A16"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="60"
              strokeDashoffset={show ? 0 : 60}
              style={{
                animation: show ? "successCheck 0.5s cubic-bezier(0.16,1,0.3,1) 520ms backwards" : "none",
              }}
            />
          </svg>
        </div>

        <p
          className={`success-rise ${show ? "visible" : ""}`}
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C4813A",
            marginBottom: "1rem",
            fontFamily: "var(--font-inter),system-ui,sans-serif",
            fontWeight: 500,
            transitionDelay: "120ms",
          }}
        >
          Order Confirmed
        </p>
        <h1
          className={`success-rise ${show ? "visible" : ""}`}
          style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(2.5rem,7vw,5rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "#0E0D09",
            margin: "0 0 1.5rem",
            lineHeight: 0.95,
            transitionDelay: "190ms",
          }}
        >
          Thank you!
        </h1>
        <p
          className={`success-rise ${show ? "visible" : ""}`}
          style={{
            fontSize: "1rem",
            color: "#5C5B54",
            fontFamily: "var(--font-inter),system-ui,sans-serif",
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: "3rem",
            transitionDelay: "260ms",
          }}
        >
          Your order has been received. You&apos;ll get a confirmation
          email shortly. If you have any questions, reach us on WhatsApp
          at +61 468 324 309.
        </p>
        <div
          className={`success-rise ${show ? "visible" : ""}`}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            transitionDelay: "330ms",
          }}
        >
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "#2D5A16",
              color: "#F8F4EE",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              textDecoration: "none",
              borderRadius: "100px",
              fontFamily: "var(--font-inter),system-ui,sans-serif",
            }}
          >
            Continue Shopping
          </Link>
          <a
            href="https://wa.me/61468324309"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "#25D366",
              color: "#fff",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
              textDecoration: "none",
              borderRadius: "100px",
              fontFamily: "var(--font-inter),system-ui,sans-serif",
            }}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
