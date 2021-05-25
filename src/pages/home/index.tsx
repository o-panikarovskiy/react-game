import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';
import './style.scss';

const Home = () => {
  const {
    state: { gameStatus, totalScore },
    dispatch,
  } = useContext(GameContext);

  let reward: React.ReactNode;
  if (gameStatus === 'finished') {
    reward = (
      <>
        <h1 className='score'>Total Score: ${totalScore}</h1>
      </>
    );
  }

  return (
    <section className='home'>
      {reward}
      <button className='start-btn' onClick={() => store.startGame(dispatch)}>
        {gameStatus === 'finished' ? 'Try Again' : 'Start'}
      </button>
    </section>
  );
};

export default Home;
