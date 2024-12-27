import 'styles/components/user/user-state.scss';

interface UserStateProps {
  state: 'playing' | 'offline' | 'online';
}

const UserState = ({state}: UserStateProps) => {
  return (
    <div className='user-state'>
      <div className={`circle ${state}`}></div>
      <span>{state === 'offline' ? '비접속' : '게임중'}</span>
    </div>
  )
}

export default UserState