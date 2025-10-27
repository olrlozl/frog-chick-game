import 'styles/components/play/character-list.scss';
import {
  CharacterOptionType,
  CharacterSizeType,
  CharacterInfoInterface,
} from 'types/play';
import Character from './Character';
import { usePlayStore } from 'stores/playStore';

interface CharacterProps {
  characterOption: CharacterOptionType;
}

const CharacterList = ({ characterOption }: CharacterProps) => {
  const CHARACTER_SIZES: CharacterSizeType[] = ['large', 'middle', 'small'];
  const COUNT_PER_SIZE = 2;

  const { usedCharacterKeys } = usePlayStore();

  return (
    <div className="character-list">
      {CHARACTER_SIZES.map((characterSize) =>
        Array.from({ length: COUNT_PER_SIZE }).map((_, index) => {
          const characterKey = `${characterOption}-${characterSize}-${index}`;

          const characterInfo: CharacterInfoInterface = {
            characterOption,
            characterSize,
            characterKey,
          };

          const isHidden = usedCharacterKeys.includes(characterKey);

          return (
            <Character
              key={characterKey}
              characterInfo={characterInfo}
              isHidden={isHidden}
            />
          );
        })
      )}
    </div>
  );
};

export default CharacterList;
