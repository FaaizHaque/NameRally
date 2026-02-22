/**
 * 500-Level Progression System for Single Player Mode
 *
 * Completely redesigned for VARIED and ENGAGING gameplay throughout all levels.
 * No monotonous stretches - every band introduces something new while mixing elements.
 */

// Minimum valid answers required per category
const MIN_ANSWERS_PER_CATEGORY = 2;

// Maximum regeneration attempts before logging failure
const MAX_REGENERATION_ATTEMPTS = 10;

// Validation log for tracking failures (for debugging purposes)
const validationFailureLogs: Array<{
  level: number;
  combo: string;
  failedCategories: Array<{ category: string; count: number }>;
  timestamp: number;
}> = [];

// ============================================
// TYPE DEFINITIONS
// ============================================

export type CategoryType =
  | 'names'
  | 'places'
  | 'animal'
  | 'thing'
  | 'sports_games'
  | 'brands'
  | 'health_issues'
  // Advanced categories (unlocked at higher levels)
  | 'countries'
  | 'movies'
  | 'songs'
  | 'professions'
  | 'food_dishes'
  | 'famous_people';

export interface LevelConstraint {
  type: 'none' | 'no_common_words' | 'min_word_length' | 'no_repeat_letters' | 'time_pressure' | 'survival' | 'ends_with_letter' | 'double_letters' | 'max_word_length' | 'combo';
  value?: number; // For min/max_word_length
  endLetter?: string; // For ends_with_letter constraint
  comboConstraints?: Array<{ type: LevelConstraint['type']; value?: number; endLetter?: string }>; // For combo - multiple constraints
  description: string;
}

export interface LevelData {
  level: number;
  band: number; // Which difficulty band (1-20)
  bandName: string;

  // Timing
  timerSeconds: number; // 4-15 seconds per category

  // Letter Configuration
  letter: string; // Can be single letter or 2-letter combo (primary letter)
  letterType: 'easy' | 'normal' | 'hard';
  // For multi-letter mode: each category can have a different starting letter
  lettersPerCategory?: string[]; // If set, each category has its own starting letter
  isMultiLetterMode?: boolean; // True when different letters per category

  // Categories
  categories: CategoryType[];
  categoryCount: number;

  // Scoring
  passScorePercent: number; // Minimum % score to pass (30-100%)
  maxPossibleScore: number; // 10 points per category
  minScoreToPass: number; // Calculated from percent

  // Constraints
  constraint: LevelConstraint;
  isSurvivalMode: boolean; // If true, one wrong answer = fail

  // Bonuses
  bonusMultiplier: number; // Score multiplier for this level (1.0-2.0)
}

export interface DifficultyBand {
  bandNumber: number;
  name: string;
  levelRange: [number, number]; // [start, end]
  description: string;

  // Scaling parameters
  timerRange: [number, number]; // [max, min] seconds
  passScoreRange: [number, number]; // [min, max] percent
  categoryCountRange: [number, number]; // [min, max] categories
  letterDifficulties: Array<'easy' | 'normal' | 'hard'>; // Pool to pick from
  constraintPool: LevelConstraint['type'][]; // Pool of constraints to pick from
  allowComboConstraints: boolean; // Can combine multiple constraints
  survivalModeChance: number; // 0-1 probability
  bonusMultiplierRange: [number, number];
  availableCategories: CategoryType[];
  multiLetterMode?: boolean; // For final bands - different letter per category
}

// ============================================
// LETTER POOLS
// ============================================

const LETTER_POOLS = {
  // Common letters with many word options
  easy: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W'],

  // All standard letters (excluding Q, X, Y, Z)
  normal: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W'],

  // Challenging letters with fewer options (excludes X, Q for early hard levels)
  hardEarly: ['I', 'J', 'K', 'O', 'U', 'V', 'Y', 'Z'],

  // Full hard letters (X removed - blocks too many categories; Q kept with limited use)
  hard: ['I', 'J', 'K', 'O', 'U', 'V', 'Q', 'Y', 'Z'],

  // End letters for ends_with_letter constraint
  endLetters: ['A', 'E', 'N', 'R', 'S', 'T', 'Y', 'D', 'L', 'M']
};

// ============================================
// IMPOSSIBLE LETTER-CATEGORY COMBINATIONS
// These combos have very few valid answers and should be avoided
// Based on Supabase data availability and Wikipedia coverage
// ============================================

const IMPOSSIBLE_COMBOS: Record<string, CategoryType[]> = {
  // X has almost no valid answers for most categories
  'X': ['animal', 'names', 'places', 'sports_games', 'food_dishes', 'thing', 'health_issues', 'brands', 'professions', 'famous_people', 'countries', 'movies', 'songs'],
  // Q without U is very limiting
  'Q': ['animal', 'names', 'sports_games', 'food_dishes', 'thing', 'health_issues', 'brands', 'professions', 'famous_people', 'songs'],
  // Z is tough for many categories
  'Z': ['sports_games', 'food_dishes', 'thing', 'health_issues', 'professions', 'songs', 'famous_people'],
  // Y is difficult for many categories
  'Y': ['health_issues', 'sports_games', 'professions', 'famous_people', 'thing', 'brands', 'food_dishes'],
  // U is limited
  'U': ['health_issues', 'sports_games', 'thing', 'famous_people'],
  // V is limited
  'V': ['sports_games', 'health_issues', 'thing', 'famous_people'],
  // K is limited for many categories
  'K': ['health_issues', 'famous_people', 'thing'],
  // J is limited
  'J': ['health_issues', 'sports_games', 'thing', 'famous_people'],
  // I is limited
  'I': ['sports_games', 'thing', 'health_issues'],
  // O is limited
  'O': ['health_issues', 'sports_games', 'thing'],
  // W is limited for some
  'W': ['health_issues'],
};

