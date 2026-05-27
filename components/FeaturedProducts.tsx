"use client";

import { useState } from "react";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import type { Product } from "@/lib/products";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, unit: product.unit, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <ScrollReveal delay={index * 100}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        {/* Image container */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: "1.25rem",
            overflow: "hidden",
            background: "#EDE8DF",
            marginBottom: "1.25rem",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{
              objectFit: "cover",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.07)" : "scale(1)",
            }}
          />

          {/* Tag */}
          {product.tag && (
            <span
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                fontSize: "0.625rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 500,
                padding: "0.375rem 0.75rem",
                borderRadius: "100px",
                background: product.tag === "Bestseller" ? "#2D5A16" : "#C4813A",
                color: "#F8F4EE",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}
            >
              {product.tag}
            </span>
          )}

          {/* Add to cart overlay */}
          <button
            onClick={handleAdd}
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: hovered ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(calc(100% + 1rem))",
              transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.2s ease",
              padding: "0.75rem 1.5rem",
              background: added ? "#2D5A16" : "#F8F4EE",
              color: added ? "#F8F4EE" : "#0E0D09",
              border: "none",
              borderRadius: "100px",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              boxShadow: "0 8px 24px rgba(14,13,9,0.12)",
            }}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>

        {/* Product info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#A0A097",
                marginBottom: "0.375rem",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}
            >
              {product.category}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.125rem, 2vw, 1.4rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "#0E0D09",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "#5C5B54",
                marginTop: "0.375rem",
                lineHeight: 1.5,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 300,
              }}
            >
              {product.unit}
            </p>
          </div>
          <div
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              fontWeight: 500,
              color: "#2D5A16",
              whiteSpace: "nowrap",
              marginTop: "0.25rem",
            }}
          >
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null
  const bp = useBreakpoint();
  const prodCols =
    bp === "foldable" || bp === "mobile" || bp === "phablet" ? "1fr" :
    bp === "foldable-open" ? "1fr 1fr" :
    bp === "tablet" ? "repeat(3, 1fr)" :
    "repeat(4, 1fr)";
  const prodGap = bp === "foldable" || bp === "mobile" || bp === "phablet"
    ? "0.875rem"
    : "clamp(1.25rem, 2vw, 2.5rem)";

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
              paddingBottom: "2rem",
              borderBottom: "1px solid rgba(14,13,9,0.1)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C4813A",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                Hand-Picked
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
                Community{" "}
                <span style={{ fontStyle: "italic" }}>favourites.</span>
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
              All Products →
            </Link>
          </div>
        </ScrollReveal>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: prodCols, gap: prodGap }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
