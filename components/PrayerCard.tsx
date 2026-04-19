// components/PrayerCard.tsx
import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  Pressable
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

type PrayerCardProps = {
  title: string;
  subtitle?: string;
  route: string;
  featured?: boolean;
  onPress?: (route: string) => void;
};

export default function PrayerCard({
  title,
  subtitle,
  route,
  featured,
  onPress,
}: PrayerCardProps) {
  const { theme, getFontSize } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress(route);
    }
  };

  return (
    <Pressable onPress={handlePress}>
        {({ pressed }) => (
          <View style={[
            styles.card,
            {
              borderColor: theme.border,
              backgroundColor: theme.card,
              shadowColor: theme.shadowColor,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }]
            },
          ]}>
            {/* Added a structural accent bar for a more tactical UI look */}
            <View style={[styles.accentBar, { backgroundColor: featured ? theme.accent : 'transparent' }]} />
            
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.title,
                    { 
                      color: theme.text, 
                      fontSize: getFontSize(17), // Slightly tighter for density
                      lineHeight: getFontSize(22)
                    }
                  ]}
                  numberOfLines={2}
                >
                  {title}
                </Text>
                
                {subtitle && (
                  <Text
                    style={[
                      styles.subtitle,
                      { 
                        color: theme.textSecondary, 
                        fontSize: getFontSize(13),
                        lineHeight: getFontSize(18)
                      }
                    ]}
                    numberOfLines={2}
                  >
                    {subtitle}
                  </Text>
                )}
              </View>

              <View style={[styles.arrowContainer, { backgroundColor: theme.background + '50' }]}>
                <Text style={[styles.arrow, { color: theme.accent }]}>
                  →
                </Text>
              </View>
            </View>

            {featured && (
              <View style={[
                styles.featuredBadge,
                { backgroundColor: theme.accent }
              ]}>
                <Text style={styles.featuredText}>Today</Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14, // Slightly softer but more premium radius
    marginVertical: 6, // Tighter vertical spacing for density
    borderWidth: 1,
    flexDirection: 'row', // Align accent bar and content horizontally
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  accentBar: {
    width: 4,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70, // Slightly reduced height for better information density
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontWeight: '700', // Increased weight for academic hierarchy
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontWeight: '500',
    opacity: 0.7,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 8, // Modern squared-off look
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuredBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