// ============================================
// IMPOSSIBLE CONSTRAINT COMBINATIONS
// Letter + Category + Constraint combinations that have NO valid answers
// These are checked to avoid generating unplayable levels
// ============================================

// Categories that should NEVER have ends_with_letter constraint with hard letters
// Because finding words starting with hard letter AND ending with specific letter is nearly impossible
const ENDS_WITH_RESTRICTED: Record<string, CategoryType[]> = {
  // These letters make ends_with_letter too hard for most categories
  'J': ['animal', 'thing', 'places', 'names', 'brands', 'food_dishes', 'movies', 'songs', 'professions', 'countries', 'famous_people', 'health_issues', 'sports_games'],
  'Q': ['animal', 'thing', 'places', 'names', 'brands', 'food_dishes', 'movies', 'songs', 'professions', 'countries', 'famous_people', 'health_issues', 'sports_games'],
  'X': ['animal', 'thing', 'places', 'names', 'brands', 'food_dishes', 'movies', 'songs', 'professions', 'countries', 'famous_people', 'health_issues', 'sports_games'],
  'Z': ['animal', 'thing', 'places', 'names', 'brands', 'food_dishes', 'movies', 'songs', 'professions', 'countries', 'famous_people', 'health_issues', 'sports_games'],
  'Y': ['animal', 'thing', 'places', 'brands', 'food_dishes', 'professions', 'famous_people', 'health_issues', 'sports_games'],
  'U': ['animal', 'thing', 'brands', 'professions', 'famous_people', 'health_issues', 'sports_games'],
  'V': ['animal', 'thing', 'brands', 'professions', 'famous_people', 'health_issues', 'sports_games'],
  'K': ['thing', 'professions', 'famous_people', 'health_issues', 'sports_games'],
  'I': ['thing', 'professions', 'sports_games'],
  'O': ['thing', 'health_issues', 'sports_games', 'professions'],
};

// Check if a letter+category+constraint combo is playable
function isConstraintPlayable(
  letter: string,
  category: CategoryType,
  constraintType: LevelConstraint['type']
): boolean {
  // ends_with_letter is very restrictive with hard letters
  if (constraintType === 'ends_with_letter') {
    const restricted = ENDS_WITH_RESTRICTED[letter];
    if (restricted && restricted.includes(category)) {
      return false;
    }
  }

  // no_repeat_letters is hard with long starting letters or complex categories
  if (constraintType === 'no_repeat_letters') {
    // Hard letters + complex categories = too difficult
    const hardLetters = ['Q', 'X', 'Z', 'J', 'K'];
    if (hardLetters.includes(letter)) {
      return false; // Skip no_repeat_letters entirely for hard letters
    }
  }

  // double_letters constraint is hard for many letter+category combos
  if (constraintType === 'double_letters') {
    const hardLetters = ['Q', 'X', 'Z', 'J', 'Y', 'K', 'V', 'U'];
    if (hardLetters.includes(letter)) {
      return false;
    }
  }

  return true;
}

// ============================================
// BASE CATEGORIES
// ============================================

const BASE_CATEGORIES: CategoryType[] = [
  'names', 'places', 'animal', 'thing', 'sports_games', 'brands', 'health_issues'
];

const ADVANCED_CATEGORIES: CategoryType[] = [
  'countries', 'movies', 'songs', 'professions', 'food_dishes', 'famous_people'
];

// ============================================
// DIFFICULTY BANDS (20 bands, 25 levels each = 500 levels)
// Redesigned for VARIETY - no two bands feel the same!
// ============================================

