import 'styles/components/common/Button/start-button.scss';
import frog from 'assets/images/frog.png';
import chick from 'assets/images/chick.png';

interface StartButtonProps {
  gameOption: 'stranger' | 'friend';
  onClick: () => void;
  isSelected: boolean;
}

const StartButton = ({ gameOption, onClick, isSelected }: StartButtonProps) => {
  const gameOptions = {
    stranger: { image: frog, text: '낯선이와\n게임하기' },
    friend: { image: chick, text: '친구와\n게임하기' },
  };
  const { image, text } = gameOptions[gameOption];

  return (
    <div
      className={`start-button ${gameOption} ${isSelected && 'selected'}`}
      onClick={onClick}
    >
      <img className={gameOption} src={image} alt='구리와 아리' />
      {text}
    </div>
  );
};

export default StartButton;
