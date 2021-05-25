import { AppError } from '../types/http-error';

export type GameStatus = 'started' | 'finished';

export type GameState = {
  readonly totalScore: number;
  readonly questions: readonly Question[];
  readonly currentQuestion?: Question;
  readonly isQuestionsLoading: boolean;
  readonly gameStatus?: GameStatus;
  readonly loadingError?: AppError;
};

export type Question = {
  readonly title: string;
  readonly answers: Answer[];
  readonly timeout: number;
  readonly score: number;
};

export type Answer = {
  readonly label: string;
  readonly right?: boolean;
};