const DIFFICULTY_BANDS: DifficultyBand[] = [
  // === PHASE 1: LEARNING THE GAME (Levels 1-100) ===

  // Band 1: Warmup (Levels 1-25) - Pure introduction
  {
    bandNumber: 1,
    name: 'Warmup',
    levelRange: [1, 25],
    description: 'Learn the basics with easy letters',
    timerRange: [15, 13],
    passScoreRange: [30, 45],
    categoryCountRange: [3, 4],
    letterDifficulties: ['easy'],
    constraintPool: ['none'],
    allowComboConstraints: false,
    survivalModeChance: 0,
    bonusMultiplierRange: [1.0, 1.0],
    availableCategories: ['names', 'places', 'animal', 'thing']
  },

  // Band 2: First Challenge (Levels 26-50) - Introduce min word length
  {
    bandNumber: 2,
    name: 'First Steps',
    levelRange: [26, 50],
    description: 'Words must be 4+ letters',
    timerRange: [14, 12],
    passScoreRange: [40, 50],
    categoryCountRange: [3, 4],
    letterDifficulties: ['easy', 'easy', 'normal'], // Mostly easy, occasional normal
    constraintPool: ['none', 'min_word_length'],
    allowComboConstraints: false,
    survivalModeChance: 0,
    bonusMultiplierRange: [1.0, 1.05],
    availableCategories: ['names', 'places', 'animal', 'thing', 'sports_games']
  },

  // Band 3: Speed Intro (Levels 51-75) - Tighter time + more categories
  {
    bandNumber: 3,
    name: 'Quick Thinking',
    levelRange: [51, 75],
    description: 'Think faster, more categories',
    timerRange: [12, 11],
    passScoreRange: [45, 55],
    categoryCountRange: [4, 5],
    letterDifficulties: ['easy', 'normal'],
    constraintPool: ['none', 'min_word_length', 'time_pressure'],
    allowComboConstraints: false,
    survivalModeChance: 0.05,
    bonusMultiplierRange: [1.05, 1.1],
    availableCategories: ['names', 'places', 'animal', 'thing', 'brands', 'sports_games']
  },

  // Band 4: Two-Letter Intro (Levels 76-100) - First two-letter combos!
  {
    bandNumber: 4,
    name: 'Double Trouble',
    levelRange: [76, 100],
    description: 'Two-letter combos appear (CH, TH...)',
    timerRange: [12, 11],
    passScoreRange: [45, 55],
    categoryCountRange: [4, 5],
    letterDifficulties: ['easy', 'normal'], // Mix in two-letter
    constraintPool: ['none', 'min_word_length'],
    allowComboConstraints: false,
    survivalModeChance: 0.05,
    bonusMultiplierRange: [1.1, 1.15],
    availableCategories: BASE_CATEGORIES.slice(0, 7) // First 7 base categories
  },

  // === PHASE 2: BUILDING SKILLS (Levels 101-200) ===

  // Band 5: Ends With (Levels 101-125) - New constraint type!
  {
    bandNumber: 5,
    name: 'Finish Strong',
    levelRange: [101, 125],
    description: 'Words must end with specific letter',
    timerRange: [11, 10],
    passScoreRange: [50, 60],
    categoryCountRange: [4, 5],
    letterDifficulties: ['easy', 'normal'],
    constraintPool: ['none', 'ends_with_letter', 'min_word_length'],
    allowComboConstraints: false,
    survivalModeChance: 0.1,
    bonusMultiplierRange: [1.15, 1.2],
    availableCategories: BASE_CATEGORIES
  },

  // Band 6: No Repeats (Levels 126-150) - Letter uniqueness constraint
  {
    bandNumber: 6,
    name: 'Unique Letters',
    levelRange: [126, 150],
    description: 'No repeating letters in answers',
    timerRange: [11, 10],
    passScoreRange: [50, 60],
    categoryCountRange: [5, 6],
    letterDifficulties: ['normal'],
    constraintPool: ['no_repeat_letters', 'min_word_length', 'none'],
    allowComboConstraints: false,
    survivalModeChance: 0.1,
    bonusMultiplierRange: [1.2, 1.25],
    availableCategories: BASE_CATEGORIES
  },

  // Band 7: Hard Letters (Levels 151-175) - Q, X, Y, Z appear
  {
    bandNumber: 7,
    name: 'Tough Letters',
    levelRange: [151, 175],
    description: 'Hard letters join the mix (Q, X, Y, Z)',
    timerRange: [11, 10],
    passScoreRange: [50, 60],
    categoryCountRange: [5, 6],
    letterDifficulties: ['normal', 'hard'],
    constraintPool: ['none', 'min_word_length', 'ends_with_letter'],
    allowComboConstraints: false,
    survivalModeChance: 0.15,
    bonusMultiplierRange: [1.25, 1.3],
    availableCategories: BASE_CATEGORIES
  },

  // Band 8: First Combos (Levels 176-200) - Constraint combinations begin!
  {
    bandNumber: 8,
    name: 'Double Duty',
    levelRange: [176, 200],
    description: 'Multiple constraints at once!',
    timerRange: [10, 9],
    passScoreRange: [55, 65],
    categoryCountRange: [5, 6],
    letterDifficulties: ['normal', 'hard'],
    constraintPool: ['min_word_length', 'ends_with_letter', 'no_repeat_letters', 'combo'],
    allowComboConstraints: true, // Can have 2 constraints!
    survivalModeChance: 0.15,
    bonusMultiplierRange: [1.3, 1.35],
    availableCategories: [...BASE_CATEGORIES, 'countries']
  },

  // === PHASE 3: ADVANCED PLAY (Levels 201-300) ===

  // Band 9: Movies & Songs (Levels 201-225) - Pop culture categories
  {
    bandNumber: 9,
    name: 'Pop Culture',
    levelRange: [201, 225],
    description: 'Movies & Songs categories unlock',
    timerRange: [10, 9],
    passScoreRange: [55, 65],
    categoryCountRange: [6, 7],
    letterDifficulties: ['normal', 'hard'],
    constraintPool: ['min_word_length', 'ends_with_letter', 'no_common_words', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.2,
    bonusMultiplierRange: [1.35, 1.4],
    availableCategories: [...BASE_CATEGORIES, 'countries', 'movies', 'songs']
  },

  // Band 10: Word Length Squeeze (Levels 226-250) - Min AND max length
  {
    bandNumber: 10,
    name: 'Perfect Fit',
    levelRange: [226, 250],
    description: 'Words must be exactly right length',
    timerRange: [9, 9],
    passScoreRange: [60, 70],
    categoryCountRange: [6, 7],
    letterDifficulties: ['normal', 'hard'],
    constraintPool: ['min_word_length', 'max_word_length', 'no_repeat_letters', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.25,
    bonusMultiplierRange: [1.4, 1.45],
    availableCategories: [...BASE_CATEGORIES, 'countries', 'movies', 'songs', 'professions']
  },

  // Band 11: Survival Intro (Levels 251-275) - One mistake = fail
  {
    bandNumber: 11,
    name: 'No Mistakes',
    levelRange: [251, 275],
    description: 'Survival mode - one wrong = fail',
    timerRange: [9, 8],
    passScoreRange: [60, 70],
    categoryCountRange: [6, 7],
    letterDifficulties: ['hard', 'normal'],
    constraintPool: ['survival', 'min_word_length', 'ends_with_letter'],
    allowComboConstraints: true,
    survivalModeChance: 0.4,
    bonusMultiplierRange: [1.45, 1.5],
    availableCategories: [...BASE_CATEGORIES, 'countries', 'movies', 'songs', 'professions']
  },

  // Band 12: Double Letters (Levels 276-300) - Words need double letters
  {
    bandNumber: 12,
    name: 'Seeing Double',
    levelRange: [276, 300],
    description: 'Words must contain double letters (aa, bb, cc...)',
    timerRange: [9, 8],
    passScoreRange: [65, 75],
    categoryCountRange: [7, 7],
    letterDifficulties: ['hard', 'normal'],
    constraintPool: ['double_letters', 'min_word_length', 'no_common_words', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.35,
    bonusMultiplierRange: [1.5, 1.55],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES.slice(0, 4)]
  },

  // === PHASE 4: EXPERT TERRITORY (Levels 301-400) ===

  // Band 13: Full Categories (Levels 301-325) - All 14 categories
  {
    bandNumber: 13,
    name: 'Full Spectrum',
    levelRange: [301, 325],
    description: 'All categories in play',
    timerRange: [8, 8],
    passScoreRange: [65, 75],
    categoryCountRange: [7, 8],
    letterDifficulties: ['hard'],
    constraintPool: ['min_word_length', 'no_repeat_letters', 'ends_with_letter', 'double_letters', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.4,
    bonusMultiplierRange: [1.55, 1.6],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES]
  },

  // Band 14: Speed Demon (Levels 326-350) - Fast & furious
  {
    bandNumber: 14,
    name: 'Speed Demon',
    levelRange: [326, 350],
    description: 'Lightning fast rounds',
    timerRange: [7, 6],
    passScoreRange: [70, 80],
    categoryCountRange: [7, 8],
    letterDifficulties: ['hard', 'normal'],
    constraintPool: ['time_pressure', 'min_word_length', 'survival', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.5,
    bonusMultiplierRange: [1.6, 1.65],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES]
  },

  // Band 15: Triple Threat (Levels 351-375) - 3 constraints possible!
  {
    bandNumber: 15,
    name: 'Triple Threat',
    levelRange: [351, 375],
    description: 'Up to 3 constraints at once',
    timerRange: [7, 7],
    passScoreRange: [70, 80],
    categoryCountRange: [8, 8],
    letterDifficulties: ['hard'],
    constraintPool: ['min_word_length', 'ends_with_letter', 'no_repeat_letters', 'no_common_words', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.55,
    bonusMultiplierRange: [1.65, 1.7],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES]
  },

  // Band 16: Gauntlet (Levels 376-400) - High stakes survival
  {
    bandNumber: 16,
    name: 'The Gauntlet',
    levelRange: [376, 400],
    description: 'High stakes, no safety net',
    timerRange: [7, 6],
    passScoreRange: [75, 85],
    categoryCountRange: [8, 8],
    letterDifficulties: ['hard'],
    constraintPool: ['survival', 'min_word_length', 'no_repeat_letters', 'ends_with_letter', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.65,
    bonusMultiplierRange: [1.7, 1.75],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES]
  },

  // === PHASE 5: LEGENDARY (Levels 401-500) ===

  // Band 17: Mythic (Levels 401-425) - Everything harder
  {
    bandNumber: 17,
    name: 'Mythic',
    levelRange: [401, 425],
    description: 'Only legends dare attempt',
    timerRange: [6, 5],
    passScoreRange: [80, 90],
    categoryCountRange: [8, 8],
    letterDifficulties: ['hard'],
    constraintPool: ['min_word_length', 'no_repeat_letters', 'ends_with_letter', 'double_letters', 'no_common_words', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.75,
    bonusMultiplierRange: [1.75, 1.8],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES]
  },

  // Band 18: Immortal (Levels 426-450) - Near perfection
  {
    bandNumber: 18,
    name: 'Immortal',
    levelRange: [426, 450],
    description: 'Near perfection required',
    timerRange: [5, 5],
    passScoreRange: [85, 95],
    categoryCountRange: [8, 8],
    letterDifficulties: ['hard'],
    constraintPool: ['survival', 'min_word_length', 'no_repeat_letters', 'ends_with_letter', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.85,
    bonusMultiplierRange: [1.8, 1.85],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES]
  },

  // Band 19: Transcendent (Levels 451-475) - MULTI-LETTER MODE!
  // Each category has a DIFFERENT starting letter
  {
    bandNumber: 19,
    name: 'Transcendent',
    levelRange: [451, 475],
    description: 'Different letter per category!',
    timerRange: [6, 5],
    passScoreRange: [85, 95],
    categoryCountRange: [6, 8], // Slightly fewer categories but harder
    letterDifficulties: ['hard', 'normal'],
    constraintPool: ['min_word_length', 'no_repeat_letters', 'survival', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.8,
    bonusMultiplierRange: [1.85, 1.9],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES],
    multiLetterMode: true // SPECIAL: Each category gets different letter!
  },

  // Band 20: Absolute (Levels 476-500) - THE ULTIMATE TEST
  // Multi-letter mode with hardest letters
  {
    bandNumber: 20,
    name: 'Absolute',
    levelRange: [476, 500],
    description: 'The impossible challenge - different hard letters per category',
    timerRange: [5, 4],
    passScoreRange: [90, 100],
    categoryCountRange: [6, 8],
    letterDifficulties: ['hard'], // Only hard letters in multi-letter mode
    constraintPool: ['survival', 'min_word_length', 'no_repeat_letters', 'ends_with_letter', 'combo'],
    allowComboConstraints: true,
    survivalModeChance: 0.95,
    bonusMultiplierRange: [1.9, 2.0],
    availableCategories: [...BASE_CATEGORIES, ...ADVANCED_CATEGORIES],
    multiLetterMode: true // SPECIAL: Each category gets different HARD letter!
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Seeded random number generator for deterministic level generation
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

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
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

  pickMultiple<T>(array: T[], count: number): T[] {
    const shuffled = this.shuffle(array);
    return shuffled.slice(0, count);
  }
}

/**
 * Linear interpolation
 */
function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/**
 * Get the band for a given level number
 */
function getBandForLevel(level: number): DifficultyBand {
  const band = DIFFICULTY_BANDS.find(
    b => level >= b.levelRange[0] && level <= b.levelRange[1]
  );
  return band ?? DIFFICULTY_BANDS[DIFFICULTY_BANDS.length - 1]!;
}

/**
 * Calculate progress within a band (0-1)
 */
function getProgressInBand(level: number, band: DifficultyBand): number {
  const [start, end] = band.levelRange;
  return (level - start) / (end - start);
}

/**
 * Pre-computed letter sequence for Warmup band
 */
const WARMUP_LETTER_SEQUENCE = [
  'S', 'M', 'B', 'T', 'C', 'P', 'R', 'D', 'L', 'F', 'H', 'G', 'N', 'W', 'A', 'E',
  'T', 'S', 'C', 'M', 'P', 'B', 'R', 'L', 'D'
];

/**
 * Get number of valid categories for a letter (excluding impossible combos)
 */
function getValidCategoryCount(letter: string, availableCategories: CategoryType[]): number {
  const impossibleForLetter = IMPOSSIBLE_COMBOS[letter] || [];
  return availableCategories.filter(c => !impossibleForLetter.includes(c)).length;
}

/**
 * Minimum number of valid categories required for a letter to be usable
 */
const MIN_VALID_CATEGORIES_FOR_LETTER = 3;

/**
 * Select a letter based on difficulty
 * Ensures the letter has enough valid categories to avoid empty levels
 */
function selectLetter(band: DifficultyBand, rng: SeededRandom, level: number): { letter: string; type: LevelData['letterType'] } {
  // Special handling for Warmup band
  if (band.bandNumber === 1 && level >= 1 && level <= 25) {
    const letter = WARMUP_LETTER_SEQUENCE[level - 1] || 'S';
    return { letter, type: 'easy' };
  }

  // Pick from the band's letter difficulty pool
  const difficulty = rng.pick(band.letterDifficulties);

  // Helper to try picking a valid letter from a pool
  const tryPickValidLetter = (pool: string[], maxAttempts: number = 20): string | null => {
    const shuffled = rng.shuffle([...pool]);
    for (const letter of shuffled) {
      const validCount = getValidCategoryCount(letter, band.availableCategories);
      if (validCount >= MIN_VALID_CATEGORIES_FOR_LETTER) {
        return letter;
      }
    }
    return null;
  };

  let pool: string[];
  let type: LevelData['letterType'];

  switch (difficulty) {
    case 'easy':
      pool = LETTER_POOLS.easy;
      type = 'easy';
      break;
    case 'normal':
      pool = LETTER_POOLS.normal;
      type = 'normal';
      break;
    case 'hard':
      // Use hardEarly (no X, Q) for levels below 100
      pool = level <= 100 ? LETTER_POOLS.hardEarly : LETTER_POOLS.hard;
      type = 'hard';
      break;
    default:
      pool = LETTER_POOLS.normal;
      type = 'normal';
  }

  // Try to find a valid letter from the selected pool
  let letter = tryPickValidLetter(pool);

  // If no valid letter found in the hard pool, try normal pool
  if (!letter && type === 'hard') {
    letter = tryPickValidLetter(LETTER_POOLS.normal);
    if (letter) type = 'normal';
  }

  // If still no valid letter, try easy pool
  if (!letter) {
    letter = tryPickValidLetter(LETTER_POOLS.easy);
    if (letter) type = 'easy';
  }

  // Final fallback - use S which is always safe
  if (!letter) {
    letter = 'S';
    type = 'easy';
  }

  return { letter, type };
}

/**
 * Select multiple different letters for multi-letter mode
 * Each letter is validated against its corresponding category to avoid impossible combos
 */
function selectMultipleLetters(band: DifficultyBand, rng: SeededRandom, categories: CategoryType[]): string[] {
  const letters: string[] = [];
  const usedLetters = new Set<string>();

  // For final bands, prefer harder letters
  const preferHard = band.bandNumber >= 19;

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]!;
    let attempts = 0;
    let letter: string = 'A'; // Default
    let isValid = false;

    while (!isValid && attempts < 100) {
      const difficulty = rng.pick(band.letterDifficulties);
      let pool: string[];

      if (preferHard && rng.next() < 0.7) {
        // 70% chance of hard letter in final bands
        pool = LETTER_POOLS.hard;
      } else {
        switch (difficulty) {
          case 'easy':
            pool = LETTER_POOLS.easy;
            break;
          case 'normal':
            pool = LETTER_POOLS.normal;
            break;
          case 'hard':
            pool = LETTER_POOLS.hard;
            break;
          default:
            pool = LETTER_POOLS.normal;
        }
      }

      letter = rng.pick(pool);
      attempts++;

      // Check if this letter is valid (not used and not impossible for category)
      const impossibleForLetter = IMPOSSIBLE_COMBOS[letter] || [];
      const isImpossible = impossibleForLetter.includes(category);
      const isUsed = usedLetters.has(letter);

      if (!isImpossible && !isUsed) {
        isValid = true;
      }
    }

    // Final fallback: if we couldn't find a valid letter, use a safe one
    if (!isValid) {
      const safePool = LETTER_POOLS.easy.filter(l => {
        const imp = IMPOSSIBLE_COMBOS[l] || [];
        return !imp.includes(category) && !usedLetters.has(l);
      });
      if (safePool.length > 0) {
        letter = rng.pick(safePool);
      }
    }

    letters.push(letter);
    usedLetters.add(letter);
  }

  return letters;
}

/**
 * Select constraint(s) for this level
 * @param letterType - Used to pick appropriate end letters
 * @param letter - The actual letter, used to avoid restrictive combos for hard letters
 * @param categories - The categories in this level
 * @param lettersPerCategory - For multi-letter mode, the letter for each category
 */
function selectConstraint(
  band: DifficultyBand,
  rng: SeededRandom,
  level: number,
  letterType: LevelData['letterType'],
  letter: string,
  categories: CategoryType[],
  lettersPerCategory?: string[]
): LevelConstraint {
  let constraintType = rng.pick(band.constraintPool);
  const progress = getProgressInBand(level, band);

  // Hard letters that have very few words - avoid restrictive constraints
  const veryHardLetters = ['Q', 'X', 'Z'];
  const isVeryHardLetter = veryHardLetters.includes(letter.toUpperCase());

  // Check if the constraint is playable for ALL letter/category pairs
  const isPlayableForAll = (constraint: LevelConstraint['type']): boolean => {
    if (lettersPerCategory) {
      // Multi-letter mode: check each letter/category pair
      for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const ltr = lettersPerCategory[i];
        if (cat && ltr && !isConstraintPlayable(ltr, cat, constraint)) {
          return false;
        }
      }
    } else {
      // Single letter mode: check letter against all categories
      for (const cat of categories) {
        if (!isConstraintPlayable(letter, cat, constraint)) {
          return false;
        }
      }
    }
    return true;
  };

  // If the selected constraint is not playable, find an alternative
  if (!isPlayableForAll(constraintType)) {
    const alternativePool = band.constraintPool.filter(c =>
      c !== constraintType && c !== 'combo' && isPlayableForAll(c)
    );
    constraintType = alternativePool.length > 0 ? rng.pick(alternativePool) : 'none';
  }

  // For very hard letters (Q, X, Z), avoid double_letters and ends_with_letter constraints
  // These letters have too few words to combine with additional letter-based constraints
  if (isVeryHardLetter && (constraintType === 'double_letters' || constraintType === 'ends_with_letter')) {
    const alternativePool = band.constraintPool.filter(c =>
      c !== 'double_letters' && c !== 'ends_with_letter' && c !== 'combo'
    );
    constraintType = alternativePool.length > 0 ? rng.pick(alternativePool) : 'none';
  }

  // Helper to create individual constraint
  const createConstraint = (type: LevelConstraint['type']): LevelConstraint => {
    switch (type) {
      case 'none':
        return { type: 'none', description: 'No special constraints' };

      case 'no_common_words':
        return {
          type: 'no_common_words',
          description: 'Avoid common/obvious answers'
        };

      case 'min_word_length':
        // Scales with level: 4-8 letters
        // For hard letters (Q, X, Z, J, Y, etc.), cap at 5-6 letters
        // In multi-letter mode, check if ANY letter is hard
        const hardLettersForLength = ['Q', 'X', 'Z', 'J', 'Y', 'K', 'V', 'U'];
        let hasHardLetter = hardLettersForLength.includes(letter.toUpperCase());

        // Check lettersPerCategory if available (multi-letter mode)
        if (lettersPerCategory) {
          hasHardLetter = lettersPerCategory.some(l => hardLettersForLength.includes(l.toUpperCase()));
        }

        let minLength: number;
        if (hasHardLetter) {
          minLength = Math.min(4 + Math.floor(level / 200), 5); // Cap at 5 for hard letters
        } else {
          minLength = Math.min(4 + Math.floor(level / 100), 7); // Cap at 7 for normal
        }
        return {
          type: 'min_word_length',
          value: minLength,
          description: `Words must be ${minLength}+ letters`
        };

      case 'max_word_length':
        // 6-10 letters max
        const maxLength = Math.max(6, 10 - Math.floor(level / 150));
        return {
          type: 'max_word_length',
          value: maxLength,
          description: `Words must be ${maxLength} letters or less`
        };

      case 'no_repeat_letters':
        return {
          type: 'no_repeat_letters',
          description: 'No letter can repeat in your answer'
        };

      case 'time_pressure':
        return {
          type: 'time_pressure',
          description: 'Think fast! Reduced time'
        };

      case 'survival':
        return {
          type: 'survival',
          description: 'One invalid answer = level failed!'
        };

      case 'ends_with_letter':
        const endLetter = rng.pick(LETTER_POOLS.endLetters);
        return {
          type: 'ends_with_letter',
          endLetter,
          description: `Words must end with "${endLetter}"`
        };

      case 'double_letters':
        return {
          type: 'double_letters',
          description: 'Words must contain double letters (ee, ll, ss...)'
        };

      default:
        return { type: 'none', description: 'No special constraints' };
    }
  };

  // Handle combo constraints
  if (constraintType === 'combo' && band.allowComboConstraints) {
    // Pick 2-3 different constraints to combine
    const availableForCombo = band.constraintPool.filter(
      c => c !== 'combo' && c !== 'none' && c !== 'survival'
    );

    // More constraints at higher levels
    let comboCount: number;
    if (band.bandNumber >= 15) {
      comboCount = rng.nextInt(2, 3);
    } else {
      comboCount = 2;
    }
    const selectedTypes = rng.pickMultiple(availableForCombo, comboCount);

    const comboConstraints = selectedTypes.map(t => {
      const c = createConstraint(t);
      return { type: c.type, value: c.value, endLetter: c.endLetter };
    });

    const descriptions = comboConstraints.map(c => {
      const full = createConstraint(c.type);
      if (c.type === 'min_word_length') return `${c.value}+ letters`;
      if (c.type === 'max_word_length') return `≤${c.value} letters`;
      if (c.type === 'ends_with_letter') return `ends with "${c.endLetter}"`;
      return full.description;
    });

    return {
      type: 'combo',
      comboConstraints,
      description: descriptions.join(' + ')
    };
  }

  return createConstraint(constraintType);
}

