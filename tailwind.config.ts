import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F4EE",
        "cream-dark": "#EDE8DF",
        "green-forest": "#1A3A0A",
        "green-mid": "#2D5A16",
        "green-light": "#4A7C2F",
        "green-pale": "#D4E8C4",
        "brown-earth": "#5C3A1E",
        "brown-warm": "#8B5E3C",
        "amber-gold": "#C4813A",
        "amber-light": "#E8C99A",
        ink: "#0E0D09",
        "ink-muted": "#5C5B54",
        "ink-faint": "#A0A097",
        white: "#FEFDFB",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem,10vw,9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(3rem,7vw,6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem,5vw,4.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem,3.5vw,3rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.15em" }],
        "label-md": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      spacing: {
        "section": "clamp(5rem,10vw,10rem)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16,1,0.3,1)",
        "expo-in-out": "cubic-bezier(0.87,0,0.13,1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "grain": {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "30%": { transform: "translate(3%,-1%)" },
          "50%": { transform: "translate(-1%,2%)" },
          "70%": { transform: "translate(2%,3%)" },
          "90%": { transform: "translate(-3%,1%)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 1.2s ease forwards",
        "grain": "grain 0.4s steps(1) infinite",
        "marquee": "marquee 28s linear infinite",
        "scale-in": "scale-in 1s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
