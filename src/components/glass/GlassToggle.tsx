// src/components/glass/GlassToggle.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors, BorderRadius, Animations } from '@/theme';

interface GlassToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
}

export const GlassToggle: React.FC<GlassToggleProps> = ({
  value,
  onValueChange,
  activeColor = Colors.accentEmerald.dark,
}) => {
  const translateX = useSharedValue(value ? 20 : 0);
  const progress = useSharedValue(value ? 1 : 0);

  const tapGesture = Gesture.Tap().onEnd(() => {
    const newValue = !value;
    onValueChange(newValue);
    translateX.value = withSpring(newValue ? 20 : 0, Animations.springSoft);
    progress.value = withSpring(newValue ? 1 : 0, Animations.springSoft);
  });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255,255,255,0.10)', activeColor + '40']
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255,255,255,0.15)', activeColor + '60']
    ),
  }));

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]}>
          <View style={[styles.thumbInner, { backgroundColor: value ? activeColor : '#8E8E93' }]} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 30,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
