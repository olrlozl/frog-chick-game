import { BUTTON_INFO } from 'constants/button';
import UserCard, { UserCardButton } from './UserCard';
import { useFriendActions } from 'hooks/friend/useFriendActions';

interface SentUserCardProps {
  nickname: string;
  isSent: boolean;
}

const SentUserCard = ({ nickname, isSent }: SentUserCardProps) => {
  const {
    executeApplyFriend,
    isApplyFriendLoading,
    executeCancelApplyFriend,
    isCancelApplyFriendLoading,
  } = useFriendActions();

  const buttons: UserCardButton[] = isSent
    ? [
        {
          label: BUTTON_INFO.cancelApply.label,
          color: BUTTON_INFO.cancelApply.color,
          onClick: () => executeCancelApplyFriend?.({ nickname }),
          disabled: isCancelApplyFriendLoading,
        },
      ]
    : [
        {
          label: BUTTON_INFO.apply.label,
          color: BUTTON_INFO.apply.color,
          onClick: () => executeApplyFriend?.({ nickname }),
          disabled: isApplyFriendLoading,
        },
      ];

  return <UserCard nickname={nickname} buttons={buttons} />;
};

export default SentUserCard;
