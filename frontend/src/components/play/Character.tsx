import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/character.scss';
import { characterMap } from 'constants/characterMap';

interface CharacterProps {
  option: CharacterOptionType;
  size: CharacterSizeType;
}

const Character = ({ option, size }: CharacterProps) => {
  const imageSrc = characterMap[option][size];

  return (
    <img
      className={`character ${option} ${size}`}
      src={imageSrc}
      alt={`${option} ${size} character`}
    ></img>
  );
};

export default Character;
