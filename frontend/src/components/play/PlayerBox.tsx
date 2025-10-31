import 'styles/components/play/player-box.scss';
import Timer from './Timer';
import { PlayerType, CharacterOptionType } from 'types/play';
import { usePlayStore } from 'stores/playStore';
import { TURN_TIME_LIMIT } from 'constants/play';

interface PlayBoxProps {
  playerType: PlayerType;
  option: CharacterOptionType;
  nickname: string;
}

const PlayerBox = ({ playerType, option, nickname }: PlayBoxProps) => {
  const { turn, time } = usePlayStore();

  const progressBarWidth = (time / TURN_TIME_LIMIT) * 100;

  return (
    <div className={`player-box ${playerType} ${option}`}>
      {playerType === turn ? (
        <Timer playerType={playerType} progressBarWidth={progressBarWidth} />
      ) : (
        <Timer playerType={playerType} progressBarWidth={0} />
      )}

      <div className="player-info-container">
        <div className="player-info">
          <p className="nickname">{nickname}</p>
          {/* <div className={`player-type ${option}`}>나</div> */}
        </div>
        {playerType === turn && <div className="timer-text">{time}</div>}
      </div>
    </div>
  );
};

export default PlayerBox;
