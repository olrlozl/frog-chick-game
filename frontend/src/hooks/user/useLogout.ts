import { useMutation } from '@tanstack/react-query';
import { kakaoLogout } from 'api/userApi';
import { AxiosError } from 'axios';
import { MUTATION_KEYS } from 'constants/reactQueryKeys';
import { useClear } from 'hooks/common/useClear';
import { useErrorStore } from 'stores/errorStore';

export const useLogout = (closeModal: () => void) => {
  const { setErrorMessage } = useErrorStore();

  const clearAndNavigateToLanding = useClear();

  const { mutate: executeKakaoLogout, isPending: isLogoutLoading } =
    useMutation({
      mutationFn: kakaoLogout,
      mutationKey: [MUTATION_KEYS.logout],
      onSuccess: () => {
        clearAndNavigateToLanding();
      },
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.data.errorType) {
          setErrorMessage('KAKAO_LOGOUT', err.response?.data.errorType);
        }
      },
      onSettled: () => {
        closeModal();
      },
    });

  return { executeKakaoLogout, isLogoutLoading };
};
