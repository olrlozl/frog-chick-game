import { useQuery } from '@tanstack/react-query';
import { getRankList } from 'api/rankApi';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useEffect } from 'react';
import { useErrorStore } from 'stores/errorStore';

export const useRank = () => {
  const { setErrorMessage } = useErrorStore();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.rank],
    queryFn: getRankList,
    staleTime: 1000 * 60 * 30,
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
    setErrorMessage('GET_RANKS', errorType);
  }, [isError, error]);

  return {
    data,
    isFetching,
  };
};
