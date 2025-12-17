
export enum AppView {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  LESSON = 'LESSON',
  CHAT = 'CHAT',
  SONGS = 'SONGS',
  PARENT_GATE = 'PARENT_GATE',
  PARENT_DASHBOARD = 'PARENT_DASHBOARD'
}

export interface Song {
  id: string;
  title: string;
  icon: string;
  color: string;
  audioUrl: string;
}

export interface Lesson {
  id: string;
  title: string;
  frenchTitle: string;
  icon: string;
  color: string;
  items: LessonItem[];
}

export interface LessonItem {
  english: string;
  french: string;
  imageUrl: string;
  audioUrl?: string;
}

export interface Progress {
  wordsLearned: string[];
  sessionsCompleted: number;
}
