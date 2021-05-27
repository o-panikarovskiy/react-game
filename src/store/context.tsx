import React, { createContext, ReactNode, useCallback, useReducer } from 'react';
import backend from 'store/backend.service';
import { ActionNextQuestion, ActionQuestionTimesUp, ActionSetAnswer, ActionSetQuestionsList, ActionStartGame } from './actions';
import { Answer, AnswerResponse, GameState, Player, Question } from './models';
import { initialState, reducer } from './reducer';

type Props = {
  children?: ReactNode;
};

type GameContextProvider = {
  state: GameState;
  answerTimesUp: (signal?: AbortSignal) => Promise<void>;
  getRatings: (top?: number, signal?: AbortSignal) => Promise<readonly Player[]>;
  startGame: (name: string, signal?: AbortSignal) => Promise<Player>;
  fetchQuestions: (signal?: AbortSignal) => Promise<readonly Question[]>;
  sendAnswerToServer: (p: Player, q: Question, a: Answer, signal?: AbortSignal) => Promise<AnswerResponse>;
  nextQuestion: () => void;
};

export const GameContext = createContext<GameContextProvider>({} as GameContextProvider);

export const Store = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = useCallback(async (name: string, signal?: AbortSignal): Promise<Player> => {
    const player = await backend.getOrCreatePlayer(name, signal);
    dispatch(new ActionStartGame(player));
    return player;
  }, []);

  const answerTimesUp = useCallback(async (signal?: AbortSignal): Promise<void> => {
    dispatch(new ActionQuestionTimesUp());
  }, []);

  const getRatings = useCallback(async (top = 5, signal?: AbortSignal): Promise<readonly Player[]> => {
    return backend.getRatings(top, signal);
  }, []);

  const fetchQuestions = useCallback(async (signal?: AbortSignal): Promise<readonly Question[]> => {
    const questions = await backend.getAllQuestions(signal);
    dispatch(new ActionSetQuestionsList(questions));
    return questions;
  }, []);

  const sendAnswerToServer = useCallback(async (p: Player, q: Question, a: Answer, signal?: AbortSignal): Promise<AnswerResponse> => {
    const res = await backend.setAnswer(p, q, a, signal);
    dispatch(new ActionSetAnswer(res));
    return res;
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch(new ActionNextQuestion());
  }, []);

  const provider: GameContextProvider = {
    state,
    startGame,
    sendAnswerToServer,
    getRatings,
    answerTimesUp,
    fetchQuestions,
    nextQuestion,
  };

  return <GameContext.Provider value={provider}>{children}</GameContext.Provider>;
};
