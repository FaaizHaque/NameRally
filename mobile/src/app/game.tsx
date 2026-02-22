import React, { useEffect, useRef, useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { Audio } from 'expo-av';
import {
  Clock, Hand, User, MapPin, Cat, Box, Trophy, Apple,
  ShoppingBag, Check, AlertTriangle, LogOut, X, HeartPulse,
  Gamepad2, Crown, ChevronDown, ChevronUp, Globe, Film, Music,
  Briefcase, Utensils, Info, Landmark, Lightbulb, Star, Pencil, Play,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useFonts, Caveat_400Regular, Caveat_600SemiBold, Caveat_700Bold } from '@expo-google-fonts/caveat';
import { PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import { ShadowsIntoLight_400Regular } from '@expo-google-fonts/shadows-into-light';
import { PermanentMarker_400Regular } from '@expo-google-fonts/permanent-marker';
import { useGameStore, CategoryType } from '@/lib/state/game-store';
import { getCategoryName, getHintAsync, LevelConstraintCheck } from '@/lib/word-validation';
import { NotebookBackground } from '@/components/NotebookBackground';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = {
  paper:       '#F2EAD0',   // Warm aged off-white
  paperDark:   '#E8DDB8',   // Darker aged cream
  paperLine:   '#8A7040',   // Sepia rule line (used at low opacity)
  paperDeep:   '#C4A870',
  marginRed:   'rgba(190,80,65,0.28)',
  ink:         '#1C120A',
  inkMed:      '#40301A',
  inkFaint:    '#8A7050',
  sticky:      '#FFE84A',
  stickyDark:  '#C8A800',
  tape:        'rgba(205,190,120,0.6)',
  amber:       '#D09010',
  amberBg:     '#FEF0B0',
  stopRed:     '#C41818',
  stopRedBg:   '#FFE8E8',
  wire:        '#8A7055',
  wireDark:    '#5A4030',
  wireLight:   '#C8B898',
  pencilYellow:'#FFD93D',
  pencilPink:  '#E8786A',
  pencilTip:   '#2A1A0A',
};

// Vivid category colors — dopamine-level saturation
type CC = { tab: string; border: string; icon: string; vivid: string };
const CATEGORY_COLORS: Record<CategoryType, CC> = {
  names:              { tab: '#FFF3C0', border: '#E8C030', icon: '#7A5000', vivid: '#F0A800' },
  places:             { tab: '#D0F5DF', border: '#40C870', icon: '#106030', vivid: '#28B860' },
  animal:             { tab: '#FFE0DA', border: '#F06060', icon: '#801818', vivid: '#E84040' },
  thing:              { tab: '#D8EAFF', border: '#5090E0', icon: '#183880', vivid: '#4080E0' },
  sports_games:       { tab: '#E0D8FF', border: '#8060E0', icon: '#381880', vivid: '#7050D8' },
  brands:             { tab: '#FFD8F5', border: '#D050A0', icon: '#680050', vivid: '#C040A0' },
  health_issues:      { tab: '#FFE8D0', border: '#F07830', icon: '#702010', vivid: '#E06020' },
  countries:          { tab: '#D0F0FF', border: '#2890D0', icon: '#084870', vivid: '#1880C0' },
  movies:             { tab: '#F0D8FF', border: '#9050C8', icon: '#480878', vivid: '#8040C0' },
  songs:              { tab: '#FFD8EC', border: '#E05080', icon: '#700030', vivid: '#D04070' },
  professions:        { tab: '#FFF0D0', border: '#D09030', icon: '#604808', vivid: '#C07820' },
  food_dishes:        { tab: '#FFE5D0', border: '#E07840', icon: '#702010', vivid: '#D06030' },
  famous_people:      { tab: '#E8F0D8', border: '#70A030', icon: '#305010', vivid: '#609020' },
  music_artists:      { tab: '#FFF0E0', border: '#F97316', icon: '#7A3000', vivid: '#F97316' },
};

const CATEGORY_ICONS: Record<CategoryType, (color: string) => React.ReactNode> = {
  names:              (c: string) => <User size={14} color={c} strokeWidth={2.5} />,
  places:             (c: string) => <MapPin size={14} color={c} strokeWidth={2.5} />,
  animal:             (c: string) => <Cat size={14} color={c} strokeWidth={2.5} />,
  thing:              (c: string) => <Box size={14} color={c} strokeWidth={2.5} />,
  sports_games:       (c: string) => <Gamepad2 size={14} color={c} strokeWidth={2.5} />,
  brands:             (c: string) => <ShoppingBag size={14} color={c} strokeWidth={2.5} />,
  health_issues:      (c: string) => <HeartPulse size={14} color={c} strokeWidth={2.5} />,
  countries:          (c: string) => <Globe size={14} color={c} strokeWidth={2.5} />,
  movies:             (c: string) => <Film size={14} color={c} strokeWidth={2.5} />,
  songs:              (c: string) => <Music size={14} color={c} strokeWidth={2.5} />,
  professions:        (c: string) => <Briefcase size={14} color={c} strokeWidth={2.5} />,
  food_dishes:        (c: string) => <Utensils size={14} color={c} strokeWidth={2.5} />,
  famous_people:      (c: string) => <Landmark size={14} color={c} strokeWidth={2.5} />,
  music_artists:      (c: string) => <Music size={14} color={c} strokeWidth={2.5} />,
};

// ─── Sound helpers ─────────────────────────────────────────────────────────────
async function playTick() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'https://www.soundjay.com/buttons/sounds/button-09.mp3' },
      { shouldPlay: true, volume: 0.4 }
    );
    sound.setOnPlaybackStatusUpdate(s => { if ('didJustFinish' in s && s.didJustFinish) sound.unloadAsync(); });
  } catch { /* silent fail */ }
}

