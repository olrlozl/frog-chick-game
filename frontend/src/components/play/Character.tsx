import { CharacterInfoInterface } from 'types/play';
import 'styles/components/play/character.scss';
import { CHARACTER_MAP } from 'constants/characterMap';
import { useRef } from 'react';
import { handleDragStartCharacter } from 'utils/handleDragStartCharacter';
import { handleTouchStartCharacter } from 'utils/handleTouchStartCharacter';
import { handleTouchMoveCharacter } from 'utils/handleTouchMoveCharacter';
import { handleTouchEndCharacter } from 'utils/handleTouchEndCharacter';
import { useCharacterStore } from 'stores/CharacterStore';

interface CharacterProps {
  characterInfo: CharacterInfoInterface;
}

const Character = ({ characterInfo }: CharacterProps) => {
  const { characterOption, characterSize, characterKey } = characterInfo;
  const imageSrc = CHARACTER_MAP[characterOption][characterSize];
  const dragShadowImgRef = useRef<HTMLImageElement | null>(null); // 드래그 시 생성되는 쉐도우 이미지 참조

  const { selectedCharacterKey, setSelectedCharacterKey } = useCharacterStore();
  const isSelected = selectedCharacterKey === characterKey;

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    handleDragStartCharacter(e, characterInfo);
    setSelectedCharacterKey(characterKey);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    handleTouchStartCharacter(e, characterInfo, imageSrc, dragShadowImgRef);
    setSelectedCharacterKey(characterKey);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    handleTouchMoveCharacter(e, dragShadowImgRef);
  };

  const handleTouchEnd = () => {
    handleTouchEndCharacter(dragShadowImgRef);
    setSelectedCharacterKey(null);
  };

  return (
    <div
      className={`character ${characterKey} ${isSelected ? 'selected' : ''}`}
    >
      <img
        className={`character-img ${characterOption} ${characterSize}`}
        src={imageSrc}
        alt={`${characterOption} ${characterSize} character`}
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default Character;
