import { useMutation } from '@tanstack/react-query';
import {
  acceptFriend,
  rejectFriend,
  applyFriend,
  cancelApplyFriend,
} from 'api/friendApi';
import { queryClient } from 'api/queryClient';
import { AxiosError } from 'axios';
import { QUERY_KEYS } from 'constants/reactQueryKeys';
import { useErrorStore } from 'stores/errorStore';

type FriendReqVars = { to: string };

export const useFriendActions = () => {
  const { setErrorMessage } = useErrorStore();

  const invalidateUser = (nickname: string) => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.friend, nickname] });
  };

  const removeUser = (nickname: string) => {
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.friend, nickname] });
  };

  const invalidateFriendList = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.friend] });
  };

  // ✅ 친구 신청
  const { mutate: executeApplyFriend, isPending: isApplyFriendLoading } =
    useMutation({
      mutationFn: applyFriend,
      onSuccess: (_, variables: FriendReqVars) => {
        invalidateUser(variables.to);
        invalidateFriendList(); // sent 목록 반영
      },
      onError: (err) => {
        if (!(err instanceof AxiosError) || !err.response?.data.errorType)
          return;

        const errorType = err.response.data.errorType;
        const to = (() => {
          try {
            return JSON.parse(err.config?.data)?.to;
          } catch {
            return undefined;
          }
        })();

        switch (errorType) {
          // 이미 신청하거나, 친구인 경우 UI 갱신을 위해 쿼리 무효화
          case 'ALREADY_FRIEND':
          case 'ALREADY_APPLY_FRIEND':
            if (to) invalidateUser(to);
            invalidateFriendList();
            break;

          // 존재하지 않는 사용자일 경우
          case 'UNKNOWN_USER':
            if (to) removeUser(to);

          default:
            setErrorMessage('APPLY_FRIEND', errorType);
        }
      },
    });

  // ✅ 친구 신청 취소
  const {
    mutate: executeCancelApplyFriend,
    isPending: isCancelApplyFriendLoading,
  } = useMutation({
    mutationFn: cancelApplyFriend,
    onSuccess: (_, variables: FriendReqVars) => {
      invalidateUser(variables.to);
      invalidateFriendList(); // sent 목록 반영
    },
    onError: (err, variables) => {
      if (!(err instanceof AxiosError) || !err.response?.data.errorType) return;

      const errorType = err.response.data.errorType;

      switch (errorType) {
        // 내가 친추 보낸 기록이 없고 상대도 받은 기록이 없는 경우, UI 갱신을 위해 쿼리 무효화
        case 'NOT_FOUND_FRIEND_REQUEST':
          if (variables?.to) invalidateUser(variables.to);
          invalidateFriendList();
          break;

        // 존재하지 않는 사용자일 경우
        case 'UNKNOWN_USER':
          if (variables?.to) removeUser(variables.to);

        default:
          setErrorMessage('CANCEL_APPLY_FRIEND', errorType);
      }
    },
  });

  // ✅ 친구 수락
  const { mutate: executeAcceptFriend, isPending: isAcceptFriendLoading } =
    useMutation({
      mutationFn: acceptFriend,
      onSuccess: () => {
        invalidateFriendList();
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.data.errorType) {
          invalidateFriendList();
          setErrorMessage('ACCEPT_FRIEND', err.response.data.errorType);
        }
      },
    });

  // ✅ 친구 거절
  const { mutate: executeRejectFriend, isPending: isRejectFriendLoading } =
    useMutation({
      mutationFn: rejectFriend,
      onSuccess: () => {
        invalidateFriendList();
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.data.errorType) {
          invalidateFriendList();
          setErrorMessage('REJECT_FRIEND', err.response.data.errorType);
        }
      },
    });

  return {
    executeApplyFriend,
    isApplyFriendLoading,
    executeCancelApplyFriend,
    isCancelApplyFriendLoading,
    executeAcceptFriend,
    isAcceptFriendLoading,
    executeRejectFriend,
    isRejectFriendLoading,
  };
};
