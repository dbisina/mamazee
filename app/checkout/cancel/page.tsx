import Link from "next/link";
import Nav from "@/components/Nav";

export default function CheckoutCancelPage() {
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
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1.5rem",
            opacity: 0.5,
          }}
        >
          🛍
        </div>
        <h1
          style={{
            fontFamily: "var(--font-cormorant),Georgia,serif",
            fontSize: "clamp(2rem,6vw,4rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "#0E0D09",
            margin: "0 0 1.25rem",
            lineHeight: 0.95,
          }}
        >
          Order cancelled
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#5C5B54",
            fontFamily: "var(--font-inter),system-ui,sans-serif",
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          No payment was taken. Your cart is still saved.
        </p>
        <Link
          href="/checkout"
          style={{
            display: "inline-flex",
            padding: "1rem 2rem",
            background: "#0E0D09",
            color: "#F8F4EE",
            fontSize: "0.875rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
            textDecoration: "none",
            borderRadius: "100px",
            fontFamily: "var(--font-inter),system-ui,sans-serif",
          }}
        >
          Return to Checkout
        </Link>
      </div>
    </div>
  );
}
