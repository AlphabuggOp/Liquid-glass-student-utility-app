// src/components/glass/GlassInput.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, BorderRadius, Blur, Typography, Spacing } from '@/theme';

interface GlassInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  autoFocus?: boolean;
  maxLength?: number;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style,
  textStyle,
  autoFocus = false,
  maxLength,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <BlurView
      intensity={Blur.light}
      tint="dark"
      style={[
        styles.container,
        {
          borderColor: focused ? Colors.accentBlue.dark + '60' : Colors.borderLight,
          borderWidth: focused ? 1.5 : 1,
        },
        style,
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTertiary.dark}
        multiline={multiline}
        autoFocus={autoFocus}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          multiline && styles.multiline,
          textStyle,
        ]}
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(28, 28, 30, 0.35)',
  },
  input: {
    ...Typography.body,
    color: Colors.textPrimary.dark,
    padding: Spacing.lg,
    minHeight: 48,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
