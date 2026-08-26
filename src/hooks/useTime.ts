// src/hooks/useTime.ts
import { useState, useEffect } from 'react';

export const useTime = (timezone?: string) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date, tz?: string) => {
    if (tz) {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: tz,
      }).format(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date, tz?: string) => {
    if (tz) {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        timeZone: tz,
      }).format(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getHourAngle = (date: Date, tz?: string) => {
    let d = date;
    if (tz) {
      const tzDate = new Date(date.toLocaleString('en-US', { timeZone: tz }));
      d = tzDate;
    }
    const hours = d.getHours() % 12;
    const minutes = d.getMinutes();
    return (hours * 30) + (minutes * 0.5);
  };

  const getMinuteAngle = (date: Date, tz?: string) => {
    let d = date;
    if (tz) {
      const tzDate = new Date(date.toLocaleString('en-US', { timeZone: tz }));
      d = tzDate;
    }
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    return (minutes * 6) + (seconds * 0.1);
  };

  const getSecondAngle = (date: Date, tz?: string) => {
    let d = date;
    if (tz) {
      const tzDate = new Date(date.toLocaleString('en-US', { timeZone: tz }));
      d = tzDate;
    }
    const seconds = d.getSeconds();
    const ms = d.getMilliseconds();
    return (seconds * 6) + (ms * 0.006);
  };

  return {
    time,
    formatTime,
    formatDate,
    getHourAngle,
    getMinuteAngle,
    getSecondAngle,
  };
};
