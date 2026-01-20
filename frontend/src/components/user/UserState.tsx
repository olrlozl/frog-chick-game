import 'styles/components/user/user-state.scss';
import { UserStateType } from 'types/user';

interface UserStateProps {
  state: UserStateType;
}

const STATE_LABELS: Record<UserStateType, string> = {
  online: '접속중',
  offline: '비접속',
  playing: '게임중',
};

const UserState = ({ state }: UserStateProps) => {
  return (
    <div className="user-state">
      <div className={`circle ${state}`}></div>
      <span>{STATE_LABELS[state]}</span>
    </div>
  );
};

export default UserState;
