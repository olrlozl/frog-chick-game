import 'styles/components/user/friend-list-section.scss';
import { ErrorMessage } from 'components/common/Modal/ErrorMessage';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';
import { useFriendList } from 'hooks/friend/useFriendList';
import FriendUserCard from './userCard/FriendUserCard';
import ReceivedUserCard from './userCard/ReceivedUserCard';
import SentUserCard from './userCard/SentUserCard';
import ListToggle from './ListToggle';
import { useState } from 'react';

type SectionKey = 'received' | 'sent' | 'friends';

interface FriendListSectionProps {
  hidden?: boolean;
  onInviteFriend: (nickname: string) => void;
  onDeleteFriend: (nickname: string) => void;
}

const FriendListSection = ({
  hidden = false,
  onInviteFriend,
  onDeleteFriend,
}: FriendListSectionProps) => {
  const { data, isFetching, isError } = useFriendList();

  const receivedRequests = data?.friendRequests?.received ?? [];
  const sentRequests = data?.friendRequests?.sent ?? [];
  const friends = data?.friends ?? [];

  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    received: true,
    sent: true,
    friends: true,
  });

  const toggle = (key: SectionKey) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`friend-list-section ${hidden ? 'hidden' : ''}`}>
      {isFetching && <LocalLoadingSpinner />}

      {isError && <ErrorMessage errorMessage="오류가 발생했습니다." />}
      {!isFetching && !isError && data && (
        <>
          <ListToggle
            title="받은 친구 요청"
            count={receivedRequests.length}
            isOpen={open.received}
            onToggle={() => toggle('received')}
          >
            <div className="friendRequests-container">
              {receivedRequests.map((friend, idx) => (
                <ReceivedUserCard
                  key={friend.nickname}
                  nickname={friend.nickname}
                />
              ))}
            </div>
          </ListToggle>

          <ListToggle
            title="보낸 친구 요청"
            count={sentRequests.length}
            isOpen={open.sent}
            onToggle={() => toggle('sent')}
          >
            <div className="friendRequests-container">
              {sentRequests.map((friend, idx) => (
                <SentUserCard
                  key={friend.nickname}
                  nickname={friend.nickname}
                  isSent
                />
              ))}
            </div>
          </ListToggle>

          <ListToggle
            title="친구 목록"
            count={friends.length}
            isOpen={open.friends}
            onToggle={() => toggle('friends')}
          >
            <div className="friends-container">
              {friends.map((friend, idx) => (
                <FriendUserCard
                  key={friend.nickname}
                  nickname={friend.nickname}
                  state={friend.state}
                  onInvite={onInviteFriend}
                  onDelete={onDeleteFriend}
                />
              ))}
            </div>
          </ListToggle>
        </>
      )}
    </div>
  );
};
export default FriendListSection;
