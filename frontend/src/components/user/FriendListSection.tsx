import 'styles/components/user/friend-list-section.scss';
import { ErrorMessage } from 'components/common/Modal/ErrorMessage';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';
import { useFriendList } from 'hooks/friend/useFriendList';
import FriendUserCard from './userCard/FriendUserCard';
import emptyImage from 'assets/images/empty-friends.png';
import ReceivedUserCard from './userCard/ReceivedUserCard';
import SentUserCard from './userCard/SentUserCard';

const FriendListSection = () => {
  const { data, isFetching, isError } = useFriendList();

  const receivedRequests = data?.friendRequests?.received ?? [];
  const sentRequests = data?.friendRequests?.sent ?? [];
  const friends = data?.friends ?? [];

  return (
    <div className="friend-list-section">
      {isFetching && <LocalLoadingSpinner />}

      {isError && <ErrorMessage errorMessage="오류가 발생했습니다." />}

      {!isFetching && !isError && data && (
        <>
          {!!receivedRequests.length && (
            <div className="friendRequests-container">
              {receivedRequests.map((friend, idx) => (
                <ReceivedUserCard
                  key={`req-${idx}`}
                  nickname={friend.nickname}
                />
              ))}
            </div>
          )}

          {!!sentRequests.length && (
            <div className="friendRequests-container">
              {sentRequests.map((friend, idx) => (
                <SentUserCard
                  key={`req-${idx}`}
                  nickname={friend.nickname}
                  isSent={true}
                />
              ))}
            </div>
          )}

          {!friends.length && (
            <div className="empty-container">
              <img className="empty-image" src={emptyImage} alt="empty" />
              <p className="empty-message">
                아직 친구가 없어요 <br />
                함께 게임할 친구를 추가하세요!
              </p>
            </div>
          )}

          {!!friends.length && (
            <div className="friends-container">
              {friends.map((friend, idx) => (
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
