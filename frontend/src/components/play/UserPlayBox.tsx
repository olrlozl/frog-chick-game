import LongButton from 'components/common/Button/LongButton';
import { useState, useEffect } from 'react';
import 'styles/components/play/user-play-box.scss';
import PlayerInfo from './PlayerInfo';

interface UserPlayBoxProps {
  playerType: 'me' | 'opponent';
  option: 'frog' | 'chick';
  userInfo: {
    nickname: string;
    wins: number;
    losses: number;
  };
  isMyTurn: boolean;
}

const UserPlayBox = ({
  playerType,
  option,
  userInfo,
  isMyTurn,
}: UserPlayBoxProps) => {
  const { nickname, wins, losses } = userInfo;

  const [remainingTime, setRemainingTime] = useState(10);

  const progressBarWidth = (remainingTime / 10) * 100;

  const hadleGiveup = () => {
    console.log('기권');
  };

  useEffect(() => {
    if (remainingTime > 0 && isMyTurn) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime, isMyTurn]);

  return (
    <div className={`user-play-box ${playerType} ${option}`}>
      {playerType == 'me' && (
        <div className="timer-container">
          <div
            className="timer-bar"
            style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>
      )}

      <div className="player-info-container">
        <PlayerInfo
          nickname={nickname}
          wins={wins}
          losses={losses}
          option={option}
          playerType={playerType}
        />
        {isMyTurn && <div className="timer-text">{remainingTime}</div>}
      </div>

      {playerType === 'me' && (
        <LongButton option={option} onClick={hadleGiveup} />
      )}

      {playerType == 'opponent' && (
        <div className="timer-container">
          {isMyTurn && (
            <div
              className="timer-bar"
              style={{ width: `${progressBarWidth}%` }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPlayBox;
