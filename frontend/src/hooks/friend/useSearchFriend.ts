import { useQuery } from '@tanstack/react-query';
import { searchFriend } from 'api/friendApi';
import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from 'constants/errorMessages';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useEffect, useState } from 'react';
import { SetState } from 'types/common';
import { validateNickname } from 'utils/validate';

export const useSearchFriend = (
  nickname: string,
  setNicknameErrorMessage: SetState<string>
) => {
  const [searchedNickname, setSearchedNickname] = useState('');

  const validateInputedNickname = () => {
    setNicknameErrorMessage('');

    if (!nickname) return;

    const isValidNickname = validateNickname(nickname);

    if (!isValidNickname) {
      setNicknameErrorMessage(ERROR_MESSAGES.SEARCH_FRIEND.NOT_FOUND_USER);
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
  });

  const resetSearchedNickname = () => {
    setSearchedNickname('');
  };

  useEffect(() => {
    if (!nickname) {
      setSearchedNickname('');
      setNicknameErrorMessage('');
    }
  }, [nickname, setNicknameErrorMessage]);

  useEffect(() => {
    if (
      !isSearchFriendError ||
      !(searchFriendError instanceof AxiosError) ||
      !searchFriendError.response?.data.errorType
    ) {
      return;
    }

    const errorType = searchFriendError.response.data.errorType;
    console.log('errorType: ', errorType);

    if (errorType === 'NOT_FOUND_USER' && searchedNickname) {
      setSearchedNickname(''); // enabled=false -> 이전 이전 성공 데이터 노출 끊기
    }
    setNicknameErrorMessage(ERROR_MESSAGES.SEARCH_FRIEND[errorType]);
  }, [
    isSearchFriendError,
    searchFriendError,
    searchedNickname,
    setNicknameErrorMessage,
  ]);

  return {
    validateInputedNickname,
    userInfo,
    searchFriendFetching,
    resetSearchedNickname,
  };
};
