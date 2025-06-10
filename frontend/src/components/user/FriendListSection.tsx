import 'styles/components/user/friend-list-section.scss';
import BalloonTitle from 'components/user/BalloonTitle';
import UserInfo from 'components/user/UserInfo';
import MiniButton from 'components/common/Button/MiniButton';
import UserState from 'components/user/UserState';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { getFriendList } from 'api/friendApi';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useErrorStore } from 'stores/errorStore';
import { errorHandle } from 'utils/error';
import { ErrorMessage } from 'components/common/Modal/ErrorMessage';
import { queryClient } from 'api/queryClient';
import { LocalLoadingSpinner } from 'components/common/LocalLoadingSpinner';

const FriendListSection = () => {
  const [requestErrorMessage, setRequestErrorMessage] = useState('');

  const { setErrorMessage } = useErrorStore();

  const { data, refetch, isFetching, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.friends, 'myFriends'],
    queryFn: getFriendList,
  });

  useEffect(() => {
    if (!isError || !(error instanceof AxiosError)) {
      return;
    }
    const errorType = error.response?.data.errorType;

    if (errorType === 'INVALID_USERID') {
      setErrorMessage('GET_FRIEND', errorType);
      // 에러 발생 시 캐싱된 데이터를 삭제하고, 에러메세지 출력
    } else {
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.friends, 'myFriends'],
      });
      errorHandle(error, setRequestErrorMessage, 'GET_FRIEND');
    }
  }, [isError, error, setErrorMessage]);

  return (
    <div className="friend-list-section">
      <BalloonTitle title="친구 목록" showRefresh={true} onClick={refetch} />
      <div className="list-box">
        {isFetching && <LocalLoadingSpinner />}
        {!isFetching &&
          data &&
          data.friendList.map((user, idx) => {
            return (
              <div className="user-item" key={idx}>
                <UserInfo userInfoOption="list" userInfo={user.userInfo} />
                {user.state === 'online' ? (
                  <MiniButton type="game" />
                ) : (
                  <UserState state={user.state} />
                )}
              </div>
            );
          })}
        {isError && <ErrorMessage errorMessage={requestErrorMessage} />}
      </div>
    </div>
  );
};

export default FriendListSection;
