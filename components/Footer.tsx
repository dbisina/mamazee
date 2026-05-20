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
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/mamazee.au",
    color: "#C4813A",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/mamazee",
    color: "#C4813A",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/61468324309",
    color: "#C4813A",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@mamazee.com.au",
    color: "#C4813A",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const bp = useBreakpoint();
  const isMobile = bp === "foldable" || bp === "mobile" || bp === "phablet";
  const footerCols =
    bp === "foldable" || bp === "mobile" || bp === "phablet" ? "1fr" :
    bp === "foldable-open" || bp === "tablet" ? "1fr 1fr" :
    "2fr 1fr 1fr 1fr";
  const footerGap =
    bp === "foldable" || bp === "mobile" || bp === "phablet" ? "2rem" :
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
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <p style={{ fontSize: "0.8125rem", color: "rgba(248,244,238,0.4)", fontFamily: "var(--font-inter), system-ui, sans-serif", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4813A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                68 Malone Cct, Deanside VIC 3336
              </p>
              <a href="https://wa.me/61468324309" style={{ fontSize: "0.8125rem", color: "rgba(248,244,238,0.4)", fontFamily: "var(--font-inter), system-ui, sans-serif", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4813A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.99 2.18 2 2 0 012.98 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                +61 468 324 309
              </a>
              <p style={{ fontSize: "0.8125rem", color: "rgba(248,244,238,0.4)", fontFamily: "var(--font-inter), system-ui, sans-serif", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4813A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Tue–Sun · 10AM–7PM
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

          {/* Social / Connect column */}
          <div>
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
              Connect
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      fontSize: "0.875rem",
                      color: "rgba(248,244,238,0.6)",
                      textDecoration: "none",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F8F4EE"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,244,238,0.6)"; }}
                  >
                    <span style={{ color: s.color, display: "flex", flexShrink: 0 }}>{s.icon}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