// ─── Category input row ────────────────────────────────────────────────────────
const CategoryRow = React.memo(({
  category, index, answer, letter, fontsLoaded,
  onChangeText, usedHint, canUseHint, isLoadingHint, onHint, isSinglePlayer,
}: {
  category: CategoryType; index: number; answer: string; letter: string; fontsLoaded: boolean;
  onChangeText: (t: string) => void; usedHint?: boolean;
  canUseHint?: boolean; isLoadingHint?: boolean;
  onHint?: () => void; isSinglePlayer?: boolean;
}) => {
  const c = CATEGORY_COLORS[category] || CATEGORY_COLORS.thing;
  const hasAnswer = answer.trim().length > letter.length;
  const startsOk = answer.trim().toLowerCase().startsWith(letter.toLowerCase());
  const isComplete = hasAnswer && startsOk;
  const handFont    = fontsLoaded ? 'Caveat_700Bold'    : undefined;
  const handFontReg = fontsLoaded ? 'Caveat_400Regular' : undefined;
  const inputFont   = fontsLoaded ? 'PatrickHand_400Regular' : undefined;
  const correctFont = fontsLoaded ? 'PermanentMarker_400Regular' : undefined;

  // Pencil writing animation — follows cursor position
  const [isFocused, setIsFocused] = useState(false);
  const [inputZoneWidth, setInputZoneWidth] = useState(0);

  // Animated cursor X position (0 = left edge of input zone)
  const pencilCursorX = useSharedValue(0);
  const pencilOpacity = useSharedValue(0);
  const pencilScale   = useSharedValue(0.8);
  // Micro-wobble while writing
  const pencilWobbleY = useSharedValue(0);
  const pencilWobbleR = useSharedValue(0);

  // Estimate pixel width of typed text: Apple Chancery ~0.62× font-size per char
  const CHAR_WIDTH_FACTOR = 0.62;
  const FONT_SIZE = 27;

  // Move pencil to follow end of typed text
  useEffect(() => {
    const estimatedTextWidth = answer.length * FONT_SIZE * CHAR_WIDTH_FACTOR;
    // +4 so tip sits just past the last character, like it's writing the next one
    const maxX = Math.max(0, inputZoneWidth - 20);
    const targetX = Math.min(estimatedTextWidth + 4, maxX);
    pencilCursorX.value = withSpring(targetX, { damping: 18, stiffness: 280 });

    // Small jolt on each new character
    if (isFocused && answer.length > 0) {
      pencilWobbleY.value = withSequence(
        withTiming(-2, { duration: 60, easing: Easing.out(Easing.quad) }),
        withTiming(0,  { duration: 100, easing: Easing.inOut(Easing.quad) }),
      );
      pencilWobbleR.value = withSequence(
        withTiming(3,  { duration: 60, easing: Easing.out(Easing.quad) }),
        withTiming(0,  { duration: 100, easing: Easing.inOut(Easing.quad) }),
      );
    }
  }, [answer, inputZoneWidth, isFocused]);

  useEffect(() => {
    if (isFocused) {
      pencilOpacity.value = withTiming(1, { duration: 160 });
      pencilScale.value   = withSpring(1,  { damping: 10, stiffness: 320 });
      // Gentle idle breathing wobble while focused
      pencilWobbleY.value = withRepeat(
        withSequence(
          withTiming(-1, { duration: 500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.5, { duration: 400, easing: Easing.inOut(Easing.sin) }),
        ), -1, true
      );
    } else {
      pencilOpacity.value = withTiming(0, { duration: 160 });
      pencilScale.value   = withTiming(0.8, { duration: 120 });
      pencilWobbleY.value = withTiming(0, { duration: 120 });
      pencilWobbleR.value = withTiming(0, { duration: 120 });
    }
  }, [isFocused]);

  // Pencil leans right (+40deg): tip is at cursor, body extends to the upper-right.
  // With +40deg, the tip is 16px LEFT of component center, so we add 16 to translateX
  // to push the component right until the tip lands exactly at the text cursor.
  const PENCIL_ANGLE = 40;
  const TIP_X_OFFSET = 16;
  const animatedPencilStyle = useAnimatedStyle(() => ({
    opacity: pencilOpacity.value,
    transform: [
      { translateX: pencilCursorX.value + TIP_X_OFFSET },
      { translateY: pencilWobbleY.value },
      { rotate: `${PENCIL_ANGLE + pencilWobbleR.value}deg` },
      { scale: pencilScale.value },
    ],
  }));

  // Bounce when answer becomes valid
  const scaleAnim = useSharedValue(1);
  const glowAnim  = useSharedValue(0);
  const prevComplete = useRef(false);
  useEffect(() => {
    if (isComplete && !prevComplete.current) {
      scaleAnim.value = withSequence(
        withSpring(1.035, { damping: 5, stiffness: 300 }),
        withSpring(1, { damping: 10 })
      );
      glowAnim.value = withSequence(withTiming(1, { duration: 200 }), withTiming(0, { duration: 600 }));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    prevComplete.current = isComplete;
  }, [isComplete]);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowAnim.value * 0.6,
    borderColor: c.vivid,
  }));

  // Slight rotation alternation for sketchbook looseness
  const tilt = index % 3 === 0 ? '-0.4deg' : index % 3 === 1 ? '0.3deg' : '-0.2deg';

  return (
    <Animated.View
      entering={FadeInDown.duration(280).delay(60 + index * 50).springify().damping(14)}
      style={[s.catRow, rowStyle, { transform: [{ scale: scaleAnim.value }, { rotate: tilt }] }]}
    >
      {/* Glow halo when completed */}
      <Animated.View style={[s.catGlow, glowStyle, { backgroundColor: c.vivid + '25' }]} />

      {/* Pencil-shaded margin tab */}
      <View style={[s.catTab, { backgroundColor: c.tab, borderColor: c.border }]}>
        {/* Diagonal shade strokes */}
        <View style={[s.shadeA, { backgroundColor: c.border + '30' }]} />
        <View style={[s.shadeB, { backgroundColor: c.border + '20' }]} />
        <View style={[s.shadeC, { backgroundColor: c.border + '15' }]} />
        {/* Icon circle */}
        <View style={[s.tabIcon, { borderColor: c.border + '80', backgroundColor: c.tab }]}>
          {isComplete
            ? <Check size={16} color={c.icon} strokeWidth={3} />
            : CATEGORY_ICONS[category](c.icon)}
        </View>
        {/* Category label */}
        <Text numberOfLines={2} style={[s.tabLabel, { color: c.icon, fontFamily: handFont }]}>
          {getCategoryName(category)}
        </Text>
        {/* Hint */}
        {isSinglePlayer && !usedHint && (
          <Pressable onPress={onHint} disabled={!canUseHint && !isLoadingHint} style={[s.hintBtn, canUseHint && s.hintBtnActive]} hitSlop={8}>
            {isLoadingHint
              ? <ActivityIndicator size="small" color={P.amber} style={{ width: 16, height: 16 }} />
              : <Lightbulb size={16} color={canUseHint ? '#FFF' : P.inkFaint + '55'} strokeWidth={2.2} fill={canUseHint ? P.amber : 'transparent'} />
            }
          </Pressable>
        )}
      </View>

      {/* Input zone — text on paper, no box */}
      <View style={s.inputZone} onLayout={e => setInputZoneWidth(e.nativeEvent.layout.width)}>
        {/* Pencil writing animation — tip follows cursor on the baseline */}
        <Animated.View style={[s.writingPencilWrap, animatedPencilStyle]} pointerEvents="none">
          {/* Eraser top */}
          <View style={s.wPencilEraser} />
          {/* Metal ferrule */}
          <View style={s.wPencilFerrule} />
          {/* Pencil body */}
          <View style={s.wPencilBody}>
            <View style={s.wPencilStripe} />
          </View>
          {/* Wood sharpened tip */}
          <View style={s.wPencilWood} />
          {/* Graphite tip */}
          <View style={s.wPencilTip} />
        </Animated.View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Starting letter — shown only in single player; in multiplayer the letter is
              already pre-filled in the input value so we skip this visual anchor */}
          {isSinglePlayer && (
            <Text style={{
              fontFamily: inputFont,
              fontSize: 30,
              fontWeight: '900',
              color: usedHint ? P.amber : isComplete ? c.vivid : P.inkMed,
              opacity: 0.75,
              marginRight: -2,
            }} pointerEvents="none">
              {letter.toUpperCase()}
            </Text>
          )}
          <TextInput
            style={[s.handInput, {
              fontFamily: inputFont,
              color: usedHint ? P.amber : isComplete ? c.icon : P.ink,
              fontSize: 30,
              fontStyle: 'normal',
              flex: 1,
            }]}
            placeholder={`${letter}...`}
            placeholderTextColor="transparent"
            value={answer}
            onChangeText={t => {
              const upper = t.toUpperCase();
              // Prevent erasing the initial starting letter
              if (!upper.startsWith(letter.toUpperCase())) return;
              onChangeText(upper);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="characters"
            autoCorrect={false}
            editable={!usedHint}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={[s.inputLine, {
          backgroundColor: isComplete ? c.vivid
            : hasAnswer && !startsOk ? P.stopRed
            : P.paperLine,
          height: isComplete || (hasAnswer && !startsOk) ? 2 : 1,
          opacity: isComplete || (hasAnswer && !startsOk) ? 1 : 0.7,
        }]} />
        {hasAnswer && !startsOk && (
          <Text style={[s.errNote, { fontFamily: handFontReg }]}>must start with "{letter}"</Text>
        )}
        {usedHint && (
          <View style={s.hintUsedRow}>
            <Lightbulb size={11} color={P.amber} strokeWidth={2} />
            <Text style={[s.hintUsedTxt, { fontFamily: handFontReg }]}>hint used</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
});
CategoryRow.displayName = 'CategoryRow';

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function GameScreen() {
  const [fontsLoaded] = useFonts({ Caveat_400Regular, Caveat_600SemiBold, Caveat_700Bold, PatrickHand_400Regular, ShadowsIntoLight_400Regular, PermanentMarker_400Regular });
  const router       = useRouter();
  const insets       = useSafeAreaInsets();
  const timerRef          = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopCountdownRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollingRef        = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasEndedRound     = useRef(false);
  const prevTimeRef       = useRef<number>(999);

  const session           = useGameStore(s => s.session);
  const localAnswers      = useGameStore(s => s.localAnswers);
  const timeRemaining     = useGameStore(s => s.timeRemaining);
  const currentUser       = useGameStore(s => s.currentUser);
  const updateLocalAnswer = useGameStore(s => s.updateLocalAnswer);
  const setTimeRemaining  = useGameStore(s => s.setTimeRemaining);
  const requestStop       = useGameStore(s => s.requestStop);
  const submitAnswers     = useGameStore(s => s.submitAnswers);
  const endRound          = useGameStore(s => s.endRound);
  const leaveGame         = useGameStore(s => s.leaveGame);
  const refreshSession    = useGameStore(s => s.refreshSession);
  const endGameEarly      = useGameStore(s => s.endGameEarly);
  const gameMode          = useGameStore(s => s.gameMode);
  const currentLevel      = useGameStore(s => s.currentLevel);
  const levelProgress     = useGameStore(s => s.levelProgress);
  const spendStars        = useGameStore(s => s.spendStars);

  const isLevelMode = gameMode === 'single' && currentLevel !== null;
  const HINT_COST = 10;

  const [showExitModal,    setShowExitModal]    = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [stopCountdown,    setStopCountdown]    = useState(5);
  const [showLeaderboard,  setShowLeaderboard]  = useState(false);
  const [usedHints,    setUsedHints]    = useState<Set<CategoryType>>(new Set());
  const [loadingHints, setLoadingHints] = useState<Set<CategoryType>>(new Set());

  // Letter reveal overlay
  const [showReveal,    setShowReveal]    = useState(true);
  const [shuffleLetter, setShuffleLetter] = useState('A');
  const [revealDone,    setRevealDone]    = useState(false);

  // Animations
  const timerPulse  = useSharedValue(0);
  const timerWiggle = useSharedValue(0);
  const stampBounce = useSharedValue(1);
  const stickyFloat = useSharedValue(0);

  const isHost = session?.hostId === currentUser?.id;
  const handFont    = fontsLoaded ? 'Caveat_700Bold'    : undefined;
  const handFontSem = fontsLoaded ? 'Caveat_600SemiBold' : undefined;
  const handFontReg = fontsLoaded ? 'Caveat_400Regular' : undefined;
  const titleFont   = fontsLoaded ? 'ShadowsIntoLight_400Regular' : undefined;

  // Sticky note gentle float
  useEffect(() => {
    stickyFloat.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1800, easing: Easing.inOut(Easing.sin) }),
        withTiming(3, { duration: 1800, easing: Easing.inOut(Easing.sin) })
      ), -1, true
    );
  }, []);

  const stickyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: stickyFloat.value }, { rotate: '2deg' }],
  }));

  // Letter reveal shuffle effect
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const revealOpacity = useSharedValue(1);
  useEffect(() => {
    if (!session?.currentLetter) return;
    const targetLetter = session.currentLetter;
    let count = 0;
    // Fast shuffle for 1.5s, then slow down and lock
    const totalSteps = 22;
    const shuffleInterval = setInterval(() => {
      count++;
      const progress = count / totalSteps;
      // Pick random letter, but bias toward real letter as progress increases
      if (Math.random() > progress * 0.8) {
        setShuffleLetter(ALPHABET[Math.floor(Math.random() * 26)]);
      } else {
        setShuffleLetter(targetLetter);
      }
      if (count >= totalSteps) {
        clearInterval(shuffleInterval);
        setShuffleLetter(targetLetter);
        setRevealDone(true);
        // Single player: auto-dismiss after brief pause
        if (gameMode === 'single') {
          setTimeout(() => {
            revealOpacity.value = withTiming(0, { duration: 350 });
            setTimeout(() => setShowReveal(false), 350);
          }, 800);
        }
      }
    }, 70);
    return () => clearInterval(shuffleInterval);
  }, [session?.currentLetter]);

  const revealOverlayStyle = useAnimatedStyle(() => ({ opacity: revealOpacity.value }));

  const getLetterForCategory = (i: number) => {
    if (currentLevel?.isMultiLetterMode && currentLevel?.lettersPerCategory)
      return currentLevel.lettersPerCategory[i] || session?.currentLetter || '';
    return session?.currentLetter || '';
  };

  const allAnswersFilled = session?.settings.selectedCategories.every((cat, i) => {
    const a = localAnswers[cat]?.trim();
    if (!a || a.length <= 1) return false;
    return a.toLowerCase().startsWith(getLetterForCategory(i).toLowerCase());
  });

  // Bounce stamp when all filled
  const prevFilledRef = useRef(false);
  useEffect(() => {
    if (allAnswersFilled && !prevFilledRef.current) {
      stampBounce.value = withSequence(
        withSpring(1.12, { damping: 4, stiffness: 400 }),
        withSpring(0.95, { damping: 8 }),
        withSpring(1.05, { damping: 10 }),
        withSpring(1, { damping: 12 })
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    prevFilledRef.current = !!allAnswersFilled;
  }, [allAnswersFilled]);

  const stampStyle = useAnimatedStyle(() => ({ transform: [{ scale: stampBounce.value }, { rotate: '-1deg' }] }));

  const handleUseHint = async (category: CategoryType, i: number) => {
    if (!session || usedHints.has(category) || loadingHints.has(category)) return;
    const existing = localAnswers[category]?.trim();
    if (existing && existing.length > session.currentLetter.length) return;
    if (levelProgress.totalStars < HINT_COST) { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); return; }
    setLoadingHints(p => new Set(p).add(category));
    try {
      const letter = getLetterForCategory(i);
      const hint = await getHintAsync(category, letter, currentLevel?.constraint as LevelConstraintCheck | null);
      if (hint && hint.toUpperCase().startsWith(letter.toUpperCase())) {
        if (!spendStars(HINT_COST)) { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); return; }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        updateLocalAnswer(category, hint.toUpperCase());
        setUsedHints(p => new Set(p).add(category));
      } else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); }
    finally { setLoadingHints(p => { const n = new Set(p); n.delete(category); return n; }); }
  };

  useEffect(() => {
    if (!session || session.status !== 'playing') return;
    const iv = setInterval(() => { if (Object.values(localAnswers).some(a => a?.trim())) submitAnswers(); }, 3000);
    return () => clearInterval(iv);
  }, [session?.status, session?.currentRound, localAnswers, submitAnswers]);

  useEffect(() => {
    if (session) pollingRef.current = setInterval(() => refreshSession(), 1500);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [session?.id]);

  useEffect(() => {
    if (session?.status === 'round_results' || session?.status === 'final_results') {
      [timerRef, stopCountdownRef, pollingRef].forEach(r => { if (r.current) clearInterval(r.current); });
      router.replace(isLevelMode ? '/final-results' : '/round-results');
    }
  }, [session?.status, isLevelMode]);

  const handleRoundEnd = useCallback(async () => {
    if (hasEndedRound.current) return;
    hasEndedRound.current = true;
    await submitAnswers();
    if (isHost) { if (!isLevelMode) await new Promise(r => setTimeout(r, 1500)); await endRound(); }
  }, [endRound, submitAnswers, isHost, isLevelMode]);

  useEffect(() => { hasEndedRound.current = false; }, [session?.currentRound]);

  useEffect(() => {
    if (!session || session.status !== 'playing') return;
    const needsPrefill = session.settings.selectedCategories.every(cat => !localAnswers[cat] || !localAnswers[cat].startsWith(session.currentLetter));
    if (needsPrefill) session.settings.selectedCategories.forEach(cat => updateLocalAnswer(cat, session.currentLetter));
  }, [session?.currentRound, session?.currentLetter, session?.status]);

  useEffect(() => {
    if (!session || session.status !== 'playing' || !session.roundStartTime) return;
    const tick = () => {
      const remaining = Math.max(0, session.settings.roundDuration - Math.floor((Date.now() - session.roundStartTime!) / 1000));
      setTimeRemaining(remaining);
      // Tick sound at each second in last 10
      if (remaining <= 10 && remaining < prevTimeRef.current && remaining > 0) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      }
      prevTimeRef.current = remaining;
      if (remaining === 0 && !hasEndedRound.current) { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); handleRoundEnd(); }
    };
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [session?.status, session?.roundStartTime, session?.currentRound, handleRoundEnd]);

  useEffect(() => {
    if (!session?.stopRequested || !session?.stopCountdownStart) return;
    const start = session.stopCountdownStart;
    stopCountdownRef.current = setInterval(() => {
      const remaining = Math.max(0, 5 - Math.floor((Date.now() - start) / 1000));
      setStopCountdown(remaining);
      if (remaining === 0 && !hasEndedRound.current) { if (stopCountdownRef.current) clearInterval(stopCountdownRef.current); handleRoundEnd(); }
    }, 100);
    return () => { if (stopCountdownRef.current) clearInterval(stopCountdownRef.current); };
  }, [session?.stopRequested, session?.stopCountdownStart, handleRoundEnd]);

  // Timer pulse + wiggle when <= 10
  useEffect(() => {
    if (timeRemaining <= 10) {
      timerPulse.value = withRepeat(withSequence(withTiming(1, { duration: 280 }), withTiming(0, { duration: 280 })), -1, false);
      timerWiggle.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 80 }),
          withTiming(4, { duration: 80 }),
          withTiming(-3, { duration: 80 }),
          withTiming(0, { duration: 80 })
        ), -1, false
      );
    }
  }, [timeRemaining <= 10]);

  const timerBgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(timerPulse.value, [0, 1], [P.paperDark, '#FFD0D0']),
    transform: [{ translateX: timerWiggle.value }],
  }));

  const handleStop = async () => {
    if (!allAnswersFilled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (isLevelMode) { await submitAnswers(); await handleRoundEnd(); return; }
    await requestStop();
  };

  const handleExit = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowExitModal(false);
    await leaveGame();
    router.replace('/');
  };

  const handleEndGame = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setShowEndGameModal(false);
    await endGameEarly();
  };

  if (!session) return null;
  const fmt = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  // ── SINGLE PLAYER (level mode) — modern dark UI ──
  if (isLevelMode && currentLevel) {
    const modernCategoryColors: Record<string, { bg: string; border: string; accent: string }> = {
      names:              { bg: '#1e1b2e', border: '#6366f1', accent: '#a5b4fc' },
      places:             { bg: '#1a2e1a', border: '#22c55e', accent: '#86efac' },
      animal:             { bg: '#2e1a1a', border: '#ef4444', accent: '#fca5a5' },
      thing:              { bg: '#1a1e2e', border: '#3b82f6', accent: '#93c5fd' },
      sports_games:       { bg: '#1e1a2e', border: '#8b5cf6', accent: '#c4b5fd' },
      brands:             { bg: '#2a1a28', border: '#d946ef', accent: '#f0abfc' },
      health_issues:      { bg: '#2a1e1a', border: '#f97316', accent: '#fdba74' },
      countries:          { bg: '#1a2030', border: '#0ea5e9', accent: '#7dd3fc' },
      movies:             { bg: '#201a30', border: '#a855f7', accent: '#d8b4fe' },
      songs:              { bg: '#2a1a22', border: '#ec4899', accent: '#f9a8d4' },
      professions:        { bg: '#2a2010', border: '#eab308', accent: '#fde047' },
      food_dishes:        { bg: '#2a1e14', border: '#f59e0b', accent: '#fcd34d' },
      famous_people:      { bg: '#1e2010', border: '#84cc16', accent: '#bef264' },
    };
    const urgentTimer = timeRemaining <= 10;
    return (
      <View style={{ flex: 1, backgroundColor: '#0d0d1a' }}>
        <LinearGradient colors={['#0d0d1a', '#1a1a2e', '#12122a']} style={{ flex: 1 }}>
          {/* Header */}
          <View style={{ paddingTop: insets.top + 4, borderBottomWidth: 1, borderBottomColor: 'rgba(99,102,241,0.2)', backgroundColor: 'rgba(13,13,26,0.95)' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingBottom: 12, paddingTop: 2 }}>
              {/* Exit */}
              <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowExitModal(true); }}
                style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: '#1e1b4b', borderWidth: 1.5, borderColor: '#4F46E5', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} color="#a5b4fc" strokeWidth={2.5} />
              </Pressable>

              {/* Level badge */}
              <View style={{ backgroundColor: '#1e1b4b', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5, borderColor: '#4F46E5' }}>
                <Text style={{ color: '#a5b4fc', fontSize: 15, fontWeight: '800', letterSpacing: 0.5 }}>
                  Level {currentLevel.level}
                </Text>
              </View>

              {/* Timer */}
              <Animated.View style={[
                { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1.5 },
                urgentTimer
                  ? { backgroundColor: '#2d1a1a', borderColor: '#ef4444' }
                  : { backgroundColor: '#1e1b4b', borderColor: '#4F46E5' },
              ]}>
                <Clock size={13} color={urgentTimer ? '#ef4444' : '#a5b4fc'} strokeWidth={2.5} />
                <Text style={{ color: urgentTimer ? '#ef4444' : '#a5b4fc', fontSize: 17, fontWeight: '700' }}>{fmt(timeRemaining)}</Text>
              </Animated.View>
            </View>

            {/* Letter display */}
            <View style={{ alignItems: 'center', paddingBottom: 14 }}>
              <Text style={{ color: 'rgba(165,180,252,0.6)', fontSize: 11, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                fill out words starting with
              </Text>
              <View style={{
                width: 70, height: 70, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#1e1b4b', borderWidth: 2.5, borderColor: '#6366f1',
                shadowColor: '#6366f1', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 14,
              }}>
                <Text style={{ fontSize: 38, fontWeight: '900', color: '#e0e7ff', letterSpacing: 2 }}>{session.currentLetter}</Text>
              </View>
            </View>
          </View>

          {/* Stars row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 4 }}>
            <Star size={13} color="#FCD34D" fill="#FCD34D" strokeWidth={1} />
            <Text style={{ color: '#FCD34D', fontSize: 13, fontWeight: '600' }}>{levelProgress.totalStars} stars · {HINT_COST} per hint</Text>
          </View>

          {/* Constraint banner */}
          {currentLevel.constraint?.type !== 'none' && (
            <Animated.View entering={FadeInDown.duration(300).delay(100)} style={{
              flexDirection: 'row', alignItems: 'center', gap: 6,
              marginHorizontal: 14, marginTop: 4, marginBottom: 2,
              backgroundColor: '#1e1b4b', paddingHorizontal: 12, paddingVertical: 8,
              borderRadius: 8, borderWidth: 1, borderColor: 'rgba(99,102,241,0.4)',
            }}>
              <Info size={13} color="#a5b4fc" strokeWidth={2.5} />
              <Text style={{ color: '#c7d2fe', fontSize: 13, flex: 1 }}>{currentLevel.constraint.description}</Text>
            </Animated.View>
          )}

          {/* Stop banner */}
          {session.stopRequested && (
            <Animated.View entering={ZoomIn.duration(300)} style={{
              flexDirection: 'row', alignItems: 'center', gap: 8,
              marginHorizontal: 14, marginTop: 6,
              backgroundColor: '#2d1a1a', paddingHorizontal: 14, paddingVertical: 10,
              borderRadius: 8, borderWidth: 2, borderColor: '#ef4444',
            }}>
              <AlertTriangle size={16} color="#ef4444" strokeWidth={2.5} />
              <Text style={{ color: '#fca5a5', fontSize: 16, fontWeight: '800' }}>Ending in {stopCountdown}s...</Text>
            </Animated.View>
          )}

          {/* Category rows */}
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 8, paddingBottom: 160, gap: 8 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {session.settings.selectedCategories.map((cat, i) => {
                const answer = localAnswers[cat] || '';
                const letter = currentLevel.isMultiLetterMode && currentLevel.lettersPerCategory
                  ? (currentLevel.lettersPerCategory[i] || session.currentLetter)
                  : session.currentLetter;
                const hasAnswer = answer.trim().length > letter.length;
                const startsOk = answer.trim().toLowerCase().startsWith(letter.toLowerCase());
                const isComplete = hasAnswer && startsOk;
                const isLoad = loadingHints.has(cat);
                const canHint = !hasAnswer && !usedHints.has(cat) && !isLoad && levelProgress.totalStars >= HINT_COST;
                const mc = modernCategoryColors[cat] || { bg: '#1e1b2e', border: '#6366f1', accent: '#a5b4fc' };

                return (
                  <Animated.View
                    key={cat}
                    entering={FadeInDown.duration(280).delay(60 + i * 50).springify().damping(14)}
                    style={{
                      borderRadius: 12, overflow: 'hidden',
                      borderWidth: 1.5,
                      borderColor: isComplete ? mc.border : (hasAnswer && !startsOk) ? '#ef4444' : 'rgba(99,102,241,0.2)',
                      backgroundColor: isComplete ? mc.bg : '#111827',
                      shadowColor: isComplete ? mc.border : 'transparent',
                      shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 8,
                    }}
                  >
                    {/* Category label row */}
                    <View style={{
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                      paddingHorizontal: 12, paddingTop: 10, paddingBottom: 4,
                    }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <View style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: mc.bg, borderWidth: 1, borderColor: mc.border, alignItems: 'center', justifyContent: 'center' }}>
                          {isComplete
                            ? <Check size={13} color={mc.accent} strokeWidth={2.5} />
                            : CATEGORY_ICONS[cat](mc.accent)
                          }
                        </View>
                        <Text style={{ color: isComplete ? mc.accent : 'rgba(165,180,252,0.7)', fontSize: 12, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                          {getCategoryName(cat)}
                        </Text>
                      </View>
                      {/* Hint button */}
                      {!usedHints.has(cat) && (
                        <Pressable
                          onPress={() => handleUseHint(cat, i)}
                          disabled={!canHint && !isLoad}
                          style={{
                            flexDirection: 'row', alignItems: 'center', gap: 4,
                            paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
                            backgroundColor: canHint ? '#1e1b4b' : 'transparent',
                            borderWidth: canHint ? 1 : 0, borderColor: '#6366f1',
                            opacity: canHint || isLoad ? 1 : 0.3,
                          }}
                        >
                          {isLoad
                            ? <ActivityIndicator size="small" color="#a5b4fc" style={{ width: 14, height: 14 }} />
                            : <Lightbulb size={13} color={canHint ? '#FCD34D' : '#6b7280'} strokeWidth={2} fill={canHint ? '#FCD34D' : 'transparent'} />
                          }
                          {canHint && <Text style={{ color: '#FCD34D', fontSize: 11, fontWeight: '700' }}>Hint</Text>}
                        </Pressable>
                      )}
                      {usedHints.has(cat) && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                          <Lightbulb size={11} color="#FCD34D" strokeWidth={2} />
                          <Text style={{ color: '#FCD34D', fontSize: 11, fontWeight: '600' }}>hint used</Text>
                        </View>
                      )}
                    </View>

                    {/* Input */}
                    <View style={{ paddingHorizontal: 12, paddingBottom: 10 }}>
                      <TextInput
                        style={{
                          fontSize: 22, fontWeight: '800',
                          color: usedHints.has(cat) ? '#FCD34D' : isComplete ? mc.accent : '#e0e7ff',
                          paddingVertical: 6,
                          borderBottomWidth: 1.5,
                          borderBottomColor: isComplete ? mc.border : (hasAnswer && !startsOk) ? '#ef4444' : 'rgba(99,102,241,0.3)',
                          letterSpacing: 1,
                        }}
                        placeholder={`${letter}...`}
                        placeholderTextColor="rgba(99,102,241,0.3)"
                        value={answer}
                        onChangeText={t => {
                          const upper = t.toUpperCase();
                          if (!upper.startsWith(letter.toUpperCase())) return;
                          updateLocalAnswer(cat, upper);
                        }}
                        autoCapitalize="characters"
                        autoCorrect={false}
                        editable={!usedHints.has(cat)}
                        underlineColorAndroid="transparent"
                      />
                      {hasAnswer && !startsOk && (
                        <Text style={{ color: '#ef4444', fontSize: 11, fontWeight: '600', marginTop: 3 }}>must start with "{letter}"</Text>
                      )}
                    </View>
                  </Animated.View>
                );
              })}
            </ScrollView>

            {/* Submit button */}
            <Animated.View entering={FadeInUp.duration(500).delay(600)} style={{ paddingHorizontal: 14, paddingTop: 8, paddingBottom: insets.bottom + 16 }}>
              {!allAnswersFilled && (
                <Text style={{ color: 'rgba(165,180,252,0.5)', textAlign: 'center', fontSize: 12, fontWeight: '600', marginBottom: 8 }}>
                  Fill all categories to submit
                </Text>
              )}
              <Pressable onPress={handleStop} disabled={!allAnswersFilled || session.stopRequested}>
                <LinearGradient
                  colors={allAnswersFilled ? ['#4F46E5', '#7C3AED'] : ['#1e1b4b', '#1e1b4b']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 14, paddingVertical: 18,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                    borderWidth: 1.5, borderColor: allAnswersFilled ? 'transparent' : 'rgba(99,102,241,0.3)',
                    shadowColor: allAnswersFilled ? '#6366f1' : 'transparent',
                    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12,
                  }}
                >
                  {session.stopRequested
                    ? <ActivityIndicator color={allAnswersFilled ? '#fff' : '#6366f1'} />
                    : <>
                        <Check size={22} color={allAnswersFilled ? '#fff' : '#4F46E5'} strokeWidth={3} />
                        <Text style={{ color: allAnswersFilled ? '#fff' : '#4F46E5', fontSize: 18, fontWeight: '900', letterSpacing: 0.5 }}>
                          Submit
                        </Text>
                      </>
                  }
                </LinearGradient>
              </Pressable>
            </Animated.View>
          </KeyboardAvoidingView>

          {/* Exit Modal */}
          <Modal visible={showExitModal} transparent animationType="fade" onRequestClose={() => setShowExitModal(false)}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' }}>
              <Animated.View entering={ZoomIn.duration(280).springify()} style={{
                width: '85%', backgroundColor: '#111827', borderRadius: 20, padding: 24,
                borderWidth: 1.5, borderColor: 'rgba(99,102,241,0.3)',
                shadowColor: '#6366f1', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 20,
              }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#2d1a1a', borderWidth: 1.5, borderColor: '#ef4444', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 12 }}>
                  <LogOut size={22} color="#ef4444" strokeWidth={2.5} />
                </View>
                <Text style={{ color: '#e0e7ff', fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: 6 }}>Leave Game?</Text>
                <Text style={{ color: 'rgba(165,180,252,0.7)', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>Your progress is saved.</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Pressable onPress={() => setShowExitModal(false)} style={{ flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#1e1b4b', borderWidth: 1.5, borderColor: '#4F46E5', alignItems: 'center' }}>
                    <Text style={{ color: '#a5b4fc', fontWeight: '800', fontSize: 15 }}>Stay</Text>
                  </Pressable>
                  <Pressable onPress={handleExit} style={{ flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#2d1a1a', borderWidth: 1.5, borderColor: '#ef4444', alignItems: 'center' }}>
                    <Text style={{ color: '#fca5a5', fontWeight: '800', fontSize: 15 }}>Leave</Text>
                  </Pressable>
                </View>
              </Animated.View>
            </View>
          </Modal>

          {/* Letter Reveal Overlay — fully opaque, blocks game until dismissed */}
          {showReveal && (
            <Animated.View
              style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0d0d1a', alignItems: 'center', justifyContent: 'center' }, revealOverlayStyle]}
              pointerEvents="auto"
            >
              <Pressable
                style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  if (!revealDone) return;
                  revealOpacity.value = withTiming(0, { duration: 250 });
                  setTimeout(() => setShowReveal(false), 250);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <View style={{ alignItems: 'center', gap: 16 }}>
                  <Text style={{ color: 'rgba(165,180,252,0.7)', fontSize: 13, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase' }}>
                    Level {currentLevel.level} — fill words starting with
                  </Text>
                  <View style={{
                    width: 130, height: 130, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#1e1b4b', borderWidth: 3, borderColor: '#6366f1',
                    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 28,
                  }}>
                    <Text style={{ fontSize: 78, fontWeight: '900', color: '#e0e7ff', letterSpacing: 2 }}>{shuffleLetter}</Text>
                  </View>
                  {revealDone && (
                    <Animated.View entering={FadeInUp.duration(300)}>
                      <Text style={{ color: 'rgba(165,180,252,0.45)', fontSize: 12, fontWeight: '600', letterSpacing: 1 }}>tap to start</Text>
                    </Animated.View>
                  )}
                </View>
              </Pressable>
            </Animated.View>
          )}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={s.root}>

      {/* ════ HEADER ════ */}
      <View style={[s.header, { paddingTop: insets.top + 4 }]}>
        {/* Clean notebook top border — two ruled lines */}
        <View style={s.headerBorder}>
          <View style={s.headerBorderLine1} />
          <View style={s.headerBorderLine2} />
        </View>

        {/* Controls bar */}
        <View style={s.topBar}>
          <Pressable
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowExitModal(true); }}
            style={s.exitBtn}
          >
            <X size={15} color={P.inkMed} strokeWidth={2.5} />
          </Pressable>

          <View style={s.roundPill}>
            <Text style={[s.roundTxt, { fontFamily: titleFont }]}>
              {isLevelMode && currentLevel
                ? `Level ${currentLevel.level}`
                : `Round ${session.currentRound}/${session.settings.totalRounds}`}
            </Text>
          </View>

          {/* Floating sticky letter */}
          <View style={s.stickyOuter}>
            <View style={s.tapePiece} />
            <Animated.View style={[s.stickyBody, stickyStyle]}>
              <Text style={[s.stickyLetter, { fontFamily: fontsLoaded ? 'PermanentMarker_400Regular' : undefined }]}>{session.currentLetter}</Text>
            </Animated.View>
          </View>

          {/* Timer */}
          <Animated.View style={[s.timerPill, timeRemaining <= 10 && timerBgStyle]}>
            <Clock size={12} color={timeRemaining <= 10 ? P.stopRed : P.inkFaint} strokeWidth={2.5} />
            <Text style={[s.timerTxt, { fontFamily: handFontSem }, timeRemaining <= 10 && { color: P.stopRed, fontFamily: handFont }]}>
              {fmt(timeRemaining)}
            </Text>
          </Animated.View>
        </View>
      </View>

      {/* ════ PAPER BODY ════ */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <NotebookBackground lineStartY={32} lineSpacing={30} lineCount={45} marginX={62} showMargin={true}>
          <View style={[s.paper, { backgroundColor: 'transparent' }]}>

          {/* ── Banners ── */}
          {isLevelMode && currentLevel?.constraint?.type !== 'none' && (
            <Animated.View entering={FadeInDown.duration(300).delay(100)} style={s.constraintBanner}>
              <Info size={12} color="#604898" strokeWidth={2.5} />
              <Text style={[s.constraintTxt, { fontFamily: handFontReg }]}>{currentLevel!.constraint.description}</Text>
            </Animated.View>
          )}
          {session.stopRequested && (
            <Animated.View entering={ZoomIn.duration(300)} style={s.stopBanner}>
              <AlertTriangle size={15} color="#8B4000" strokeWidth={2.5} />
              <Text style={[s.stopBannerTxt, { fontFamily: handFont }]}>STOP! Ending in {stopCountdown}s</Text>
            </Animated.View>
          )}

          {/* ── Leaderboard ── */}
          {session.players.length > 1 && (
            <Animated.View entering={FadeInDown.duration(400).delay(200)} style={s.lbWrap}>
              <Pressable
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowLeaderboard(v => !v); }}
                style={s.lbToggle}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Trophy size={12} color={P.amber} strokeWidth={2.5} />
                  <Text style={[s.lbToggleTxt, { fontFamily: handFontSem }]}>Live Standings</Text>
                </View>
                {showLeaderboard
                  ? <ChevronUp size={12} color={P.inkFaint} strokeWidth={2} />
                  : <ChevronDown size={12} color={P.inkFaint} strokeWidth={2} />}
              </Pressable>
              {showLeaderboard && (
                <Animated.View entering={FadeIn.duration(200)} style={s.lbBody}>
                  {[...session.players].sort((a, b) => b.totalScore - a.totalScore).map((p, i) => {
                    const isMe = p.visibleId === currentUser?.id;
                    return (
                      <View key={p.id} style={[s.lbRow, isMe && s.lbRowMe]}>
                        <Text style={[s.lbRank, { fontFamily: handFont }, i === 0 && { color: P.amber }]}>{i + 1}</Text>
                        <Text style={[s.lbName, { fontFamily: handFontReg }, isMe && { color: '#2A7060' }]} numberOfLines={1}>{p.username}{isMe ? ' (you)' : ''}</Text>
                        <Text style={[s.lbScore, { fontFamily: handFont }]}>{p.totalScore}</Text>
                      </View>
                    );
                  })}
                </Animated.View>
              )}
            </Animated.View>
          )}

          {/* ── Category rows ── */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={s.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {gameMode === 'single' && (
              <Animated.View entering={FadeIn.duration(400).delay(50)} style={s.starsRow}>
                <Star size={12} color={P.amber} fill={P.amber} strokeWidth={1} />
                <Text style={[s.starsTxt, { fontFamily: handFontReg }]}>{levelProgress.totalStars} stars · {HINT_COST} per hint</Text>
              </Animated.View>
            )}
            {session.settings.selectedCategories.map((cat, i) => {
              const answer  = localAnswers[cat] || '';
              const letter  = currentLevel?.isMultiLetterMode && currentLevel?.lettersPerCategory
                ? (currentLevel.lettersPerCategory[i] || session.currentLetter)
                : session.currentLetter;
              const hasAns  = answer.trim().length > letter.length;
              const isLoad  = loadingHints.has(cat);
              const canHint = gameMode === 'single' && !hasAns && !usedHints.has(cat) && !isLoad && levelProgress.totalStars >= HINT_COST;
              return (
                <CategoryRow
                  key={cat}
                  category={cat} index={i} answer={answer} letter={letter}
                  fontsLoaded={!!fontsLoaded}
                  onChangeText={t => updateLocalAnswer(cat, t)}
                  usedHint={usedHints.has(cat)}
                  canUseHint={canHint}
                  isLoadingHint={isLoad}
                  onHint={() => handleUseHint(cat, i)}
                  isSinglePlayer={gameMode === 'single'}
                />
              );
            })}
            <View style={{ height: 24 }} />
          </ScrollView>

          {/* ════ STOP / SUBMIT STAMP ════ */}
          <Animated.View entering={FadeInUp.duration(500).delay(600)} style={[s.stampArea, { paddingBottom: insets.bottom + 10 }]}>
            {!allAnswersFilled && (
              <Animated.Text entering={FadeIn.duration(300)} style={[s.stampHint, { fontFamily: handFontReg }]}>
                fill all categories to enable ✏️
              </Animated.Text>
            )}
            <Pressable
              onPress={handleStop}
              disabled={!allAnswersFilled || session.stopRequested}
            >
              <Animated.View style={[s.stampRing, !allAnswersFilled && s.stampRingOff, stampStyle]}>
                <View style={[s.stampBody, !allAnswersFilled && s.stampBodyOff]}>
                  {session.stopRequested
                    ? <ActivityIndicator color={allAnswersFilled ? '#FFF' : P.inkFaint} />
                    : gameMode === 'single'
                      ? <View style={s.stampInner}>
                          <Check size={24} color={allAnswersFilled ? '#FFF' : P.inkFaint} strokeWidth={3} />
                          <Text style={[s.stampTxt, { fontFamily: handFont }, !allAnswersFilled && { color: P.inkFaint }]}>Submit</Text>
                        </View>
                      : <View style={s.stampInner}>
                          <Hand size={24} color={allAnswersFilled ? '#FFF' : P.inkFaint} strokeWidth={2} />
                          <Text style={[s.stampTxt, { fontFamily: handFont }, !allAnswersFilled && { color: P.inkFaint }]}>STOP!</Text>
                        </View>
                  }
                </View>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </View>
        </NotebookBackground>
      </KeyboardAvoidingView>

      {/* ════ MODALS ════ */}
      <Modal visible={showExitModal} transparent animationType="fade" onRequestClose={() => setShowExitModal(false)}>
        <View style={s.backdrop}>
          <Animated.View entering={ZoomIn.duration(280).springify()} style={s.modalCard}>
            <View style={s.modalIconWrap}><LogOut size={22} color={P.stopRed} strokeWidth={2.5} /></View>
            <Text style={[s.modalTitle, { fontFamily: handFont }]}>Leave Game?</Text>
            <Text style={[s.modalBody, { fontFamily: handFontReg }]}>{isLevelMode ? 'Your progress is saved.' : "You'll lose your progress."}</Text>
            <View style={s.modalRow}>
              <Pressable onPress={() => setShowExitModal(false)} style={[s.mBtn, s.mBtnSec]}>
                <Text style={[s.mBtnSecTxt, { fontFamily: handFontSem }]}>Stay</Text>
              </Pressable>
              <Pressable onPress={handleExit} style={[s.mBtn, s.mBtnRed]}>
                <Text style={[s.mBtnLightTxt, { fontFamily: handFontSem }]}>Leave</Text>
              </Pressable>
            </View>
            {isHost && !isLevelMode && (
              <Pressable onPress={() => { setShowExitModal(false); setShowEndGameModal(true); }} style={s.mBtnGhost}>
                <Text style={[s.mBtnGhostTxt, { fontFamily: handFontSem }]}>End Game for Everyone</Text>
              </Pressable>
            )}
          </Animated.View>
        </View>
      </Modal>

      <Modal visible={showEndGameModal} transparent animationType="fade" onRequestClose={() => setShowEndGameModal(false)}>
        <View style={s.backdrop}>
          <Animated.View entering={ZoomIn.duration(280).springify()} style={s.modalCard}>
            <View style={[s.modalIconWrap, { backgroundColor: P.amberBg, borderColor: P.amber }]}>
              <Crown size={22} color={P.amber} strokeWidth={2.5} />
            </View>
            <Text style={[s.modalTitle, { fontFamily: handFont }]}>End Game?</Text>
            <Text style={[s.modalBody, { fontFamily: handFontReg }]}>This ends the game for all players.</Text>
            <View style={s.modalRow}>
              <Pressable onPress={() => setShowEndGameModal(false)} style={[s.mBtn, s.mBtnSec]}>
                <Text style={[s.mBtnSecTxt, { fontFamily: handFontSem }]}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleEndGame} style={[s.mBtn, s.mBtnAmber]}>
                <Text style={[s.mBtnLightTxt, { fontFamily: handFontSem }]}>End Game</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* ════ LETTER REVEAL OVERLAY ════ */}
      {showReveal && (
        <Animated.View style={[s.revealOverlay, revealOverlayStyle]} pointerEvents={revealDone && gameMode === 'multiplayer' ? 'auto' : 'none'}>
          <View style={s.revealCard}>
            <Text style={[s.revealLabel, { fontFamily: handFontReg }]}>fill out words starting with...</Text>
            <View style={s.revealTileWrap}>
              <Text style={[s.revealTile, { fontFamily: fontsLoaded ? 'PermanentMarker_400Regular' : undefined }]}>{shuffleLetter}</Text>
            </View>
            {gameMode === 'multiplayer' && revealDone && (
              <Pressable
                style={s.revealStopBtn}
                onPress={() => {
                  revealOpacity.value = withTiming(0, { duration: 300 });
                  setTimeout(() => setShowReveal(false), 300);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Play size={18} color="#FFF" fill="#FFF" strokeWidth={1} />
                  <Text style={[s.revealStopTxt, { fontFamily: handFont }]}>Let's Play!</Text>
                </View>
              </Pressable>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: P.paper },

  // ── Header ──
  header: {
    backgroundColor: P.paper,
    borderBottomWidth: 1.5,
    borderBottomColor: P.paperDeep,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  // ── Clean header border ──
  headerBorder: {
    paddingHorizontal: 0,
    marginBottom: 2,
  },
  headerBorderLine1: {
    height: 3,
    backgroundColor: P.paperDeep,
    opacity: 0.7,
    marginBottom: 3,
  },
  headerBorderLine2: {
    height: 1.5,
    backgroundColor: P.paperLine,
    opacity: 0.9,
  },

  // ── Top bar ──
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 2,
    paddingBottom: 12,
    gap: 6,
  },
  exitBtn: {
    width: 32, height: 32, borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1, borderColor: P.paperLine,
    alignItems: 'center', justifyContent: 'center',
  },
  roundPill: {
    backgroundColor: P.paperDark,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, borderColor: P.paperLine,
  },
  roundTxt: { color: P.inkMed, fontSize: 16 },

  // Sticky note
  stickyOuter: { alignItems: 'center' },
  tapePiece: {
    width: 30, height: 10, borderRadius: 2,
    backgroundColor: P.tape, marginBottom: -4, zIndex: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1,
  },
  stickyBody: {
    width: 68, height: 68,
    backgroundColor: P.sticky,
    borderRadius: 3,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 3, height: 5 }, shadowOpacity: 0.32, shadowRadius: 6,
    elevation: 8,
    borderWidth: 0.5, borderColor: P.stickyDark + '60',
  },
  stickyLetter: {
    fontSize: 44, color: P.ink, lineHeight: 48,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  timerPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1.5, borderColor: P.paperLine,
    backgroundColor: P.paperDark,
  },
  timerTxt: { color: P.inkMed, fontSize: 17 },

  // ── Paper ──
  paper: { flex: 1, backgroundColor: P.paper },
  ruleLine: {
    position: 'absolute', left: 0, right: 0, height: 1,
    backgroundColor: P.paperLine,
  },
  marginLine: {
    position: 'absolute', top: 0, bottom: 0, left: 62,
    width: 1.5, backgroundColor: P.marginRed,
  },
  // Paper grain smudge / aging effect
  smudge: {
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: 'rgba(160,130,70,0.07)',
  },

  // ── Banners ──
  constraintBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginHorizontal: 14, marginTop: 8,
    backgroundColor: '#EAE0FF',
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 5, borderWidth: 1.5, borderColor: '#B090D8',
    transform: [{ rotate: '-0.5deg' }],
    shadowColor: '#B090D8', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.3, shadowRadius: 0,
    zIndex: 2,
  },
  constraintTxt: { color: '#604898', fontSize: 15, flex: 1 },

  stopBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 14, marginTop: 8,
    backgroundColor: P.amberBg,
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 5, borderWidth: 2.5, borderColor: P.amber,
    transform: [{ rotate: '0.4deg' }],
    shadowColor: P.amber, shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.35, shadowRadius: 0,
    zIndex: 2,
  },
  stopBannerTxt: { color: '#7A3800', fontSize: 18 },

  // ── Leaderboard ──
  lbWrap: { marginHorizontal: 14, marginTop: 8, zIndex: 2 },
  lbToggle: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: P.paperDark, borderRadius: 6,
    borderWidth: 1.5, borderColor: P.paperLine,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  lbToggleTxt: { color: P.inkMed, fontSize: 15 },
  lbBody: {
    backgroundColor: P.paperDark, paddingHorizontal: 8, paddingVertical: 6,
    gap: 3, borderRadius: 6, borderWidth: 1.5, borderTopWidth: 0,
    borderTopLeftRadius: 0, borderTopRightRadius: 0, borderColor: P.paperLine,
  },
  lbRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 3, paddingHorizontal: 4, borderRadius: 4 },
  lbRowMe: { backgroundColor: '#D0EEE0' },
  lbRank: { width: 20, color: P.inkFaint, fontSize: 16 },
  lbName: { flex: 1, color: P.inkMed, fontSize: 15 },
  lbScore: { color: P.ink, fontSize: 17 },

  scrollContent: { paddingTop: 6, paddingBottom: 160, paddingLeft: 56, paddingRight: 12 },

  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3 },
  starsTxt: { color: P.amber, fontSize: 17 },
  instrRow: { marginBottom: 12, paddingHorizontal: 2, paddingVertical: 4 },
  instrTxt: { color: P.ink, fontSize: 21, fontFamily: 'Comic Sans MS', fontWeight: '700' },

  // ── Category row ──
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    minHeight: 56,
    position: 'relative',
  },
  catGlow: {
    position: 'absolute',
    top: -3, left: -54, right: -6, bottom: -3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  catTab: {
    width: 50,
    marginLeft: -54,
    marginRight: 6,
    borderRadius: 6,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderWidth: 1.5,
    paddingVertical: 6,
    paddingHorizontal: 3,
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 56,
    justifyContent: 'center',
    gap: 3,
    shadowColor: 'rgba(60,40,10,0.3)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1, shadowRadius: 0,
    elevation: 2,
  },
  // Pencil hatching diagonals
  shadeA: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ skewX: '-20deg' }] },
  shadeB: { position: 'absolute', top: 0, left: '35%', right: '-35%', bottom: 0, transform: [{ skewX: '-20deg' }] },
  shadeC: { position: 'absolute', top: 0, left: '65%', right: '-65%', bottom: 0, transform: [{ skewX: '-20deg' }] },
  tabIcon: {
    width: 26, height: 26, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5,
  },
  tabLabel: { fontSize: 13, textAlign: 'center', lineHeight: 16, paddingHorizontal: 2 },
  hintBtn: { marginTop: 2, padding: 4, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  hintBtnActive: { backgroundColor: P.amber, shadowColor: P.amber, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 3 },

  // Input on paper — baseline sits directly on the ruled line
  inputZone: { flex: 1, paddingTop: 6, paddingBottom: 0 },
  handInput: {
    fontSize: 27, color: P.ink,
    padding: 0, margin: 0, minHeight: 34,
    textShadowColor: 'rgba(20,12,4,0.22)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
    // No background, no border — text sits naked on paper
  },

  // ── Writing pencil animation (small pencil that appears on input focus) ──
  writingPencilWrap: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    width: 10,
    height: 50,
    alignItems: 'center',
    zIndex: 10,
  },
  wPencilEraser: {
    width: 10, height: 7,
    backgroundColor: '#F0C0B0',
    borderRadius: 2,
  },
  wPencilFerrule: {
    width: 10, height: 5,
    backgroundColor: '#B8A890',
  },
  wPencilBody: {
    width: 10, height: 20,
    backgroundColor: P.pencilYellow,
    overflow: 'hidden',
  },
  wPencilStripe: {
    position: 'absolute',
    top: 0, left: 3,
    width: 1.5, height: '100%',
    backgroundColor: 'rgba(180,130,0,0.4)',
  },
  wPencilWood: {
    width: 10, height: 6,
    backgroundColor: '#C8905A',
  },
  wPencilTip: {
    width: 0, height: 0,
    borderLeftWidth: 5, borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderTopColor: P.pencilTip,
  },
  // Mirrors the notebook ruled line exactly when idle
  // Thickens + colors on completion or error
  inputLine: {
    marginTop: 0,
    borderRadius: 0,   // flat, like a ruled line — no capsule
  },
  errNote: { color: P.stopRed, fontSize: 15, marginTop: 3, fontStyle: 'italic' },
  hintUsedRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  hintUsedTxt: { color: P.amber, fontSize: 15 },

  // ── Stamp ──
  stampArea: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    alignItems: 'center', paddingTop: 10,
    backgroundColor: P.paper,
    borderTopWidth: 1.5, borderTopColor: P.paperLine,
    shadowColor: 'rgba(50,35,10,0.15)',
    shadowOffset: { width: 0, height: -3 }, shadowOpacity: 1, shadowRadius: 8, elevation: 5,
  },
  stampHint: { color: P.inkFaint, fontSize: 17, fontStyle: 'italic', marginBottom: 6 },
  stampRing: {
    borderRadius: 50, borderWidth: 3, borderColor: P.stopRed,
    padding: 3, backgroundColor: P.stopRedBg,
    shadowColor: P.stopRed, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55, shadowRadius: 12, elevation: 8,
  },
  stampRingOff: { borderColor: P.paperLine, shadowOpacity: 0, backgroundColor: P.paperDark },
  stampBody: {
    borderRadius: 44, paddingVertical: 14, paddingHorizontal: 52,
    backgroundColor: P.stopRed, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
  },
  stampBodyOff: { backgroundColor: P.paperDeep },
  stampInner: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stampTxt: { color: '#FFF', fontSize: 27, letterSpacing: 2 },

  // ── Modals ──
  backdrop: {
    flex: 1, backgroundColor: 'rgba(24,16,6,0.65)',
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: P.paper, borderRadius: 14, padding: 22,
    width: '100%', maxWidth: 320,
    borderWidth: 2, borderColor: P.paperLine,
    shadowColor: P.ink, shadowOffset: { width: 4, height: 5 }, shadowOpacity: 0.2, shadowRadius: 0, elevation: 6,
    transform: [{ rotate: '-0.5deg' }],
  },
  modalIconWrap: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#FFEAEA', alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginBottom: 12, borderWidth: 2, borderColor: '#E09090',
  },
  modalTitle: { color: P.ink, fontSize: 25, textAlign: 'center', marginBottom: 6 },
  modalBody: { color: P.inkMed, fontSize: 17, textAlign: 'center', lineHeight: 22, marginBottom: 18 },
  modalRow: { flexDirection: 'row', gap: 10 },
  mBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1.5 },
  mBtnSec: { backgroundColor: P.paperDark, borderColor: P.paperLine },
  mBtnSecTxt: { color: P.inkMed, fontSize: 18 },
  mBtnRed: { backgroundColor: P.stopRed, borderColor: '#901010' },
  mBtnAmber: { backgroundColor: P.amber, borderColor: '#906010' },
  mBtnLightTxt: { color: '#FFF', fontSize: 18 },
  mBtnGhost: { marginTop: 10, paddingVertical: 10, borderRadius: 8, borderWidth: 1.5, borderColor: P.amber, alignItems: 'center' },
  mBtnGhostTxt: { color: P.amber, fontSize: 17 },

  // ── Letter reveal overlay ──
  revealOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgb(24,16,6)',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 100,
    elevation: 100,
  },
  revealCard: {
    backgroundColor: P.paper,
    borderRadius: 24,
    paddingHorizontal: 40, paddingVertical: 36,
    alignItems: 'center',
    borderWidth: 2.5, borderColor: P.paperDeep,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 20, elevation: 12,
    minWidth: 240,
  },
  revealLabel: {
    color: P.inkMed, fontSize: 18, textAlign: 'center', marginBottom: 20,
  },
  revealTileWrap: {
    width: 110, height: 110, borderRadius: 18,
    backgroundColor: P.sticky,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2.5, borderColor: P.stickyDark,
    shadowColor: P.stickyDark, shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 0, elevation: 6,
    marginBottom: 28,
  },
  revealTile: {
    fontSize: 72, color: P.ink, lineHeight: 80,
  },
  revealStopBtn: {
    backgroundColor: '#2D7A2D',
    borderRadius: 50, paddingVertical: 13, paddingHorizontal: 44,
    borderWidth: 2, borderColor: '#1A5A1A',
    shadowColor: '#2D7A2D', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45, shadowRadius: 8, elevation: 6,
  },
  revealStopTxt: { color: '#FFF', fontSize: 20, letterSpacing: 1 },
});
