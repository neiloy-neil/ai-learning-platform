export const designSystem = {
  colors: {
    primary: "#2563EB",
    secondary: "#7C3AED",
    success: "#22C55E",
    danger: "#EF4444",
  },
  gradients: {
    brand: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
    brandSoft: "linear-gradient(135deg, rgb(37 99 235 / 0.18) 0%, rgb(124 58 237 / 0.18) 100%)",
  },
  typography: {
    display: "text-5xl font-semibold tracking-tight",
    h1: "text-4xl font-semibold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold tracking-tight",
    body: "text-base leading-7",
    bodySm: "text-sm leading-6",
    caption: "text-xs font-medium uppercase tracking-[0.2em]",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4.5rem",
  },
  radius: {
    sm: "0.5rem",
    md: "0.875rem",
    lg: "1.25rem",
    xl: "1.75rem",
    pill: "9999px",
  },
  shadows: {
    panel: "var(--shadow-panel)",
    floating: "var(--shadow-floating)",
    glow: "var(--shadow-glow)",
    inset: "var(--shadow-inset)",
  },
} as const;
