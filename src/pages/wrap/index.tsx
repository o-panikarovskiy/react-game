import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import Game from '../game/index';
import Home from '../home/index';
import './style.scss';

const GameWrap = () => {
  const {
    state: { gameStatus },
  } = useContext(GameContext);

  const showHome = !gameStatus || gameStatus === 'finished';
  return <main className='main'>{showHome ? <Home /> : <Game />}</main>;
};

export default GameWrap;
