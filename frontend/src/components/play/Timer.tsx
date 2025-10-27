import 'styles/components/play/timer.scss';
import { PlayerType } from 'types/play';

interface TimerProps {
  playerType: PlayerType;
  progressBarWidth: number;
}

const Timer = ({ playerType, progressBarWidth }: TimerProps) => {
  return (
    <div className={`timer ${playerType}`}>
      <div
        className="progress-bar"
        style={{ width: `${progressBarWidth}%` }}
      ></div>
    </div>
  );
};

export default Timer;
