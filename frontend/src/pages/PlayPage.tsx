import { useState, useEffect } from 'react';
import 'styles/pages/play-page.scss';
import frogwin from 'assets/images/frog-win.png';
import chickwin from 'assets/images/chick-win.png';
import Modal from 'components/common/Modal/Modal';
import UserPlayBox from 'components/play/UserPlayBox';
import CharacterList from 'components/play/CharacterList';
import Board from 'components/play/Board';
import Count from 'components/play/Count';
import { modalProps } from 'constants/modal';
import { usePlayStore } from 'stores/playStore';

const PlayPage = () => {
  const { player1, player2, winner, startTimer, stopTimer } = usePlayStore();
  const winnerImage = winner === 'frog' ? frogwin : chickwin;
  const winnerNickname =
    winner === player1.characterOption ? player1.nickname : player2.nickname;

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

  useEffect(() => {
    startTimer();

    if (winner) {
      stopTimer();
      const timer = setTimeout(() => {
        openModal();
      }, 1000);

      return () => clearTimeout(timer); // winner가 바뀌거나 언마운트 시 타이머 제거
    }
  }, [winner]);

  const [isStartCountVisible, setStartCountVisible] = useState(false); ////

  const handleStartCountEnd = () => {
    setStartCountVisible(false);
  };

  const { messageFontSize, btns } = modalProps.gameResult;

  return (
    <div className="play-page">
      {isStartCountVisible && <Count onEnd={handleStartCountEnd} />}

      <UserPlayBox
        playerType="player1"
        option={player1.characterOption}
        nickname={player1.nickname}
      />

      <div className="game-box">
        <CharacterList characterOption={player1.characterOption} />
        <Board />
        <CharacterList characterOption={player2.characterOption} />
      </div>

      <UserPlayBox
        playerType="player2"
        option={player2.characterOption}
        nickname={player2.nickname}
      />

      <Modal
        isOpen={isModalOpen}
        message={`${winnerNickname} 승!`}
        messageFontSize={messageFontSize}
        btns={btns}
        buttonActions={[rematch, closeModal]}
      >
        <Modal.Image imageSrc={winnerImage} />
      </Modal>
    </div>
  );
};

export default PlayPage;
