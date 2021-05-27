import React, { useContext, useState } from 'react';
import { GameContext } from '../../store/context';

const StartScreen = () => {
  const { startGame, state } = useContext(GameContext);
  const [username, setUsername] = useState(state.player?.name || '');

  const startGameHandler = () => {
    if (username) {
      startGame(username);
    }
  };

  return (
    <section className="home">
      <input
        className="username"
        type="text"
        placeholder="Enter your name"
        onKeyUp={(e) => e.key === 'Enter' && startGameHandler()}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="start-btn" disabled={!username} onClick={startGameHandler}>
        Start
      </button>
    </section>
  );
};

export default StartScreen;
