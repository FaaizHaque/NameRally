import { CategoryType } from './state/game-store';

// ─── Local data sets loaded from bundled JSON files ───────────────────────────
// These replace the previous Supabase table queries for validation/hints.
// Supabase is now only used for multiplayer connection (session management).

import namesData from '../data/names.json';
import placesData from '../data/places.json';
import thingsData from '../data/things.json';
import sportsGamesData from '../data/sports_games.json';
import foodDishesData from '../data/food_dishes.json';
import healthIssuesData from '../data/health_issues.json';
import historicalFiguresData from '../data/historical_figures.json';
import moviesData from '../data/movies.json';
import professionsData from '../data/professions.json';
import songsData from '../data/songs.json';
import musicArtistsData from '../data/music_artists.json';

// Build normalized Sets for O(1) lookup — normalized to lowercase, no accents
function buildSet(data: string[]): Set<string> {
  const s = new Set<string>();
  for (const entry of data) {
    if (entry && entry.trim().length > 0) {
      s.add(normalizeForComparison(entry));
    }
  }
  return s;
}

const LOCAL_SETS: Partial<Record<CategoryType, Set<string>>> = {
  names:              buildSet(namesData as string[]),
  places:             buildSet(placesData as string[]),
  thing:              buildSet(thingsData as string[]),
  sports_games:       buildSet(sportsGamesData as string[]),
  food_dishes:        buildSet(foodDishesData as string[]),
  health_issues:      buildSet(healthIssuesData as string[]),
  famous_people: buildSet(historicalFiguresData as string[]),
  movies:             buildSet(moviesData as string[]),
  professions:        buildSet(professionsData as string[]),
  songs:              buildSet(songsData as string[]),
  music_artists:      buildSet(musicArtistsData as string[]),
};

// Raw arrays indexed by first char for fast hint lookup
const LOCAL_RAW: Partial<Record<CategoryType, string[]>> = {
  names:              namesData as string[],
  places:             placesData as string[],
  thing:              thingsData as string[],
  sports_games:       sportsGamesData as string[],
  food_dishes:        foodDishesData as string[],
  health_issues:      healthIssuesData as string[],
  famous_people: historicalFiguresData as string[],
  movies:             moviesData as string[],
  professions:        professionsData as string[],
  songs:              songsData as string[],
  music_artists:      musicArtistsData as string[],
};

/**
 * Hardcoded list of all countries (unchanged)
 */
const COUNTRIES_LIST = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
  'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador',
  'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo',
  'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
  'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
  'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];

/**
 * Normalizes a word for comparison:
 * - lowercase, strip accents, strip apostrophes, normalize spaces/hyphens
 */
function normalizeForComparison(word: string): string {
  return word
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[''`´]/g, '')
    .replace(/[\s\-_]+/g, ' ')
    .trim();
}

/**
 * Checks whether a normalized word exists in a local Set,
 * trying a handful of common variations (plural, hyphen, space).
 */
function existsInLocalSet(set: Set<string>, word: string): boolean {
  const norm = normalizeForComparison(word);

  if (set.has(norm)) return true;
  // space ↔ hyphen
  if (set.has(norm.replace(/\s+/g, '-'))) return true;
  if (set.has(norm.replace(/-/g, ' '))) return true;
  // no spaces
  if (set.has(norm.replace(/\s+/g, ''))) return true;
  // drop trailing 's'
  if (norm.endsWith('s') && norm.length > 3 && set.has(norm.slice(0, -1))) return true;
  // drop trailing 'es'
  if (norm.endsWith('es') && norm.length > 4 && set.has(norm.slice(0, -2))) return true;
  // berries → berry
  if (norm.endsWith('ies') && norm.length > 4 && set.has(norm.slice(0, -3) + 'y')) return true;

  return false;
}

// ─── Public API (same signatures as before) ───────────────────────────────────

/**
 * Validates a word against the local dataset for a category.
 * Replaces the old Supabase query — same return shape.
 */
export async function validateWordInSupabase(
  word: string,
  category: CategoryType
): Promise<{ found: boolean; source: 'supabase' | 'countries' | 'not_found' }> {
  if (category === 'countries') {
    const norm = normalizeForComparison(word);
    const found = COUNTRIES_LIST.some(c => normalizeForComparison(c) === norm);
    return { found, source: found ? 'countries' : 'not_found' };
  }

  const set = LOCAL_SETS[category];
  if (!set) return { found: false, source: 'not_found' };

  const found = existsInLocalSet(set, word);
  return { found, source: found ? 'supabase' : 'not_found' };
}

/**
 * Returns hint words from local data starting with `letter`.
 * Replaces the old Supabase query — same return shape.
 */
export async function getHintsFromSupabase(
  category: CategoryType,
  letter: string,
  limit: number = 20
): Promise<string[]> {
  const letterLower = letter.toLowerCase();

  if (category === 'countries') {
    return COUNTRIES_LIST
      .filter(c => c.toLowerCase().startsWith(letterLower))
      .slice(0, limit);
  }

  const raw = LOCAL_RAW[category];
  if (!raw) return [];

  const matches = raw.filter(w => w && w.toLowerCase().startsWith(letterLower));
  // Shuffle so hints feel varied
  const shuffled = [...matches].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

/**
 * Fuzzy-validates a word against local data.
 * Replaces the old Supabase fuzzy query — same return shape.
 */
export async function validateWordFuzzyInSupabase(
  word: string,
  category: CategoryType
): Promise<{ found: boolean; matchedWord?: string }> {
  if (category === 'countries') {
    const norm = normalizeForComparison(word);
    const match = COUNTRIES_LIST.find(c => normalizeForComparison(c) === norm);
    return match ? { found: true, matchedWord: match } : { found: false };
  }

  const set = LOCAL_SETS[category];
  const raw = LOCAL_RAW[category];
  if (!set || !raw) return { found: false };

  if (existsInLocalSet(set, word)) {
    // Find the original-cased entry to return as matchedWord
    const norm = normalizeForComparison(word);
    const matchedWord = raw.find(w => normalizeForComparison(w) === norm) ?? word;
    return { found: true, matchedWord };
  }

  return { found: false };
}

/**
 * Clears any caches (no-op now — kept for API compatibility).
 */
export function clearSupabaseCache(): void {
  // Nothing to clear with local data
}

/**
 * Returns true if the category has a local dataset.
 */
export function hasSupabaseSupport(category: CategoryType): boolean {
  return category in LOCAL_SETS || category === 'countries';
}
