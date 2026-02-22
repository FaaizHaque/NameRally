# NPAT - Name Place Animal Thing

A classic word game for 1-10 players, built with React Native and Expo with real-time multiplayer support via Supabase.

## Game Overview

NPAT (Name Place Animal Thing) is the digital version of the classic pen-and-paper word game. Players compete to come up with words starting with a random letter across various categories.

## Game Modes

### Single Player Mode - 500 Level Progression
- **Progressive difficulty**: 500 levels across 20 difficulty bands
- **Difficulty bands** (25 levels each):
  1. Warmup (1-25) - Learn the basics, 3-4 categories, 12-15s timer
  2. Getting Started (26-50) - New categories appear, 4-5 categories
  3. Novice (51-75) - Minimum word length begins (4+ letters)
  4. Apprentice (76-100) - Normal letters (J, K...) join
  5. Skilled (101-125) - Speed challenge, 9-10s timer
  6. Adept (126-150) - Hard letters (Q, X, Z) appear
  7. Proficient (151-175) - No common words allowed
  8. Experienced (176-200) - Countries & Movies unlock
  9. Advanced (201-225) - Two-letter combos (CH, TH...)
  10. Veteran (226-250) - No repeat letters in answers
  11. Expert (251-275) - Survival mode appears
  12. Master (276-300) - All categories, hard letters, 7s timer
  13. Grandmaster (301-325) - 8 categories every level
  14. Elite (326-350) - Race against the clock, 6s timer
  15. Champion (351-375) - One mistake = failure
  16. Legend (376-400) - Legendary difficulty, 5-6s timer
  17. Mythic (401-425) - Only legends survive, 90%+ required
  18. Immortal (426-450) - Near perfection required
  19. Transcendent (451-475) - Inhuman speed, 4-5s timer
  20. Absolute (476-500) - The impossible challenge, 4s timer, 95%+ required

- **Level mechanics**:
  - Each level = 1 round
  - Pass requirement: Score minimum % to unlock next level
  - Stars: 1 (pass), 2 (75%+), 3 (90%+)
  - Constraints: Min word length, no common words, survival mode, etc.
  - Score multipliers increase with difficulty (1.0x - 2.0x)

- **Letter progression**:
  - Easy letters: A, B, C, D, E, F, G, H, L, M, N, P, R, S, T, W
  - Normal letters: All except Q, X, Y, Z
  - Hard letters: I, J, K, O, U, V, Q, X, Y, Z
  - Two-letter combos: CH, SH, TH, BA, CA, etc.

### Multiplayer Mode
- **Create Game**: Host a new game session and share the code with friends
- **Join Game**: Enter a 6-character room code to join a friend's game
- **2-10 players** per game session
- Real-time competition with live standings

### Daily Challenge Mode (NEW!)
A new daily challenge every day that all players can attempt:

- **5 random categories** with random single letters or two-letter combos
- **Timed gameplay** - Timer runs continuously, stops when all categories are filled
- **Speed Bonus** - +2 extra points for filling each category in 5 seconds or less
- **One attempt per day** - Everyone gets the same challenge
- **Scoring system**:
  - Base: 10 points per correct answer
  - Speed Bonus: +2 points if answered within 5 seconds
  - Maximum possible: 60 points (5 categories × 12 points each)
- **Results screen** shows:
  - Total score and time taken
  - Per-category breakdown with answer times
  - Speed bonus indicators
  - Share code for friends to play the same challenge
- **Shareable results** - Share your score with friends who can then play the same day's challenge to compete

## Features

- **Solo & Multiplayer modes** - Play alone with 500-level progression or with friends
- **Progressive difficulty** - 500 levels across 20 difficulty bands for Single Player
- **Real-time multiplayer** via Supabase
- **1-20 rounds** configurable
- **8 base categories** (6 more unlock at higher levels):
  - Names (Golden)
  - Places (Teal)
  - Animals (Coral)
  - Things (Seafoam)
  - Sports & Games (Blue) - 400+ sports, board games, card games, children's games
  - Fruits/Vegetables (Green)
  - Brands (Rose)
  - Health Issues (Crimson)
- **Advanced categories** (unlocked at higher levels):
  - Countries, Movies, Songs, Professions, Food & Dishes, Historical Figures
