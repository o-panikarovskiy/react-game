import React from 'react';
import { Player } from '../../store/models';
import CountdownComponent from '../countdown/countdown';
import './style.scss';

type Props = {
  player: Player;
  stopTimer: boolean;
  countdown: number;
  countdownExpire: () => void;
};

const StatusComponent = ({ countdownExpire, countdown, player, stopTimer }: Props) => {
  return (
    <ul className="status">
      <li>Score: ${player.score}</li>
      <li>Health: ♥️{player.health}</li>
      {!stopTimer && (
        <li>
          Timer: <CountdownComponent seconds={countdown} expire={countdownExpire} />
        </li>
      )}
    </ul>
  );
};

export default StatusComponent;
