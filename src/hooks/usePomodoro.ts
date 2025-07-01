
import { useState, useEffect, useRef } from 'react';
import { PomodoroSettings, PomodoroState } from '../types';

export const usePomodoro = (settings: PomodoroSettings) => {
  const [state, setState] = useState<PomodoroState>({
    isRunning: false,
    timeLeft: settings.workDuration * 60,
    currentSession: 1,
    isBreak: false,
    completedSessions: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.isRunning && state.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      handleSessionComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.timeLeft]);

  const handleSessionComplete = () => {
    setState(prev => {
      const newCompletedSessions = prev.isBreak ? prev.completedSessions : prev.completedSessions + 1;
      const shouldTakeLongBreak = newCompletedSessions % settings.sessionsUntilLongBreak === 0;
      
      if (prev.isBreak) {
        // Break is over, start new work session
        return {
          ...prev,
          isRunning: false,
          timeLeft: settings.workDuration * 60,
          isBreak: false,
          currentSession: prev.currentSession + 1
        };
      } else {
        // Work session is over, start break
        const breakDuration = shouldTakeLongBreak ? settings.longBreakDuration : settings.shortBreakDuration;
        return {
          ...prev,
          isRunning: false,
          timeLeft: breakDuration * 60,
          isBreak: true,
          completedSessions: newCompletedSessions
        };
      }
    });

    // Show notification
    if (Notification.permission === 'granted') {
      new Notification(state.isBreak ? 'Break time is over!' : 'Time for a break!');
    }
  };

  const start = () => setState(prev => ({ ...prev, isRunning: true }));
  const pause = () => setState(prev => ({ ...prev, isRunning: false }));
  const reset = () => setState({
    isRunning: false,
    timeLeft: settings.workDuration * 60,
    currentSession: 1,
    isBreak: false,
    completedSessions: 0
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    ...state,
    start,
    pause,
    reset,
    timeFormatted: formatTime(state.timeLeft)
  };
};
