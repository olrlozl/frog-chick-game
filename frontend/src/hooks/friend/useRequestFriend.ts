import { useQuery } from '@tanstack/react-query';
import { getReceivedFriendList, acceptFriend } from 'api/friendApi';
import { queryClient } from 'api/queryClient';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useEffect } from 'react';
import { useErrorStore } from 'stores/errorStore';

export const useRequestFriend = () => {
  const { setErrorMessage } = useErrorStore();

  const { data, refetch, isFetching, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.friends, 'receipts'],
    queryFn: getReceivedFriendList,
  });

  useEffect(() => {
    if (!isError || !(error instanceof AxiosError)) {
      return;
    }
    const errorType = error.response?.data.errorType;
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.friends, 'receipts'] });
    setErrorMessage('GET_FRIEND_RECEIPTS', errorType);
  }, [isError, error]);

  return {
    data,
    refetch,
    isFetching,
    isError,
    error,
  };
};