/**
 * Select categories for this level, filtering out impossible letter-category combos
 * NEVER allows impossible combos - will reduce category count if necessary
 */
function selectCategories(band: DifficultyBand, rng: SeededRandom, count: number, level: number, letter: string): CategoryType[] {
  // Get impossible categories for this letter
  const impossibleForLetter = IMPOSSIBLE_COMBOS[letter] || [];

  // For Warmup band, progressively introduce categories
  if (band.bandNumber === 1) {
    if (level <= 8) {
      const cats: CategoryType[] = ['names', 'places', 'animal'];
      const filtered = cats.filter(c => !impossibleForLetter.includes(c));
      // Always use filtered list - never allow impossible combos
      return rng.shuffle(filtered).slice(0, Math.min(count, filtered.length));
    } else if (level <= 17) {
      const cats: CategoryType[] = ['names', 'places', 'animal', 'thing'];
      const filtered = cats.filter(c => !impossibleForLetter.includes(c));
      return rng.shuffle(filtered).slice(0, Math.min(count, filtered.length));
    } else {
      const cats: CategoryType[] = ['names', 'places', 'animal', 'thing'];
      const filtered = cats.filter(c => !impossibleForLetter.includes(c));
      return rng.shuffle(filtered).slice(0, Math.min(count, filtered.length));
    }
  }

  // Filter out impossible combos for the selected letter - NEVER allow impossible combos
  const availableCategories = band.availableCategories.filter(
    c => !impossibleForLetter.includes(c)
  );

  // Use available categories, reducing count if necessary rather than allowing impossible combos
  const shuffled = rng.shuffle(availableCategories);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ============================================
// MAIN LEVEL GENERATOR
// ============================================

/**
 * Internal function to generate a level with a specific seed offset
 * Used for regeneration attempts when validation fails
 */
function generateLevelWithSeedOffset(levelNumber: number, seedOffset: number): {
  levelData: LevelData;
  validationResult: { isValid: boolean; failedCategories: Array<{ category: string; count: number }> };
} {
  const rng = new SeededRandom(levelNumber * 12345 + seedOffset);
  const band = getBandForLevel(levelNumber);
  const progress = getProgressInBand(levelNumber, band);

  // Calculate timer
  const timerSeconds = Math.round(lerp(band.timerRange[0], band.timerRange[1], progress));

  // Calculate category count
  const categoryCount = rng.nextInt(band.categoryCountRange[0], band.categoryCountRange[1]);

  // Handle letter selection first (needed for category filtering)
  let letter: string;
  let letterType: LevelData['letterType'];
  let lettersPerCategory: string[] | undefined;
  let isMultiLetterMode = false;

  if (band.multiLetterMode) {
    // Multi-letter mode: select primary letter first for category filtering
    const selected = selectLetter(band, rng, levelNumber);
    letter = selected.letter;
    letterType = 'hard'; // Mark as hard since it's the hardest mode
    isMultiLetterMode = true;
  } else {
    // Normal mode: single letter for all categories
    const selected = selectLetter(band, rng, levelNumber);
    letter = selected.letter;
    letterType = selected.type;
  }

  // Select categories (filtered by letter to avoid impossible combos)
  const categories = selectCategories(band, rng, categoryCount, levelNumber, letter);

  // For multi-letter mode, now generate letters for each category
  if (isMultiLetterMode) {
    lettersPerCategory = selectMultipleLetters(band, rng, categories);
    letter = lettersPerCategory[0] || 'A'; // Update primary letter for display
  }

  // Validate 2-letter combo availability BEFORE finalizing the level
  let validationResult: { isValid: boolean; failedCategories: Array<{ category: string; count: number }> } = {
    isValid: true,
    failedCategories: []
  };

  // No validation needed - only single letters are used now

  // Calculate pass score
  const passScorePercent = Math.round(lerp(band.passScoreRange[0], band.passScoreRange[1], progress));

  // Calculate scores
  const maxPossibleScore = categories.length * 10;
  const minScoreToPass = Math.ceil(maxPossibleScore * passScorePercent / 100);

  // Select constraint (pass categories and lettersPerCategory for validation)
  const constraint = selectConstraint(band, rng, levelNumber, letterType, letter, categories, lettersPerCategory);

  // Determine survival mode
  const isSurvivalMode = rng.next() < band.survivalModeChance || constraint.type === 'survival';

  // Calculate bonus multiplier
  const bonusMultiplier = Number(lerp(band.bonusMultiplierRange[0], band.bonusMultiplierRange[1], progress).toFixed(2));

  const levelData: LevelData = {
    level: levelNumber,
    band: band.bandNumber,
    bandName: band.name,
    timerSeconds,
    letter,
    letterType,
    lettersPerCategory,
    isMultiLetterMode,
    categories,
    categoryCount,
    passScorePercent,
    maxPossibleScore,
    minScoreToPass,
    constraint,
    isSurvivalMode,
    bonusMultiplier
  };

  return { levelData, validationResult };
}

/**
 * Generate a single level's data
 */
export function generateLevel(levelNumber: number): LevelData {
  if (levelNumber < 1 || levelNumber > 500) {
    throw new Error(`Invalid level number: ${levelNumber}. Must be between 1 and 500.`);
  }

  const result = generateLevelWithSeedOffset(levelNumber, 0);
  return result.levelData;
}

/**
 * Generate all 500 levels
 */
export function generateAllLevels(): LevelData[] {
  return Array.from({ length: 500 }, (_, i) => generateLevel(i + 1));
}

/**
 * Get all difficulty bands metadata
 */
export function getAllBands(): DifficultyBand[] {
  return DIFFICULTY_BANDS;
}

/**
 * Get a specific band by number
 */
export function getBand(bandNumber: number): DifficultyBand | undefined {
  return DIFFICULTY_BANDS.find(b => b.bandNumber === bandNumber);
}

/**
 * Get user-friendly level summary
 */
export function getLevelSummary(levelNumber: number): string {
  const level = generateLevel(levelNumber);
  const letterDisplay = level.isMultiLetterMode
    ? `Letters: ${level.lettersPerCategory?.join(', ')}`
    : `Letter "${level.letter}"`;

  return `Level ${level.level} (${level.bandName}): ${letterDisplay} | ${level.categoryCount} categories | ${level.timerSeconds}s | Pass: ${level.minScoreToPass}/${level.maxPossibleScore} (${level.passScorePercent}%)${level.isSurvivalMode ? ' | SURVIVAL' : ''} | ${level.constraint.description}`;
}
