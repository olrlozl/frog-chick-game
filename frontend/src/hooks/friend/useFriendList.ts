import { useQuery } from '@tanstack/react-query';
import { getFriendList } from 'api/friendApi';
import { queryClient } from 'api/queryClient';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useEffect } from 'react';
import { useErrorStore } from 'stores/errorStore';

export const useFriendList = () => {
  const { setErrorMessage } = useErrorStore();

  const { data, refetch, isFetching, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.friend],
    queryFn: getFriendList,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!isError || !(error instanceof AxiosError)) {
      return;
    }
    const errorType = error.response?.data.errorType;

    // axiosInstance에서 처리한 에러를 중복 처리하지 않기 위해
    if (
      errorType === 'EXPIRED_JWT_TOKEN' ||
      errorType === 'MISSING_JWT_ACCESS_TOKEN'
    ) {
      return;
    }

    queryClient.removeQueries({ queryKey: [QUERY_KEYS.friend] });
    setErrorMessage('GET_FRIEND', errorType);
  }, [isError, error]);

  return {
    data,
    refetch,
    isFetching,
    isError,
    error,
  };
};
