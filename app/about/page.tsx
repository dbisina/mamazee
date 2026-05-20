import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Our Story — Mamazee",
  description: "How Mamazee was built by the Nigerian diaspora, for the diaspora.",
};

const values = [
  { num: "01", title: "Authenticity", body: "Every product traced to origin. No substitutes, no compromises — just the real thing your mother used." },
  { num: "02", title: "Community", body: "We exist because of the diaspora. Your orders fund a store where Nigerians can gather, taste, and belong." },
  { num: "03", title: "Freshness", body: "Constant stock rotation. If we wouldn't eat it ourselves, it doesn't go on the shelf." },
  { num: "04", title: "Accessibility", body: "Online delivery AU-wide plus local pick-up in Melbourne. Nigerian food shouldn't require a special trip." },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#F8F4EE", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <div style={{ background: "#0E0D09", paddingTop: "clamp(8rem,14vw,11rem)", paddingBottom: "clamp(5rem,10vw,9rem)", paddingLeft: "clamp(1.5rem,4vw,4rem)", paddingRight: "clamp(1.5rem,4vw,4rem)", overflow: "hidden", position: "relative" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(5rem,16vw,16rem)", fontWeight: 300, color: "rgba(248,244,238,0.03)", whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "-0.04em", lineHeight: 1 }}>Story</div>
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4813A", marginBottom: "1rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Our Story</p>
          <h1 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(3rem,7vw,7rem)", fontWeight: 400, letterSpacing: "-0.03em", color: "#F8F4EE", margin: 0, lineHeight: 0.93, maxWidth: "800px" }}>
            Built by the{" "}
            <span style={{ fontStyle: "italic", color: "#C4813A" }}>diaspora,</span>
            <br />for the diaspora.
          </h1>
        </div>
      </div>

      {/* Story body */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,4vw,4rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(4rem,8vw,10rem)", alignItems: "start" }}>
          <ScrollReveal>
            <div>
              <p style={{ fontSize: "clamp(1.0625rem,1.8vw,1.25rem)", lineHeight: 1.8, color: "#0E0D09", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300, marginBottom: "2rem" }}>
                Mamazee started from a simple truth: the taste of home shouldn&apos;t be hard to find.
              </p>
              <p style={{ fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)", lineHeight: 1.75, color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300, marginBottom: "2rem" }}>
                When our founders arrived in Melbourne, they discovered what every Nigerian in the diaspora knows too well: finding authentic ingredients meant long drives to specialty shops — if they existed at all. Palm oil that tasted right. Garri that soaked properly. Crayfish that actually smelled like home.
              </p>
              <p style={{ fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)", lineHeight: 1.75, color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300 }}>
                So in 2019, they opened Mamazee from a small store in Melbourne. Today we ship AU-wide, carry 200+ products sourced directly from Nigeria and West Africa, and still believe that every packet of garri and every bottle of palm oil should carry the real thing — no compromise, no substitutes.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div style={{ background: "#1A3A0A", borderRadius: "1.5rem", padding: "clamp(2rem,4vw,3.5rem)" }}>
              <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(4rem,8vw,7rem)", fontWeight: 300, color: "rgba(248,244,238,0.08)", lineHeight: 1, marginBottom: "-1.5rem" }}>&ldquo;</div>
              <p style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.375rem,2.5vw,2rem)", fontWeight: 400, color: "#F8F4EE", lineHeight: 1.4, letterSpacing: "-0.01em", fontStyle: "italic", marginBottom: "2rem" }}>
                No compromise. No substitutes. Just your childhood favourites, ready to order online or pick up in Melbourne.
              </p>
              <p style={{ fontSize: "0.8125rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C4813A", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>
                — Mamazee Founders, 2019
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <div style={{ marginTop: "clamp(6rem,10vw,10rem)" }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2rem,4vw,4rem)", fontWeight: 400, letterSpacing: "-0.025em", color: "#0E0D09", margin: "0 0 clamp(3rem,5vw,5rem)" }}>
              What we <span style={{ fontStyle: "italic", color: "#2D5A16" }}>stand for.</span>
            </h2>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem" }}>
            {values.map((v, i) => (
              <ScrollReveal key={v.num} delay={i * 80}>
                <div style={{ borderTop: "1px solid rgba(14,13,9,0.12)", paddingTop: "2rem" }}>
                  <div style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "0.875rem", letterSpacing: "0.12em", color: "#C4813A", marginBottom: "1rem", fontWeight: 500 }}>{v.num}</div>
                  <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.375rem,2.5vw,2rem)", fontWeight: 400, color: "#0E0D09", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>{v.title}</h3>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300 }}>{v.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Store CTA */}
        <ScrollReveal>
          <div style={{ marginTop: "clamp(6rem,10vw,10rem)", padding: "clamp(3rem,6vw,5rem)", background: "#0E0D09", borderRadius: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
            <div>
              <p style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4813A", marginBottom: "0.75rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Visit Us</p>
              <h3 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 400, color: "#F8F4EE", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>68 Malone Cct, Deanside VIC 3336</h3>
              <p style={{ fontSize: "0.9375rem", color: "rgba(248,244,238,0.55)", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300 }}>Tue–Sun · 10:00 AM – 7:00 PM · +61 468 324 309</p>
            </div>
            <a
              href="https://maps.google.com/?cid=15851661521598341560"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2rem", background: "#2D5A16", color: "#F8F4EE", fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", borderRadius: "100px", whiteSpace: "nowrap", fontFamily: "var(--font-inter),system-ui,sans-serif", flexShrink: 0 }}
            >
              Get Directions
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </a>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
}
