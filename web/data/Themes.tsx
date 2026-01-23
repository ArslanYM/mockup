export const THEMES = {
  NEBULA_PURPLE: {
    background: "#0b0614",
    foreground: "#f5f3ff",

    card: "#120c1f",
    cardForeground: "#f5f3ff",

    popover: "#120c1f",
    popoverForeground: "#f5f3ff",

    primary: "#a78bfa",
    primaryRgb: "167, 139, 250",
    primaryForeground: "#0b0614",

    secondary: "#2a2140",
    secondaryForeground: "#d6ccff",

    muted: "#1c1430",
    mutedForeground: "#9a8fdc",

    accent: "#7c3aed",
    accentForeground: "#f5f3ff",

    destructive: "#ef4444",

    border: "#2f2450",
    input: "#2f2450",
    ring: "#a78bfa",
    radius: "0.9rem",

    chart: ["#a78bfa", "#7c3aed", "#c4b5fd", "#6366f1", "#8b5cf6"],
  },
  CYBER_NEON: {
    background: "#05060a",
    foreground: "#e5faff",

    card: "#0b0f1a",
    cardForeground: "#e5faff",

    popover: "#0b0f1a",
    popoverForeground: "#e5faff",

    primary: "#00f5d4",
    primaryRgb: "0, 245, 212",
    primaryForeground: "#05060a",

    secondary: "#1b263b",
    secondaryForeground: "#9bf6ff",

    muted: "#111827",
    mutedForeground: "#6ee7e7",

    accent: "#00bbf9",
    accentForeground: "#05060a",

    destructive: "#ff006e",

    border: "#1f2937",
    input: "#1f2937",
    ring: "#00f5d4",
    radius: "0.8rem",

    chart: ["#00f5d4", "#00bbf9", "#9bf6ff", "#38bdf8", "#22d3ee"],
  },
  SAGE_MINIMAL: {
    background: "#0f1513",
    foreground: "#ecfdf5",

    card: "#16201c",
    cardForeground: "#ecfdf5",

    popover: "#16201c",
    popoverForeground: "#ecfdf5",

    primary: "#34d399",
    primaryRgb: "52, 211, 153",
    primaryForeground: "#052e1c",

    secondary: "#1f2d28",
    secondaryForeground: "#a7f3d0",

    muted: "#1a2521",
    mutedForeground: "#6ee7b7",

    accent: "#10b981",
    accentForeground: "#ecfdf5",

    destructive: "#ef4444",

    border: "#22332d",
    input: "#22332d",
    ring: "#34d399",
    radius: "1rem",

    chart: ["#34d399", "#10b981", "#6ee7b7", "#059669", "#a7f3d0"],
  },
  SUNSET_ORANGE: {
    background: "#120a05",
    foreground: "#fff7ed",

    card: "#1b0f08",
    cardForeground: "#fff7ed",

    popover: "#1b0f08",
    popoverForeground: "#fff7ed",

    primary: "#fb923c",
    primaryRgb: "251, 146, 60",
    primaryForeground: "#120a05",

    secondary: "#2a140a",
    secondaryForeground: "#fed7aa",

    muted: "#24120a",
    mutedForeground: "#fdba74",

    accent: "#f97316",
    accentForeground: "#fff7ed",

    destructive: "#dc2626",

    border: "#3b1d0f",
    input: "#3b1d0f",
    ring: "#fb923c",
    radius: "0.9rem",

    chart: ["#fb923c", "#f97316", "#fdba74", "#ea580c", "#fed7aa"],
  },
  ARCTIC_BLUE: {
    background: "#050b14",
    foreground: "#e0f2fe",

    card: "#0b1624",
    cardForeground: "#e0f2fe",

    popover: "#0b1624",
    popoverForeground: "#e0f2fe",

    primary: "#38bdf8",
    primaryRgb: "56, 189, 248",
    primaryForeground: "#020617",

    secondary: "#0f1f33",
    secondaryForeground: "#bae6fd",

    muted: "#0b1a2b",
    mutedForeground: "#7dd3fc",

    accent: "#0ea5e9",
    accentForeground: "#e0f2fe",

    destructive: "#f43f5e",

    border: "#162a44",
    input: "#162a44",
    ring: "#38bdf8",
    radius: "0.75rem",

    chart: ["#38bdf8", "#0ea5e9", "#7dd3fc", "#0284c7", "#bae6fd"],
  },
};

export const THEME_NAME_LIST = [
  "NEBULA_PURPLE",
  "CYBER_NEON",
  "SAGE_MINIMAL",
  "SUNSET_ORANGE",
  "ARCTIC_BLUE",
] as const;

export type ThemeKey = keyof typeof THEMES;
export type theme = (typeof THEMES)[ThemeKey];

export function themeToCssVars(theme: any) {
  return `
  :root {
    --background: ${theme.background};
    --foreground: ${theme.foreground};
  
    --card: ${theme.card};
    --card-foreground: ${theme.cardForeground};
  
    --popover: ${theme.popover};
    --popover-foreground: ${theme.popoverForeground};
  
    --primary: ${theme.primary};
    --primary-rgb: ${theme.primaryRgb};
    --primary-foreground: ${theme.primaryForeground};
  
    --secondary: ${theme.secondary};
    --secondary-foreground: ${theme.secondaryForeground};
  
    --muted: ${theme.muted};
    --muted-foreground: ${theme.mutedForeground};
  
    --accent: ${theme.accent};
    --accent-foreground: ${theme.accentForeground};
  
    --destructive: ${theme.destructive};
  
    --border: ${theme.border};
    --input: ${theme.input};
    --ring: ${theme.ring};
  
    --radius: ${theme.radius};
  
    /* charts */
    --chart-1: ${theme.chart?.[0]};
    --chart-2: ${theme.chart?.[1]};
    --chart-3: ${theme.chart?.[2]};
    --chart-4: ${theme.chart?.[3]};
    --chart-5: ${theme.chart?.[4]};
  }
  `;
}
