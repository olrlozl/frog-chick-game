import 'styles/components/user/user-info.scss';
import WinLoseBox from './WinLoseBox';
import { UserInfoInterface } from 'types/user';

interface UserInfoProps {
  option: 'search' | 'list';
  userInfo: UserInfoInterface;
}

const UserInfo = ({option, userInfo}: UserInfoProps) => {
  const {nickname, wins, losses} = userInfo;
  let color = option === 'search' ? 'main-green' : 'main-yellow';
  return (
    <div className='user-info'>
      <span className={`nickname ${option}`}>{nickname}</span>
      <WinLoseBox wins={wins} losses={losses} color={color} size='font-md'/>
    </div>
  )
}

export default UserInfo
