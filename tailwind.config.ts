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
        cream: {
          50: "#FFFBF7",
          100: "#FFF5EB",
          200: "#FFE8D6",
        },
        rose: {
          400: "#E8A0A0",
          500: "#D48484",
          600: "#C06B6B",
        },
        gold: {
          400: "#D4AF37",
          500: "#C9A227",
        },
        chocolate: {
          700: "#4A3728",
          800: "#3D2E22",
          900: "#2C2118",
        },
        maroon: {
          50: "#FDF2F4",
          100: "#F9E4E8",
          500: "#8B3A4A",
          600: "#722F37",
          700: "#5C252D",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
