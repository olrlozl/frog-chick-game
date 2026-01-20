import { BUTTON_INFO } from 'constants/button';
import { UserStateType } from 'types/user';
import UserCard, { UserCardButton } from './UserCard';

interface FriendUserCardProps {
  nickname: string;
  state: UserStateType;
  onInvite?: () => void;
  onDelete?: () => void;
}

const FriendUserCard = ({
  nickname,
  state,
  onInvite,
  onDelete,
}: FriendUserCardProps) => {
  const buttons: UserCardButton[] = [
    {
      label: BUTTON_INFO.invite.label,
      color: BUTTON_INFO.invite.color,
      onClick: onInvite || (() => {}),
    },
    {
      label: BUTTON_INFO.delete.label,
      color: BUTTON_INFO.delete.color,
      onClick: onDelete || (() => {}),
    },
  ];

  return <UserCard nickname={nickname} state={state} buttons={buttons} />;
};

export default FriendUserCard;
