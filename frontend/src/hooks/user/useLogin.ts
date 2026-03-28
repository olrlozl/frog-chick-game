import { useMutation } from '@tanstack/react-query';
import { kakaoLogin } from 'api/userApi';
import { AxiosError } from 'axios';
import { MUTATION_KEYS } from 'constants/reactQueryKeys';
import { useNavigate } from 'react-router-dom';
import { useErrorStore } from 'stores/errorStore';
import { useNicknameModalStore } from 'stores/nicknameModalStore';
import { useUserStore } from 'stores/userStore';
import { KakaoLoginResponse } from 'types/user';

export const useLogin = () => {
  const { setErrorMessage } = useErrorStore();
  const setLogin = useUserStore((s) => s.setLogin);
  const navigate = useNavigate();
  const openNicknameModal = useNicknameModalStore((s) => s.openNicknameModal);

  const { mutate: executeKakaoLogin } = useMutation({
    mutationFn: kakaoLogin,
    mutationKey: [MUTATION_KEYS.login],
    onSuccess: (data: KakaoLoginResponse) => {
      setLogin({ userId: data.userId, nickname: data.nickname });

      if (data.nickname) {
        navigate('/main');
      } else {
        openNicknameModal();
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.data.errorType) {
        setErrorMessage('KAKAO_LOGIN', err.response?.data.errorType);
      }
    },
  });

  return executeKakaoLogin;
};
