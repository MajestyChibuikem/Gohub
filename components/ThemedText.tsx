// components/ThemedText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ThemedTextProps extends TextProps {
  color?: string;
  type?: 'default' | 'title' | 'subtitle' | 'caption' | 'body';
}

export default function ThemedText(props: ThemedTextProps) {
  const { theme, getFontSize } = useTheme();
  const { style, color, type = 'default', ...otherProps } = props;

  const baseStyle = {
    color: color || theme.text,
  };

  // Define base font sizes per text type
  const baseFontSizes = {
    default: 16,
    title: 24,
    subtitle: 18,
    caption: 14,
    body: 16,
  };

  // Apply the font size adjustment from settings
  const fontSize = getFontSize(baseFontSizes[type]);

  const typeStyles = {
    default: { fontSize },
    title: { fontSize, fontWeight: 'bold' as 'bold' },
    subtitle: { fontSize, fontWeight: '500' as '500' },
    caption: { fontSize, color: theme.textSecondary },
    body: { fontSize, lineHeight: fontSize * 1.5 },
  };

  return (
    <Text
      style={[baseStyle, typeStyles[type], style]}
      {...otherProps}
    />
  );
}