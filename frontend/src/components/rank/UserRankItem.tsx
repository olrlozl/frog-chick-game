import 'styles/components/rank/user-rank-item.scss';
import crown from 'assets/images/crown.png';
import WinLoseBox from 'components/user/WinLoseBox';

interface UserInfo {
  nickname: string;
  wins: number;
  losses: number;
}

interface UserRankItemProps {
  rank: number;
  userInfo: UserInfo;
  myNickname: string;
  isMyRankSection: boolean;
}

const UserRankItem = ({ rank, userInfo, myNickname, isMyRankSection }: UserRankItemProps) => {
  const { nickname, wins, losses } = userInfo;
  
  let color = isMyRankSection ? 'white' : 'rank-yellow';
  let isTopRank = rank <= 3;

  return (
    <div className={`user-rank-item ${isMyRankSection && 'my-rank'}`}>
      <div className="rank-number-box">
        {isTopRank && <img src={crown} alt="상위권" />}
        <span>{rank}</span>
      </div>
      <div className="nickname-box">
        <span className="nickname">{nickname}</span>
        {myNickname === nickname && <div className="me-mark">나</div>}
      </div>
      <div className='win-lose-box'>
        <WinLoseBox wins={wins} losses={losses} color={color} size='font-xs' />
      </div>
    </div>
  );
};

export default UserRankItem;
