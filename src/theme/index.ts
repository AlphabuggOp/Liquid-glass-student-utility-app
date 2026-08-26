// src/theme/index.ts
// Liquid Glass Design System - Complete Theme

export const Colors = {
  // Backgrounds
  bgPrimary: {
    light: '#F5F5F7',
    dark: '#000000',
  },
  bgSecondary: {
    light: '#E5E5EA',
    dark: '#1C1C1E',
  },

  // Glass surfaces
  glassLight: 'rgba(255, 255, 255, 0.65)',
  glassDark: 'rgba(28, 28, 30, 0.60)',
  glassStrongLight: 'rgba(255, 255, 255, 0.85)',
  glassStrongDark: 'rgba(44, 44, 46, 0.75)',

  // Text
  textPrimary: {
    light: '#1C1C1E',
    dark: '#FFFFFF',
  },
  textSecondary: {
    light: '#636366',
    dark: '#8E8E93',
  },
  textTertiary: {
    light: '#AEAEB2',
    dark: '#48484A',
  },

  // Accents
  accentBlue: {
    light: '#007AFF',
    dark: '#0A84FF',
  },
  accentAmber: {
    light: '#FF9500',
    dark: '#FF9F0A',
  },
  accentEmerald: {
    light: '#34C759',
    dark: '#30D158',
  },
  accentRose: {
    light: '#FF3B30',
    dark: '#FF453A',
  },

  // Gradients
  gradientNotes: ['#007AFF', '#5856D6'] as const,
  gradientClock: ['#FF9500', '#FF2D55'] as const,
  gradientTimer: ['#34C759', '#00C7BE'] as const,

  // Utility
  borderLight: 'rgba(255, 255, 255, 0.10)',
  borderDark: 'rgba(255, 255, 255, 0.08)',
  borderActive: 'rgba(255, 255, 255, 0.30)',
  overlay: 'rgba(0, 0, 0, 0.40)',
};

export const Typography = {
  display: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 37,
    letterSpacing: -0.5,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  title2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 25,
    letterSpacing: -0.1,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: 0,
  },
  callout: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 21,
    letterSpacing: 0,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const Blur = {
  light: 12,
  medium: 20,
  heavy: 40,
};

export const Animations = {
  // Durations
  micro: 100,
  fast: 200,
  standard: 300,
  slow: 400,
  sharedElement: 500,

  // Easing
  standardEasing: [0.32, 0.72, 0, 1] as const,
  decelerateEasing: [0, 0, 0.2, 1] as const,
  accelerateEasing: [0.4, 0, 1, 1] as const,

  // Spring configs
  springSoft: {
    damping: 25,
    stiffness: 200,
    mass: 1,
  },
  springBouncy: {
    damping: 15,
    stiffness: 300,
    mass: 1,
  },
  springHeavy: {
    damping: 30,
    stiffness: 150,
    mass: 1,
  },
};

export const Shadows = {
  glass: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
