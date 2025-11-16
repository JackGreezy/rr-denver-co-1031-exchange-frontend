import type { Config } from "tailwindcss";
import tokens from "./styles/tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: tokens.paper,
        ink: tokens.ink,
        heading: tokens.heading,
        primary: tokens.primaryBg,
        primaryfg: tokens.primaryFg,
        secondary: tokens.secondaryBg,
        secondaryfg: tokens.secondaryFg,
        outline: tokens.outline,
        panel: tokens.panel,
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;