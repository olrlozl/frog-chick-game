import { useQuery } from '@tanstack/react-query';
import { searchFriend } from 'api/friendApi';
import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from 'constants/errorMessages';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useEffect, useState } from 'react';
import { useErrorStore } from 'stores/errorStore';
import { SetState } from 'types/common';
import { errorHandle } from 'utils/error';
import { validateNickname } from 'utils/validate';

const MAX_RETRIES = 3;

export const useSearchFriend = (
  nickname: string,
  setNicknameErrorMessage: SetState<string>
) => {
  const { setErrorMessage } = useErrorStore();
  const [searchedNickname, setSearchedNickname] = useState('');

  const validateInputedNickname = () => {
    setNicknameErrorMessage('');

    if (!nickname) return;

    const isValidNickname = validateNickname(nickname);

    if (!isValidNickname) {
      setNicknameErrorMessage(ERROR_MESSAGES.SEARCH_FRIEND.UNKNOWN_USER);
      setSearchedNickname('');
      return;
    }

    setSearchedNickname(nickname);
  };

  const {
    data: userInfo,
    isFetching: searchFriendFetching,
    isError: isSearchFriendError,
    error: searchFriendError,
  } = useQuery({
    queryKey: [QUERY_KEYS.friend, searchedNickname],
    queryFn: () => searchFriend({ nickname: searchedNickname }),
    enabled: !!searchedNickname,
    retry: (failureCount, err) => {
      const canRetry = failureCount < MAX_RETRIES;

      // 네트워크 오류, 서버 오류인 경우 재시도
      if (err instanceof AxiosError) {
        if (
          err.code === 'ERR_NETWORK' ||
          (err.response?.status && err.response?.status >= 500)
        )
          return canRetry;
      }

      // 그 외는 재시도 안함
      return false;
    },
  });

  const resetSearchedNickname = () => {
    setSearchedNickname('');
  };

  useEffect(() => {
    if (!nickname) {
      setSearchedNickname('');
      setNicknameErrorMessage('');
    }
  }, [nickname]);

  useEffect(() => {
    if (!isSearchFriendError || !(searchFriendError instanceof AxiosError)) {
      return;
    }
    const errorType = searchFriendError.response?.data.errorType;
    console.log('errorType: ', errorType);

    if (errorType === 'UNKNOWN_USER' && searchedNickname) {
      setSearchedNickname(''); // enabled=false -> 이전 이전 성공 데이터 노출 끊기
    }

    if (errorType === 'INVALID_USERID') {
      setErrorMessage('SEARCH_FRIEND', errorType);
    } else {
      errorHandle(searchFriendError, setNicknameErrorMessage, 'SEARCH_FRIEND');
    }
  }, [isSearchFriendError, searchFriendError]);

  return {
    validateInputedNickname,
    userInfo,
    searchFriendFetching,
    resetSearchedNickname,
  };
};
