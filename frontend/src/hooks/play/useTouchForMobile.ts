import { CharacterInfoInterface } from 'types/play';
import { CHARACTER_MAP } from 'constants/characterMap';
import { usePlayStore } from 'stores/playStore';
import { useRef } from 'react';
import {
  createShadowImgAndTrackTouch,
  updateShadowImgAndTrackTouch,
  removeShadowImg,
} from 'utils/shadowImg';
import { getPrevPosition } from 'utils/getPrevPosition';

export const useTouchForMobile = (characterInfo: CharacterInfoInterface) => {
  const { characterOption, characterSize } = characterInfo;
  const imageSrc = CHARACTER_MAP[characterOption][characterSize];
  const dragShadowImgRef = useRef<HTMLImageElement | null>(null); // 드래그 시 생성되는 쉐도우 이미지 참조
  const { player1, player2, turn, setSelectedCharacter, setPrevPosition } =
    usePlayStore();

  const isCurrentPlayerCharacter =
    (turn === 'player1' && characterOption === player1.characterOption) ||
    (turn === 'player2' && characterOption === player2.characterOption);

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!isCurrentPlayerCharacter) return;

    createShadowImgAndTrackTouch(e, characterInfo, imageSrc, dragShadowImgRef);
    setSelectedCharacter(characterInfo);

    const parentSquare = e.currentTarget.closest('.square');

    if (parentSquare instanceof HTMLElement) {
      const position = getPrevPosition(parentSquare);
      setPrevPosition(position);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!isCurrentPlayerCharacter) return;
    updateShadowImgAndTrackTouch(e, dragShadowImgRef);
  };

  const handleTouchEnd = () => {
    removeShadowImg(dragShadowImgRef);

    if (!isCurrentPlayerCharacter) return;

    // 터치 종료 이벤트를 커스텀 이벤트로 생성하여 dispatch
    const customEvent = new CustomEvent('play:character:touchEnd');
    window.dispatchEvent(customEvent);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
