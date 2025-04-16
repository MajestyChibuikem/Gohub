// utils/loadPrayers.ts
type PrayerData = {
    en: string;
    es: string;
    sections?: {
      type: string;
      title?: { en: string; es: string };
      content?: { en: string; es: string } | { en: string[]; es: string[] };
    }[];
  };
  
  export const loadPrayer = (
    day: string,
    period: 'morning' | 'mid-day' | 'evening'
  ): PrayerData => {
    // Convert day to lowercase filename format
    const dayFile = day.toLowerCase();
    
    try {
      // Dynamic import based on period and day
      const prayer = require(`@assets/prayers/${period}/${dayFile}.json`);
      return prayer as PrayerData;
    } catch (error) {
      console.error(`Error loading ${period} prayer for ${day}:`, error);
      return {
        en: `Prayer not found for ${day} ${period}`,
        es: `Oración no encontrada para ${day} ${period}`
      };
    }
  };