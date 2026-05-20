"use client";

const ITEMS = [
  "Garri · Egusi · Palm Oil",
  "Authentic Nigerian",
  "Chin Chin · Zobo · Kilishi",
  "Delivered Across Australia",
  "Suya Spice · Crayfish · Uziza",
  "From Our Kitchen to Yours",
];

export default function Marquee() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(14,13,9,0.1)",
        borderBottom: "1px solid rgba(14,13,9,0.1)",
        overflow: "hidden",
        background: "#2D5A16",
        padding: "1.125rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
          animation: "marquee 28s linear infinite",
        }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.75rem",
              paddingRight: "1.75rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              fontWeight: 400,
              fontStyle: i % 2 === 0 ? "italic" : "normal",
              color: "#F8F4EE",
              letterSpacing: "-0.01em",
            }}
          >
            {item}
            <span
              style={{
                display: "inline-block",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#C4813A",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
