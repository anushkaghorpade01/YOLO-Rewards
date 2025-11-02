import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        "dark-bg": "hsl(var(--dark-bg))",
        "dark-text": "hsl(var(--dark-text))",
        "light-bg": "hsl(var(--light-bg))",
        "light-text": "hsl(var(--light-text))",
        
        coral: {
          DEFAULT: "hsl(var(--coral))",
          hover: "hsl(var(--coral-hover))",
        },
        
        "muted-grey": "hsla(var(--muted-grey), var(--muted-grey-opacity))",
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['Zin Display Condensed', 'Arial Narrow', 'sans-serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "var(--radius-card)",
      },
      transitionTimingFunction: {
        'out-cubic': 'var(--ease-out-cubic)',
        'in-out-cubic': 'var(--ease-in-out-cubic)',
        'out-back': 'var(--ease-out-back)',
      },
      boxShadow: {
        'elegant': '0 4px 24px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "flip": {
          "0%": { transform: "rotateX(0)" },
          "50%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0)" },
        },
        "parachute-fall": {
          "0%": { transform: "translateY(-200px) translateX(20px) rotate(5deg)", opacity: "0" },
          "50%": { transform: "translateY(40px) translateX(-10px) rotate(-3deg)", opacity: "1" },
          "100%": { transform: "translateY(0) translateX(0) rotate(0)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s var(--ease-out-cubic)",
        "fade-out": "fade-out 0.3s var(--ease-out-cubic)",
        "slide-up": "slide-up 0.6s var(--ease-out-cubic)",
        "scale-in": "scale-in 0.2s var(--ease-out-cubic)",
        "flip": "flip 0.5s var(--ease-in-out-cubic)",
        "parachute-fall": "parachute-fall 1.2s var(--ease-out-back)",
        "pulse-soft": "pulse-soft 0.12s var(--ease-in-out-cubic)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
