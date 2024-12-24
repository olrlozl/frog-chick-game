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
    stranger: { image: frog, texts: ['낯선이와', '게임하기'] },
    friend: { image: chick, texts: ['친구와', '게임하기'] },
  };

  const { image, texts } = options[option];

  return (
    <div
      className={`start-button ${option} ${isSelected && 'selected'}`}
      onClick={onClick}
    >
      <img className={option} src={image} alt="" />
      {texts.map((text) => (
        <div>{text}</div>
      ))}
    </div>
  );
};

export default StartButton;
