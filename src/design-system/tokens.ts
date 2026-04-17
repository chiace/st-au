export const designTokens = {
  metadata: {
    name: "Superteam Australia Design Tokens",
    version: "1.0.0",
    updatedAt: "2026-04-17",
  },
  colors: {
    ink: "#07101F",
    inkSoft: "#08162B",
    green: "#00833E",
    greenSoft: "#22A35A",
    gold: "#FECE00",
    goldSoft: "#FFE066",
    azure: "#6FD3FF",
    violet: "#7B6DFF",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    surfaceLight: "#F8FAFC",
    surfaceLightWarm: "#FBF5E7",
    white: "#FFFFFF",
  },
  gradients: {
    brandAurora:
      "linear-gradient(135deg,#07101F 0%,#112216 34%,#00833E 78%,#FECE00 140%)",
    primaryCta:
      "linear-gradient(135deg,#0f7d43 0%,#00833E 44%,#22a35a 72%,#FECE00 100%)",
    supportPanel:
      "linear-gradient(115deg,rgba(112,156,58,0.98) 0%,rgba(64,132,62,0.97) 28%,rgba(184,179,63,0.94) 64%,rgba(247,198,58,0.92) 100%)",
    darkCard:
      "linear-gradient(180deg,rgba(8,14,24,0.96),rgba(7,11,20,0.94))",
  },
  typography: {
    fontFamilies: {
      display: "Space Grotesk, sans-serif",
      body: "Plus Jakarta Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    sizes: {
      displayXL: "4.5rem",
      displayL: "3.5rem",
      headingL: "3rem",
      headingM: "2rem",
      headingS: "1.5rem",
      bodyL: "1.125rem",
      bodyM: "1rem",
      bodyS: "0.875rem",
      label: "0.6875rem",
    },
    tracking: {
      tight: "-0.06em",
      heading: "-0.04em",
      label: "0.24em",
      mono: "0.2em",
    },
    lineHeights: {
      display: 0.9,
      heading: 1.05,
      body: 1.75,
      compact: 1.5,
    },
  },
  spacing: {
    /** 4px grid — use for padding/gaps where Tailwind scale is not enough */
    scale: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
    },
    sectionYMobile: "2rem",
    sectionYDesktop: "3.5rem",
    containerXMobile: "1rem",
    containerXDesktop: "2rem",
    cardGap: "1.25rem",
    formGap: "1rem",
  },
  layout: {
    /** Primary page column — use Tailwind `max-w-site` (`--width-site`) */
    containerMax: "1320px",
    contentNarrow: "920px",
    contentSplit: "980px",
    modalWide: "900px",
    headerCompact: "420px",
  },
  radii: {
    pill: "999px",
    small: "0.875rem",
    medium: "1rem",
    large: "1.5rem",
    xl: "1.75rem",
    hero: "2.375rem",
  },
  shadows: {
    subtle: "0 10px 28px rgba(7, 18, 45, 0.04)",
    card: "0 16px 40px rgba(8, 17, 39, 0.05)",
    panel: "0 24px 70px rgba(3, 8, 18, 0.18)",
    modal: "0 20px 50px rgba(15, 23, 42, 0.12)",
  },
  motion: {
    durations: {
      fast: "180ms",
      base: "240ms",
      slow: "700ms",
    },
    easing: {
      /** Framer Motion / JS cubic array */
      standardBezier: [0.22, 1, 0.36, 1] as const,
      /** CSS `transition`, `animation` */
      standardCss: "cubic-bezier(0.22, 1, 0.36, 1)",
      emphasis: "ease-in-out",
      linear: "linear",
    },
    principles: {
      reveal: "Small upward movement with soft easing.",
      hover: "Subtle lift only where it improves affordance.",
      reducedMotion: "Respect OS preferences and remove non-essential motion.",
    },
  },
  breakpoints: {
    sm: "640px",
    lg: "1024px",
    xl: "1280px",
  },
  zIndex: {
    base: 0,
    header: 50,
    modal: 80,
  },
} as const;

export type DesignTokens = typeof designTokens;
