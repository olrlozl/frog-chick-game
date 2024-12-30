import 'styles/components/play/player-info.scss';

interface PlayerInfoProps {
  nickname: string;
  wins: number;
  losses: number;
  option: 'frog' | 'chick';
  playerType: 'me' | 'opponent';
}

const PlayerInfo = ({
  nickname,
  wins,
  losses,
  option,
  playerType,
}: PlayerInfoProps) => (
  <div className="player-info">
    <p className="nickname">{nickname}</p>
    <p className={`record ${option}`}>
      {wins}승 {losses}패
    </p>
    <div className={`player-type ${option}`}>
      {playerType === 'me' ? '나' : '상대'}
    </div>
  </div>
);

export default PlayerInfo;
