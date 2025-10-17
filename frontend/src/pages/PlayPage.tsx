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
  const winner = usePlayStore((state) => state.winner); // 승리자 상태 구독
  const winnerImage = winner === 'frog' ? frogwin : chickwin;

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
    if (winner) {
      const timer = setTimeout(() => {
        openModal();
      }, 400);

      return () => clearTimeout(timer); // winner가 바뀌거나 언마운트 시 타이머 제거
    }
  }, [winner]);

  const [isStartCountVisible, setStartCountVisible] = useState(true);

  const handleStartCountEnd = () => {
    setStartCountVisible(false);
  };

  const { messageFontSize, btns } = modalProps.gameResult;

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
      me: { nickname: '이응지읒', wins: 5, losses: 1 },
      opponent: { nickname: '짱구는못말려', wins: 3, losses: 2 },
    },
    turn: 'opponent',
  };

  return (
    <div className="play-page">
      {isStartCountVisible && <Count onEnd={handleStartCountEnd} />}

      <UserPlayBox
        playerType="opponent"
        option={gameInfo.option.opponent}
        userInfo={gameInfo.players.opponent}
        turn={gameInfo.turn}
      />

      <div className="game-box">
        <CharacterList characterOption={gameInfo.option.opponent} />
        <Board />
        <CharacterList characterOption={gameInfo.option.me} />
      </div>

      <UserPlayBox
        playerType="me"
        option={gameInfo.option.me}
        userInfo={gameInfo.players.me}
        turn={gameInfo.turn}
      />

      <Modal
        isOpen={isModalOpen}
        message={winner ? (winner === 'frog' ? '구리 승!' : '아리 승!') : ''}
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
