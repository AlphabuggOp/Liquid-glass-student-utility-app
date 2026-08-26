// src/hooks/useTimer.ts
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store';

export const useTimer = () => {
  const { tickTimer, isTimerRunning, activeTimerRemaining } = useAppStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning, tickTimer]);

  useEffect(() => {
    if (activeTimerRemaining === 0 && !isTimerRunning) {
      // Timer completed
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [activeTimerRemaining, isTimerRunning]);

  return { activeTimerRemaining, isTimerRunning };
};
