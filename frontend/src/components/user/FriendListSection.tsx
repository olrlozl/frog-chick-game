import 'styles/components/user/friend-list-section.scss';
import { ErrorMessage } from 'components/common/Modal/ErrorMessage';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';
import ContentTitle from 'components/user/ContentTitle';
import { useFriendManager } from 'hooks/friend/useFriendManager';
import ReceivedUserCard from './userCard/ReceivedUserCard';
import FriendUserCard from './userCard/FriendUserCard';

const FriendListSection = () => {
  const {
    data,
    refetch,
    isFetching,
    isError,
    executeAcceptFriend,
    isAcceptFriendLoading,
    executeRejectFriend,
    isRejectFriendLoading,
  } = useFriendManager();

  return (
    <div className="friend-list-section">
      <ContentTitle title="친구 목록" showRefresh={true} onClick={refetch} />

      {isFetching && <LocalLoadingSpinner />}

      {isError && <ErrorMessage errorMessage="오류가 발생했습니다." />}

      {!isFetching && !isError && data && (
        <>
          {!data.friendRequests?.length && !data.friends?.length && (
            <p className="empty-message">친구 목록이 비었습니다.</p>
          )}

          {!!data.friendRequests?.length && (
            <div className="friendRequests-container">
              {data.friendRequests.map((friend, idx) => (
                <ReceivedUserCard
                  key={`req-${idx}`}
                  nickname={friend.nickname}
                  executeAcceptFriend={executeAcceptFriend}
                  executeRejectFriend={executeRejectFriend}
                  isAcceptFriendLoading={isAcceptFriendLoading}
                  isRejectFriendLoading={isRejectFriendLoading}
                />
              ))}
            </div>
          )}

          {!!data.friends.length && (
            <div className="friends-container">
              {data.friends.map((friend, idx) => (
                <FriendUserCard
                  key={`friend-${idx}`}
                  nickname={friend.nickname}
                  state={friend.state}
                  onInvite={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default FriendListSection;
