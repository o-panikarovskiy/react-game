import Ratings from 'pages/home/ratings';
import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import './style.scss';

const EndScreen = () => {
  const { startGame, state } = useContext(GameContext);
  const { player } = state;

  return (
    <section className="home">
      <h1 className="score">Total Score: ${player.score}</h1>
      <Ratings />
      <button className="start-btn" onClick={() => startGame(player.name)}>
        Try Again
      </button>
    </section>
  );
};
export default EndScreen;
