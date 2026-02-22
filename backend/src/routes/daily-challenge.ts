import { Hono } from 'hono';

/**
 * Daily Challenge API Routes
 *
 * Provides endpoints for generating and retrieving daily challenges.
 * Each day has a unique challenge that all players can attempt.
 */

// Category types matching the frontend
type CategoryType =
  | 'names'
  | 'places'
  | 'animal'
  | 'thing'
  | 'sports_games'
  | 'brands'
  | 'health_issues'
  | 'countries'
  | 'movies'
  | 'songs'
  | 'professions'
  | 'food_dishes'
  | 'famous_people';

interface DailyChallenge {
  id: string;
  date: string;
  letter: string; // Single letter or combo for ALL categories
  categories: CategoryType[];
  createdAt: number;
}

// All available categories for the daily challenge
const ALL_CATEGORIES: CategoryType[] = [
  'names', 'places', 'animal', 'thing', 'sports_games',
  'brands', 'health_issues', 'countries',
  'movies', 'songs', 'professions', 'food_dishes', 'famous_people'
];

// Letter pools
const EASY_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W'];
const NORMAL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W'];
const TWO_LETTER_COMBOS = [
  'CH', 'SH', 'TH', 'WH', 'PH', 'GR', 'TR', 'DR', 'BR', 'CR', 'FR', 'PR', 'SP', 'ST', 'SC',
  'BA', 'BE', 'BI', 'BO', 'BU', 'CA', 'CO', 'DA', 'DE', 'DI', 'DO',
  'FA', 'FE', 'FI', 'FO', 'GA', 'GE', 'GO', 'HA', 'HE', 'HI', 'HO',
  'JA', 'JO', 'KA', 'KE', 'KI', 'LA', 'LE', 'LI', 'LO', 'MA', 'ME', 'MI', 'MO', 'MU',
  'NA', 'NE', 'NI', 'NO', 'PA', 'PE', 'PI', 'PO', 'RA', 'RE', 'RI', 'RO',
  'SA', 'SE', 'SI', 'SO', 'TA', 'TE', 'TI', 'TO', 'VA', 'VE', 'VI',
  'WA', 'WE', 'WI'
];

// Impossible letter-category combinations to avoid
const IMPOSSIBLE_COMBOS: Record<string, CategoryType[]> = {
  'X': ['animal', 'names', 'places', 'sports_games', 'food_dishes'],
  'Q': ['animal', 'names', 'sports_games', 'food_dishes'],
  'Z': ['sports_games', 'food_dishes'],
};

/**
 * Seeded random number generator for deterministic daily challenges
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      const temp = result[i]!;
      result[i] = result[j]!;
      result[j] = temp;
    }
    return result;
  }

  pick<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)]!;
  }
}

/**
 * Convert date string to numeric seed
 */
function dateToSeed(dateString: string): number {
  // Use the date string characters to create a numeric seed
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = seed * 31 + dateString.charCodeAt(i);
  }
  return Math.abs(seed);
}

/**
 * Check if a letter-category combination is valid
 */
function isValidLetterCategory(letter: string, category: CategoryType): boolean {
  const impossibleCategories = IMPOSSIBLE_COMBOS[letter];
  if (!impossibleCategories) return true;
  return !impossibleCategories.includes(category);
}

/**
 * Generate a daily challenge for a specific date
 */
function generateDailyChallenge(dateString: string): DailyChallenge {
  const seed = dateToSeed(dateString);
  const rng = new SeededRandom(seed);

  // Pick ONE letter for ALL categories
  // 30% chance of two-letter combo, 50% easy, 20% normal
  let letter: string;
  const roll = rng.next();
  if (roll < 0.3) {
    letter = rng.pick(TWO_LETTER_COMBOS);
  } else if (roll < 0.8) {
    letter = rng.pick(EASY_LETTERS);
  } else {
    letter = rng.pick(NORMAL_LETTERS);
  }

  // Pick 5 random categories that work with this letter
  const validCategories = ALL_CATEGORIES.filter(cat => isValidLetterCategory(letter, cat));
  const shuffledCategories = rng.shuffle([...validCategories]);
  const selectedCategories = shuffledCategories.slice(0, 5);

  // Generate a unique ID based on date
  const id = `dc-${dateString}`;

  return {
    id,
    date: dateString,
    letter,
    categories: selectedCategories,
    createdAt: Date.now(),
  };
}

/**
 * Generate a shareable code from a challenge result
 */
function generateShareCode(challengeId: string, username: string): string {
  // Create a short unique code
  const combined = `${challengeId}-${username}-${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash * 31 + combined.charCodeAt(i)) % 2147483647;
  }
  // Convert to alphanumeric code
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  let temp = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    code += chars[temp % chars.length];
    temp = Math.floor(temp / chars.length);
  }
  return code;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0] ?? '';
}

const dailyChallengeRouter = new Hono();

/**
 * GET /api/daily-challenge
 * Get today's daily challenge
 */
dailyChallengeRouter.get('/', (c) => {
  const today = getTodayDateString();
  const challenge = generateDailyChallenge(today);
  return c.json(challenge);
});

/**
 * GET /api/daily-challenge/:date
 * Get the daily challenge for a specific date
 */
dailyChallengeRouter.get('/:date', (c) => {
  const date = c.req.param('date');

  // Validate date format (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return c.json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, 400);
  }

  const challenge = generateDailyChallenge(date);
  return c.json(challenge);
});

/**
 * POST /api/daily-challenge/generate-share-code
 * Generate a share code for a completed challenge
 */
dailyChallengeRouter.post('/generate-share-code', async (c) => {
  try {
    const body = await c.req.json();
    const { challengeId, username } = body;

    if (!challengeId || !username) {
      return c.json({ error: 'Missing challengeId or username' }, 400);
    }

    const shareCode = generateShareCode(challengeId, username);
    return c.json({ shareCode });
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400);
  }
});

/**
 * GET /api/daily-challenge/share/:code
 * Get challenge info from a share code
 * Note: This returns today's challenge since share codes are for the same day
 */
dailyChallengeRouter.get('/share/:code', (c) => {
  const code = c.req.param('code');

  // Validate code format
  if (!/^[A-Z0-9]{6}$/.test(code)) {
    return c.json({ error: 'Invalid share code format' }, 400);
  }

  // Return today's challenge (share codes are meant to invite friends to play the same day's challenge)
  const today = getTodayDateString();
  const challenge = generateDailyChallenge(today);

  return c.json({
    challenge,
    shareCode: code,
    message: "Join the Daily Challenge!"
  });
});

export { dailyChallengeRouter };
