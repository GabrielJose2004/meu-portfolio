/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        surface: "#0a0a0a",
        wire: "#141414",
        muted: "#3a3a3a",
        ghost: "#6b6b6b",
        silver: "#a1a1a1",
        snow: "#ededed",
        signal: "#00ff87",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "cursor-blink": "blink 1.1s step-end infinite",
        "fade-up": "fadeUp 0.55s ease-out forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0px)" },
        },
      },
      borderColor: {
        DEFAULT: "#141414",
      },
      screens: {
        xs: "360px",
        "2k": "2560px",
      },
    },
  },
  plugins: [],
};
