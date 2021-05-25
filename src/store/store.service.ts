import React from 'react';
import Action, {
  ActionQuestionTimesUp,
  ActionReqQuestionsList,
  ActionReqQuestionsListError,
  ActionReqQuestionsListSuccess,
  ActionSetAnswer,
  ActionStartGame,
} from './actions';
import * as backend from './backend.service';
import { Answer } from './models';

export const startGame = (dispatch: React.Dispatch<Action>): void => {
  dispatch(new ActionStartGame());
};

export const fetchQuestions = async (dispatch: React.Dispatch<Action>, signal?: AbortSignal) => {
  try {
    dispatch(new ActionReqQuestionsList());
    const questions = await backend.getAll(signal);
    dispatch(new ActionReqQuestionsListSuccess(questions));
    return questions;
  } catch (error) {
    if (error.name !== 'AbortError') {
      dispatch(new ActionReqQuestionsListError(error));
      throw error;
    }
  }
};

export const setAnswer = async (dispatch: React.Dispatch<Action>, answer: Answer) => {
  dispatch(new ActionSetAnswer(answer));
};

export const answerTimesUp = async (dispatch: React.Dispatch<Action>) => {
  dispatch(new ActionQuestionTimesUp());
};
