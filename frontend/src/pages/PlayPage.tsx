import { useState } from 'react';
import Modal from 'components/common/Modal/Modal';
import eggwin from 'assets/images/egg-win.png';
import UserPlayBox from 'components/play/UserPlayBox';

const PlayPage = () => {
  //// [Modal 사용예시]
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const rematch = () => {
    closeModal();
  };
  ////

  interface GameInfo {
    option: {
      me: 'chick' | 'frog';
      opponent: 'chick' | 'frog';
    };
    players: {
      me: { nickname: string; wins: number; losses: number };
      opponent: { nickname: string; wins: number; losses: number };
    };
    turn: 'me' | 'opponent';
  }

  const gameInfo: GameInfo = {
    option: { me: 'chick', opponent: 'frog' },
    players: {
      me: { nickname: '아리', wins: 5, losses: 1 },
      opponent: { nickname: '구리여섯글자', wins: 3, losses: 2 },
    },
    turn: 'opponent',
  };

  return (
    <>
      <UserPlayBox
        playerType="opponent"
        option={gameInfo.option.opponent}
        userInfo={gameInfo.players.opponent}
        turn={gameInfo.turn}
      />
      <UserPlayBox
        playerType="me"
        option={gameInfo.option.me}
        userInfo={gameInfo.players.me}
        turn={gameInfo.turn}
      />
      <Modal
        isOpen={isModalOpen}
        imageSrc={eggwin}
        message="아리 승!"
        messageFontSize="font-xl"
        btns={[
          { label: '재대결', onClick: rematch, type: 'primary' },
          { label: '나가기', onClick: closeModal, type: 'secondary' },
        ]}
      />
    </>
  );
};

export default PlayPage;
