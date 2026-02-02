import { BUTTON_INFO } from 'constants/button';
import UserCard, { UserCardButton } from './UserCard';
import { useFriendActions } from 'hooks/friend/useFriendActions';

interface FriendUserCardProps {
  nickname: string;
}

const ReceivedUserCard = ({ nickname }: FriendUserCardProps) => {
  const {
    executeAcceptFriend,
    isAcceptFriendLoading,
    executeRejectFriend,
    isRejectFriendLoading,
  } = useFriendActions();

  const buttons: UserCardButton[] = [
    {
      label: BUTTON_INFO.accept.label,
      color: BUTTON_INFO.accept.color,
      onClick: () => executeAcceptFriend({ nickname }),
      disabled: isAcceptFriendLoading || isRejectFriendLoading,
    },
    {
      label: BUTTON_INFO.reject.label,
      color: BUTTON_INFO.reject.color,
      onClick: () => executeRejectFriend({ nickname }),
      disabled: isAcceptFriendLoading || isRejectFriendLoading,
    },
  ];

  return <UserCard nickname={nickname} buttons={buttons} />;
};

export default ReceivedUserCard;
