import { AnswerResponse, Player, Question } from './models';

export const START_GAME = '[Game] start';

export const SET_ANSWER = '[Game] set answer';
export const SET_QUESTIONS = '[Game] req questions list';
export const QUESTION_TIMES_UP = '[Game] question times up';

export class ActionStartGame {
  public readonly type = START_GAME;
  constructor(public readonly payload: Player) {}
}

export class ActionQuestionTimesUp {
  public readonly type = QUESTION_TIMES_UP;
  constructor(public readonly payload?: void) {}
}

export class ActionSetAnswer {
  public readonly type = SET_ANSWER;
  constructor(public readonly payload: AnswerResponse) {}
}

export class ActionSetQuestionsList {
  public readonly type = SET_QUESTIONS;
  constructor(public readonly payload: readonly Question[]) {}
}

type Action = ActionStartGame | ActionSetAnswer | ActionQuestionTimesUp | ActionSetQuestionsList;

export default Action;
