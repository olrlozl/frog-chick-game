import LongButton from 'components/common/Button/LongButton';
import 'styles/components/play/user-play-box.scss';
import PlayerInfo from './PlayerInfo';
import Timer from './Timer';
import { PlayerType, CharacterOptionType } from 'types/play';
import { usePlayStore } from 'stores/playStore';

interface UserPlayBoxProps {
  playerType: PlayerType;
  option: CharacterOptionType;
  nickname: string;
}

const UserPlayBox = ({ playerType, option, nickname }: UserPlayBoxProps) => {
  const { turn, time } = usePlayStore();

  const progressBarWidth = (time / 10) * 100;

  const handleGiveup = () => {
    console.log('기권');
  };

  return (
    <div className={`user-play-box ${playerType} ${option}`}>
      {playerType === turn ? (
        <Timer playerType={playerType} progressBarWidth={progressBarWidth} />
      ) : (
        <Timer playerType={playerType} progressBarWidth={0} />
      )}

      <div className="player-info-container">
        <PlayerInfo nickname={nickname} option={option} me={false} />
        {playerType === turn && <div className="timer-text">{time}</div>}
      </div>

      {playerType === 'player2' && (
        <LongButton option={option} onClick={handleGiveup} />
      )}
    </div>
  );
};

export default UserPlayBox;
