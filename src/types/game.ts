export type Difficulty = 'mudah' | 'sedang' | 'sulit';

export type Category = 'ukuran' | 'sifat' | 'kondisi' | 'arah' | 'indra';

export interface OppositeCard {
  id: string;
  word: string;
  oppositeId: string;
  category: Category;
  difficulty: Difficulty;
  iconName: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
  hint: string;
  description: string;
  meaningId?: string;
}

export interface Player {
  id: 'p1' | 'p2';
  name: string;
  avatar: string;
  score: number;
  roundsWon: number;
  correctAnswers: number;
  wrongAnswers: number;
  deck: OppositeCard[];
  activeIndex: number;
  selectedCard: OppositeCard | null;
  isSubmitting: boolean;
  hasAnsweredWrongThisRound: boolean;
  lastSubmitTime?: number;
}

export type GamePhase =
  | 'menu'
  | 'setup'
  | 'tutorial'
  | 'countdown'
  | 'playing'
  | 'round-resolving'
  | 'round-result'
  | 'game-over';

export interface GameSettings {
  totalRounds: number;
  answerDuration: number;
  pointsPerCorrectAnswer: number;
  allowRetryAfterWrongAnswer: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  difficulty: 'semua' | 'mudah' | 'sedang';
  animationSpeed: 'slow' | 'normal' | 'fast';
}

export interface RoundHistory {
  roundNumber: number;
  mainCard: OppositeCard;
  targetOpposite: OppositeCard;
  winner: 'p1' | 'p2' | 'draw' | 'timeout';
  p1Answer?: OppositeCard | null;
  p2Answer?: OppositeCard | null;
  responseTimeMs?: number;
}
