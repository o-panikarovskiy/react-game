import Ratings from 'pages/home/ratings';
import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';
import './style.scss';

const EndScreen = () => {
  const { dispatch, state } = useContext(GameContext);
  const { player } = state;

  return (
    <section className='home'>
      <h1 className='score'>Total Score: ${player.score}</h1>
      <Ratings />
      <button className='start-btn' onClick={() => store.startGame(dispatch, player.name)}>
        Try Again
      </button>
    </section>
  );
};
export default EndScreen;
