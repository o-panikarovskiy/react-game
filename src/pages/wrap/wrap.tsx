import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import Game from '../game/game';
import Home from '../home/home';
import './style.scss';

const GameWrap = () => {
  const { state } = useContext(GameContext);

  const showHome = !state.gameStatus || state.gameStatus === 'finished';
  return <main className="main">{showHome ? <Home /> : <Game />}</main>;
};

export default GameWrap;
