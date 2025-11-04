import { BUTTON_INFO } from 'constants/button';
import UserCard, { UserCardButton } from './UserCard';

interface SentUserCardProps {
  nickname: string;
  isSent: boolean;
  executeApplyFriend?: (params: { to: string }) => void;
  executeCancelApplyFriend?: (params: { to: string }) => void;
  isApplyFriendLoading?: boolean;
  isCancelApplyFriendLoading?: boolean;
}

const SentUserCard = ({
  nickname,
  isSent,
  executeApplyFriend,
  executeCancelApplyFriend,
  isApplyFriendLoading = false,
  isCancelApplyFriendLoading = false,
}: SentUserCardProps) => {
  const buttons: UserCardButton[] = isSent
    ? [
        {
          label: BUTTON_INFO.cancelApply.label,
          color: BUTTON_INFO.cancelApply.color,
          onClick: () => executeCancelApplyFriend?.({ to: nickname }),
          disabled: isCancelApplyFriendLoading,
        },
      ]
    : [
        {
          label: BUTTON_INFO.apply.label,
          color: BUTTON_INFO.apply.color,
          onClick: () => executeApplyFriend?.({ to: nickname }),
          disabled: isApplyFriendLoading,
        },
      ];

  return <UserCard nickname={nickname} buttons={buttons} />;
};

export default SentUserCard;
