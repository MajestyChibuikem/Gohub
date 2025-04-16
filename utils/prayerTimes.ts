// utils/prayerTimes.ts
export const getCurrentPrayerPeriod = (): 'morning' | 'mid-day' | 'evening' => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 16) return 'mid-day'; 
    return 'evening';
  };
  
  export const allDays = [
    'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];