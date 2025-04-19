import hymn1 from '../assets/hymns/Christmas/deck-the-hall.json';
import hymn2 from '../assets/hymns/Christmas/joy-to-the-world.json';
import hymn3 from '../assets/hymns/Christmas/bethlehem-ebe-amuru-nwa-ka-nwa.json';
import hymn4 from '../assets/hymns/Christmas/The-little-drummer-boy.json';
import hymn5 from '../assets/hymns/Christmas/ding-dong-merryly-on-high.json';
import hymn6 from '../assets/hymns/Christmas/O-christmas-pine-(otannenbaun).json';
import hymn7 from '../assets/hymns/Christmas/once-in-royal-davids-city.json';
import hymn8 from '../assets/hymns/Christmas/see-amid-the-winters-snow.json';
import hymn9 from '../assets/hymns/Christmas/silent-night.json';
import hymn10 from '../assets/hymns/Christmas/we-three-kings-of-orient.json';

export type HymnContent = {
    title: string; // Mandatory field
    index?: number; // Optional
    key?: string; // Optional
    images?: string[]; // Optional
    content?: { // Optional
      type?: string; // Optional
      verses?: string[]; // Optional
      heading?: string; // Optional
      image?: {
        source: string;
        altText: string;
      }; // Optional
      parts?: Array<{
        title?: string;
        text: string | string[];
      }>; // Optional
      paragraph?: string; // Optional
    };
  };

type Hymns = {
  [category: string]: {
    [title: string]: HymnContent;
  };
};

export const hymns: Hymns = {
  Christmas: {
    'Deck the Hall': hymn1,
    'Joy to the World': hymn2,
    'bethlehem-ebe-amuru-nwa-ka-nwa':hymn3,
    'The-little-drummer-boy': hymn4,
    'Ding Dong Merrily on High': hymn5,
    'O-christmas-pine-(otannenbaun)': hymn6,
    'Once in Royal Davids City': hymn7,
    'See Amid the Winters Snow': hymn8,
    'Silent Night': hymn9,
    'We Three Kings of Orient': hymn10

    
  }
};

export const getHymnTitles = () => {
  return Object.entries(hymns).flatMap(([category, hymnsInCategory]) =>
    Object.keys(hymnsInCategory).map(title => ({
      title,
      category,
    }))
  ).sort((a, b) => a.title.localeCompare(b.title));
};

export const getHymn = (category: string, title: string): HymnContent | undefined => {
  return hymns[category]?.[title];
};
