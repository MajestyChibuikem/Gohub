import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.heading, 
          isOpen && styles.headingActive,
          { borderBottomColor: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }
        ]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.7}>
        <IconSymbol
          name="chevron.right"
          size={16} // Slightly smaller for a tighter, tactical look
          weight="bold" // Heavier weight for clear interaction state
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold" style={styles.titleText}>{title}</ThemedText>
      </TouchableOpacity>
      
      {isOpen && (
        <ThemedView style={[
          styles.content,
          { borderLeftColor: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }
        ]}>
          {children}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  headingActive: {
    backgroundColor: 'rgba(0,0,0,0.02)', // Subtle highlight when open
  },
  titleText: {
    fontSize: 15,
    letterSpacing: 0.2,
  },
  content: {
    marginTop: 4,
    marginLeft: 14,
    paddingLeft: 16,
    paddingVertical: 8,
    borderLeftWidth: 2, // Tactical vertical line to group the child content
  },
});
