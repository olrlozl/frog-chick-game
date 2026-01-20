import { useState, useEffect } from 'react';
import 'styles/pages/play-page.scss';
import greenWin from 'assets/images/green-win.png';
import yellowWin from 'assets/images/yellow-win.png';
import greenYellowWin from 'assets/images/green-yellow-win.png';
import yellowPauseIcon from 'assets/images/yellow-pause-icon.png';
import greenPauseIcon from 'assets/images/green-pause-icon.png';
import Modal from 'components/common/Modal/Modal';
import PlayerBox from 'components/play/PlayerBox';
import CharacterList from 'components/play/CharacterList';
import Board from 'components/play/Board';
import Count from 'components/play/Count';
import { modalProps } from 'constants/modal';
import { usePlayStore } from 'stores/playStore';
import { useNavigate } from 'react-router-dom';
import { SoundManager } from 'utils/soundManager';
import BasicButton from 'components/common/Button/BasicButton';

const PlayPage = () => {
  const navigate = useNavigate();
  const { player1, player2, winners, startTimer, stopTimer, resetGame } =
    usePlayStore();

  const [isStartCountVisible, setStartCountVisible] = useState(true);
  const [isResultModalOpen, setResultModalOpen] = useState(false);
  const [isPauseModalOpen, setPauseModalOpen] = useState(false);
  const { messageFontSize, btns: resultModalBtns } = modalProps.gameResult;
  const { btns: pauseModalBtns } = modalProps.gamePause;

  const handleStartCountEnd = () => {
    setStartCountVisible(false);
    startTimer();
  };

  const handleGamePause = () => {
    setPauseModalOpen(true);
  };

  const rematch = () => {
    setResultModalOpen(false);
    resetGame();
    setStartCountVisible(true);
  };

  const goToMain = () => {
    setResultModalOpen(false);
    navigate('/main');
  };

  const gameAgain = () => {
    setPauseModalOpen(false);
    resetGame();
    setStartCountVisible(true);
  };

  const gameContinue = () => {
    setPauseModalOpen(false);
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
        setResultModalOpen(true);
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

  const pauseIconMap: Record<string, string> = {
    yellow: yellowPauseIcon,
    green: greenPauseIcon,
  };

  return (
    <div className="play-page">
      {isStartCountVisible && <Count onEnd={handleStartCountEnd} />}

      <PlayerBox
        playerType="player1"
        option={player1.characterOption}
        nickname={player1.nickname}
      />

      <div className="game-box">
        <CharacterList characterOption={player1.characterOption} />
        <Board />
        <CharacterList characterOption={player2.characterOption} />
      </div>

      <PlayerBox
        playerType="player2"
        option={player2.characterOption}
        nickname={player2.nickname}
      />

      <div className={`pause-box ${player2.characterOption}`}>
        <BasicButton
          type="long"
          label="일시정지"
          onClick={handleGamePause}
          color={`light${player2.characterOption}`}
          leftIcon={
            <img src={pauseIconMap[player2.characterOption]} alt="일시정지" />
          }
        />
      </div>

      <Modal
        isOpen={isResultModalOpen}
        btns={resultModalBtns}
        buttonActions={[rematch, goToMain]}
      >
        <Modal.Message message={gameResult} messageFontSize={messageFontSize} />
        <Modal.Image imageSrc={winnerImage} />
      </Modal>

      <Modal
        isOpen={isPauseModalOpen}
        btns={pauseModalBtns}
        buttonActions={[gameAgain, gameContinue, goToMain]}
        buttonDirection="column"
      />
    </div>
  );
};

export default PlayPage;
