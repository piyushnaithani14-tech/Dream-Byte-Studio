/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          base: "#050508",
          surface: "#0A0A0F",
          elevated: "#101017",
          border: "rgba(255, 219, 89, 0.12)",
          accent: "#D4AF37", // Classic Royal Gold
          "accent-bright": "#FFDB59", // Studio Tungsten Glow
          "accent-glow": "rgba(212, 175, 55, 0.35)",
          "accent-muted": "rgba(212, 175, 55, 0.15)",
          muted: "#9E9EAA",
          light: "#F5F2EB",
        },
        gold: {
          50: "#FCF8ED",
          100: "#F7EFCF",
          200: "#EFE0A2",
          300: "#E5CE71",
          400: "#DDBE4C",
          500: "#D4AF37", // Classic Venetian Gold
          600: "#B89225",
          700: "#91701B",
          800: "#6B5014",
          900: "#45320C",
        },
      },
      fontFamily: {
        sans: ['"Bauhaus 93"', '"Bauhaus"', "cursive", "sans-serif"],
        heading: ['"Bauhaus 93"', '"Bauhaus"', "cursive", "sans-serif"],
        display: ['"Bauhaus 93"', '"Bauhaus"', "cursive", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(212, 175, 55, 0.35)",
        "glow-lg": "0 0 70px -10px rgba(212, 175, 55, 0.4)",
        classic: "0 20px 40px -15px rgba(0, 0, 0, 0.8)",
      },
      letterSpacing: {
        widest: "0.22em",
        extrawide: "0.3em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shutter: "shutter 0.6s ease-in-out",
        shimmer: "shimmer 2.5s infinite linear",
      },
      keyframes: {
        shutter: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.85) rotate(15deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
