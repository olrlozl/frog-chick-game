import 'styles/components/user/friend-list-section.scss';
import BalloonTitle from 'components/user/BalloonTitle';
import UserInfo from 'components/user/UserInfo';
import MiniButton from 'components/common/Button/MiniButton';
import UserState from 'components/user/UserState';
import { UserInfoInterface } from 'types/user';

const FriendListSection = () => {
  type userStateType = 'online' | 'offline' | 'playing';

  interface User {
    userInfo: UserInfoInterface;
    state: userStateType;
  }

  const users: User[] = [
    {
      userInfo: { nickname: '은지여섯글자', wins: 10, losses: 3 },
      state: 'online',
    },
    { userInfo: { nickname: '현수', wins: 5, losses: 1 }, state: 'playing' },
    { userInfo: { nickname: '에찌얌', wins: 4, losses: 1 }, state: 'offline' },
  ];

  return (
    <div className="friend-list-section">
      <BalloonTitle title="친구 목록" />
      <div className="list-box">
        {users.map((user) => {
          return (
            <div className="user-item">
              <UserInfo
                userInfoOption="list"
                userInfo={user.userInfo}
              />
              {user.state === 'online' ? (
                <MiniButton miniButtonOption="game" />
              ) : (
                <UserState state={user.state} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendListSection;
