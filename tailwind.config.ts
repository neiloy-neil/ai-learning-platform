
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ring: "hsl(var(--ring))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        glass: {
          DEFAULT: "hsl(var(--glass))",
          strong: "hsl(var(--glass-strong))",
          stroke: "rgb(var(--glass-stroke))",
        },
      },
      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "var(--radius-3xl)",
        pill: "9999px",
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
        floating: "var(--shadow-floating)",
        glow: "var(--shadow-glow)",
        inset: "var(--shadow-inset)",
      },
      backgroundImage: {
        "dashboard-gradient": "var(--gradient-brand)",
        "dashboard-gradient-soft": "var(--gradient-brand-soft)",
        "dashboard-noise": "radial-gradient(circle at top left, rgb(255 255 255 / 0.12), transparent 28%), radial-gradient(circle at bottom right, rgb(59 130 246 / 0.16), transparent 32%)",
        "grid-fade": "radial-gradient(circle at top, rgb(255 255 255 / 0.16), transparent 45%), linear-gradient(120deg, rgb(37 99 235 / 0.16), transparent 40%), linear-gradient(300deg, rgb(139 92 246 / 0.14), transparent 35%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "1.05" }],
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(79, 70, 229, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(79, 70, 229, 1)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease-in-out",
        glow: "glow 2s ease-in-out infinite",
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
};

export default config;

