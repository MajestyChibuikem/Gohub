/**
 * Fuzzy Search Utility
 * Provides typo-tolerant search using Levenshtein distance algorithm
 */

/**
 * Calculate Levenshtein distance between two strings
 * Returns the minimum number of single-character edits needed to change one string into another
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;

  // Create a 2D array for dynamic programming
  const dp: number[][] = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= len1; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[len1][len2];
}

/**
 * Calculate fuzzy match score between query and target
 * Returns a score from 0-100 (higher is better match)
 */
function calculateMatchScore(query: string, target: string): number {
  const queryLower = query.toLowerCase().trim();
  const targetLower = target.toLowerCase().trim();

  // Exact match
  if (queryLower === targetLower) {
    return 100;
  }

  // Exact substring match
  if (targetLower.includes(queryLower)) {
    return 90;
  }

  // Check if query matches start of target
  if (targetLower.startsWith(queryLower)) {
    return 85;
  }

  // Check if target starts with query (word boundary)
  const words = targetLower.split(/\s+/);
  for (const word of words) {
    if (word.startsWith(queryLower)) {
      return 80;
    }
  }

  // Fuzzy match using Levenshtein distance
  const distance = levenshteinDistance(queryLower, targetLower);
  const maxLength = Math.max(queryLower.length, targetLower.length);

  // Calculate similarity percentage
  const similarity = ((maxLength - distance) / maxLength) * 100;

  return similarity;
}

/**
 * Determine if a match is acceptable based on query length and match score
 */
function isAcceptableMatch(query: string, score: number): boolean {
  const queryLength = query.trim().length;

  // For very short queries (1-2 chars), require high accuracy
  if (queryLength <= 2) {
    return score >= 80;
  }

  // For short queries (3-5 chars), allow 1-2 typos
  if (queryLength <= 5) {
    return score >= 60;
  }

  // For medium queries (6-10 chars), allow 2-3 typos
  if (queryLength <= 10) {
    return score >= 50;
  }

  // For longer queries, allow more typos
  return score >= 40;
}

export interface FuzzySearchResult<T> {
  item: T;
  score: number;
  matchedText: string;
}

/**
 * Perform fuzzy search on an array of items
 * @param items - Array of items to search
 * @param query - Search query string
 * @param getText - Function to extract searchable text from each item
 * @returns Sorted array of matches with scores
 */
export function fuzzySearch<T>(
  items: T[],
  query: string,
  getText: (item: T) => string | string[]
): FuzzySearchResult<T>[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results: FuzzySearchResult<T>[] = [];

  for (const item of items) {
    const textOptions = getText(item);
    const texts = Array.isArray(textOptions) ? textOptions : [textOptions];

    let bestScore = 0;
    let bestMatch = '';

    // Check all text fields and keep the best match
    for (const text of texts) {
      if (!text) continue;

      const score = calculateMatchScore(query, text);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = text;
      }
    }

    // Only include if match is acceptable
    if (isAcceptableMatch(query, bestScore)) {
      results.push({
        item,
        score: bestScore,
        matchedText: bestMatch
      });
    }
  }

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Simple fuzzy filter - returns just the items (not scores)
 * @param items - Array of items to search
 * @param query - Search query string
 * @param getText - Function to extract searchable text from each item
 * @returns Filtered and sorted array of items
 */
export function fuzzyFilter<T>(
  items: T[],
  query: string,
  getText: (item: T) => string | string[]
): T[] {
  return fuzzySearch(items, query, getText).map(result => result.item);
}
