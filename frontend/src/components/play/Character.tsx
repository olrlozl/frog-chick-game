import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/character.scss';
import { CHARACTER_MAP } from 'constants/characterMap';

interface CharacterProps {
  option: CharacterOptionType;
  size: CharacterSizeType;
}

const Character = ({ option, size }: CharacterProps) => {
  const imageSrc = CHARACTER_MAP[option][size];

  return (
    <img
      className={`character ${option} ${size}`}
      src={imageSrc}
      alt={`${option} ${size} character`}
    ></img>
  );
};

export default Character;
