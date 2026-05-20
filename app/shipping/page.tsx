import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Shipping Info — Mamazee",
  description: "Delivery options, timelines, and pricing for Mamazee orders across Australia.",
};

const zones = [
  { region: "Victoria (Metro)", standard: "2–4 business days", express: "Next business day", standardCost: "$8.95", expressCost: "$14.95" },
  { region: "Victoria (Regional)", standard: "3–6 business days", express: "2 business days", standardCost: "$10.95", expressCost: "$16.95" },
  { region: "NSW / ACT / QLD", standard: "3–6 business days", express: "1–2 business days", standardCost: "$12.95", expressCost: "$18.95" },
  { region: "SA / WA / NT / TAS", standard: "5–8 business days", express: "2–4 business days", standardCost: "$14.95", expressCost: "$22.95" },
];

const faqs = [
  { q: "When do you dispatch?", a: "Orders placed before 12PM Monday–Saturday are dispatched the same day. Orders after 12PM dispatch the next business day." },
  { q: "Do you offer free shipping?", a: "Free standard shipping on orders over $120 Australia-wide." },
  { q: "What carriers do you use?", a: "Australia Post and Couriers Please — both with full tracking. You'll receive a tracking number by email once your order is dispatched." },
  { q: "Can I pick up in-store?", a: "Yes — pick-up is available at 68 Malone Cct, Deanside VIC 3336. Tuesday–Sunday, 10:00 AM–7:00 PM. Allow 2–3 hours from order time." },
  { q: "What if my order arrives damaged?", a: "Contact us within 48 hours with a photo. We'll replace or refund — no questions asked." },
];

export default function ShippingPage() {
  return (
    <div style={{ background: "#F8F4EE", minHeight: "100vh" }}>
      <Nav />

      {/* Header */}
      <div style={{ background: "#0E0D09", paddingTop: "clamp(8rem,14vw,11rem)", paddingBottom: "clamp(5rem,10vw,8rem)", paddingLeft: "clamp(1.5rem,4vw,4rem)", paddingRight: "clamp(1.5rem,4vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(4rem,14vw,14rem)", fontWeight: 300, color: "rgba(248,244,238,0.03)", whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1 }}>Shipping</div>
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4813A", marginBottom: "1rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Delivery</p>
          <h1 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(3rem,7vw,6.5rem)", fontWeight: 400, letterSpacing: "-0.03em", color: "#F8F4EE", margin: 0, lineHeight: 0.93 }}>
            Shipping <span style={{ fontStyle: "italic", color: "#C4813A" }}>Info.</span>
          </h1>
          <p style={{ marginTop: "1.5rem", fontSize: "clamp(0.9375rem,1.5vw,1rem)", color: "rgba(248,244,238,0.55)", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300, maxWidth: "500px" }}>
            Free shipping on orders over $120 · AU-wide · Fully tracked
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,4rem)" }}>

        {/* Highlights */}
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem", marginBottom: "clamp(4rem,7vw,7rem)" }}>
            {[
              { num: "$120+", label: "Free shipping", sub: "On all orders over $120" },
              { num: "Same day", label: "Dispatch", sub: "Orders before 12PM, Mon–Sat" },
              { num: "Tracked", label: "Delivery", sub: "Australia Post & Couriers Please" },
              { num: "2–3 hrs", label: "Pick-up ready", sub: "Deanside store, Tue–Sun" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "2rem", borderRadius: "1.25rem", border: "1px solid rgba(14,13,9,0.1)", background: "#fff" }}>
                <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.75rem,3vw,2.5rem)", fontWeight: 400, color: "#2D5A16", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.num}</div>
                <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0E0D09", marginTop: "0.75rem", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{s.label}</div>
                <div style={{ fontSize: "0.8125rem", color: "#A0A097", marginTop: "0.25rem", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Rates table */}
        <ScrollReveal>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.75rem,4vw,3.5rem)", fontWeight: 400, letterSpacing: "-0.025em", color: "#0E0D09", margin: "0 0 2.5rem" }}>
            Delivery <span style={{ fontStyle: "italic", color: "#2D5A16" }}>rates.</span>
          </h2>
        </ScrollReveal>

        <div style={{ overflowX: "auto", marginBottom: "clamp(4rem,7vw,7rem)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(14,13,9,0.12)" }}>
                {["Region", "Standard", "Est. Time", "Express", "Est. Time"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C4813A", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={z.region} style={{ borderBottom: "1px solid rgba(14,13,9,0.08)", background: i % 2 === 0 ? "transparent" : "rgba(14,13,9,0.02)" }}>
                  <td style={{ padding: "1.25rem", fontSize: "0.9375rem", color: "#0E0D09", fontWeight: 500 }}>{z.region}</td>
                  <td style={{ padding: "1.25rem", fontSize: "0.9375rem", color: "#2D5A16", fontWeight: 500 }}>{z.standardCost}</td>
                  <td style={{ padding: "1.25rem", fontSize: "0.875rem", color: "#5C5B54" }}>{z.standard}</td>
                  <td style={{ padding: "1.25rem", fontSize: "0.9375rem", color: "#2D5A16", fontWeight: 500 }}>{z.expressCost}</td>
                  <td style={{ padding: "1.25rem", fontSize: "0.875rem", color: "#5C5B54" }}>{z.express}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* In-store pick-up */}
        <ScrollReveal>
          <div style={{ padding: "clamp(2.5rem,5vw,4rem)", background: "#1A3A0A", borderRadius: "1.5rem", marginBottom: "clamp(4rem,7vw,7rem)", display: "flex", flexWrap: "wrap", gap: "3rem", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4813A", marginBottom: "0.75rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Free Option</p>
              <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.75rem,3.5vw,2.75rem)", fontWeight: 400, color: "#F8F4EE", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>In-Store Pick-Up</h3>
              <p style={{ fontSize: "0.9375rem", color: "rgba(248,244,238,0.65)", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300, maxWidth: "420px", lineHeight: 1.7 }}>
                Free, always. Order online and collect from our Deanside store. Ready within 2–3 hours.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", justifyContent: "center" }}>
              <p style={{ fontSize: "0.875rem", color: "rgba(248,244,238,0.7)", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>📍 68 Malone Cct, Deanside VIC 3336</p>
              <p style={{ fontSize: "0.875rem", color: "rgba(248,244,238,0.7)", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>🕐 Tue–Sun · 10:00 AM – 7:00 PM</p>
              <p style={{ fontSize: "0.875rem", color: "rgba(248,244,238,0.7)", fontFamily: "var(--font-inter),system-ui,sans-serif" }}>📞 +61 468 324 309</p>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs */}
        <ScrollReveal>
          <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.75rem,4vw,3.5rem)", fontWeight: 400, letterSpacing: "-0.025em", color: "#0E0D09", margin: "0 0 2.5rem" }}>
            Common <span style={{ fontStyle: "italic", color: "#2D5A16" }}>questions.</span>
          </h2>
        </ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
          {faqs.map((f) => (
            <div key={f.q} style={{ borderTop: "1px solid rgba(14,13,9,0.1)", paddingTop: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "1.25rem", fontWeight: 400, color: "#0E0D09", margin: "0 0 0.75rem" }}>{f.q}</h3>
              <p style={{ fontSize: "0.9375rem", color: "#5C5B54", lineHeight: 1.7, fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
