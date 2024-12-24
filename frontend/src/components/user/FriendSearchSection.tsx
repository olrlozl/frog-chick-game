import MiniButton from 'components/common/Button/MiniButton';
import 'styles/components/user/friend-search-section.scss';
import NicknameInput from 'components/user/NicknameInput';
import BalloonTitle from 'components/user/BalloonTitle';
import UserInfo from 'components/user/UserInfo';

const FriendSearchSection = () => {
  return (
    <div className="friend-search-section">
      <BalloonTitle title="친구 검색" />
      <div className="friend-search-box">
        <NicknameInput text="닉네임을 입력해주세요." />
        <MiniButton option="search" />
      </div>
      <div className='result-box'>
        <UserInfo option='search' nickname='은지여섯글자' win={10} lose={3}/>
        <MiniButton option='add'/>
      </div>
    </div>
  );
};

export default FriendSearchSection;
