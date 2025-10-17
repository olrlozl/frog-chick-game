import { CharacterInfoInterface } from 'types/play';
import { CHARACTER_MAP } from 'constants/characterMap';
import { usePlayStore } from 'stores/playStore';
import { useTouchForMobile } from 'hooks/play/useTouchForMobile';
import { useDragForWeb } from 'hooks/play/useDragForWeb';
import 'styles/components/play/character.scss';

interface CharacterProps {
  characterInfo: CharacterInfoInterface;
  isHidden: boolean;
}

const Character = ({ characterInfo, isHidden }: CharacterProps) => {
  const { characterOption, characterSize, characterKey } = characterInfo;
  const imageSrc = CHARACTER_MAP[characterOption][characterSize];

  const { selectedCharacter } = usePlayStore();
  const isSelected = selectedCharacter?.characterKey === characterKey;

  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useTouchForMobile(characterInfo);
  const { handleDragStart } = useDragForWeb(characterInfo);

  return (
    <div
      className={`character ${characterKey} ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''}`}
    >
      <img
        className={`character-img ${characterOption} ${characterSize}`}
        src={imageSrc}
        alt={`${characterOption} ${characterSize} character`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDragStart={handleDragStart}
      />
    </div>
  );
};

export default Character;
