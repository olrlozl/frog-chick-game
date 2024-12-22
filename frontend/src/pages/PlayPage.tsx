import React, { useState } from 'react';
import Modal from 'components/common/Modal/Modal';
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
      <Modal
        isOpen={isModalOpen}
        imageSrc={eggwin}
        message="아리 승!"
        buttons={[
          { label: '재대결', onClick: rematch },
          { label: '나가기', onClick: closeModal },
        ]}
      />
    </div>
  );
};

export default PlayPage;
