import React, { createContext, useReducer } from 'react';
import Action from './actions';
import { GameState } from './models';
import { initialState, reducer } from './reducer';

type Props = {
  children?: React.ReactNode;
};

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<Action>;
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => void 0,
});

export const Store = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};
