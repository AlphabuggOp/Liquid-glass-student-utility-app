// src/hooks/useHaptics.ts
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export const useHaptics = () => {
  const light = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const medium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const heavy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const success = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const error = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const selection = () => {
    Haptics.selectionAsync();
  };

  return { light, medium, heavy, success, error, selection };
};
