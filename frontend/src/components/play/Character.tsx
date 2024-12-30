import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/character.scss';
import { CHARACTER_MAP } from 'constants/characterMap';
import { useRef } from 'react';
import { handleTouchStartCharacter } from 'utils/handleTouchStartCharacter';
import { handleTouchMoveCharacter } from 'utils/handleTouchMoveCharacter';
import { handleTouchEndCharacter } from 'utils/handleTouchEndCharacter';

interface CharacterProps {
  characterOption: CharacterOptionType;
  characterSize: CharacterSizeType;
}

const Character = ({ characterOption, characterSize }: CharacterProps) => {
  const imageSrc = CHARACTER_MAP[characterOption][characterSize];
  const dragShadowImgRef = useRef<HTMLImageElement | null>(null); // 드래그 시 생성되는 쉐도우 이미지 참조

  return (
    <img
      className={`character ${characterOption} ${characterSize}`}
      src={imageSrc}
      alt={`${characterOption} ${characterSize} character`}
      onTouchStart={(e) =>
        handleTouchStartCharacter(
          e,
          characterOption,
          characterSize,
          imageSrc,
          dragShadowImgRef
        )
      }
      onTouchMove={(e) => handleTouchMoveCharacter(e, dragShadowImgRef)}
      onTouchEnd={() => handleTouchEndCharacter(dragShadowImgRef)}
    />
  );
};

export default Character;
