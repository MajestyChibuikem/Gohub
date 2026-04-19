/**
 * Tech Nxxt Official UI Palette 
 * High-density industrial theme dominated by Deep Navy and Electric Cyan.
 */

const tintColorLight = '#1E40AF'; // Tech Nxxt Deep Navy
const tintColorDark = '#38BDF8';  // Tech Nxxt Electric Cyan

export const Colors = {
  light: {
    text: '#0F172A',         // Rich Navy-Slate for text
    background: '#F1F5F9',   // Cool industrial grey-white
    tint: tintColorLight,
    icon: '#475569',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
    // Tactical components
    card: '#FFFFFF',
    border: '#E2E8F0',
    accent: '#2563EB',       // Primary Blue
    surface: '#F8FAFC',
  },
  dark: {
    text: '#F8FAFC',         // Off-white for high legibility
    background: '#020617',   // "Deep Space" Navy (Tech Nxxt Core)
    tint: tintColorDark,
    icon: '#64748B',
    tabIconDefault: '#334155',
    tabIconSelected: tintColorDark,
    // Tactical components
    card: '#0F172A',         // Navy card base
    border: '#1E293B',       // Muted navy border
    accent: '#38BDF8',       // Electric Cyan accent
    surface: '#0F172A',
  },
};
