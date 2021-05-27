import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import EndScreen from './end-screen';
import StartScreen from './start-screen';
import './style.scss';

const Home = () => {
  const { state } = useContext(GameContext);

  if (state.gameStatus === 'finished') {
    return <EndScreen />;
  }

  return <StartScreen />;
};

export default Home;
