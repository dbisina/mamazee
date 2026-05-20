"use client";

import Link from "next/link";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const links = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Pantry Staples", href: "/shop?cat=pantry" },
    { label: "Spices & Peppers", href: "/shop?cat=spices" },
    { label: "Snacks & Drinks", href: "/shop?cat=snacks" },
    { label: "Hair & Beauty", href: "/shop?cat=beauty" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Info", href: "/shipping" },
  ],
  Connect: [
    { label: "Instagram", href: "https://instagram.com/mamazee.au" },
    { label: "Facebook", href: "https://facebook.com/mamazee" },
    { label: "WhatsApp", href: "https://wa.me/61468324309" },
    { label: "Email", href: "mailto:hello@mamazee.com.au" },
  ],
};

export default function Footer() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile" || bp === "phablet";
  const footerCols =
    bp === "mobile" ? "1fr" :
    bp === "phablet" ? "1fr 1fr" :
    bp === "tablet" ? "1fr 1fr" :
    "2fr 1fr 1fr 1fr";
  const footerGap =
    bp === "mobile" ? "2rem" :
    bp === "phablet" ? "2rem" :
    "clamp(2rem, 4vw, 5rem)";

  return (
    <footer
      style={{
        background: "#0E0D09",
        padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,4vw,4rem) 2.5rem",
        color: "#F8F4EE",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: footerCols,
            gap: footerGap,
            paddingBottom: "4rem",
            borderBottom: "1px solid rgba(248,244,238,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2.25rem",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#F8F4EE",
                textDecoration: "none",
                display: "block",
                marginBottom: "1.25rem",
              }}
            >
              Mamazee
            </Link>
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "rgba(248,244,238,0.5)",
                maxWidth: "280px",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              Premium Nigerian groceries, spices, and pantry essentials.
              Serving the Australian diaspora since 2019.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <p style={{ fontSize: "0.8125rem", color: "rgba(248,244,238,0.4)", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                📍 68 Malone Cct, Deanside VIC 3336
              </p>
              <a href="https://wa.me/61468324309" style={{ fontSize: "0.8125rem", color: "rgba(248,244,238,0.4)", fontFamily: "var(--font-inter), system-ui, sans-serif", textDecoration: "none" }}>
                📞 +61 468 324 309
              </a>
              <p style={{ fontSize: "0.8125rem", color: "rgba(248,244,238,0.4)", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                🕐 Tue–Sun · 10AM–7PM
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#C4813A",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                {title}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="link-underline"
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(248,244,238,0.6)",
                        textDecoration: "none",
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F8F4EE"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,244,238,0.6)"; }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(248,244,238,0.3)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            © {new Date().getFullYear()} Mamazee Naija Shop. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy", "Terms", "Returns"].map((item) => (
              <Link
                key={item}
                href="#"
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(248,244,238,0.3)",
                  textDecoration: "none",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,244,238,0.7)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,244,238,0.3)"; }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
