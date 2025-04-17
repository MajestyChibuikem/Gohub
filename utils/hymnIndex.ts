// utils/hymnIndex.ts

import hymn1 from '../assets/hymns/Christmas/deck-the-hall.json';
import hymn2 from '../assets/hymns/Christmas/joy-to-the-world.json';


export type HymnContent = {
  title: string;
  index: number;
  key: string;
  images: string[];
  content: {
    type: string;
    verses: string[];
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
  },
  // Add more categories below
  // Communion: {
  //   'Communion Hymn 1': communion1,
  // },
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
