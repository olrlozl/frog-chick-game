import { queryClient } from 'api/queryClient';
import { useNavigate } from 'react-router-dom';
import { useErrorStore } from 'stores/errorStore';
import { useFriendModalStore } from 'stores/friendModalStore';
import { useNicknameModalStore } from 'stores/nicknameModalStore';
import { usePlayStore } from 'stores/playStore';
import { useUserStore } from 'stores/userStore';

export const useClear = () => {
  const clearErrorMessage = useErrorStore((s) => s.clearErrorMessage);
  const logout = useUserStore((s) => s.logout);
  const closeFriendModal = useFriendModalStore((s) => s.closeModal);
  const closeNicknameModal = useNicknameModalStore((s) => s.closeNicknameModal);
  const resetGame = usePlayStore((s) => s.resetGame);
  const navigate = useNavigate();

  const clearAndNavigateToLanding = () => {
    queryClient.clear();
    clearErrorMessage();
    logout();
    closeFriendModal();
    closeNicknameModal();
    resetGame();
    navigate('/');
  };

  return clearAndNavigateToLanding;
};
