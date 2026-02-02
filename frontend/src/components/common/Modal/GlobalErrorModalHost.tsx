import Modal from 'components/common/Modal/Modal';
import { modalProps } from 'constants/modal';
import { ERROR_MESSAGES } from 'constants/errorMessages';
import { useErrorStore } from 'stores/errorStore';
import { useClear } from 'hooks/common/useClear';

const GlobalErrorModalHost = () => {
  const { errorMessage, clearErrorMessage } = useErrorStore();
  const clearAndNavigateToLanding = useClear();
  const { btns } = modalProps.error;

  if (!errorMessage) return null;

  const handleClick = () => {
    if (errorMessage === ERROR_MESSAGES.COMMON.RE_LOGIN) {
      clearAndNavigateToLanding();
    } else {
      clearErrorMessage();
    }
  };

  return (
    <Modal isOpen btns={btns} buttonActions={[handleClick]}>
      <Modal.Message message={errorMessage} />
    </Modal>
  );
};

export default GlobalErrorModalHost;
