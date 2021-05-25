import React, { useContext } from 'react';
import { GameContext } from '../../store/context';
import * as store from '../../store/store.service';
import CountdownComponent from '../countdown/index';
import './style.scss';

const StatusComponent = () => {
  const {
    state: { totalScore, currentQuestion },
    dispatch,
  } = useContext(GameContext);

  if (!currentQuestion) {
    return <></>;
  }

  return (
    <div className='status'>
      <span>Score: ${totalScore}</span>
      <span>
        Timer: <CountdownComponent seconds={currentQuestion.timeout} expire={() => store.answerTimesUp(dispatch)} />
      </span>
    </div>
  );
};

export default StatusComponent;
