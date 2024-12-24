import 'styles/components/user/friend-list-section.scss';
import BalloonTitle from 'components/user/BalloonTitle';
import UserInfo from 'components/user/UserInfo';
import MiniButton from 'components/common/Button/MiniButton';
import UserState from 'components/user/UserState';

const FriendListSection = () => {
  return (
    <div className='friend-list-section'>
      <BalloonTitle title='친구 목록' />
      <div className='list-box'>
        <div className='user-item'>
          <UserInfo option='list' win={10} lose={3} nickname='은지여섯글자'/>
          <MiniButton option='game'/>
        </div>
        <div className='user-item'>
          <UserInfo option='list' win={5} lose={1} nickname='현수'/>
          <UserState state='playing'/>
        </div>
        <div className='user-item'>
          <UserInfo option='list' win={4} lose={1} nickname='에찌얌'/>
          <UserState state='offline'/>
        </div>
      </div>
    </div>
  )
}

export default FriendListSection