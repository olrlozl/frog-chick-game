import 'styles/components/play/character-list.scss';
import { CharacterOptionType, CharacterSizeType } from 'types/play';
import Character from './Character';

interface CharacterProps {
  characterOption: CharacterOptionType;
}

const CharacterList = ({ characterOption }: CharacterProps) => {
  const CHARACTER_SIZES: CharacterSizeType[] = ['large', 'middle', 'small'];
  const COUNT_PER_SIZE = 2;

  return (
    <div className="character-list">
      {CHARACTER_SIZES.map((characterSize) =>
        Array.from({ length: COUNT_PER_SIZE }).map((_, index) => (
          <Character
            key={`${characterSize}-${index}`}
            characterOption={characterOption}
            characterSize={characterSize}
          />
        ))
      )}
    </div>
  );
};

export default CharacterList;
