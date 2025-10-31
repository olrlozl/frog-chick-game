import 'styles/components/user/friend-request-section.scss';
import MiniButton from 'components/common/Button/MiniButton';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';
import { useRequestFriend } from 'hooks/friend/useRequestFriend';
import ContentTitle from 'components/user/ContentTitle';

const FriendRequestSection = () => {
  const {
    data,
    refetch,
    isFetching,
    executeAcceptFriend,
    isAcceptFriendLoading,
    executeRejectFriend,
    isRejectFriendLoading,
  } = useRequestFriend();

  return (
    <div className="friend-request-section">
      <ContentTitle title="받은 요청" showRefresh={true} onClick={refetch} />
      <div className="request-box">
        {isFetching && <LocalLoadingSpinner />}
        {!isFetching &&
          data &&
          data.receivedList.map((friend, idx) => (
            <div className="request-item" key={idx}>
              <span className="nickname">{friend.nickname}</span>
              <div className="button-box">
                <MiniButton
                  type="accept"
                  onClick={() => executeAcceptFriend({ from: friend.nickname })}
                  isLoading={isAcceptFriendLoading || isRejectFriendLoading}
                />
                <MiniButton
                  type="reject"
                  onClick={() => executeRejectFriend({ from: friend.nickname })}
                  isLoading={isAcceptFriendLoading || isRejectFriendLoading}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendRequestSection;
