import 'styles/components/user/user-info.scss';

interface UserInfoProps {
  option: 'search' | 'list';
  nickname: string;
  win: number;
  lose: number;
}

const UserInfo = ({option, nickname, win, lose}: UserInfoProps) => {
  return (
    <div className='user-info'>
      <span className={`nickname ${option}`}>{nickname}</span>
      <div className={`win-lose-box ${option}`}>
        <span>{win}승</span>
        <span>{lose}패</span>
      </div>
    </div>
  )
}

export default UserInfo
