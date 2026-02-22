import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, User, Layers, Calendar, ChevronRight, Star, Wifi, Pencil } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '@/lib/state/game-store';
import { SKETCH_COLORS } from '@/lib/theme';
import { NotebookBackground } from '@/components/NotebookBackground';

export default function GameModeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setGameMode = useGameStore((s) => s.setGameMode);
  const loadLevelProgress = useGameStore((s) => s.loadLevelProgress);

  useEffect(() => {
    loadLevelProgress();
  }, [loadLevelProgress]);

  const handleSinglePlayer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setGameMode('single');
    router.push('/level-select');
  };

  const handleMultiplayer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setGameMode('multiplayer');
    router.push('/multiplayer-options');
  };

  const handleDailyChallenge = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/daily-challenge');
  };

  return (
    <NotebookBackground lineStartY={140} lineSpacing={36} lineCount={28} marginX={48}>
      <View style={{ paddingTop: insets.top, flex: 1 }}>

        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            style={({ pressed }) => ({
              backgroundColor: pressed ? SKETCH_COLORS.paperLine : SKETCH_COLORS.paperDark,
              padding: 10, borderRadius: 10, borderWidth: 1.5,
              borderColor: SKETCH_COLORS.paperLine,
            })}
          >
            <ChevronLeft size={22} color={SKETCH_COLORS.inkLight} strokeWidth={2.5} />
          </Pressable>
          <View style={{
            marginLeft: 12,
            backgroundColor: SKETCH_COLORS.amberLight,
            paddingHorizontal: 14, paddingVertical: 6,
            borderRadius: 8, borderWidth: 1.5, borderColor: SKETCH_COLORS.amber,
          }}>
            <Text style={{ color: SKETCH_COLORS.ink, fontSize: 18, fontWeight: '900' }}>Select Mode</Text>
          </View>
        </View>

        {/* Subtitle */}
        <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
          <Text style={{ color: SKETCH_COLORS.inkLight, fontSize: 14, fontWeight: '700', fontStyle: 'italic' }}>
            Choose your preferred way to play
          </Text>
        </View>

        {/* Mode Cards */}
        <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: insets.bottom + 16, justifyContent: 'space-evenly', gap: 12 }}>

          {/* SINGLE PLAYER */}
          <Pressable onPress={handleSinglePlayer} style={({ pressed }) => ({ flex: 1, maxHeight: 130, opacity: pressed ? 0.85 : 1 })}>
            <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'center',
              paddingHorizontal: 20, paddingVertical: 18,
              borderRadius: 14, borderWidth: 2, borderColor: '#3A58C8',
              backgroundColor: '#C8DFFF',
              shadowColor: SKETCH_COLORS.ink,
              shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.18, shadowRadius: 0, elevation: 4,
            }}>
              <View style={{ backgroundColor: '#A8C8FF', padding: 13, borderRadius: 12, borderWidth: 1.5, borderColor: '#3A58C8', marginRight: 16 }}>
                <User size={26} color="#1A3080" strokeWidth={2.5} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: '#1A3080', fontSize: 19, fontWeight: '900' }}>Single Player</Text>
                <Text style={{ color: '#2A4890', fontSize: 12, fontWeight: '600', fontStyle: 'italic', lineHeight: 16 }}>
                  NAPT with new categories! Can you make it to level 100?
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2, backgroundColor: 'rgba(58,88,200,0.15)', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', borderWidth: 1.5, borderColor: '#3A58C8' }}>
                  <Layers size={11} color="#1A3080" strokeWidth={2.5} />
                  <Text style={{ color: '#1A3080', fontSize: 10, fontWeight: '800' }}>500 Levels</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#3A58C8" strokeWidth={2.5} />
            </View>
          </Pressable>

          {/* MULTIPLAYER */}
          <Pressable onPress={handleMultiplayer} style={({ pressed }) => ({ flex: 1, maxHeight: 130, opacity: pressed ? 0.85 : 1 })}>
            <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'center',
              paddingHorizontal: 20, paddingVertical: 18,
              borderRadius: 14, borderWidth: 2, borderColor: '#A0622A',
              backgroundColor: '#C4832A',
              shadowColor: '#7A3A10',
              shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.22, shadowRadius: 0, elevation: 4,
            }}>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.22)', padding: 13, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', marginRight: 16 }}>
                <Pencil size={26} color="#ffffff" strokeWidth={2.5} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: '#ffffff', fontSize: 19, fontWeight: '900' }}>Multiplayer</Text>
                <Text style={{ color: '#FFE0B0', fontSize: 12, fontWeight: '600', fontStyle: 'italic', lineHeight: 16 }}>
                  The OG NAPT Game. Play with your family/friends now!
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)' }}>
                  <Wifi size={11} color="#FFE0B0" strokeWidth={2.5} />
                  <Text style={{ color: '#FFE0B0', fontSize: 10, fontWeight: '800' }}>Live · 2-10 Players</Text>
                </View>
              </View>
              <ChevronRight size={20} color="rgba(255,255,255,0.8)" strokeWidth={2.5} />
            </View>
          </Pressable>

          {/* DAILY CHALLENGE */}
          <Pressable onPress={handleDailyChallenge} style={({ pressed }) => ({ flex: 1, maxHeight: 130, opacity: pressed ? 0.85 : 1 })}>
            <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'center',
              paddingHorizontal: 20, paddingVertical: 18,
              borderRadius: 14, borderWidth: 2, borderColor: '#2A7A40',
              backgroundColor: '#C8F5D0',
              shadowColor: SKETCH_COLORS.ink,
              shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.18, shadowRadius: 0, elevation: 4,
            }}>
              <View style={{ backgroundColor: '#90DDA0', padding: 13, borderRadius: 12, borderWidth: 1.5, borderColor: '#2A7A40', marginRight: 16 }}>
                <Calendar size={26} color="#1A5028" strokeWidth={2.5} />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: '#1A5028', fontSize: 19, fontWeight: '900' }}>Daily Challenge</Text>
                <Text style={{ color: '#2A6838', fontSize: 12, fontWeight: '600', fontStyle: 'italic', lineHeight: 16 }}>
                  Can you solve today's? Top the leaderboard
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2, backgroundColor: 'rgba(42,122,64,0.18)', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start', borderWidth: 1.5, borderColor: '#2A7A40' }}>
                  <Star size={11} color="#1A5028" strokeWidth={2.5} />
                  <Text style={{ color: '#1A5028', fontSize: 10, fontWeight: '800' }}>Global Rankings</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#2A7A40" strokeWidth={2.5} />
            </View>
          </Pressable>

        </View>
      </View>
    </NotebookBackground>
  );
}
