import { useMutation } from '@tanstack/react-query';
import { createNickname } from 'api/userApi';
import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from 'constants/errorMessages';
import { useNavigate } from 'react-router-dom';
import { useErrorStore } from 'stores/errorStore';
import { useUserStore } from 'stores/userStore';
import { SetState } from 'types/common';
import { validateNickname } from 'utils/validate';

export const useNickname = (
  nickname: string,
  setNicknameErrorMessage: SetState<string>,
  closeModal: () => void
) => {
  const navigate = useNavigate();
  const { setErrorMessage } = useErrorStore();
  const setNickname = useUserStore((s) => s.setNickname);

  const { mutate, isPending: isCreateNicknameLoading } = useMutation({
    mutationFn: createNickname,
    onSuccess: (data) => {
      setNickname(data.nickname);
      navigate('/main');
    },
    onError: (e) => {
      if (e instanceof AxiosError && e.response?.data.errorType) {
        switch (e.response?.data.errorType) {
          case 'INVALID_USERID':
            closeModal();
            return;
          case 'ALREADY_EXISTS_NICKNAME':
            navigate('/main');
            setErrorMessage('CREATE_NICKNAME', e.response?.data.errorType);
            return;
          default:
            setNicknameErrorMessage(
              ERROR_MESSAGES.CREATE_NICKNAME[e.response.data.errorType]
            );
        }
      }
    },
  });

  const validateAndCreateNickname = () => {
    if (!nickname) {
      setNicknameErrorMessage(ERROR_MESSAGES.CREATE_NICKNAME.MISSING_NICKNAME);
      return;
    }

    const isValidNickname = validateNickname(nickname);
    if (!isValidNickname) {
      setNicknameErrorMessage(ERROR_MESSAGES.CREATE_NICKNAME.INVALID_NICKNAME);
      return;
    }

    mutate({ nickname });
  };

  return { validateAndCreateNickname, isCreateNicknameLoading };
};
