export type GameStatus = 'started' | 'finished';

export type GameState = {
  readonly questions: readonly Question[];
  readonly currentQuestion?: Question;
  readonly player: Player;
  readonly gameStatus?: GameStatus;
};

export type Question = {
  readonly title: string;
  readonly answers: Answer[];
  readonly timeout: number;
  readonly score: number;
  readonly isLast?: boolean;
};

export type Answer = {
  readonly label: string;
  readonly right?: boolean;
};

export type Player = {
  readonly name: string;
  readonly health: number;
  readonly score: number;
};

export type AnswerResponse = {
  readonly gameStatus: GameStatus;
  readonly player: Player;
};
