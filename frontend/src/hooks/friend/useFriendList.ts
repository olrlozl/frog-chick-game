import { useQuery } from '@tanstack/react-query';
import { getFriendList } from 'api/friendApi';
import { QUERY_KEYS } from 'constants/reactQueryKeys';

export const useFriendList = () => {
  const { data, refetch, isFetching, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.friend],
    queryFn: getFriendList,
  });

  return {
    data,
    refetch,
    isFetching,
    isError,
    error,
  };
};
