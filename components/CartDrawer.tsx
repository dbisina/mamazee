"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, open, total, count, closeCart, removeItem, setQty } = useCart();

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(14,13,9,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 300,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(480px, 100vw)",
          background: "#F8F4EE",
          zIndex: 301,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: open ? "-24px 0 80px rgba(14,13,9,0.18)" : "none",
        }}
      >
        {/* Header — bag photo */}
        <div style={{ position: "relative", height: "200px", flexShrink: 0, overflow: "hidden" }}>
          <Image
            src="/bag.png"
            alt="Shopping bag"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,13,9,0.85) 0%, rgba(14,13,9,0.3) 60%, transparent 100%)" }} />

          {/* Close button */}
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(248,244,238,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(248,244,238,0.2)",
              borderRadius: "100px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#F8F4EE",
              fontSize: "1.125rem",
              lineHeight: 1,
            }}
          >
            ×
          </button>

          {/* Title + count */}
          <div style={{ position: "absolute", bottom: "1.25rem", left: "1.5rem" }}>
            <p style={{ fontSize: "0.625rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(248,244,238,0.65)", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500, marginBottom: "0.25rem" }}>
              Your Order
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "2rem", fontWeight: 400, color: "#F8F4EE", margin: 0, letterSpacing: "-0.02em", lineHeight: 1 }}>
              Cart {count > 0 && <span style={{ color: "#C4813A" }}>({count})</span>}
            </h2>
          </div>
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1rem", paddingBottom: "4rem" }}>
              <div style={{ fontSize: "3.5rem", opacity: 0.4 }}>🛍</div>
              <p style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.5rem", fontWeight: 400, color: "#0E0D09", margin: 0, opacity: 0.5 }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: "0.875rem", color: "#A0A097", fontFamily: "var(--font-inter),system-ui,sans-serif", textAlign: "center", maxWidth: "220px", lineHeight: 1.6 }}>
                Add items from the shop or send us a WhatsApp list
              </p>
              <a
                href="https://wa.me/61468324309?text=Hi%20Mamazee%2C%20I%27d%20like%20to%20order%3A"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "#25D366", color: "#fff", borderRadius: "100px", fontSize: "0.8125rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-inter),system-ui,sans-serif", marginTop: "0.5rem" }}
              >
                WhatsApp Order
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {items.map((item, i) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onQty={(q) => setQty(item.id, q)}
                  noBorder={i === 0}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer — total + CTA */}
        {items.length > 0 && (
          <div
            style={{
              flexShrink: 0,
              padding: "1.5rem",
              borderTop: "1px solid rgba(14,13,9,0.1)",
              background: "#F8F4EE",
            }}
          >
            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8125rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.75rem", fontWeight: 500, color: "#0E0D09", letterSpacing: "-0.02em" }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#A0A097", fontFamily: "var(--font-inter),system-ui,sans-serif", marginBottom: "1.25rem" }}>
              $25 flat-rate delivery · Free local pickup in Fraser Rise
            </p>

            {/* Checkout */}
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{ display: "block", width: "100%", padding: "1.125rem", background: "#0E0D09", color: "#F8F4EE", border: "none", borderRadius: "100px", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-inter),system-ui,sans-serif", marginBottom: "0.75rem", textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}
            >
              Proceed to Checkout
            </Link>

            {/* WhatsApp checkout alternative */}
            <a
              href={`https://wa.me/61468324309?text=${encodeURIComponent(
                "Hi Mamazee, I'd like to order:\n" +
                items.map((i) => `• ${i.name} x${i.quantity} (${i.unit}): $${(i.price * i.quantity).toFixed(2)}`).join("\n") +
                `\n\nTotal: $${total.toFixed(2)}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem", width: "100%", padding: "1rem", background: "#25D366", color: "#fff", borderRadius: "100px", fontSize: "0.875rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-inter),system-ui,sans-serif" }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send Order via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}

function CartItem({
  item,
  onRemove,
  onQty,
  noBorder,
}: {
  item: import("@/context/CartContext").CartItem;
  onRemove: () => void;
  onQty: (q: number) => void;
  noBorder: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1fr",
        gap: "1rem",
        padding: "1.25rem 0",
        borderTop: noBorder ? "none" : "1px solid rgba(14,13,9,0.08)",
        alignItems: "center",
      }}
    >
      {/* Product image */}
      <div style={{ position: "relative", width: "72px", height: "88px", borderRadius: "0.75rem", overflow: "hidden", background: "#EDE8DF", flexShrink: 0 }}>
        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
      </div>

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
          <h4 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.125rem", fontWeight: 400, color: "#0E0D09", margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
            {item.name}
          </h4>
          <button
            onClick={onRemove}
            aria-label="Remove"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#A0A097", fontSize: "1rem", flexShrink: 0, lineHeight: 1, padding: "2px" }}
          >
            ×
          </button>
        </div>

        <p style={{ fontSize: "0.75rem", color: "#A0A097", fontFamily: "var(--font-inter),system-ui,sans-serif", margin: 0 }}>{item.unit}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.25rem" }}>
          {/* Qty stepper */}
          <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1px solid rgba(14,13,9,0.12)", borderRadius: "100px", overflow: "hidden" }}>
            <button
              onClick={() => onQty(item.quantity - 1)}
              style={{ width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#0E0D09", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              −
            </button>
            <span style={{ minWidth: "24px", textAlign: "center", fontSize: "0.875rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500, color: "#0E0D09" }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onQty(item.quantity + 1)}
              style={{ width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#0E0D09", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              +
            </button>
          </div>

          {/* Line price */}
          <span style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.25rem", fontWeight: 500, color: "#2D5A16", letterSpacing: "-0.01em" }}>
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
