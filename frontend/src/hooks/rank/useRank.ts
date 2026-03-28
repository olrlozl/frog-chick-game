import { useQuery } from '@tanstack/react-query';
import { getRankList } from 'api/rankApi';
import { QUERY_KEYS } from 'constants/reactQueryKeys';

export const useRank = () => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.rank],
    queryFn: getRankList,
    staleTime: 1000 * 60 * 30,
  });

  return {
    data,
    isFetching,
  };
};
