import 'styles/components/user/friend-request-section.scss';
import BalloonTitle from 'components/user/BalloonTitle';
import MiniButton from 'components/common/Button/MiniButton';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';
import { useRequestFriend } from 'hooks/friend/useRequestFriend';

const FriendRequestSection = () => {
  const { data, refetch, isFetching } = useRequestFriend();

  return (
    <div className="friend-request-section">
      <BalloonTitle title="받은 요청" showRefresh={true} onClick={refetch} />
      <div className="request-box">
        {isFetching && <LocalLoadingSpinner />}
        {!isFetching &&
          data &&
          data.receivedList.map((friend, idx) => (
            <div className="request-item" key={idx}>
              <span className="nickname">{friend.nickname}</span>
              <div className="button-box">
                <MiniButton type="accept" />
                <MiniButton type="reject" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendRequestSection;
