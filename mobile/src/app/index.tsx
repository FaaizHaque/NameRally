import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { Gamepad2, HelpCircle, ChevronRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '@/lib/state/game-store';
import { SKETCH_COLORS } from '@/lib/theme';
import { NotebookBackground } from '@/components/NotebookBackground';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [showInput, setShowInput] = useState(false);

  const currentUser = useGameStore((s) => s.currentUser);
  const setCurrentUser = useGameStore((s) => s.setCurrentUser);
  const loadUser = useGameStore((s) => s.loadUser);
  const loadLevelProgress = useGameStore((s) => s.loadLevelProgress);

  const floatAnim = useSharedValue(0);

  useEffect(() => {
    loadUser();
    loadLevelProgress();
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2200 }),
        withTiming(0, { duration: 2200 })
      ),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    if (!currentUser) setShowInput(true);
  }, [currentUser]);

  const letterStyle0 = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(floatAnim.value, [0, 1], [0, -6]) }, { rotate: '-3deg' }],
  }));
  const letterStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(floatAnim.value, [0, 1], [0, 6]) }, { rotate: '2deg' }],
  }));
  const letterStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(floatAnim.value, [0, 1], [0, -6]) }, { rotate: '-2deg' }],
  }));
  const letterStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(floatAnim.value, [0, 1], [0, 6]) }, { rotate: '3deg' }],
  }));
  const letterStyles = [letterStyle0, letterStyle1, letterStyle2, letterStyle3];

  const handleCreateAccount = () => {
    if (username.trim().length < 1) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const userId = `user_${Date.now()}`;
    setCurrentUser({ id: userId, username: username.trim() });
    setShowInput(false);
  };

  const handlePlay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/game-mode');
  };

  const handleHowToPlay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/how-to-play');
  };

  // N P A T letter tiles
  const letters = ['N', 'P', 'A', 'T'];
  const tileColors = ['#FFD4D4', '#FEF3A3', '#C8F5D0', '#D0EAFF'];
  const tileBorders = ['#E07070', '#E8D840', '#50B870', '#60A8E0'];
  const tileInk = ['#882020', '#8B7A10', '#2A6640', '#205880'];

  return (
    <NotebookBackground lineStartY={200} lineSpacing={36} lineCount={32} marginX={48}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: 'space-between',
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 16,
        }}>

          {/* TOP: Logo section */}
          <View style={{ alignItems: 'center' }}>
            {/* Floating letter tiles */}
            <Animated.View entering={FadeInDown.duration(700).delay(100)} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                {letters.map((letter, index) => (
                  <Animated.View
                    key={letter}
                    style={[
                      letterStyles[index],
                      {
                        width: 58,
                        height: 58,
                        borderRadius: 10,
                        backgroundColor: tileColors[index],
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: tileBorders[index],
                        shadowColor: SKETCH_COLORS.ink,
                        shadowOffset: { width: 2, height: 4 },
                        shadowOpacity: 0.18,
                        shadowRadius: 0,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 28, fontWeight: '900', color: tileInk[index] }}>
                      {letter}
                    </Text>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>

            {/* Title — clean modern typeset on the notebook paper */}
            <Animated.View entering={FadeInDown.duration(600).delay(300)} style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 42,
                fontWeight: '900',
                color: SKETCH_COLORS.ink,
                letterSpacing: -1,
                lineHeight: 48,
                textAlign: 'center',
              }}>
                Name Place{'\n'}Animal Thing
              </Text>
              {/* Underline accent */}
              <View style={{
                width: 140,
                height: 3,
                backgroundColor: SKETCH_COLORS.amber,
                borderRadius: 2,
                marginTop: 10,
                marginBottom: 16,
                transform: [{ rotate: '-0.5deg' }],
              }} />
              {/* Slogan line 1 */}
              <Text style={{
                fontSize: 15,
                fontWeight: '800',
                letterSpacing: 2,
                color: SKETCH_COLORS.inkLight,
                textTransform: 'uppercase',
                fontStyle: 'italic',
                textAlign: 'center',
                marginBottom: 6,
              }}>
                A Classic Brought Back To
              </Text>
              {/* LIFE — burning paper effect */}
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                {/* Outer ember glow */}
                <View style={{
                  position: 'absolute',
                  top: -6, left: -10, right: -10, bottom: -6,
                  borderRadius: 14,
                  backgroundColor: 'transparent',
                  shadowColor: '#FF4500',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 18,
                }} />
                {/* Charred paper body */}
                <View style={{
                  backgroundColor: '#0D0500',
                  paddingHorizontal: 24,
                  paddingVertical: 8,
                  borderRadius: 6,
                  overflow: 'hidden',
                  transform: [{ rotate: '-0.8deg' }],
                }}>
                  {/* Ember glow layer inside */}
                  <View style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 10,
                    backgroundColor: '#FF4500', opacity: 0.18,
                  }} />
                  <View style={{
                    position: 'absolute', bottom: 8, left: 0, right: 0, height: 5,
                    backgroundColor: '#FF8C00', opacity: 0.12,
                  }} />
                  {/* Burned edge dots — simulated scorched holes */}
                  <View style={{ position: 'absolute', top: 2, left: 8, width: 5, height: 5, borderRadius: 3, backgroundColor: '#3A1000', opacity: 0.8 }} />
                  <View style={{ position: 'absolute', top: 4, left: 22, width: 3, height: 3, borderRadius: 2, backgroundColor: '#2A0800', opacity: 0.7 }} />
                  <View style={{ position: 'absolute', top: 2, right: 14, width: 4, height: 4, borderRadius: 2, backgroundColor: '#3A1000', opacity: 0.75 }} />
                  <View style={{ position: 'absolute', bottom: 3, left: 16, width: 4, height: 4, borderRadius: 2, backgroundColor: '#FF6000', opacity: 0.4 }} />
                  <View style={{ position: 'absolute', bottom: 2, right: 20, width: 3, height: 3, borderRadius: 2, backgroundColor: '#FF4500', opacity: 0.35 }} />
                  <Text style={{
                    fontSize: 28,
                    fontWeight: '900',
                    letterSpacing: 6,
                    fontStyle: 'italic',
                    color: '#FF6B00',
                    textShadowColor: '#FFB300',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 12,
                    textTransform: 'uppercase',
                  }}>
                    LIFE
                  </Text>
                </View>
                {/* Rising ember sparks row */}
                <View style={{ flexDirection: 'row', gap: 6, marginTop: 3, opacity: 0.6 }}>
                  <View style={{ width: 3, height: 3, borderRadius: 2, backgroundColor: '#FF6B00' }} />
                  <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: '#FFB300', marginTop: -3 }} />
                  <View style={{ width: 3, height: 3, borderRadius: 2, backgroundColor: '#FF4500', marginTop: 1 }} />
                  <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: '#FF6B00', marginTop: -2 }} />
                  <View style={{ width: 3, height: 3, borderRadius: 2, backgroundColor: '#FFB300' }} />
                </View>
              </View>
            </Animated.View>
          </View>

          {/* MIDDLE: Username or Play */}
          <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 20 }}>
            {showInput && !currentUser ? (
              <Animated.View entering={FadeInUp.duration(600).delay(500)}>
                {/* Name entry — clean card with ruled-line feel */}
                <View style={{
                  backgroundColor: SKETCH_COLORS.paperDark,
                  borderRadius: 16,
                  padding: 22,
                  borderWidth: 1.5,
                  borderColor: SKETCH_COLORS.paperLine,
                  shadowColor: SKETCH_COLORS.ink,
                  shadowOffset: { width: 2, height: 5 },
                  shadowOpacity: 0.1,
                  shadowRadius: 0,
                  elevation: 3,
                }}>
                  <Text style={{
                    color: SKETCH_COLORS.inkFaint,
                    fontSize: 11,
                    fontWeight: '700',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}>
                    Your Name
                  </Text>
                  <View style={{
                    borderBottomWidth: 2.5,
                    borderBottomColor: SKETCH_COLORS.amber,
                    marginBottom: 20,
                  }}>
                    <TextInput
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 2,
                        color: SKETCH_COLORS.ink,
                        fontSize: 22,
                        fontWeight: '800',
                        backgroundColor: 'transparent',
                      }}
                      placeholder="Enter your name..."
                      placeholderTextColor={SKETCH_COLORS.inkFaint}
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                      autoCorrect={false}
                      maxLength={20}
                      returnKeyType="done"
                      onSubmitEditing={handleCreateAccount}
                    />
                  </View>
                  <Pressable
                    onPress={handleCreateAccount}
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? '#2A7A2A' : SKETCH_COLORS.green,
                      borderRadius: 12,
                      paddingVertical: 16,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 8,
                      borderWidth: 2,
                      borderColor: '#1A5A1A',
                      shadowColor: SKETCH_COLORS.ink,
                      shadowOffset: { width: 2, height: 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 0,
                      elevation: 4,
                    })}
                  >
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16 }}>
                      Let's Play
                    </Text>
                    <ChevronRight size={18} color="#fff" strokeWidth={2.5} />
                  </Pressable>
                </View>
              </Animated.View>
            ) : currentUser ? (
              <View>
                {/* Player badge — sticky note style but with clean label */}
                <Animated.View entering={FadeInUp.duration(500)} style={{ alignItems: 'center', marginBottom: 22 }}>
                  <View style={{
                    backgroundColor: SKETCH_COLORS.pastelYellow,
                    paddingHorizontal: 22,
                    paddingVertical: 12,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: '#E8D840',
                    transform: [{ rotate: '0.6deg' }],
                    shadowColor: SKETCH_COLORS.ink,
                    shadowOffset: { width: 2, height: 3 },
                    shadowOpacity: 0.14,
                    shadowRadius: 0,
                    elevation: 3,
                  }}>
                    <Text style={{ color: SKETCH_COLORS.inkFaint, fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', marginBottom: 2 }}>
                      Playing as
                    </Text>
                    <Text style={{ color: SKETCH_COLORS.ink, fontSize: 20, fontWeight: '900', textAlign: 'center' }}>
                      {currentUser.username}
                    </Text>
                  </View>
                </Animated.View>

                {/* PLAY button — bold, clean, modern on notebook paper */}
                <Animated.View entering={FadeInUp.duration(600).delay(150)}>
                  <AnimatedPressable
                    onPress={handlePlay}
                    style={({ pressed }: { pressed: boolean }) => ({
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                    })}
                  >
                    <View style={{
                      backgroundColor: SKETCH_COLORS.ink,
                      borderRadius: 18,
                      paddingVertical: 22,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      gap: 14,
                      shadowColor: SKETCH_COLORS.ink,
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.35,
                      shadowRadius: 16,
                      elevation: 10,
                    }}>
                      <Gamepad2 size={28} color={SKETCH_COLORS.amberLight} strokeWidth={2} />
                      <Text style={{
                        color: '#fff',
                        fontSize: 26,
                        fontWeight: '900',
                        letterSpacing: 2,
                      }}>
                        PLAY
                      </Text>
                    </View>
                  </AnimatedPressable>
                </Animated.View>
              </View>
            ) : null}
          </View>

          {/* FOOTER */}
          <Animated.View entering={FadeIn.duration(600).delay(900)} style={{ alignItems: 'center', gap: 12 }}>
            <Pressable
              onPress={handleHowToPlay}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: pressed ? SKETCH_COLORS.paperLine : SKETCH_COLORS.amberLight,
                paddingHorizontal: 22,
                paddingVertical: 11,
                borderRadius: 22,
                borderWidth: 2,
                borderColor: SKETCH_COLORS.amber,
                shadowColor: SKETCH_COLORS.ink,
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 0,
              })}
            >
              <HelpCircle size={16} color={SKETCH_COLORS.inkLight} strokeWidth={2.5} />
              <Text style={{ color: SKETCH_COLORS.ink, fontSize: 14, fontWeight: '800' }}>How to Play</Text>
            </Pressable>
            <Text style={{ color: SKETCH_COLORS.inkLight, fontSize: 12, fontWeight: '700', letterSpacing: 1, opacity: 0.85 }}>
              Solo · Multiplayer · Daily Challenge
            </Text>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </NotebookBackground>
  );
}
