import LongButton from 'components/common/Button/LongButton';
import { useState, useEffect } from 'react';
import 'styles/components/play/user-play-box.scss';
import PlayerInfo from './PlayerInfo';
import Timer from './Timer';

interface UserPlayBoxProps {
  playerType: 'me' | 'opponent';
  option: 'frog' | 'chick';
  userInfo: {
    nickname: string;
    wins: number;
    losses: number;
  };
  turn: 'me' | 'opponent';
}

const UserPlayBox = ({
  playerType,
  option,
  userInfo,
  turn,
}: UserPlayBoxProps) => {
  const { nickname, wins, losses } = userInfo;

  const [remainingTime, setRemainingTime] = useState(10);

  const progressBarWidth = (remainingTime / 10) * 100;

  const handleGiveup = () => {
    console.log('기권');
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  return (
    <div className={`user-play-box ${playerType} ${option}`}>
      <Timer
        playerType={playerType}
        turn={turn}
        progressBarWidth={progressBarWidth}
      />

      <div className="player-info-container">
        <PlayerInfo
          nickname={nickname}
          wins={wins}
          losses={losses}
          option={option}
          playerType={playerType}
        />
        {((playerType == 'me' && turn == 'me') ||
          (playerType == 'opponent' && turn == 'opponent')) && (
          <div className="timer-text">{remainingTime}</div>
        )}
      </div>

      {playerType === 'me' && (
        <LongButton option={option} onClick={handleGiveup} />
      )}
    </div>
  );
};

export default UserPlayBox;
