/**
 * All Prayers Aggregator
 * Consolidates all prayers from different categories into a single searchable array
 */

// Import all prayer files
// Traditional Prayers
import Angelus from '@assets/prayers/traditional/angelus.json';
import ReginaCaeli from '@assets/prayers/traditional/ReginaCaeli.json';
import TheHolyRosary from '@assets/prayers/traditional/TheHolyRosary.json';
import OrderOfTheMass from '@assets/prayers/traditional/OrderOfTheMass.json';

// Sacramental Prayers
import AfterHolyCommunion from '@assets/prayers/SacramentalPrayers/AfterHolyCommunion.json';
import BeforeHolyCommunion from '@assets/prayers/SacramentalPrayers/BeforeHolyCommunion.json';
import LitanyOfTheSacredHeart from '@assets/prayers/SacramentalPrayers/LitanyOfTheSacredHeart.json';
import PrayerForConfession from '@assets/prayers/SacramentalPrayers/PrayerForConfession.json';
import PrayerForGrace from '@assets/prayers/SacramentalPrayers/PrayerForGraceToMakeAGoodConfession.json';

// Saints & Devotions
import Catena from '@assets/prayers/SaintsAndDevotions/Catena.json';
import PrayerOfSaintFrancis from '@assets/prayers/SaintsAndDevotions/PrayerOfSaintFrancis.json';
import StPatricksPrayer from '@assets/prayers/SaintsAndDevotions/StPatricksPrayer.json';
import PrayerToTheHolySpirit from '@assets/prayers/SaintsAndDevotions/PrayerToTheHolySpirit.json';

// Daily Life Prayers
import GraceAfterMeals from '@assets/prayers/DailyLife/GraceAfterMeals.json';
import GraceBeforeMeals from '@assets/prayers/DailyLife/GraceBeforeMeals.json';
import MorningOffering from '@assets/prayers/DailyLife/MorningOffering.json';
import SleepPrayer from '@assets/prayers/DailyLife/SleepPrayer.json';

// University Prayer
import UniversityPrayer from '@assets/prayers/others/universityPrayer.json';

// Daily Office Prayers - Morning
import mondayMorning from '@assets/prayers/morning/monday.json';
import tuesdayMorning from '@assets/prayers/morning/tuesday.json';
import wednesdayMorning from '@assets/prayers/morning/wednesday.json';
import thursdayMorning from '@assets/prayers/morning/thursday.json';
import fridayMorning from '@assets/prayers/morning/friday.json';
import saturdayMorning from '@assets/prayers/morning/saturday.json';
import sundayMorning from '@assets/prayers/morning/sunday.json';

// Daily Office Prayers - Mid-day
import mondayMidDay from '@assets/prayers/mid-day/monday.json';
import tuesdayMidDay from '@assets/prayers/mid-day/tuesday.json';
import wednesdayMidDay from '@assets/prayers/mid-day/wednesday.json';
import thursdayMidDay from '@assets/prayers/mid-day/thursday.json';
import fridayMidDay from '@assets/prayers/mid-day/friday.json';
import saturdayMidDay from '@assets/prayers/mid-day/saturday.json';
import sundayMidDay from '@assets/prayers/mid-day/sunday.json';

// Daily Office Prayers - Evening
import mondayEvening from '@assets/prayers/evening/monday.json';
import tuesdayEvening from '@assets/prayers/evening/tuesday.json';
import wednesdayEvening from '@assets/prayers/evening/wednesday.json';
import thursdayEvening from '@assets/prayers/evening/thursday.json';
import fridayEvening from '@assets/prayers/evening/friday.json';
import saturdayEvening from '@assets/prayers/evening/saturday.json';
import sundayEvening from '@assets/prayers/evening/sunday.json';

export interface UnifiedPrayer {
  id: string;
  title: string | Record<string, string>;
  category: string;
  route: string;
  content: any;
}

/**
 * All prayers consolidated into a single searchable array
 */
