/**
 * All Hymns Aggregator
 * Consolidates all hymns from different categories into a single searchable array
 */

import { hymns, HymnContent } from './hymnIndex';

export interface UnifiedHymn {
  id: string;
  title: string;
  category: string;
  route: string;
  content: HymnContent;
}

/**
 * Convert category name to route path
 */
function categoryToRoute(category: string): string {
  const routeMap: Record<string, string> = {
    'Christmas': 'christmas-hymns',
    'Marian Hymns': 'marian-hymns',
    'Common of the Mass': 'common-of-the-mass-hymns',
    'Communion': 'communion-hymns',
    'Dismissal': 'dismissal-hymns',
    'Entrance Hymns': 'entrance-hymns',
    'Lent': 'lent-hymns',
    'Offertory': 'offertory-hymns',
    'Other Hymns': 'other-hymns',
    'Hymns for the Dead': 'hymns-for-the-dead',
    'General Hymns': 'general-hymns'
  };
  return routeMap[category] || category.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Create title ID from hymn title
 */
function titleToId(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * All hymns consolidated into a single searchable array
 */
export const allHymns: UnifiedHymn[] = Object.entries(hymns).flatMap(([category, hymnsInCategory]) =>
  Object.entries(hymnsInCategory).map(([title, content]) => ({
    id: `${categoryToRoute(category)}-${titleToId(title)}`,
    title,
    category,
    route: `/(app)/hymns/${categoryToRoute(category)}?hymn=${titleToId(title)}`,
    content
  }))
);

/**
 * Get display title for a hymn (handles both string and multilingual titles)
 */
export function getHymnTitle(hymn: UnifiedHymn, language: string = 'en'): string {
  if (!hymn.content || !hymn.content.title) {
    return hymn.title;
  }

  if (typeof hymn.content.title === 'string') {
    return hymn.content.title;
  }

  // Handle multilingual titles
  return hymn.content.title[language] || hymn.content.title.en || hymn.title;
}

/**
 * Get all unique hymn categories
 */
export function getHymnCategories(): string[] {
  const categories = new Set(allHymns.map(h => h.category));
  return Array.from(categories);
}

/**
 * Get hymns by category
 */
export function getHymnsByCategory(category: string): UnifiedHymn[] {
  return allHymns.filter(h => h.category === category);
}

/**
 * Total count of all hymns
 */
export const totalHymnsCount = allHymns.length;
