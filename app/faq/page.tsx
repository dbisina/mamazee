"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Do you ship Australia-wide?",
    a: "Yes, we ship to all Australian states and territories. Orders are dispatched Monday to Saturday. Standard delivery is 3 to 7 business days; express options available at checkout.",
  },
  {
    q: "Can I pick up my order in-store?",
    a: "Absolutely. Our Deanside (Melbourne) store offers local pick-up Tuesday–Sunday, 10:00 AM–7:00 PM. Place your order online and allow 2–3 hours for packing. We'll send you a WhatsApp notification when it's ready.",
  },
  {
    q: "Are your products freshly imported?",
    a: "Yes. We source directly from trusted suppliers in Nigeria and West Africa. We rotate stock regularly. If we wouldn't eat it ourselves, it doesn't go on the shelf.",
  },
  {
    q: "How do I place a bulk or wholesale order?",
    a: "Message us on WhatsApp at +61 468 324 309 or email hello@mamazee.com.au with your list and quantities. We offer competitive wholesale pricing for restaurants, caterers, and community groups.",
  },
  {
    q: "Can I send you a shopping list via WhatsApp?",
    a: "Yes! WhatsApp orders are one of our most popular options. Just send your list to +61 468 324 309 and we'll prepare a quote and arrange delivery or pick-up.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Afterpay (buy now, pay later). In-store we also accept cash.",
  },
  {
    q: "What is your returns policy?",
    a: "We stand behind every product. If an item arrives damaged or is not as described, contact us within 48 hours with a photo and we'll replace or refund it. Perishables cannot be returned unless faulty.",
  },
  {
    q: "Do you sell products not listed on the website?",
    a: "Very likely. Our in-store range is larger than what's shown online. If you're looking for something specific, message us on WhatsApp and we'll let you know if we have it and add it to your order.",
  },
  {
    q: "How are products packaged for delivery?",
    a: "All orders are carefully packed to prevent breakage. Liquid products (palm oil, coconut oil) are double-sealed and wrapped. Fragile items receive extra padding.",
  },
  {
    q: "Do you cater for events or parties?",
    a: "Yes. We supply ingredients for large Nigerian events across Melbourne. Contact us at least one week in advance so we can ensure full stock. Call or WhatsApp +61 468 324 309 to discuss your requirements.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ background: "#F8F4EE", minHeight: "100vh" }}>
      <Nav />

      {/* Header */}
      <div style={{ background: "#0E0D09", paddingTop: "clamp(8rem,14vw,11rem)", paddingBottom: "clamp(5rem,10vw,8rem)", paddingLeft: "clamp(1.5rem,4vw,4rem)", paddingRight: "clamp(1.5rem,4vw,4rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(5rem,16vw,16rem)", fontWeight: 300, color: "rgba(248,244,238,0.03)", whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1 }}>FAQ</div>
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4813A", marginBottom: "1rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Frequently Asked</p>
          <h1 style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(2rem,7vw,6.5rem)", fontWeight: 400, letterSpacing: "-0.03em", color: "#F8F4EE", margin: 0, lineHeight: 0.93 }}>
            Got <span style={{ fontStyle: "italic", color: "#C4813A" }}>questions?</span>
          </h1>
        </div>
      </div>

      {/* FAQ list */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,4rem)" }}>
        {faqs.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(14,13,9,0.1)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", textAlign: "left", padding: "1.75rem 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}
            >
              <span style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.125rem,2vw,1.5rem)", fontWeight: 400, color: "#0E0D09", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                {item.q}
              </span>
              <span style={{ fontSize: "1.5rem", color: "#2D5A16", flexShrink: 0, transition: "transform 0.3s ease", display: "inline-block", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: open === i ? "500px" : "0", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)", }}>
              <p style={{ paddingBottom: "1.75rem", fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)", lineHeight: 1.75, color: "#5C5B54", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 300, margin: 0 }}>
                {item.a}
              </p>
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div style={{ marginTop: "4rem", padding: "2.5rem", background: "#1A3A0A", borderRadius: "1.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <p style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4813A", marginBottom: "0.5rem", fontFamily: "var(--font-inter),system-ui,sans-serif", fontWeight: 500 }}>Still have questions?</p>
            <p style={{ fontFamily: "var(--font-cormorant),Georgia,serif", fontSize: "clamp(1.25rem,2.5vw,2rem)", fontWeight: 400, color: "#F8F4EE", margin: 0 }}>Chat with us on WhatsApp. We reply fast.</p>
          </div>
          <a
            href="https://wa.me/61468324309"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1.75rem", background: "#25D366", color: "#fff", fontSize: "0.875rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", borderRadius: "100px", whiteSpace: "nowrap", fontFamily: "var(--font-inter),system-ui,sans-serif", flexShrink: 0 }}
          >
            +61 468 324 309
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
