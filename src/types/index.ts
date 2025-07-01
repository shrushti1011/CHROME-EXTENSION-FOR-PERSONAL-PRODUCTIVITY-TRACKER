
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

export interface PomodoroState {
  isRunning: boolean;
  timeLeft: number;
  currentSession: number;
  isBreak: boolean;
  completedSessions: number;
}
