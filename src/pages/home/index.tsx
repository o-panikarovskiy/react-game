import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';
import './style.scss';

const Home = () => {
  const {
    dispatch,
    state: { gameStatus, player, ratings },
  } = useContext(GameContext);

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (player) {
      setUsername(player.name);
    }
  }, [player]);

  let endGameScreen: ReactNode;
  let usernameNode: ReactNode;

  if (gameStatus === 'finished' && player) {
    endGameScreen = (
      <>
        <h1 className='score'>Total Score: ${player.score}</h1>
        <table className='ratings'>
          <tbody>
            {ratings.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else {
    usernameNode = (
      <input
        className='username'
        type='text'
        placeholder='Enter your name'
        onChange={(e) => setUsername(e.target.value)}
      />
    );
  }

  return (
    <section className='home'>
      {endGameScreen}
      {usernameNode}
      <button className='start-btn' disabled={!username} onClick={() => store.startGame(dispatch, username)}>
        {gameStatus === 'finished' ? 'Try Again' : 'Start'}
      </button>
    </section>
  );
};

export default Home;
