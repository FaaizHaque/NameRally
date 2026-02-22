import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, LogIn, Users, Gamepad2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { SKETCH_COLORS } from '@/lib/theme';
import { NotebookBackground } from '@/components/NotebookBackground';

export default function MultiplayerOptionsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCreateGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/create-game');
  };

  const handleJoinGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/join-game');
  };

  return (
    <NotebookBackground lineStartY={160} lineSpacing={36} lineCount={25} marginX={48}>
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
              padding: 10,
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: SKETCH_COLORS.paperLine,
              shadowColor: SKETCH_COLORS.ink,
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 0,
            })}
          >
            <ChevronLeft size={22} color={SKETCH_COLORS.inkLight} strokeWidth={2.5} />
          </Pressable>
          <View style={{
            marginLeft: 12,
            backgroundColor: '#F8E080',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 6,
            borderWidth: 1.5,
            borderColor: '#C8A030',
            transform: [{ rotate: '-0.5deg' }],
          }}>
            <Text style={{ color: '#7A5000', fontSize: 18, fontWeight: '900' }}>Multiplayer</Text>
          </View>
        </View>

        {/* Options */}
        <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center', gap: 14 }}>

          {/* Create Game */}
          <Pressable
            onPress={handleCreateGame}
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.97 : 1 }, { rotate: '-0.4deg' }],
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <View style={{
              backgroundColor: SKETCH_COLORS.pastelPink,
              borderRadius: 14,
              padding: 20,
              borderWidth: 2,
              borderColor: '#E07070',
              shadowColor: SKETCH_COLORS.ink,
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 0,
              elevation: 4,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{
                  backgroundColor: '#FFB8B8',
                  padding: 8,
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: '#E07070',
                  marginRight: 12,
                }}>
                  <Plus size={22} color="#882020" strokeWidth={2.5} />
                </View>
                <Text style={{ color: '#882020', fontSize: 18, fontWeight: '900' }}>Create Game</Text>
              </View>
              <Text style={{ color: '#AA4040', fontSize: 13, marginBottom: 10, marginLeft: 2 }}>
                Host a new game and invite friends
              </Text>
              <View style={{ flexDirection: 'row', gap: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Gamepad2 size={12} color="#C05050" strokeWidth={2.5} />
                  <Text style={{ color: '#C05050', fontSize: 11, fontWeight: '700' }}>Customize rounds</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Users size={12} color="#C05050" strokeWidth={2.5} />
                  <Text style={{ color: '#C05050', fontSize: 11, fontWeight: '700' }}>Share code</Text>
                </View>
              </View>
            </View>
          </Pressable>

          {/* Join Game */}
          <Pressable
            onPress={handleJoinGame}
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.97 : 1 }, { rotate: '0.4deg' }],
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <View style={{
              backgroundColor: SKETCH_COLORS.pastelBlue,
              borderRadius: 14,
              padding: 20,
              borderWidth: 2,
              borderColor: '#60A8E0',
              shadowColor: SKETCH_COLORS.ink,
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 0,
              elevation: 4,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{
                  backgroundColor: '#A8D8FF',
                  padding: 8,
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: '#60A8E0',
                  marginRight: 12,
                }}>
                  <LogIn size={22} color="#205880" strokeWidth={2.5} />
                </View>
                <Text style={{ color: '#205880', fontSize: 18, fontWeight: '900' }}>Join Game</Text>
              </View>
              <Text style={{ color: '#3A6880', fontSize: 13, marginBottom: 10, marginLeft: 2 }}>
                Enter a code to join a friend's game
              </Text>
              <View style={{ flexDirection: 'row', gap: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <LogIn size={12} color="#3A7090" strokeWidth={2.5} />
                  <Text style={{ color: '#3A7090', fontSize: 11, fontWeight: '700' }}>Quick join</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Users size={12} color="#3A7090" strokeWidth={2.5} />
                  <Text style={{ color: '#3A7090', fontSize: 11, fontWeight: '700' }}>2–10 players</Text>
                </View>
              </View>
            </View>
          </Pressable>

          {/* Info */}
          <View style={{ alignItems: 'center', marginTop: 4 }}>
            <Text style={{ color: SKETCH_COLORS.inkFaint, fontSize: 11, fontStyle: 'italic' }}>
              Play the classic word game with friends
            </Text>
          </View>
        </View>
      </View>
    </NotebookBackground>
  );
}
