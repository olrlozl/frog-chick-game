import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getReceivedFriendList,
  acceptFriend,
  rejectFriend,
} from 'api/friendApi';
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

    // axiosInstance에서 처리한 에러를 중복 처리하지 않기 위해
    if (
      errorType === 'EXPIRED_JWT_TOKEN' ||
      errorType === 'MISSING_JWT_ACCESS_TOKEN'
    ) {
      return;
    }

    queryClient.removeQueries({ queryKey: [QUERY_KEYS.friends, 'receipts'] });
    setErrorMessage('GET_FRIEND_RECEIPTS', errorType);
  }, [isError, error]);

  const { mutate: executeAcceptFriend, isPending: isAcceptFriendLoading } =
    useMutation({
      mutationFn: acceptFriend,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.friends, 'receipts'],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.friends, 'list'],
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.data.errorType) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.friends, 'receipts'],
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
          queryKey: [QUERY_KEYS.friends, 'receipts'],
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.data.errorType) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.friends, 'receipts'],
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
