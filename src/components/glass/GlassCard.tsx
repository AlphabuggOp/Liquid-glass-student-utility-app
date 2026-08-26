// src/components/glass/GlassCard.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { Colors, BorderRadius, Blur, Shadows, Spacing, Animations } from '@/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'light' | 'medium' | 'heavy';
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  active?: boolean;
}

const intensityMap = {
  light: Blur.light,
  medium: Blur.medium,
  heavy: Blur.heavy,
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 'light',
  borderRadius = BorderRadius.lg,
  borderWidth = 1,
  borderColor = Colors.borderLight,
  padding = Spacing.lg,
  active = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = {
    transform: [{ scale: scale.value }],
  };

  const blurIntensity = intensityMap[intensity];

  return (
    <View style={style}>
      <BlurView
        intensity={blurIntensity}
        tint="dark"
        style={[
          styles.container,
          {
            borderRadius,
            borderWidth: active ? 2 : borderWidth,
            borderColor: active ? Colors.accentBlue.dark : borderColor,
            padding,
          },
        ]}
      >
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'rgba(28, 28, 30, 0.45)',
    ...Shadows.glass,
  },
  content: {
    flex: 1,
  },
});
