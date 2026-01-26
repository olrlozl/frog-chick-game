import { BUTTON_INFO } from 'constants/button';
import { UserStateType } from 'types/user';
import UserCard, { UserCardButton } from './UserCard';

interface FriendUserCardProps {
  nickname: string;
  state: UserStateType;
  onInvite: (nickname: string) => void;
  onDelete: (nickname: string) => void;
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
      onClick: () => onInvite(nickname),
    },
    {
      label: BUTTON_INFO.delete.label,
      color: BUTTON_INFO.delete.color,
      onClick: () => onDelete(nickname),
    },
  ];

  return <UserCard nickname={nickname} state={state} buttons={buttons} />;
};

export default FriendUserCard;
