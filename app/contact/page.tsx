"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const STORE = {
  address: "68 Malone Cct, Deanside VIC 3336",
  phone: "+61 468 324 309",
  whatsapp: "https://wa.me/61468324309",
  hours: "Tuesday–Sunday · 10:00 AM – 7:00 PM",
  mapSrc: "https://maps.google.com/maps?ll=-37.716892,144.702519&z=16&t=m&output=embed",
  mapsLink: "https://maps.google.com/?cid=15851661521598341560",
};

export default function ContactPage() {
  const bp = useBreakpoint();
  const isMobile = bp === "foldable" || bp === "mobile" || bp === "phablet";
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp fallback — open wa.me with pre-filled message
    const text = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nReason: ${form.reason}\n\n${form.message}`
    );
    window.open(`https://wa.me/61468324309?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div style={{ background: "#F8F4EE", minHeight: "100vh" }}>
      <Nav />

      {/* Header */}
      <div style={{ background: "#0E0D09", paddingTop: "clamp(8rem,14vw,11rem)", paddingBottom: "clamp(5rem,10vw,8rem)", paddingLeft: "clamp(1.5rem,4vw,4rem)", paddingRight: "clamp(1.5rem,4vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(5rem,16vw,16rem)", fontWeight: 300, color: "rgba(248,244,238,0.03)", whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1 }}>Contact</div>
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4813A", marginBottom: "1rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Get In Touch</p>
          <h1 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2rem,7vw,6.5rem)", fontWeight: 400, letterSpacing: "-0.03em", color: "#F8F4EE", margin: 0, lineHeight: 0.93 }}>
            We&apos;d love to <span style={{ fontStyle: "italic", color: "#C4813A" }}>hear</span>
            <br />from you.
          </h1>
        </div>
      </div>

      {/* Quick action buttons */}
      <div style={{ background: "#F8F4EE", borderBottom: "1px solid rgba(14,13,9,0.08)", padding: "1.5rem clamp(1.5rem,4vw,4rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start" }}>
          <a
            href="https://wa.me/61468324309?text=Hi%20Mamazee%2C%20I%27d%20like%20to%20place%20an%20order%3A"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1.75rem", background: "#25D366", color: "#fff", borderRadius: "100px", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", fontFamily: "var(--font-inter),system-ui,sans-serif" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Order
          </a>
          <a
            href="tel:+61468324309"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1.75rem", background: "#0E0D09", color: "#F8F4EE", borderRadius: "100px", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", fontFamily: "var(--font-inter),system-ui,sans-serif" }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Us
          </a>
          <a
            href="mailto:hello@mamazee.com.au"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1.75rem", border: "1px solid rgba(14,13,9,0.18)", color: "#0E0D09", borderRadius: "100px", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", fontFamily: "var(--font-inter),system-ui,sans-serif" }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email Us
          </a>
          <span style={{ fontSize: "0.8125rem", color: "#A0A097", fontFamily: "var(--font-inter),system-ui,sans-serif", marginLeft: "0.5rem" }}>
            Replies within 2 hrs · Tue–Sun 10AM–7PM
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,4rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(3rem,6vw,6rem)", alignItems: "start" }}>

          {/* Left — contact form */}
          <div>
            <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "#0E0D09", margin: "0 0 2.5rem" }}>
              Send a Message
            </h2>

            {sent ? (
              <div style={{ padding: "2.5rem", background: "#D4E8C4", borderRadius: "1rem" }}>
                <p style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.5rem", fontWeight: 400, color: "#1A3A0A", margin: "0 0 0.75rem" }}>Message sent to WhatsApp!</p>
                <p style={{ fontSize: "0.9375rem", color: "#2D5A16", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300 }}>We reply within 2 hours during store hours (Tue–Sun, 10AM–7PM).</p>
                <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", background: "#2D5A16", color: "#F8F4EE", border: "none", borderRadius: "100px", fontSize: "0.8125rem", fontFamily: "var(--font-inter),system-ui,sans-serif", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Full Name", key: "name", type: "text", required: true },
                  { label: "Email", key: "email", type: "email", required: true },
                  { label: "WhatsApp / Phone", key: "phone", type: "tel", required: false },
                ].map((f) => (
                  <label key={f.key} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>{f.label}{f.required && " *"}</span>
                    <input
                      type={f.type}
                      required={f.required}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ padding: "1rem 1.25rem", background: "#fff", border: "1px solid rgba(14,13,9,0.12)", borderRadius: "0.75rem", fontSize: "0.9375rem", fontFamily: "var(--font-inter),system-ui,sans-serif", outline: "none", color: "#0E0D09" }}
                    />
                  </label>
                ))}

                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Reason for Contact</span>
                  <select value={form.reason} onChange={(e) => setForm(p => ({ ...p, reason: e.target.value }))} style={{ padding: "1rem 1.25rem", background: "#fff", border: "1px solid rgba(14,13,9,0.12)", borderRadius: "0.75rem", fontSize: "0.9375rem", fontFamily: "var(--font-inter),system-ui,sans-serif", color: "#0E0D09", outline: "none" }}>
                    <option value="">Select reason...</option>
                    <option value="Order Enquiry">Order Enquiry</option>
                    <option value="Shopping List">Send Shopping List</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Delivery">Delivery Question</option>
                    <option value="Wholesale">Wholesale / Bulk Order</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Message / Shopping List *</span>
                  <textarea required value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} rows={5} style={{ padding: "1rem 1.25rem", background: "#fff", border: "1px solid rgba(14,13,9,0.12)", borderRadius: "0.75rem", fontSize: "0.9375rem", fontFamily: "var(--font-inter),system-ui,sans-serif", resize: "vertical", outline: "none", color: "#0E0D09" }} />
                </label>

                <button type="submit" style={{ padding: "1.125rem 2rem", background: "#25D366", color: "#fff", border: "none", borderRadius: "100px", fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-inter),system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                  Send via WhatsApp
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </button>
                <p style={{ fontSize: "0.8125rem", color: "#A0A097", textAlign: "center", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>We reply within 2 hours during store hours</p>
              </form>
            )}
          </div>

          {/* Right — store info + map */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "#0E0D09", margin: 0 }}>
              Plumpton Store
            </h2>

            {[
              { label: "Address", value: STORE.address, href: STORE.mapsLink },
              { label: "Phone / WhatsApp", value: STORE.phone, href: STORE.whatsapp },
              { label: "Opening Hours", value: STORE.hours, href: null },
            ].map((item) => (
              <div key={item.label} style={{ borderTop: "1px solid rgba(14,13,9,0.1)", paddingTop: "1.5rem" }}>
                <p style={{ fontSize: "0.6875rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C4813A", marginBottom: "0.5rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>{item.label}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "clamp(1rem,2vw,1.25rem)", color: "#0E0D09", fontFamily: "var(--font-cormorant),Georgia,serif", fontWeight: 400, textDecoration: "none", borderBottom: "1px solid rgba(14,13,9,0.2)" }}>{item.value}</a>
                ) : (
                  <p style={{ fontSize: "clamp(1rem,2vw,1.25rem)", color: "#0E0D09", fontFamily: "var(--font-cormorant),Georgia,serif", fontWeight: 400, margin: 0 }}>{item.value}</p>
                )}
              </div>
            ))}

            {/* Map */}
            <div style={{ borderRadius: "1.25rem", overflow: "hidden", aspectRatio: "16/10", position: "relative", marginTop: "0.5rem" }}>
              <iframe
                src={STORE.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mamazee store location"
              />
            </div>

            <a
              href={STORE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "1rem 2rem", background: "#0E0D09", color: "#F8F4EE", fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", borderRadius: "100px", fontFamily: "var(--font-inter),system-ui,sans-serif" }}
            >
              Get Directions on Google Maps
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
