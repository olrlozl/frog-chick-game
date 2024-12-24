import 'styles/components/common/Button/start-button.scss';
import frog from 'assets/images/frog.png';
import chick from 'assets/images/chick.png';

interface StartButtonProps {
  option: 'stranger' | 'friend';
  onClick: () => void;
  isSelected: boolean;
}

const StartButton = ({ option, onClick, isSelected }: StartButtonProps) => {
  const options = {
    stranger: { image: frog, text: '낯선이와\n게임하기' },
    friend: { image: chick, text: '친구와\n게임하기' },
  };
  const { image, text } = options[option];

  return (
    <div
      className={`start-button ${option} ${isSelected && 'selected'}`}
      onClick={onClick}
    >
      <img className={option} src={image} alt="" />
      {text}
    </div>
  );
};

export default StartButton;