export const allPrayers: UnifiedPrayer[] = [
  // Traditional Prayers
  {
    id: 'angelus',
    title: Angelus.title,
    category: 'Traditional',
    route: '/(app)/prayers/traditionalprayers?prayer=angelus',
    content: Angelus
  },
  {
    id: 'regina-caeli',
    title: ReginaCaeli.title,
    category: 'Traditional',
    route: '/(app)/prayers/traditionalprayers?prayer=regina-caeli',
    content: ReginaCaeli
  },
  {
    id: 'holy-rosary',
    title: TheHolyRosary.title,
    category: 'Traditional',
    route: '/(app)/prayers/traditionalprayers?prayer=holy-rosary',
    content: TheHolyRosary
  },
  {
    id: 'order-of-mass',
    title: OrderOfTheMass.title,
    category: 'Traditional',
    route: '/(app)/prayers/traditionalprayers?prayer=order-of-mass',
    content: OrderOfTheMass
  },

  // Sacramental Prayers
  {
    id: 'after-the-holy-communion',
    title: AfterHolyCommunion.title,
    category: 'Sacramental',
    route: '/(app)/prayers/sacramentalprayers?prayer=after-the-holy-communion',
    content: AfterHolyCommunion
  },
  {
    id: 'before-holy-communion',
    title: BeforeHolyCommunion.title,
    category: 'Sacramental',
    route: '/(app)/prayers/sacramentalprayers?prayer=before-holy-communion',
    content: BeforeHolyCommunion
  },
  {
    id: 'litany-of-the-sacred-heart',
    title: LitanyOfTheSacredHeart.title,
    category: 'Sacramental',
    route: '/(app)/prayers/sacramentalprayers?prayer=litany-of-the-sacred-heart',
    content: LitanyOfTheSacredHeart
  },
  {
    id: 'prayer-for-confession',
    title: PrayerForConfession.title,
    category: 'Sacramental',
    route: '/(app)/prayers/sacramentalprayers?prayer=prayer-for-confession',
    content: PrayerForConfession
  },
  {
    id: 'prayer-for-grace',
    title: PrayerForGrace.title,
    category: 'Sacramental',
    route: '/(app)/prayers/sacramentalprayers?prayer=prayer-for-grace',
    content: PrayerForGrace
  },

  // Saints & Devotions
  {
    id: 'catena',
    title: Catena.title,
    category: 'Saints & Devotions',
    route: '/(app)/prayers/saints?prayer=catena',
    content: Catena
  },
  {
    id: 'prayer-of-saint-francis',
    title: PrayerOfSaintFrancis.title,
    category: 'Saints & Devotions',
    route: '/(app)/prayers/saints?prayer=prayer-of-saint-francis',
    content: PrayerOfSaintFrancis
  },
  {
    id: 'st-patricks-prayer',
    title: StPatricksPrayer.title,
    category: 'Saints & Devotions',
    route: '/(app)/prayers/saints?prayer=st-patricks-prayer',
    content: StPatricksPrayer
  },
  {
    id: 'prayer-to-holy-spirit',
    title: PrayerToTheHolySpirit.title,
    category: 'Saints & Devotions',
    route: '/(app)/prayers/saints?prayer=prayer-to-holy-spirit',
    content: PrayerToTheHolySpirit
  },

  // Daily Life Prayers
  {
    id: 'grace-after-meals',
    title: GraceAfterMeals.title,
    category: 'Daily Life',
    route: '/(app)/prayers/daily?prayer=grace-after-meals',
    content: GraceAfterMeals
  },
  {
    id: 'grace-before-meals',
    title: GraceBeforeMeals.title,
    category: 'Daily Life',
    route: '/(app)/prayers/daily?prayer=grace-before-meals',
    content: GraceBeforeMeals
  },
  {
    id: 'morning-offering',
    title: MorningOffering.title,
    category: 'Daily Life',
    route: '/(app)/prayers/daily?prayer=morning-offering',
    content: MorningOffering
  },
  {
    id: 'sleep-prayer',
    title: SleepPrayer.title,
    category: 'Daily Life',
    route: '/(app)/prayers/daily?prayer=sleep-prayer',
    content: SleepPrayer
  },

  // University Prayer
  {
    id: 'university-prayer',
    title: UniversityPrayer.title,
    category: 'University',
    route: '/(app)/prayers/universityprayers?prayer=university-prayer',
    content: UniversityPrayer
  },

  // Daily Office - Monday
  {
    id: 'monday-morning',
    title: mondayMorning.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Monday&period=morning',
    content: mondayMorning
  },
  {
    id: 'monday-midday',
    title: mondayMidDay.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Monday&period=mid-day',
    content: mondayMidDay
  },
  {
    id: 'monday-evening',
    title: mondayEvening.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Monday&period=evening',
    content: mondayEvening
  },

  // Daily Office - Tuesday
  {
    id: 'tuesday-morning',
    title: tuesdayMorning.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Tuesday&period=morning',
    content: tuesdayMorning
  },
  {
    id: 'tuesday-midday',
    title: tuesdayMidDay.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Tuesday&period=mid-day',
    content: tuesdayMidDay
  },
  {
    id: 'tuesday-evening',
    title: tuesdayEvening.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Tuesday&period=evening',
    content: tuesdayEvening
  },

  // Daily Office - Wednesday
  {
    id: 'wednesday-morning',
    title: wednesdayMorning.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Wednesday&period=morning',
    content: wednesdayMorning
  },
  {
    id: 'wednesday-midday',
    title: wednesdayMidDay.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Wednesday&period=mid-day',
    content: wednesdayMidDay
  },
  {
    id: 'wednesday-evening',
    title: wednesdayEvening.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Wednesday&period=evening',
    content: wednesdayEvening
  },

  // Daily Office - Thursday
  {
    id: 'thursday-morning',
    title: thursdayMorning.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Thursday&period=morning',
    content: thursdayMorning
  },
  {
    id: 'thursday-midday',
    title: thursdayMidDay.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Thursday&period=mid-day',
    content: thursdayMidDay
  },
  {
    id: 'thursday-evening',
    title: thursdayEvening.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Thursday&period=evening',
    content: thursdayEvening
  },

  // Daily Office - Friday
  {
    id: 'friday-morning',
    title: fridayMorning.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Friday&period=morning',
    content: fridayMorning
  },
  {
    id: 'friday-midday',
    title: fridayMidDay.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Friday&period=mid-day',
    content: fridayMidDay
  },
  {
    id: 'friday-evening',
    title: fridayEvening.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Friday&period=evening',
    content: fridayEvening
  },

  // Daily Office - Saturday
  {
    id: 'saturday-morning',
    title: saturdayMorning.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Saturday&period=morning',
    content: saturdayMorning
  },
  {
    id: 'saturday-midday',
    title: saturdayMidDay.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Saturday&period=mid-day',
    content: saturdayMidDay
  },
  {
    id: 'saturday-evening',
    title: saturdayEvening.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Saturday&period=evening',
    content: saturdayEvening
  },

  // Daily Office - Sunday
  {
    id: 'sunday-morning',
    title: sundayMorning.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Sunday&period=morning',
    content: sundayMorning
  },
  {
    id: 'sunday-midday',
    title: sundayMidDay.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Sunday&period=mid-day',
    content: sundayMidDay
  },
  {
    id: 'sunday-evening',
    title: sundayEvening.title,
    category: 'Daily Office',
    route: '/(app)/prayers/[day]?day=Sunday&period=evening',
    content: sundayEvening
  }
];

/**
 * Get display title for a prayer (handles both string and multilingual titles)
 */
export function getPrayerTitle(prayer: UnifiedPrayer, language: string = 'en'): string {
  if (typeof prayer.title === 'string') {
    return prayer.title;
  }
  return prayer.title[language] || prayer.title.en || '';
}

/**
 * Get all unique prayer categories
 */
export function getPrayerCategories(): string[] {
  const categories = new Set(allPrayers.map(p => p.category));
  return Array.from(categories);
}

/**
 * Get prayers by category
 */
export function getPrayersByCategory(category: string): UnifiedPrayer[] {
  return allPrayers.filter(p => p.category === category);
}
