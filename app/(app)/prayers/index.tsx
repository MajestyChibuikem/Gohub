import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { 
  Animated, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar,
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import PrayerCard from '../../../components/PrayerCard';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 100;

// Define proper interfaces for type safety
interface PrayerItem {
  title: string;
  route: string;
  featured?: boolean;
  subtitle?: string;
}

interface PrayerSection {
  id: string;
  title: string;
  icon: string;
  items: PrayerItem[];
}

export default function PrayersScreen() {
  const { theme, getFontSize } = useTheme();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [expandedSection, setExpandedSection] = useState<string>('daily');
  
  // Get current day of week for featured prayer
  const getDayOfWeek = (): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };
  
  const currentDay = getDayOfWeek();
  
  // All prayer categories with correct routes for (app) directory
  const prayerSections: PrayerSection[] = [
    {
      id: 'daily',
      title: 'Daily Prayers',
      icon: '📆',
      items: [
        { title: 'Monday Prayer', route: '[day]?day=Monday', featured: currentDay === 'Monday' },
        { title: 'Tuesday Prayer', route: '[day]?day=Tuesday', featured: currentDay === 'Tuesday' },
        { title: 'Wednesday Prayer', route: '[day]?day=Wednesday', featured: currentDay === 'Wednesday' },
        { title: 'Thursday Prayer', route: '[day]?day=Thursday', featured: currentDay === 'Thursday' },
        { title: 'Friday Prayer', route: '[day]?day=Friday', featured: currentDay === 'Friday' },
        { title: 'Saturday Prayer', route: '[day]?day=Saturday', featured: currentDay === 'Saturday' },
        { title: 'Sunday Prayer', route: '[day]?day=Sunday', featured: currentDay === 'Sunday' },
      ]
    },
    {
      id: 'traditional',
      title: 'Traditional Prayers',
      icon: '🙏',
      items: [
        { title: 'THE ANGELUS', route: 'traditionalprayers?prayer=angelus', subtitle: 'Traditional Catholic devotion' },
        { title: 'The Regina Caeli', route: 'traditionalprayers?prayer=regina-caeli', subtitle: 'Easter season prayer' },
        { title: 'The Order of Mass', route: 'traditionalprayers?prayer=order-of-the-mass', subtitle: 'Structure of the Mass' },
        { title: 'The Holy Rosary', route: 'traditionalprayers?prayer=holy-rosary', subtitle: 'Marian devotion' },
      ]
    },
    {
      id: 'sacramental',
      title: 'Sacramental Prayers',
      icon: '✝️',
      items: [
        { title: 'LITANY OF THE SACRED HEART', route: 'sacramentalprayers?prayer=litany-of-the-sacred-heart' },
        { title: 'PRAYER FOR CONFESSION', route: 'sacramentalprayers?prayer=prayer-for-confession' },
        { title: 'Prayer for Grace To Make a Good Confession', route: 'sacramentalprayers?prayer=prayer-for-grace' },
        { title: 'BEFORE HOLY COMMUNION', route: 'sacramentalprayers?prayer=before-holy-communion' },
        { title: 'AFTER HOLY COMMUNION', route: 'sacramentalprayers?prayer=after-the-holy-communion' },
      ]
    },
    {
      id: 'saints',
      title: 'Saints & Devotions',
      icon: '👼',
      items: [
        { title: 'PRAYER TO THE HOLY SPIRIT', route: 'saints?prayer=prayer-to-the-holy-spirit' },
        { title: 'PRAYER OF SAINT FRANCIS', route: 'saints?prayer=prayer-of-saint-francis' },
        { title: "ST PATRICK'S PRAYER", route: 'saints?prayer=st-patricks-prayer' },
        { title: 'CATENA', route: 'saints?prayer=catena' },
      ]
    },
    {
      id: 'daily-life',
      title: 'Daily Life',
      icon: '🌞',
      items: [
        { title: 'MORNING OFFERING', route: 'daily?prayer=morning-offering' },
        { title: 'PRAYER WHILE ABOUT TO SLEEP', route: 'daily?prayer=Sleep-prayer' },
        { title: 'GRACE BEFORE MEALS', route: 'daily?prayer=grace-before-meals' },
        { title: 'GRACE AFTER MEALS', route: 'daily?prayer=grace-after-meals' },
      ]
    },
    {
      id: 'university',
      title: 'University Prayers',
      icon: '🎓',
      items: [
        { title: 'UNIVERSITY PRAYER', route: 'universityprayers?prayer=university-prayer', subtitle: 'Prayer for academic excellence' },
      ]
    },
  ];

  // Find today's prayer
  const todaysPrayer = prayerSections[0].items.find(item => item.featured);

  const toggleSection = (sectionId: string): void => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  // Handle navigation to prayer
  const handlePrayerNavigation = (route: string) => {
    console.log('🔍 Navigation attempt:', route);
    console.log('📍 Current location: app/(app)/prayers/index.tsx');
    console.log('🎯 Attempting to navigate to:', route);
    
    try {
      if (route.includes('[day]')) {
        // Extract day from route like "[day]?day=Monday"
        const dayMatch = route.match(/day=([^&]+)/);
        const day = dayMatch ? dayMatch[1] : 'Monday';
        console.log('📅 Navigating to day:', day);
        router.push({
          pathname: '/(app)/prayers/[day]',
          params: { day }
        });
      } else if (route.includes('?')) {
        // Handle routes with query parameters like "traditionalprayers?prayer=angelus"
        const [pathname, queryString] = route.split('?');
        const params = new URLSearchParams(queryString);
        const prayer = params.get('prayer');
        console.log('📖 Navigating to prayer:', prayer, 'in', pathname);
        router.push({
          pathname: `/(app)/prayers/${pathname}`,
          params: { prayer }
        } as any);
      } else {
        // Handle simple routes
        router.push(`/(app)/prayers/${route}` as any);
      }
      console.log('✅ Navigation successful');
    } catch (error) {
      console.error('❌ Navigation failed:', error);
    }
  };

  // Animation for prayer items when scrolled
  const getItemAnimation = (index: number, sectionIndex: number) => {
    // Calculate position based on section and item indices
    const position = sectionIndex * 200 + index * ITEM_HEIGHT;
    
    const inputRange = [
      position - 100, // Before visible
      position,       // Perfectly centered
      position + 100  // After visible
    ];
    
    // Scale animation
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.95, 1.05, 0.95],
      extrapolate: 'clamp'
    });
    
    // Opacity animation
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp'
    });
    
    return { scale, opacity };
  };

  const renderItem = (item: PrayerItem, index: number, sectionIndex: number) => {
    const { scale, opacity } = getItemAnimation(index, sectionIndex);
  
    return (
      <Animated.View
        key={item.title}
        style={{
          opacity,
          transform: [{ scale }],
          marginBottom: 10
        }}
      >
        <PrayerCard
          title={item.title}
          subtitle={item.subtitle}
          route={item.route}
          featured={item.featured}
          onPress={handlePrayerNavigation}
        />
      </Animated.View>
    );
  };

  const renderSection = (section: PrayerSection, sectionIndex: number) => {
    const isExpanded = expandedSection === section.id;
    
    // Header animation
    const headerRotate = isExpanded ? '0deg' : '-90deg';
    
    return (
      <View key={section.id} style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={() => toggleSection(section.id)}
          style={[
            styles.sectionHeader,
            {
              backgroundColor: isExpanded ? theme.accent : theme.card,
              borderColor: theme.border,
              shadowColor: theme.shadowColor
            }
          ]}
        >
          <View style={styles.sectionHeaderContent}>
            <Text style={styles.sectionIcon}>{section.icon}</Text>
            <Text style={[
              styles.sectionTitle,
              { 
                color: isExpanded ? '#fff' : theme.text,
                fontSize: getFontSize(18)
              }
            ]}>
              {section.title}
            </Text>
          </View>
          
          <Animated.Text
            style={[
              styles.expandIcon,
              { 
                color: isExpanded ? '#fff' : theme.text,
                transform: [{ rotate: headerRotate }],
                fontSize: getFontSize(24)
              }
            ]}
          >
            ›
          </Animated.Text>
        </TouchableOpacity>
        
        {isExpanded && (
          <Animated.View 
            style={[
              styles.sectionContent,
              { backgroundColor: theme.subtle }
            ]}
          >
            {section.items.map((item, index) => 
              renderItem(item, index, sectionIndex)
            )}
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.background}
      />
      
      <View style={[styles.header, { 
        backgroundColor: theme.surface,
        borderBottomColor: theme.border,
        shadowColor: theme.shadowColor
      }]}>
        <Text style={[styles.pageTitle, { 
          color: theme.text,
          fontSize: getFontSize(24)
        }]}>
          Prayer Book
        </Text>
      </View>
      
      {todaysPrayer && (
        <View style={[styles.todayContainer, { 
          backgroundColor: theme.highlight, 
          borderColor: theme.accent 
        }]}>
          <Text style={[styles.todayTitle, { 
            color: theme.text,
            fontSize: getFontSize(16)
          }]}>
            Today's Prayer ({currentDay})
          </Text>
          <TouchableOpacity 
            onPress={() => handlePrayerNavigation(todaysPrayer.route)}
          >
            <Text style={[styles.todayLink, { 
              color: theme.accent,
              fontSize: getFontSize(18)
            }]}>
              {todaysPrayer.title} →
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Platform.OS === 'ios' ? 80 : 40 }
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {prayerSections.map((section, index) => 
          renderSection(section, index)
        )}
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { 
            color: theme.text,
            fontSize: getFontSize(14)
          }]}>
            GOHUB Prayer Book- MAJESTY
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pageTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  todayContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  todayTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  todayLink: {
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  expandIcon: {
    fontWeight: 'bold',
  },
  sectionContent: {
    paddingTop: 12,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontWeight: '500',
  },
}); 