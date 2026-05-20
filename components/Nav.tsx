"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  // Dark-header pages: all inner pages have a near-black header section
  const isDarkPage = pathname !== "/";
  // Nav text is white when on dark page and not yet scrolled
  const textColor = !scrolled && isDarkPage ? "#F8F4EE" : "#0E0D09";
  const logoColor = !scrolled && isDarkPage ? "#F8F4EE" : "#0E0D09";
  const barColor = !scrolled && isDarkPage ? "#F8F4EE" : "#0E0D09";
  const cartBorderColor = !scrolled && isDarkPage ? "rgba(248,244,238,0.25)" : "rgba(14,13,9,0.18)";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.4s ease",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          background: scrolled ? "rgba(248,244,238,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(14,13,9,0.08)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 4rem)",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.75rem",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: logoColor,
              textDecoration: "none",
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}
          >
            Mamazee
          </Link>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline"
                  style={{
                    fontSize: "0.8125rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: textColor,
                    textDecoration: "none",
                    fontWeight: 400,
                    opacity: pathname === link.href ? 1 : 0.75,
                    transition: "opacity 0.2s, color 0.3s",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.opacity = "1"; }}
                  onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.opacity = pathname === link.href ? "1" : "0.75"; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Shop Now CTA — desktop only */}
            {!isMobile && (
              <Link
                href="/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.375rem",
                  background: "#2D5A16",
                  color: "#F8F4EE",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textDecoration: "none",
                  borderRadius: "100px",
                  transition: "background 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#1A3A0A";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#2D5A16";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                Shop Now
              </Link>
            )}

            {/* Cart icon + badge */}
            <button
              onClick={openCart}
              aria-label={`Cart${count > 0 ? ` (${count} items)` : ""}`}
              style={{
                position: "relative",
                background: "none",
                border: `1px solid ${cartBorderColor}`,
                borderRadius: "100px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color 0.3s",
                color: textColor,
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    minWidth: "18px",
                    height: "18px",
                    borderRadius: "100px",
                    background: "#2D5A16",
                    color: "#F8F4EE",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-inter),system-ui,sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                    lineHeight: 1,
                    border: "1.5px solid #F8F4EE",
                  }}
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>

            {/* Animated hamburger → X */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "0",
                  padding: "4px",
                  width: "32px",
                  height: "32px",
                  position: "relative",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      left: 0,
                      width: "22px",
                      height: "1.5px",
                      background: barColor,
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
                      top: i === 0 ? "8px" : i === 1 ? "15px" : "22px",
                      transform:
                        i === 0 ? (menuOpen ? "translateY(7px) rotate(45deg)" : "none") :
                        i === 2 ? (menuOpen ? "translateY(-7px) rotate(-45deg)" : "none") :
                        "none",
                      opacity: i === 1 && menuOpen ? 0 : 1,
                    }}
                  />
                ))}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#F8F4EE",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5rem",
          transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 8vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#0E0D09",
              textDecoration: "none",
              opacity: pathname === link.href ? 1 : 0.7,
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Mobile WhatsApp CTA */}
        <a
          href="https://wa.me/61468324309"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.875rem 2rem",
            background: "#25D366",
            color: "#fff",
            fontSize: "0.875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 500,
            textDecoration: "none",
            borderRadius: "100px",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Order
        </a>
      </div>
    </>
  );
}