- **Dynamic timer** per round (10-20 seconds per category depending on level)
- **STOP button** - complete all categories early to trigger a 5-second countdown
- **Smart scoring**:
  - 10 points for unique answers
  - Shared points for duplicates (singular/plural treated as same - "orange" and "oranges" share points)
  - +2 bonus points for correct answers with 10+ letters (spaces excluded)
- **High score tracking** per difficulty level for solo mode
- **Smart validation**: Supabase database checked first, then local database (with fuzzy matching for spaces/hyphens), then Wikipedia API as fallback
- **Live leaderboard** - See current standings during gameplay (expandable mini-leaderboard)
- **Animated results** - Sequential category-by-category answer reveal with point animations
- **Two-phase results screen** - First shows answers with scoring, then transitions to standings
- **Celebratory winner screen** with podium display
- **Exit during game** - leave anytime with confirmation
- **Host end game** - host can end the entire game early for all players

## How to Play

1. **Create Profile** - Enter your username on first launch
2. **Select Game Mode** - Choose Single Player or Multiplayer
3. **For Single Player** - Select a level → Game starts immediately (no lobby)
4. **For Multiplayer** - Create a game or Join with a room code → Lobby → Start
5. **Play Round** - Fill in words starting with the given letter
6. **Score Points** - Unique = 10pts, shared = split (singular/plural count as same), 10+ letters = +2 bonus
7. **Results** - See score, stars earned, pass/fail status
8. **Progress** - Play Next Level (if passed) or Retry (if failed)

## UI Themes

The app uses two distinct visual themes per game mode:

### Single Player — Notebook / Sketchbook Style
- Warm aged paper background (`NotebookBackground` component)
- Horizontal ruled lines with red margin
- Hand-drawn fonts: PermanentMarker, PatrickHand, Caveat
- Pastel category color strips (yellows, greens, pinks)
- Warm sepia ink tones (`SKETCH_COLORS` from `lib/theme.ts`)
- Subtle paper grain, corner wear, and soft vignette

### Multiplayer — Modern Dark Style
- Deep navy gradient background (`#1a1a2e → #2d2a4a`)
- Clean sans-serif typography with bold weights
- Vivid rainbow category colors (red → slate gradient)
- Glowing teal accents (`#3BA99C`) and coral CTAs (`#FF6B6B`)
- Frosted glass-like cards with `rgba` borders

**Screens by theme:**
- Notebook: `index`, `game-mode`, `level-select`, `game` (SP), `final-results` (SP)
- Modern Dark: `multiplayer-options`, `create-game`, `join-game`, `lobby`, `game` (MP), `round-results`

## Tech Stack

- Expo SDK 53
- React Native 0.76.7
- Supabase (real-time backend)
- Zustand (state management)
- React Query
- NativeWind/Tailwind CSS
- React Native Reanimated (used selectively on daily-challenge, removed from multiplayer screens to prevent iOS text rendering issues)
- Expo Router

## Important Notes on iOS Rendering

**Reanimated Animation Issue Fixed**: Removed all `Animated.View` and `FadeIn` animations from critical multiplayer screens (`game-mode.tsx`, `join-game.tsx`, `multiplayer-options.tsx`, `create-game.tsx`) to fix iOS text rendering bugs. Reanimated animations create separate GPU compositing layers that can clip child Text nodes, causing blank text on physical iOS devices. Kept plain Pressable scale/opacity transforms for feedback instead.

## Project Structure

