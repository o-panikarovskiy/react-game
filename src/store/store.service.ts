import { Dispatch } from 'react';
import Action, { ActionQuestionTimesUp, ActionSetAnswer, ActionSetQuestionsList, ActionStartGame } from './actions';
import * as backend from './backend.service';
import { Answer, AnswerResponse, Player, Question } from './models';

export const startGame = async (dispatch: Dispatch<Action>, name: string): Promise<Player> => {
  const player = await backend.getOrCreatePlayer(name);
  dispatch(new ActionStartGame(player));
  return player;
};

export const fetchQuestions = async (dispatch: Dispatch<Action>): Promise<readonly Question[]> => {
  const questions = await backend.getAllQuestions();
  dispatch(new ActionSetQuestionsList(questions));
  return questions;
};

export const setAnswer = async (
  dispatch: Dispatch<Action>,
  player: Player,
  question: Question,
  answer: Answer
): Promise<AnswerResponse> => {
  const res = await backend.setAnswer(player, question, answer);
  dispatch(new ActionSetAnswer(res));
  return res;
};

export const answerTimesUp = async (dispatch: Dispatch<Action>): Promise<void> => {
  dispatch(new ActionQuestionTimesUp());
};

export const getRatings = async (): Promise<readonly Player[]> => {
  return backend.getRatings();
};
