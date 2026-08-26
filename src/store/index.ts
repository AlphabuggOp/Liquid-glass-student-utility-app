// src/store/index.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

// Note types
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color?: string;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Alarm {
  id: string;
  hour: number;
  minute: number;
  label: string;
  repeatDays: number[]; // 0-6 (Sun-Sat)
  enabled: boolean;
  sound: string;
}

export interface TimerPreset {
  id: string;
  duration: number; // seconds
  label: string;
}

interface AppState {
  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  pinNote: (id: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Clock
  worldClocks: string[]; // timezone identifiers
  addWorldClock: (timezone: string) => void;
  removeWorldClock: (timezone: string) => void;

  // Alarms
  alarms: Alarm[];
  addAlarm: (alarm: Omit<Alarm, 'id'>) => void;
  updateAlarm: (id: string, updates: Partial<Alarm>) => void;
  deleteAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;

  // Timer
  timerPresets: TimerPreset[];
  activeTimerDuration: number;
  activeTimerRemaining: number;
  isTimerRunning: boolean;
  timerLabel: string;
  startTimer: (duration: number, label?: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
  tickTimer: () => void;
}

const defaultTimerPresets: TimerPreset[] = [
  { id: '1', duration: 300, label: '5 min' },
  { id: '2', duration: 900, label: '15 min' },
  { id: '3', duration: 1500, label: '25 min' },
  { id: '4', duration: 1800, label: '30 min' },
  { id: '5', duration: 2700, label: '45 min' },
  { id: '6', duration: 3600, label: '60 min' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      notes: [],
      searchQuery: '',
      worldClocks: ['America/New_York', 'Europe/London', 'Asia/Tokyo'],
      alarms: [],
      timerPresets: defaultTimerPresets,
      activeTimerDuration: 0,
      activeTimerRemaining: 0,
      isTimerRunning: false,
      timerLabel: '',

      addNote: (note) => {
        const newNote: Note = {
          ...note,
          id: Date.now().toString(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }));
      },

      pinNote: (id) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, pinned: !n.pinned } : n
          ),
        }));
      },

      setSearchQuery: (query) => set({ searchQuery: query }),

      addWorldClock: (timezone) => {
        set((state) => ({
          worldClocks: [...state.worldClocks, timezone],
        }));
      },

      removeWorldClock: (timezone) => {
        set((state) => ({
          worldClocks: state.worldClocks.filter((t) => t !== timezone),
        }));
      },

      addAlarm: (alarm) => {
        const newAlarm: Alarm = {
          ...alarm,
          id: Date.now().toString(),
        };
        set((state) => ({ alarms: [...state.alarms, newAlarm] }));
      },

      updateAlarm: (id, updates) => {
        set((state) => ({
          alarms: state.alarms.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        }));
      },

      deleteAlarm: (id) => {
        set((state) => ({
          alarms: state.alarms.filter((a) => a.id !== id),
        }));
      },

      toggleAlarm: (id) => {
        set((state) => ({
          alarms: state.alarms.map((a) =>
            a.id === id ? { ...a, enabled: !a.enabled } : a
          ),
        }));
      },

      startTimer: (duration, label = '') => {
        set({
          activeTimerDuration: duration,
          activeTimerRemaining: duration,
          isTimerRunning: true,
          timerLabel: label,
        });
      },

      pauseTimer: () => set({ isTimerRunning: false }),

      resumeTimer: () => set({ isTimerRunning: true }),

      stopTimer: () =>
        set({
          activeTimerDuration: 0,
          activeTimerRemaining: 0,
          isTimerRunning: false,
          timerLabel: '',
        }),

      tickTimer: () => {
        const { activeTimerRemaining, isTimerRunning } = get();
        if (isTimerRunning && activeTimerRemaining > 0) {
          set({ activeTimerRemaining: activeTimerRemaining - 1 });
        } else if (isTimerRunning && activeTimerRemaining <= 0) {
          set({ isTimerRunning: false });
        }
      },
    }),
    {
      name: 'liquid-glass-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        notes: state.notes,
        worldClocks: state.worldClocks,
        alarms: state.alarms,
        timerPresets: state.timerPresets,
      }),
    }
  )
);
