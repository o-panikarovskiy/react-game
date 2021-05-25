import React from 'react';
import CountdownComponent from '../countdown/index';
import './style.scss';

type Props = {
  countdown: number;
  totalScore: number;
  health: number;
  countdownExpire: () => void;
};

const StatusComponent = ({ countdownExpire, countdown, totalScore, health }: Props) => {
  return (
    <div className='status'>
      <span>Score: ${totalScore}</span>
      <span>Health: ♥️{health}</span>
      <span>
        Timer: <CountdownComponent seconds={countdown} expire={countdownExpire} />
      </span>
    </div>
  );
};

export default StatusComponent;
