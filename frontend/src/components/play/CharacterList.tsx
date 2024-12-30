import 'styles/components/play/character-list.scss';
import { CharacterOptionType, CharacterSizeType } from 'types/play';
import Character from './Character';

interface CharacterProps {
  characterOption: CharacterOptionType;
}

const CharacterList = ({ characterOption }: CharacterProps) => {
  const characterSizes: CharacterSizeType[] = ['large', 'middle', 'small'];

  return (
    <div className="character-list">
      {characterSizes.map((characterSize) =>
        Array.from({ length: 2 }).map((_, index) => (
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
