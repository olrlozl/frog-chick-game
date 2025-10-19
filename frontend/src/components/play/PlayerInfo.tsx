import 'styles/components/play/player-info.scss';
import { CharacterOptionType } from 'types/play';

interface PlayerInfoProps {
  nickname: string;
  option: CharacterOptionType;
  me: boolean;
}

const PlayerInfo = ({ nickname, option, me }: PlayerInfoProps) => (
  <div className="player-info">
    <p className="nickname">{nickname}</p>
    {/* <div className={`player-type ${option}`}>{me ? '나' : '상대'}</div> */}
  </div>
);

export default PlayerInfo;
