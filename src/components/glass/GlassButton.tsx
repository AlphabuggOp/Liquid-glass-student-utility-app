// src/components/glass/GlassButton.tsx
import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Colors, BorderRadius, Blur, Typography, Spacing, Animations } from '@/theme';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  style,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95, Animations.springSoft);
      opacity.value = withTiming(0.8, { duration: Animations.micro });
    })
    .onEnd(() => {
      runOnJS(onPress)();
    })
    .onFinalize(() => {
      scale.value = withSpring(1, Animations.springSoft);
      opacity.value = withTiming(1, { duration: Animations.micro });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : opacity.value,
  }));

  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: BorderRadius.md },
    md: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: BorderRadius.lg },
    lg: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: BorderRadius.xl },
  };

  const variantStyles = {
    primary: {
      backgroundColor: Colors.accentBlue.dark + '30',
      borderColor: Colors.accentBlue.dark + '50',
    },
    secondary: {
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderColor: Colors.borderLight,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  };

  const textStyles = {
    primary: { color: Colors.accentBlue.dark },
    secondary: { color: Colors.textPrimary.dark },
    ghost: { color: Colors.textSecondary.dark },
  };

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[animatedStyle, style]}>
        <BlurView
          intensity={Blur.light}
          tint="dark"
          style={[
            styles.container,
            sizeStyles[size],
            variantStyles[variant],
          ]}
        >
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, textStyles[variant]]}>{title}</Text>
        </BlurView>
      </Animated.View>
    </GestureDetector>
  );
};

import { View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  text: {
    ...Typography.callout,
  },
  icon: {
    marginRight: 8,
  },
});
