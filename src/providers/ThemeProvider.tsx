import React, { createContext, useContext, useMemo } from 'react';
import type { ThemeTokens } from '../hooks/useAppConfig';

export interface ColorsCompat {
  secondaryBlue: string;
  primaryBlue: string;
  primaryRed: string;
  primaryOrange: string;
  lightGray: string;
  background: string;
  foreground: string;
  headerBackground: string;
  headerForeground: string;
  navBackground: string;
  navForeground: string;
  navActive: string;
  cardBackground: string;
  cardForeground: string;
  cardSubtle: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface FontsCompat {
  sizes: {
    xs: number; sm: number; base: number; lg: number; xl: number; '2xl': number; '3xl': number; '4xl': number;
  };
  weights: {
    light: '300'; regular: '400'; medium: '500'; semibold: '600'; bold: '700'; extrabold: '800';
  };
}

function tokenToColors(t: ThemeTokens): ColorsCompat {
  const c = t?.colors ?? {};
  return {
    secondaryBlue: c.primary || '#154777',
    primaryBlue: c.primary || '#6FC5D8',
    primaryRed: c.error || '#EF3E3D',
    primaryOrange: c.accent || '#FAA21B',
    lightGray: c.surface || '#F1F2F2',
    background: c.background || '#FFFFFF',
    foreground: c.text || '#154777',
    headerBackground: c.primary || '#154777',
    headerForeground: '#FFFFFF',
    navBackground: c.primary || '#154777',
    navForeground: '#FFFFFF',
    navActive: c.accent || '#FAA21B',
    cardBackground: c.surface || '#FFFFFF',
    cardForeground: c.text || '#154777',
    cardSubtle: c.surface || '#F1F2F2',
    primary: c.primary || '#6FC5D8',
    primaryForeground: '#FFFFFF',
    secondary: c.surface || '#F1F2F2',
    secondaryForeground: c.text || '#154777',
    accent: c.accent || '#FAA21B',
    accentForeground: '#FFFFFF',
    destructive: c.error || '#EF3E3D',
    destructiveForeground: '#FFFFFF',
    muted: c.surface || '#F1F2F2',
    mutedForeground: c.textSecondary || '#6B7280',
    border: '#E5E7EB',
    input: '#E5E7EB',
    success: c.success || '#10B981',
    warning: c.warning || '#F59E0B',
    error: c.error || '#EF4444',
    info: '#3B82F6',
  };
}

function tokenToFonts(t: ThemeTokens): FontsCompat {
  const base = (t?.typography?.baseFontSize as number) ?? 16;
  const scale = base / 16;
  return {
    sizes: {
      xs: Math.round(12 * scale),
      sm: Math.round(14 * scale),
      base: Math.round(16 * scale),
      lg: Math.round(18 * scale),
      xl: Math.round(20 * scale),
      '2xl': Math.round(24 * scale),
      '3xl': Math.round(30 * scale),
      '4xl': Math.round(36 * scale),
    },
    weights: {
      light: '300' as const,
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      extrabold: '800' as const,
    },
  };
}

interface ThemeContextValue {
  theme: ThemeTokens;
  Colors: ColorsCompat;
  Fonts: FontsCompat;
  color: (key: string) => string;
  fontSize: (size: number) => number;
  spacing: (multiplier?: number) => number;
  radius: (multiplier?: number) => number;
}

const defaultTheme: ThemeTokens = {
  colors: {
    primary: '#154777',
    secondary: '#6B7280',
    accent: '#FAA21B',
    background: '#FFFFFF',
    surface: '#F1F2F2',
    text: '#154777',
    textSecondary: '#6B7280',
    error: '#EF3E3D',
    success: '#10B981',
    warning: '#F59E0B',
  },
  typography: {
    fontFamily: 'System',
    headingFamily: 'System',
    baseFontSize: 16,
    lineHeight: 1.5,
  },
  spacing: {
    unit: 8,
    borderRadius: 8,
  },
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  Colors: tokenToColors(defaultTheme),
  Fonts: tokenToFonts(defaultTheme),
  color: () => '#000',
  fontSize: (s) => s,
  spacing: (m) => (m ?? 1) * 8,
  radius: (m) => (m ?? 1) * 8,
});

export function ThemeProvider({
  children,
  theme = defaultTheme,
}: {
  children: React.ReactNode;
  theme?: ThemeTokens;
}) {
  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    Colors: tokenToColors(theme),
    Fonts: tokenToFonts(theme),
    color: (key: string) => theme?.colors?.[key] ?? defaultTheme.colors[key] ?? '#000',
    fontSize: (size: number) => {
      const base = (theme?.typography?.baseFontSize as number) ?? 16;
      return size * (base / 16);
    },
    spacing: (multiplier = 1) => {
      const unit = (theme?.spacing?.unit as number) ?? 8;
      return unit * multiplier;
    },
    radius: (multiplier = 1) => {
      const br = (theme?.spacing?.borderRadius as number) ?? 8;
      return br * multiplier;
    },
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
