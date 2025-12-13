import 'styles/components/user/friend-list-section.scss';
import { ErrorMessage } from 'components/common/Modal/ErrorMessage';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';
import { useFriendManager } from 'hooks/friend/useFriendManager';
import ReceivedUserCard from './userCard/ReceivedUserCard';
import FriendUserCard from './userCard/FriendUserCard';
import emptyImage from 'assets/images/empty-friends.png';

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
      {isFetching && <LocalLoadingSpinner />}

      {isError && <ErrorMessage errorMessage="오류가 발생했습니다." />}

      {!isFetching && !isError && data && (
        <>
          {!data.friendRequests?.length && !data.friends?.length && (
            <div className="empty-container">
              <img className="empty-image" src={emptyImage} alt="empty" />
              <p className="empty-message">
                아직 친구가 없어요 <br />
                함께 게임할 친구를 추가하세요!
              </p>
            </div>
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
