import Modal from 'components/common/Modal/Modal';
import { modalProps } from 'constants/modal';
import { useLogout } from 'hooks/user/useLogout';
import Header from 'components/common/Layout/Header';
import kakaoImg from 'assets/images/kakao.png';
import BasicButton from 'components/common/Button/BasicButton';
import { useState } from 'react';

const SettingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { message, btns } = modalProps.logoutConfirm;
  const { executeKakaoLogout, isLogoutLoading } = useLogout(closeModal);

  return (
    <div className="setting-page">
      <Header title="설정" />
      <div className="page-content">
        <BasicButton
          type="kakao"
          color="yellow"
          label="카카오 로그아웃"
          onClick={openModal}
          leftIcon={<img src={kakaoImg} alt="카카오" />}
        />
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
