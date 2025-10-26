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
      const openingLines: string[] = [];

      // Basic opening
      if (prayer.opening.leader) openingLines.push(`Leader: ${prayer.opening.leader}`);
      if (prayer.opening.all) openingLines.push(`All: ${prayer.opening.all}`);
      if (prayer.opening.leader2) openingLines.push(`Leader: ${prayer.opening.leader2}`);
      if (prayer.opening.all2) openingLines.push(`All: ${prayer.opening.all2}`);
      if (prayer.opening.leader3) openingLines.push(`Leader: ${prayer.opening.leader3}`);
      if (prayer.opening.all3) openingLines.push(`All: ${prayer.opening.all3}`);
      if (prayer.opening.leader4) openingLines.push(`Leader: ${prayer.opening.leader4}`);
      if (prayer.opening.all4) openingLines.push(`All: ${prayer.opening.all4}`);
      if (prayer.opening.leader5) openingLines.push(`Leader: ${prayer.opening.leader5}`);
      if (prayer.opening.all5) openingLines.push(`All: ${prayer.opening.all5}`);
      if (prayer.opening.leader6) openingLines.push(`Leader: ${prayer.opening.leader6}`);
      if (prayer.opening.all6) openingLines.push(`All: ${prayer.opening.all6}`);

      // Confession (Evening prayers)
      if (prayer.opening.confession) {
        openingLines.push(`\nLeader: ${prayer.opening.confession.leader}`);
        openingLines.push(`All: ${prayer.opening.confession.all}`);
        openingLines.push(`${prayer.opening.confession.absolution}`);
      }

      sections.push({
        type: 'opening',
        content: {
          en: openingLines,
          es: openingLines // Add Spanish translations when available
        }
      });
    }

    // Hymn Section
    if (prayer.hymn) {
      if (typeof prayer.hymn === 'string') {
        // Simple string hymn (morning/evening)
        sections.push({
          type: 'hymn',
          title: {
            en: 'Hymn',
            es: 'Himno'
          },
          content: {
            en: [prayer.hymn],
            es: [prayer.hymn]
          }
        });
      } else if (typeof prayer.hymn === 'object' && prayer.hymn.verses) {
        // Object hymn with title and verses (mid-day)
        sections.push({
          type: 'hymn',
          title: {
            en: prayer.hymn.title || 'Hymn',
            es: prayer.hymn.title || 'Himno'
          },
          content: {
            en: prayer.hymn.verses,
            es: prayer.hymn.verses
          }
        });
      }
    }

    // Antiphon Section
    if (prayer.antiphon) {
      sections.push({
        type: 'antiphon',
        title: {
          en: 'Antiphon',
          es: 'Antífona'
        },
        content: {
          en: [prayer.antiphon],
          es: [prayer.antiphon]
        }
      });
    }

    // Scripture Section (Saturday evening has this)
    if (prayer.scripture) {
      sections.push({
        type: 'scripture',
        title: {
          en: prayer.scripture.title || 'Scripture',
          es: prayer.scripture.title || 'Escritura'
        },
        content: {
          en: prayer.scripture.verses || [],
          es: prayer.scripture.verses || []
        }
      });
    }

    // Psalms Section
    if (prayer.psalms) {
      prayer.psalms.forEach((psalm: any) => {
        const psalmContent: string[] = [];

        // Add subtitle if available
        if (psalm.subtitle) {
          psalmContent.push(psalm.subtitle);
          psalmContent.push(''); // Empty line for spacing
        }

        // Add verses
        if (psalm.verses) {
          psalmContent.push(...psalm.verses);
        }

        sections.push({
          type: 'psalm',
          title: {
            en: psalm.title,
            es: psalm.title
          },
          content: {
            en: psalmContent,
            es: psalmContent
          }
        });
      });
    }

    // Reading Section
    if (prayer.reading) {
      sections.push({
        type: 'reading',
        title: {
          en: 'Reading',
          es: 'Lectura'
        },
        content: {
          en: [prayer.reading],
          es: [prayer.reading]
        }
      });
    }

    // Lord's Prayer (Evening prayers)
    if (prayer.lords_prayer) {
      sections.push({
        type: 'lords_prayer',
        title: {
          en: "Our Father",
          es: "Padre Nuestro"
        },
        content: {
          en: [prayer.lords_prayer],
          es: [prayer.lords_prayer]
        }
      });
    }

    // Intercessions Section
    if (prayer.intercessions) {
      sections.push({
        type: 'intercessions',
        title: {
          en: 'Intercessions',
          es: 'Intercesiones'
        },
        content: {
          en: prayer.intercessions.map((i: any) => `${i.text}\nResponse: ${i.response}`),
          es: prayer.intercessions.map((i: any) => `${i.text}\nRespuesta: ${i.response}`)
        }
      });
    }

    // Special Prayers (Mid-day prayers)
    if (prayer.special_prayers && Array.isArray(prayer.special_prayers)) {
      prayer.special_prayers.forEach((sp: any) => {
        sections.push({
          type: 'special_prayer',
          title: {
            en: sp.title,
            es: sp.title
          },
          content: {
            en: sp.content,
            es: sp.content
          }
        });
      });
    }

    // Concluding Prayer Section
    if (prayer.concluding_prayer) {
      const concludingLines: string[] = [];

      if (typeof prayer.concluding_prayer === 'string') {
        // Simple string (morning prayers)
        concludingLines.push(prayer.concluding_prayer);
      } else if (typeof prayer.concluding_prayer === 'object') {
        // Object with nested structure (mid-day/evening)
        if (prayer.concluding_prayer.text) {
          concludingLines.push(prayer.concluding_prayer.text);
        }

        // Additional prayers (evening)
        if (prayer.concluding_prayer.additional_prayers && Array.isArray(prayer.concluding_prayer.additional_prayers)) {
          concludingLines.push(''); // Spacing
          concludingLines.push(...prayer.concluding_prayer.additional_prayers);
        }

        // Closing dialogues (evening)
        if (prayer.concluding_prayer.closing) {
          concludingLines.push(''); // Spacing

          if (Array.isArray(prayer.concluding_prayer.closing.leader) && Array.isArray(prayer.concluding_prayer.closing.all)) {
            // Structured leader/all arrays
            for (let i = 0; i < prayer.concluding_prayer.closing.leader.length; i++) {
              if (prayer.concluding_prayer.closing.leader[i]) {
                concludingLines.push(`Leader: ${prayer.concluding_prayer.closing.leader[i]}`);
              }
              if (prayer.concluding_prayer.closing.all[i]) {
                concludingLines.push(`All: ${prayer.concluding_prayer.closing.all[i]}`);
              }
            }
          } else {
            // String-based closing (mid-day)
            if (prayer.concluding_prayer.closing.all) concludingLines.push(`All: ${prayer.concluding_prayer.closing.all}`);
            if (prayer.concluding_prayer.closing.all2) concludingLines.push(`All: ${prayer.concluding_prayer.closing.all2}`);
            if (prayer.concluding_prayer.closing.all3) concludingLines.push(`All: ${prayer.concluding_prayer.closing.all3}`);
            if (prayer.concluding_prayer.closing.final) concludingLines.push(prayer.concluding_prayer.closing.final);
          }
        }

        // Final prayer (evening)
        if (prayer.concluding_prayer.final_prayer) {
          concludingLines.push('');
          concludingLines.push(prayer.concluding_prayer.final_prayer);
        }
      }

      sections.push({
        type: 'concluding_prayer',
        title: {
          en: 'Concluding Prayer',
          es: 'Oración Final'
        },
        content: {
          en: concludingLines,
          es: concludingLines
        }
      });
    }

    // Closing Section
    if (prayer.closing) {
      const closingLines: string[] = [];

      // Handle different closing structures
      if (Array.isArray(prayer.closing.all)) {
        // Evening prayers with array format
        closingLines.push(...prayer.closing.all);
      } else {
        // Morning/mid-day with leader/all pairs
        if (prayer.closing.leader) closingLines.push(`Leader: ${prayer.closing.leader}`);
        if (prayer.closing.all) closingLines.push(`All: ${prayer.closing.all}`);
        if (prayer.closing.leader2) closingLines.push(`Leader: ${prayer.closing.leader2}`);
        if (prayer.closing.all2) closingLines.push(`All: ${prayer.closing.all2}`);
        if (prayer.closing.leader3) closingLines.push(`Leader: ${prayer.closing.leader3}`);
        if (prayer.closing.all3) closingLines.push(`All: ${prayer.closing.all3}`);
        if (prayer.closing.leader4) closingLines.push(`Leader: ${prayer.closing.leader4}`);
        if (prayer.closing.all4) closingLines.push(`All: ${prayer.closing.all4}`);
        if (prayer.closing.leader5) closingLines.push(`Leader: ${prayer.closing.leader5}`);
        if (prayer.closing.all5) closingLines.push(`All: ${prayer.closing.all5}`);
        if (prayer.closing.leader6) closingLines.push(`Leader: ${prayer.closing.leader6}`);
        if (prayer.closing.all6) closingLines.push(`All: ${prayer.closing.all6}`);
        if (prayer.closing.all7) closingLines.push(`All: ${prayer.closing.all7}`);
        if (prayer.closing.all8) closingLines.push(`All: ${prayer.closing.all8}`);
      }

      sections.push({
        type: 'closing',
        title: {
          en: 'Closing',
          es: 'Cierre'
        },
        content: {
          en: closingLines,
          es: closingLines
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