import React from 'react';
import { Store } from '../store/context';
import GameWrap from './wrap/index';

const App = () => {
  return (
    <Store>
      <GameWrap />
    </Store>
  );
};

export default App;
