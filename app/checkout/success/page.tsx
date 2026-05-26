"use client";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ background: "#F8F4EE", minHeight: "100vh" }}>
      <Nav />
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding:
            "clamp(8rem,14vw,12rem) clamp(1.5rem,4vw,4rem) 5rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
          🎉
        </div>
        <p
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C4813A",
            marginBottom: "1rem",
            fontFamily: "var(--font-inter),system-ui,sans-serif",
            fontWeight: 500,
          }}
        >
          Order Confirmed
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(2.5rem,7vw,5rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "#0E0D09",
            margin: "0 0 1.5rem",
            lineHeight: 0.95,
          }}
        >
          Thank you!
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#5C5B54",
            fontFamily: "var(--font-inter),system-ui,sans-serif",
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Your order has been received. You&apos;ll get a confirmation
          email shortly. If you have any questions, reach us on WhatsApp
          at +61 468 324 309.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
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
