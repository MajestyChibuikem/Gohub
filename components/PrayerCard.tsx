// components/PrayerCard.tsx
import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  Pressable
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'expo-router';

type PrayerCardProps = {
  title: string;
  subtitle?: string;
  route: string;
  featured?: boolean;
};

export default function PrayerCard({
  title,
  subtitle,
  route,
  featured,
}: PrayerCardProps) {
  const { theme, getFontSize } = useTheme();

  return (
    <Link href={route as any} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[
            styles.card,
            {
              borderColor: theme.border,
              backgroundColor: theme.card,
              shadowColor: theme.shadowColor,
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }]
            },
          ]}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.title,
                    { 
                      color: theme.text, 
                      fontSize: getFontSize(18),
                      lineHeight: getFontSize(24)
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
                        fontSize: getFontSize(14),
                        lineHeight: getFontSize(20)
                      }
                    ]}
                    numberOfLines={2}
                  >
                    {subtitle}
                  </Text>
                )}
              </View>

              <View style={styles.arrowContainer}>
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
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 80,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.8,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  featuredBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});