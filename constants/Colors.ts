/**
 * Industrial UI Color Palette - Tech Nxxt Infrastructure
 * Optimized for high-density school and liturgical portals.
 */

const tintColorLight = '#0055D4'; // Refined Industrial Blue
const tintColorDark = '#00E5FF';  // Electric Blue for Dark Mode

export const Colors = {
  light: {
    text: '#0F172A',         // Deep Slate for better readability
    background: '#F8FAFC',   // Off-white industrial background
    tint: tintColorLight,
    icon: '#64748B',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
    // Added for tactical UI components
    card: '#FFFFFF',
    border: 'rgba(15, 23, 42, 0.08)',
    accent: '#0055D4',
  },
  dark: {
    text: '#F1F5F9',         // High-contrast slate
    background: '#0B0E14',   // Deeper tactical dark
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: '#475569',
    tabIconSelected: tintColorDark,
    // Added for tactical UI components
    card: '#161B22',         // Glassmorphic card base
    border: 'rgba(255, 255, 255, 0.1)',
    accent: '#00E5FF',
  },
};
