// src/components/notes/NoteCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Note } from '@/store';
import { Colors, BorderRadius, Blur, Typography, Spacing, Animations } from '@/theme';
import { formatRelativeTime, getTagColor } from '@/utils';
import { useHaptics } from '@/hooks/useHaptics';

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  index: number;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onPress,
  onDelete,
  onPin,
  index,
}) => {
  const { light, medium } = useHaptics();
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const height = useSharedValue(100);
  const context = useSharedValue({ x: 0 });

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      translateX.value = context.value.x + event.translationX;
    })
    .onEnd((event) => {
      if (translateX.value > 80) {
        // Pin
        translateX.value = withSpring(0, Animations.springSoft);
        runOnJS(onPin)(note.id);
        runOnJS(medium)();
      } else if (translateX.value < -80) {
        // Delete
        translateX.value = withTiming(-400, { duration: 300 });
        height.value = withTiming(0, { duration: 300 });
        opacity.value = withTiming(0, { duration: 250 });
        runOnJS(onDelete)(note.id);
        runOnJS(light)();
      } else {
        translateX.value = withSpring(0, Animations.springSoft);
      }
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(onPress)(note);
  });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      scale.value = withSpring(0.96, Animations.springSoft);
      runOnJS(medium)();
    })
    .onEnd(() => {
      scale.value = withSpring(1, Animations.springSoft);
    });

  const composedGesture = Gesture.Simultaneous(
    Gesture.Exclusive(tapGesture, longPressGesture),
    panGesture
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
    opacity: opacity.value,
    height: height.value,
    marginBottom: interpolate(
      height.value,
      [0, 100],
      [0, Spacing.md]
    ),
  }));

  const pinIconOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 80], [0, 1]),
  }));

  const deleteOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -80], [0, 1]),
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* Pin indicator */}
        <Animated.View style={[styles.pinIndicator, pinIconOpacity]}>
          <BlurView intensity={Blur.light} tint="dark" style={styles.pinBlur}>
            <Text style={styles.pinText}>📌</Text>
          </BlurView>
        </Animated.View>

        {/* Delete overlay */}
        <Animated.View style={[styles.deleteOverlay, deleteOverlayStyle]}>
          <BlurView intensity={Blur.light} tint="dark" style={styles.deleteBlur}>
            <Text style={styles.deleteText}>🗑️</Text>
          </BlurView>
        </Animated.View>

        {/* Card */}
        <BlurView
          intensity={Blur.light}
          tint="dark"
          style={[
            styles.card,
            note.pinned && styles.pinnedCard,
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {note.title || 'Untitled'}
            </Text>
            <Text style={styles.timestamp}>{formatRelativeTime(note.updatedAt)}</Text>
          </View>

          <Text style={styles.preview} numberOfLines={2}>
            {note.content}
          </Text>

          {note.tags.length > 0 && (
            <View style={styles.tags}>
              {note.tags.map((tag, i) => (
                <View
                  key={i}
                  style={[
                    styles.tag,
                    { backgroundColor: getTagColor(tag) + '25' },
                  ]}
                >
                  <Text style={[styles.tagText, { color: getTagColor(tag) }]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </BlurView>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Spacing.lg,
    backgroundColor: 'rgba(28, 28, 30, 0.45)',
    overflow: 'hidden',
  },
  pinnedCard: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.accentAmber.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.title3,
    color: Colors.textPrimary.dark,
    flex: 1,
    marginRight: Spacing.sm,
  },
  timestamp: {
    ...Typography.footnote,
    color: Colors.textTertiary.dark,
  },
  preview: {
    ...Typography.body,
    color: Colors.textSecondary.dark,
    lineHeight: 22,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  pinIndicator: {
    position: 'absolute',
    left: -50,
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  pinBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pinText: {
    fontSize: 20,
  },
  deleteOverlay: {
    position: 'absolute',
    right: -50,
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.accentRose.dark + '40',
  },
  deleteText: {
    fontSize: 20,
  },
});
