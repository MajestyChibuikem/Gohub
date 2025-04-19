// components/PrayerCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

// Properly define the props interface
interface PrayerCardProps {
  title: string;
  subtitle?: string;
  route: string;
  featured?: boolean;
  scale?: Animated.Value;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ 
  title, 
  subtitle, 
  route, 
  featured = false, 
  scale = new Animated.Value(1) 
}) => {
  const theme = useTheme();
  
  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: featured ? theme.accent + '15' : theme.card,
          borderColor: featured ? theme.accent : theme.border,
          transform: [{ scale }]
        }
      ]}
    >
      <Link href={route as any} asChild>
        <TouchableOpacity
          style={styles.cardContent}
          activeOpacity={0.7}
        >
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
          
          {featured && (
            <View 
              style={[
                styles.featuredBadge,
                { backgroundColor: theme.accent }
              ]}
            >
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    padding: 16,
    minHeight: 100,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  featuredBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default PrayerCard;