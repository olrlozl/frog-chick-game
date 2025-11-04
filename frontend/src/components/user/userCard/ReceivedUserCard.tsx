import { BUTTON_INFO } from 'constants/button';
import UserCard, { UserCardButton } from './UserCard';

interface FriendUserCardProps {
  nickname: string;
  executeAcceptFriend: (params: { from: string }) => void;
  executeRejectFriend: (params: { from: string }) => void;
  isAcceptFriendLoading: boolean;
  isRejectFriendLoading: boolean;
}

const ReceivedUserCard = ({
  nickname,
  executeAcceptFriend,
  executeRejectFriend,
  isAcceptFriendLoading,
  isRejectFriendLoading,
}: FriendUserCardProps) => {
  const buttons: UserCardButton[] = [
    {
      label: BUTTON_INFO.accept.label,
      color: BUTTON_INFO.accept.color,
      onClick: () => executeAcceptFriend({ from: nickname }),
      disabled: isAcceptFriendLoading || isRejectFriendLoading,
    },
    {
      label: BUTTON_INFO.reject.label,
      color: BUTTON_INFO.reject.color,
      onClick: () => executeRejectFriend({ from: nickname }),
      disabled: isAcceptFriendLoading || isRejectFriendLoading,
    },
  ];

  return <UserCard nickname={nickname} buttons={buttons} />;
};

export default ReceivedUserCard;
