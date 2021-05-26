import React, { useContext, useState } from 'react';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';

const StartScreen = () => {
  const { dispatch, state } = useContext(GameContext);
  const [username, setUsername] = useState(state.player?.name || '');

  const startGame = () => {
    if (username) {
      store.startGame(dispatch, username);
    }
  };

  return (
    <section className='home'>
      <input
        className='username'
        type='text'
        placeholder='Enter your name'
        onKeyUp={(e) => e.key === 'Enter' && startGame()}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className='start-btn' disabled={!username} onClick={startGame}>
        Start
      </button>
    </section>
  );
};

export default StartScreen;
