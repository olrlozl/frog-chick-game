import 'styles/components/play/timer.scss';

interface TimerProps {
  playerType: 'me' | 'opponent';
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
