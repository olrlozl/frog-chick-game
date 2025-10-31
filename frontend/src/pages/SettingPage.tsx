import KakaoButton from 'components/user/KakaoButton';
import Modal from 'components/common/Modal/Modal';
import { modalProps } from 'constants/modal';
import { useModal } from 'hooks/common/useModal';
import { useLogout } from 'hooks/user/useLogout';
import Header from 'components/common/Layout/Header';

const SettingPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { message, btns } = modalProps.logoutConfirm;

  const { executeKakaoLogout, isLogoutLoading } = useLogout(closeModal);

  return (
    <div className="setting-page">
      <Header title="설정" />
      <div className="page-content">
        <KakaoButton onClick={openModal} kakaoOption="로그아웃" />
      </div>
      <Modal
        isOpen={isModalOpen}
        btns={btns}
        buttonActions={[executeKakaoLogout, closeModal]}
        isLoading={isLogoutLoading}
      >
        <Modal.Message message={message} />
      </Modal>
    </div>
  );
};

export default SettingPage;
