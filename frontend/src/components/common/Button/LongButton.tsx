import 'styles/components/common/Button/long-button.scss';
import { CharacterOptionType } from 'types/play';

interface LongButtonProps {
  option: CharacterOptionType;
  onClick: () => void;
}

const LongButton = ({ option, onClick }: LongButtonProps) => {
  return (
    <div className={`long-button ${option}`} onClick={onClick}>
      기권
    </div>
  );
};

export default LongButton;
