import { useMutation, useQuery } from '@tanstack/react-query';
import { acceptFriend, getFriendList, rejectFriend } from 'api/friendApi';
import { queryClient } from 'api/queryClient';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useEffect } from 'react';
import { useErrorStore } from 'stores/errorStore';

export const useFriendManager = () => {
  const { setErrorMessage } = useErrorStore();

  const { data, refetch, isFetching, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.friends],
    queryFn: getFriendList,
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

    queryClient.removeQueries({ queryKey: [QUERY_KEYS.friends] });
    setErrorMessage('GET_FRIEND', errorType);
  }, [isError, error]);

  const { mutate: executeAcceptFriend, isPending: isAcceptFriendLoading } =
    useMutation({
      mutationFn: acceptFriend,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.friends],
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.data.errorType) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.friends],
          });
          setErrorMessage('ACCEPT_FRIEND', err.response?.data.errorType);
        }
      },
    });

  const { mutate: executeRejectFriend, isPending: isRejectFriendLoading } =
    useMutation({
      mutationFn: rejectFriend,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.friends],
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.data.errorType) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.friends],
          });
          setErrorMessage('REJECT_FRIEND', err.response?.data.errorType);
        }
      },
    });

  return {
    data,
    refetch,
    isFetching,
    isError,
    error,
    executeAcceptFriend,
    isAcceptFriendLoading,
    executeRejectFriend,
    isRejectFriendLoading,
  };
};
