import 'styles/components/play/timer.scss';

interface TimerProps {
  playerType: 'me' | 'opponent';
  turn: 'me' | 'opponent';
  progressBarWidth: number;
}

const Timer = ({ playerType, turn, progressBarWidth }: TimerProps) => {
  return (
    <div className="timer">
      {playerType === turn && (
        <div
          className="progress-bar"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      )}
    </div>
  );
};

export default Timer;
