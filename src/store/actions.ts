import { AppError } from '../types/http-error';
import { Answer, Question } from './models';

export const START_GAME = '[Game] start';

export const QUESTION_TIMES_UP = '[Game] question times up';
export const SET_ANSWER = '[Game] set answer';

export const REQ_QUESTIONS = '[Game] req questions list';
export const REQ_QUESTIONS_SUCCESS = '[Game] req questions list success';
export const REQ_QUESTIONS_ERROR = '[Game] req questions list error';

export class ActionStartGame {
  public readonly type = START_GAME;
  constructor(public readonly payload?: void) {}
}

export class ActionQuestionTimesUp {
  public readonly type = QUESTION_TIMES_UP;
  constructor(public readonly payload?: void) {}
}

export class ActionSetAnswer {
  public readonly type = SET_ANSWER;
  constructor(public readonly payload: Answer) {}
}

export class ActionReqQuestionsList {
  public readonly type = REQ_QUESTIONS;
  constructor(public readonly payload?: void) {}
}

export class ActionReqQuestionsListSuccess {
  public readonly type = REQ_QUESTIONS_SUCCESS;
  constructor(public readonly payload: readonly Question[]) {}
}

export class ActionReqQuestionsListError {
  public readonly type = REQ_QUESTIONS_ERROR;
  constructor(public readonly payload: AppError) {}
}

type Action =
  | ActionStartGame
  | ActionSetAnswer
  | ActionQuestionTimesUp
  | ActionReqQuestionsList
  | ActionReqQuestionsListSuccess
  | ActionReqQuestionsListError;

export default Action;
