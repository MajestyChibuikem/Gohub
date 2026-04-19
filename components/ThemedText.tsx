// components/ThemedText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ThemedTextProps extends TextProps {
  color?: string;
  type?: 'default' | 'title' | 'subtitle' | 'caption' | 'body' | 'label';
}

export default function ThemedText(props: ThemedTextProps) {
  const { theme, getFontSize } = useTheme();
  const { style, color, type = 'default', ...otherProps } = props;

  const baseStyle = {
    color: color || theme.text,
  };

  // Define base font sizes per text type - strictly following academic density
  const baseFontSizes = {
    default: 16,
    title: 26, // Increased for clear page entry points
    subtitle: 19,
    caption: 13, // Slightly smaller for technical footnotes
    body: 16,
    label: 12, // New tactical type for small tags/badges
  };

  // Apply the font size adjustment from context
  const fontSize = getFontSize(baseFontSizes[type]);

  const typeStyles = {
    default: { 
      fontSize, 
      fontWeight: '400' as const 
    },
    title: { 
      fontSize, 
      fontWeight: '800' as const, // Extra bold for primary university headers
      letterSpacing: -0.6,
      marginBottom: 4 
    },
    subtitle: { 
      fontSize, 
      fontWeight: '700' as const, 
      letterSpacing: -0.3,
      opacity: 0.9 
    },
    caption: { 
      fontSize, 
      color: theme.textSecondary,
      fontWeight: '500' as const,
      lineHeight: fontSize * 1.4
    },
    body: { 
      fontSize, 
      lineHeight: fontSize * 1.6, // Higher line height for better textbook-style reading
      fontWeight: '400' as const
    },
    label: {
      fontSize,
      fontWeight: '800' as const,
      textTransform: 'uppercase' as const, // Industrial tagging look
      letterSpacing: 1.2,
      color: theme.accent,
    }
  };

  return (
    <Text
      style={[baseStyle, typeStyles[type], style]}
      {...otherProps}
    />
  );
}
