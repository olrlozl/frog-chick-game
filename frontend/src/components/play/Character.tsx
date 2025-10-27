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

  const {
    turn,
    player1,
    player2,
    curSelectedCharacter,
    shakeCharacterKey,
    lastPlacedCharacter,
  } = usePlayStore();
  const isSelected = curSelectedCharacter?.characterKey === characterKey;
  const isShaking = shakeCharacterKey === characterInfo.characterKey;
  const isRecent = lastPlacedCharacter?.characterKey === characterKey;

  const isDraggable =
    (turn === 'player1' && characterOption === player1.characterOption) ||
    (turn === 'player2' && characterOption === player2.characterOption);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useTouchForMobile(characterInfo, isDraggable);
  const { handleDragStart } = useDragForWeb(characterInfo, isDraggable);

  return (
    <div
      className={`character ${characterKey} 
        ${isSelected ? 'selected' : ''} 
        ${isHidden ? 'hidden' : ''} 
        ${isShaking ? 'shake' : ''} 
        ${isRecent ? 'recent' : ''}`}
    >
      <img
        className={`character-img ${characterOption} ${characterSize} 
          ${isDraggable ? 'draggable' : ''}`}
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