```
mobile/src/
├── app/                        # Screens (Expo Router)
│   ├── index.tsx              # Home screen
│   ├── game-mode.tsx          # Single Player vs Multiplayer vs Daily Challenge selection
│   ├── level-select.tsx       # 500-level progression selection (Single Player)
│   ├── multiplayer-options.tsx # Create/Join game options (Multiplayer)
│   ├── create-game.tsx        # Game setup (shows level info or category selection)
│   ├── join-game.tsx          # Join with code
│   ├── lobby.tsx              # Pre-game lobby
│   ├── game.tsx               # Main gameplay
│   ├── round-results.tsx      # Round scoring
│   ├── final-results.tsx      # Winner celebration
│   ├── daily-challenge.tsx    # Daily Challenge entry screen
│   ├── daily-challenge-game.tsx # Daily Challenge gameplay
│   └── daily-challenge-results.tsx # Daily Challenge results with sharing
├── components/                # Reusable UI
└── lib/
    ├── supabase.ts            # Supabase client
    ├── level-types.ts         # Level progression types
    ├── daily-challenge-types.ts # Daily Challenge types
    ├── state/
    │   └── game-store.ts      # Zustand game state with level progression & Supabase sync
    ├── word-validation.ts     # Category word data
    └── world-places.ts        # 44,000+ cities/countries from worldcities.csv

backend/src/
├── lib/
│   └── level-generator.ts     # 500-level progression system with difficulty bands
├── routes/
│   ├── levels.ts              # API routes for level data
│   └── daily-challenge.ts     # API routes for daily challenge
└── index.ts                   # Hono server
```

## Backend Setup (Supabase)

The game uses Supabase for real-time multiplayer. Required environment variables:
- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key

### Database Tables

- `game_sessions` - Game configuration and state
- `players` - Player data and scores
- `round_results` - Results for each completed round

Real-time subscriptions keep all players synced automatically. A polling fallback (every 2 seconds) ensures reliable synchronization even if realtime connections have issues.

## Game Logic

- Random letter generation (excluding difficult letters like Q, X, Z in early levels)
- Progressive letter difficulty: Easy → Normal → Hard → Two-letter combos
- Answer validation (must start with the round's letter)
- Fuzzy spelling matching for validation
- Scoring: Unique = 10pts, Shared = 10 ÷ players with same answer (singular/plural treated as same), 10+ letters = +2 bonus
- Level score multipliers (1.0x - 2.0x) based on difficulty band
- Plural/singular normalization: "oranges" and "orange" share points in animal/thing/fruits categories
- Category name rejection: Generic terms like "vegetable", "animal", "fruit", "thing", etc. are rejected as answers for their respective categories
- Level progression persistence via AsyncStorage (unlocked levels, scores, stars)
- Real-time sync across all connected players (Multiplayer)

## Level Constraints (Single Player)

Higher levels introduce special constraints that are **enforced during validation**:
- **None**: Standard gameplay
- **Min Word Length**: Answers must have 4-8+ characters (letters only, spaces excluded)
- **Max Word Length**: Answers must be under a certain length
- **No Common Words**: Avoid obvious/common answers
- **No Repeat Letters**: Each letter can only appear once in answer
- **Ends With Letter**: Words must end with a specific letter
- **Double Letters**: Words must contain double letters (ee, ll, ss, etc.)
- **Time Pressure**: Reduced timer per category
- **Survival Mode**: One invalid answer = level failed
- **Combo**: Multiple constraints combined

**Constraint Indicator**: A purple banner appears at the top of the game screen showing the current level's constraint requirement.

## Two-Letter Combo Availability Validation

For levels with two-letter combos (e.g., CH, TH, BA, etc.), the level generator includes smart validation:

- **Availability Cache**: Precomputed counts of valid answers for each two-letter combo across all 14 categories
- **Minimum Threshold**: Each category must have at least 2 valid answers for the selected combo
- **Automatic Regeneration**: If a combo fails validation, the generator tries up to 10 different combinations
- **Failure Logging**: Validation failures are logged for debugging and monitoring
- **Graceful Fallback**: If all attempts fail, the best available configuration is used

This ensures fair gameplay by preventing impossible or extremely difficult combo-category combinations.

## Answer Validation

The game uses a comprehensive validation system:

- **Minimum length**: All answers must be at least 3 characters (rejects two-letter inputs)
- **Local database**: Extensive word lists for all categories including:
  - Names: International names database
  - Animals: Includes young (cub, fawn, calf, foal, etc.) and gender variants (mare, doe, ewe, hen, etc.)
  - Places: 44,000+ cities/countries from worldcities.csv
  - Sports & Games: 400+ verified sports, games, and activities
- **Wikipedia API fallback**: Category-specific keyword matching for online validation
- **Exclusion lists**: Country names blocked from sports (Malta, etc.), generic terms blocked
- **Two-letter combos**: Hard letter combinations (ZA, ZO) removed from level generation to avoid unfair difficulty
