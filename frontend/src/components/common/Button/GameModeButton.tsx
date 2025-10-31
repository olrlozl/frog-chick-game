import 'styles/components/common/Button/game-mode-button.scss';
import localMode from 'assets/images/local-mode.png';
import friendMode from 'assets/images/friend-mode.png';
import randomMode from 'assets/images/random-mode.png';
import { GameModeType } from 'types/user';

interface GameModeButtonProps {
  gameMode: GameModeType;
  onClick: () => void;
}

const BUTTON_CONTENTS = {
  local: { image: localMode, text: '로컬 대전' },
  friend: { image: friendMode, text: '친구 대전' },
  random: { image: randomMode, text: '랜덤 대전' },
};

const GameModeButton = ({ gameMode, onClick }: GameModeButtonProps) => {
  const { image, text } = BUTTON_CONTENTS[gameMode];

  return (
    <div className={`game-mode-button ${gameMode}`} onClick={onClick}>
      <img src={image} alt={text} />
      {text}
    </div>
  );
};

export default GameModeButton;
