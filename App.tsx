import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlassButton, GlassCard, GlassInput, GlassToggle } from './src/components/glass';
import { Colors, Spacing, Typography } from './src/theme';
import { useAppStore } from './src/store';

export default function App() {
  const notes = useAppStore((state) => state.notes);
  const addNote = useAppStore((state) => state.addNote);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.eyebrow}>STUDENT UTILITY</Text>
          <Text style={styles.title}>Liquid Glass</Text>
          <Text style={styles.subtitle}>
            A calm, glass-inspired workspace for notes, timers, clocks and alarms.
          </Text>
          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Quick note</Text>
            <GlassInput placeholder="What do you need to remember?" />
            <GlassButton
              title="Add sample note"
              onPress={() => addNote({ title: 'Welcome', content: 'Your Liquid Glass workspace is ready.', tags: ['welcome'], pinned: false })}
            />
          </GlassCard>
          <GlassCard style={styles.card}>
            <Text style={styles.cardTitle}>Workspace</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Saved notes</Text>
              <Text style={styles.value}>{notes.length}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Focus mode</Text>
              <GlassToggle value={false} onValueChange={() => {}} />
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, backgroundColor: Colors.bgPrimary.dark },
  container: { width: '100%', maxWidth: 960, alignSelf: 'center', padding: Spacing.xl, gap: Spacing.lg },
  eyebrow: { ...Typography.caption, letterSpacing: 2, color: Colors.textSecondary.dark },
  title: { ...Typography.display, color: Colors.textPrimary.dark },
  subtitle: { ...Typography.body, color: Colors.textSecondary.dark, maxWidth: 700 },
  card: { width: '100%' },
  cardTitle: { ...Typography.title3, color: Colors.textPrimary.dark, marginBottom: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.sm },
  label: { ...Typography.body, color: Colors.textSecondary.dark },
  value: { ...Typography.title3, color: Colors.textPrimary.dark },
});
