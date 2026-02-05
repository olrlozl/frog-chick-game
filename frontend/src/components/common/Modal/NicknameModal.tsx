import { useState } from 'react';
import Modal from 'components/common/Modal/Modal';
import { modalProps } from 'constants/modal';
import { useNickname } from 'hooks/user/useNickname';
import { useNicknameModalStore } from 'stores/nicknameModalStore';

export default function NicknameModal() {
  const { isOpenNicknameModal, closeNicknameModal } = useNicknameModalStore();
  const { message, btns } = modalProps.createNickname;

  const [nickname, setNickname] = useState('');
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState('');

  const { validateAndCreateNickname, isCreateNicknameLoading } = useNickname(
    nickname,
    setNicknameErrorMessage,
    closeNicknameModal
  );

  return (
    <Modal
      isOpen={isOpenNicknameModal}
      btns={btns}
      buttonActions={[validateAndCreateNickname]}
      isLoading={isCreateNicknameLoading}
    >
      <Modal.Message message={message} />
      <Modal.NicknameInput
        text="한글, 영어 2~6자"
        nickname={nickname}
        setNickname={setNickname}
        setErrorMessage={setNicknameErrorMessage}
        onEnter={validateAndCreateNickname}
      />
      <Modal.ErrorMessage errorMessage={nicknameErrorMessage} />
    </Modal>
  );
}
