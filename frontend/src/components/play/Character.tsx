import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/character.scss';
import { CHARACTER_MAP } from 'constants/characterMap';

interface CharacterProps {
  characterOption: CharacterOptionType;
  characterSize: CharacterSizeType;
}

const Character = ({ characterOption, characterSize }: CharacterProps) => {
  const imageSrc = CHARACTER_MAP[characterOption][characterSize];

  return (
    <img
      className={`character ${characterOption} ${characterSize}`}
      src={imageSrc}
      alt={`${characterOption} ${characterSize} character`}
    ></img>
  );
};

export default Character;
