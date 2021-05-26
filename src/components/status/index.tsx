import React from 'react';
import { Player } from '../../store/models';
import CountdownComponent from '../countdown/index';
import './style.scss';

type Props = {
  countdown: number;
  player: Player;
  countdownExpire: () => void;
};

const StatusComponent = ({ countdownExpire, countdown, player }: Props) => {
  return (
    <div className='status'>
      <span>Score: ${player.score}</span>
      <span>Health: ♥️{player.health}</span>
      <span>
        Timer: <CountdownComponent seconds={countdown} expire={countdownExpire} />
      </span>
    </div>
  );
};

export default StatusComponent;
