// utils/prayerMap.ts
type PrayerContent = {
    en: string | string[];
    es: string | string[];
  };
  
  type PrayerSection = {
    type: string;
    title?: {
      en: string;
      es: string;
    };
    content?: PrayerContent;
  };
  
  type PrayerData = {
    en: string;
    es: string;
    sections?: PrayerSection[];
  };
  
  // Import all prayer files

  //morning prayers
  import mondayMorning from '@assets/prayers/morning/monday.json';
  import tuesdayMorning from '@assets/prayers/morning/tuesday.json';
  import wednesdayMorning from '@assets/prayers/morning/wednesday.json';
  import thursdayMorning from '@assets/prayers/morning/thursday.json';
  import fridayMorning from '@assets/prayers/morning/friday.json';
  import saturdayMorning from '@assets/prayers/morning/saturday.json';
  import sundayMorning from '@assets/prayers/morning/sunday.json';
  //mid-day prayers
  import mondayMidDay from '@assets/prayers/mid-day/monday.json';
  import tuesdayMidDay from '@assets/prayers/mid-day/tuesday.json';
  import wednesdayMidDay from '@assets/prayers/mid-day/wednesday.json';
  import thursdayMidDay from '@assets/prayers/mid-day/thursday.json';
  import fridayMidDay from '@assets/prayers/mid-day/friday.json';
  import saturdayMidDay from '@assets/prayers/mid-day/saturday.json';
  import sundayMidDay from '@assets/prayers/mid-day/sunday.json';
  //evening prayers
  import mondayEvening from '@assets/prayers/evening/monday.json';
  import tuesdayEvening from '@assets/prayers/evening/tuesday.json';
  import wednesdayEvening from '@assets/prayers/evening/wednesday.json';
  import thursdayEvening from '@assets/prayers/evening/thursday.json';
  import fridayEvening from '@assets/prayers/evening/friday.json';
  import saturdayEvening from '@assets/prayers/evening/saturday.json';
  import sundayEvening from '@assets/prayers/evening/sunday.json';


  //daily prayers
  import GraceAfterMeals from '@assets/prayers/DailyLife/GraceAfterMeals.json';
  import GraceBeforeMeals from '@assets/prayers/DailyLife/GraceBeforeMeals.json';
  import MorningOffering from '@assets/prayers/DailyLife/MorningOffering.json';
  import SleepPrayer from '@assets/prayers/DailyLife/SleepPrayer.json';
  //saints & devotions



  // Helper function to create prayer sections from JSON
  const createPrayerSections = (prayer: any): PrayerSection[] => {
    const sections: PrayerSection[] = [];
    
    // Opening Section
    if (prayer.opening) {
      sections.push({
        type: 'opening',
        content: {
          en: [
            `Leader: ${prayer.opening.leader}`,
            `All: ${prayer.opening.all}`,
            `Leader: ${prayer.opening.leader2}`,
            `Leader: ${prayer.opening.leader3}`,
            `All: ${prayer.opening.all3}`,
            `Leader: ${prayer.opening.leader4}`,
            `All: ${prayer.opening.all4}`
          ],
          es: [
            // Add Spanish translations here when available
            `Líder: ${prayer.opening.leader}`,
            `Todos: ${prayer.opening.all}`,
            // ... other Spanish translations
          ]
        }
      });
    }
  
    // Psalms Section
    if (prayer.psalms) {
      prayer.psalms.forEach((psalm: any) => {
        sections.push({
          type: 'psalm',
          title: {
            en: psalm.title,
            es: psalm.title // Add Spanish translation if available
          },
          content: {
            en: psalm.verses,
            es: psalm.verses // Add Spanish translation if available
          }
        });
      });
    }
  
    // Intercessions Section
    if (prayer.intercessions) {
      sections.push({
        type: 'intercessions',
        content: {
          en: prayer.intercessions.map((i: any) => `${i.text}\nResponse: ${i.response}`),
          es: prayer.intercessions.map((i: any) => `${i.text}\nRespuesta: ${i.response}`)
        }
      });
    }
  
    // Closing Section
    if (prayer.closing) {
      sections.push({
        type: 'closing',
        content: {
          en: [
            `Leader: ${prayer.closing.leader}`,
            `All: ${prayer.closing.all}`,
            `Leader: ${prayer.closing.leader2}`,
            `All: ${prayer.closing.all2}`,
            `All: ${prayer.closing.all3}`
          ],
          es: [
            // Add Spanish translations here
          ]
        }
      });
    }
  
    return sections;
  };
  
  const prayers: Record<'morning' | 'mid-day' | 'evening', Record<string, PrayerData>> = {
    morning: {
        monday: {
            en: mondayMorning.title,
            es: mondayMorning.title, // Add Spanish title when available
            sections: createPrayerSections(mondayMorning)
        },
        tuesday: {
            en: tuesdayMorning.title,
            es: tuesdayMorning.title, // Add Spanish title when available
            sections: createPrayerSections(tuesdayMorning)
        },
        wednesday: {
            en: wednesdayMorning.title,
            es: wednesdayMorning.title, // Add Spanish title when available
            sections: createPrayerSections(wednesdayMorning)
        },
        thursday: {
            en: thursdayMorning.title,
            es: thursdayMorning.title, // Add Spanish title when available
            sections: createPrayerSections(thursdayMorning)
        },
        friday: {
            en: fridayMorning.title,
            es: fridayMorning.title, // Add Spanish title when available
            sections: createPrayerSections(fridayMorning)
        },
        saturday: {
            en: saturdayMorning.title,
            es: saturdayMorning.title, // Add Spanish title when available
            sections: createPrayerSections(saturdayMorning)
        },
        sunday: {
            en: sundayMorning.title,
            es: sundayMorning.title, // Add Spanish title when available
            sections: createPrayerSections(sundayMorning)
        },
    },
    'mid-day': {
        monday: {
            en: mondayMidDay.title,
            es: mondayMidDay.title, // Add Spanish title when available
            sections: createPrayerSections(mondayMidDay)
        },
        tuesday: {
            en: tuesdayMidDay.title,
            es: tuesdayMidDay.title, // Add Spanish title when available
            sections: createPrayerSections(tuesdayMidDay)
        },
        wednesday: {
            en: wednesdayMidDay.title,
            es: wednesdayMidDay.title, // Add Spanish title when available
            sections: createPrayerSections(wednesdayMidDay)
        },
        thursday: {
            en: thursdayMidDay.title,
            es: thursdayMidDay.title, // Add Spanish title when available
            sections: createPrayerSections(thursdayMidDay)
        },
        friday: {
            en: fridayMidDay.title,
            es: fridayMidDay.title, // Add Spanish title when available
            sections: createPrayerSections(fridayMidDay)
        },
        saturday: {
            en: saturdayMidDay.title,
            es: saturdayMidDay.title, // Add Spanish title when available
            sections: createPrayerSections(saturdayMidDay)
        },
        sunday: {
            en: sundayMidDay.title,
            es: sundayMidDay.title, // Add Spanish title when available
            sections: createPrayerSections(sundayMidDay)
        },
    },
    evening: {
        monday: {
            en: mondayEvening.title,
            es: mondayEvening.title, // Add Spanish title when available
            sections: createPrayerSections(mondayEvening)
        },
        tuesday: {
            en: tuesdayEvening.title,
            es: tuesdayEvening.title, // Add Spanish title when available
            sections: createPrayerSections(tuesdayEvening)
        },
        wednesday: {
            en: wednesdayEvening.title,
            es: wednesdayEvening.title, // Add Spanish title when available
            sections: createPrayerSections(wednesdayEvening)
        },
        thursday: {
            en: thursdayEvening.title,
            es: thursdayEvening.title, // Add Spanish title when available
            sections: createPrayerSections(thursdayEvening)
        },
        friday: {
            en: fridayEvening.title,
            es: fridayEvening.title, // Add Spanish title when available
            sections: createPrayerSections(fridayEvening)
        },
        saturday: {
            en: saturdayEvening.title,
            es: saturdayEvening.title, // Add Spanish title when available
            sections: createPrayerSections(saturdayEvening)
        },
        sunday: {
            en: sundayEvening.title,
            es: sundayEvening.title, // Add Spanish title when available
            sections: createPrayerSections(sundayEvening)
        },
    }
  };
  
  export const loadPrayer = (
    dayOrPrayer: string,
    period?: 'morning' | 'mid-day' | 'evening' 
  ): PrayerData => {
  
    console.log('🔄 loadPrayer called with:', { dayOrPrayer, period });
  
    // Handle daily prayers
    const dayKey = dayOrPrayer.toLowerCase();
    console.log('🔑 Day key:', dayKey);
    
    if (period && period in prayers) {
      console.log('✅ Period found:', period);
      const periodPrayers = prayers[period as keyof typeof prayers];
      console.log('📚 Available days in period:', Object.keys(periodPrayers));
      
      if (dayKey in periodPrayers) {
        console.log('✅ Day found in period prayers');
        return periodPrayers[dayKey as keyof typeof periodPrayers];
      } else {
        console.log('❌ Day not found in period prayers');
      }
    } else {
      console.log('❌ Period not found or invalid:', period);
    }
  
    console.log('❌ Returning fallback prayer data');
    return {
      en: `Prayer not found for ${dayOrPrayer} ${period || ''}`,
      es: `Oración no encontrada para ${dayOrPrayer} ${period || ''}`,
    };
  };