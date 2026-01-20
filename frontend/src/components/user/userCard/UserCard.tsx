import 'styles/components/user/user-card.scss';
import BasicButton from 'components/common/Button/BasicButton';
import UserState from 'components/user/UserState';
import { UserStateType } from 'types/user';
import { ButtonColor } from 'constants/button';

export interface UserCardButton {
  label: string;
  onClick: () => void;
  color: ButtonColor;
  disabled?: boolean;
}

interface UserCardProps {
  nickname: string;
  state?: UserStateType;
  buttons: UserCardButton[];
}

const UserCard = ({ nickname, state, buttons = [] }: UserCardProps) => {
  return (
    <div className="user-card">
      <span className="nickname">{nickname}</span>
      <div className="buttons">
        {state && <UserState state={state} />}
        {buttons.map((btn, idx) => (
          <BasicButton
            key={idx}
            type="mini"
            label={btn.label}
            onClick={btn.onClick}
            color={btn.color}
            disabled={btn.disabled}
          />
        ))}
      </div>
    </div>
  );
};
export default UserCard;
