import { useState } from 'react';
import Modal from 'components/common/Modal/Modal';
import OverLay from 'components/common/Modal/OverLay';
import eggwin from 'assets/images/egg-win.png';

const PlayPage = () => {
  //// [Modal 사용예시]
  const [isModalOpen, setModalOpen] = useState(true);
  // const openModal = () => {
  //   setModalOpen(true);
  // };
  const closeModal = () => {
    setModalOpen(false);
  };
  const rematch = () => {
    closeModal();
  };
  return (
    <div>
      <h1>play page</h1>
      <OverLay>
        <Modal
          isOpen={isModalOpen}
          imageSrc={eggwin}
          message="아리 승!"
          messageFontSize="font-xl"
          // hasNicknameInput={true}
          btns={[
            { label: '재대결', onClick: rematch, type: 'primary' },
            { label: '나가기', onClick: closeModal, type: 'secondary' },
          ]}
        />
      </OverLay>
    </div>
  );
};

export default PlayPage;
