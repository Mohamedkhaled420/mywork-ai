
export interface MBTIQuestion {
  id: string;
  text: string;
  dimension: 'E/I' | 'S/N' | 'T/F' | 'J/P';
  polePositive: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'; // Which pole "Strongly Agree" (7) points towards
}

export interface MBTIAnswer {
  questionId: string;
  value: number; // 1-7
}

export interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export type MBTIPersonalityType = `${'E'|'I'}${'S'|'N'}${'T'|'F'}${'J'|'P'}`;

export interface MBTIResultDetails {
  type: MBTIPersonalityType;
  description: string;
  breakdown: {
    dimension: string;
    scores: { poleA: string, scoreA: number, poleB: string, scoreB: number};
    preference: string;
  }[];
}

export interface TKIQuestion {
  id: string;
  statementA: string;
  styleA: TKIStyle;
  statementB: string;
  styleB: TKIStyle;
}

export enum TKIStyle {
  Competing = 'Competing',
  Collaborating = 'Collaborating',
  Compromising = 'Compromising',
  Avoiding = 'Avoiding',
  Accommodating = 'Accommodating',
}

export interface TKIAnswer {
  questionId: string;
  chosenStyle: TKIStyle;
}

export interface TKIScores {
  [TKIStyle.Competing]: number;
  [TKIStyle.Collaborating]: number;
  [TKIStyle.Compromising]: number;
  [TKIStyle.Avoiding]: number;
  [TKIStyle.Accommodating]: number;
}

export interface TKIResultDetails {
  dominantStyle: TKIStyle;
  description: string;
  scores: { style: TKIStyle; score: number }[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export enum TestSection {
  MBTI = "MBTI",
  TKI = "TKI",
  Chatbot = "Chatbot",
  Home = "Home"
}
