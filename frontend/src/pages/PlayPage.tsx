import { useState, useEffect } from 'react';
import 'styles/pages/play-page.scss';
import greenWin from 'assets/images/green-win.png';
import yellowWin from 'assets/images/yellow-win.png';
import greenYellowWin from 'assets/images/green-yellow-win.png';
import Modal from 'components/common/Modal/Modal';
import UserPlayBox from 'components/play/UserPlayBox';
import CharacterList from 'components/play/CharacterList';
import Board from 'components/play/Board';
import Count from 'components/play/Count';
import { modalProps } from 'constants/modal';
import { usePlayStore } from 'stores/playStore';
import { useNavigate } from 'react-router-dom';
import { SoundManager } from 'utils/soundManager';

const PlayPage = () => {
  const navigate = useNavigate();
  const { player1, player2, winners, startTimer, stopTimer, resetGame } =
    usePlayStore();

  const [isStartCountVisible, setStartCountVisible] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const { messageFontSize, btns } = modalProps.gameResult;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const rematch = () => {
    closeModal();
    resetGame();
    setStartCountVisible(true);
  };

  const goToMain = () => {
    closeModal();
    navigate('/main');
  };

  const handleStartCountEnd = () => {
    setStartCountVisible(false);
    startTimer();
  };

  useEffect(() => {
    if (isStartCountVisible) {
      SoundManager.countDown();
    }
  }, [isStartCountVisible]);

  useEffect(() => {
    if (winners.length > 0) {
      stopTimer();
      const timer = setTimeout(() => {
        openModal();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [winners]);

  const gameResult =
    winners.length === 1
      ? winners[0] === player1.characterOption
        ? `${player1.nickname} 승`
        : `${player2.nickname} 승`
      : '무승부';

  const winnerImage =
    winners.length === 1
      ? winners[0] === 'green'
        ? greenWin
        : yellowWin
      : greenYellowWin;

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
        message={gameResult}
        messageFontSize={messageFontSize}
        btns={btns}
        buttonActions={[rematch, goToMain]}
      >
        <Modal.Image imageSrc={winnerImage} />
      </Modal>
    </div>
  );
};

export default PlayPage;
