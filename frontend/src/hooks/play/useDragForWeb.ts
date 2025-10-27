import { CharacterInfoInterface } from 'types/play';
import { usePlayStore } from 'stores/playStore';
import { getPrevPosition } from 'utils/getPrevPosition';
import { SoundManager } from 'utils/soundManager';

export const useDragForWeb = (
  characterInfo: CharacterInfoInterface,
  isDraggable: boolean
) => {
  const { setCurSelectedCharacter, setPrevPosition } = usePlayStore();

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    if (!isDraggable) {
      e.preventDefault();
      SoundManager.touchLock();
      return;
    }

    setCurSelectedCharacter(characterInfo);

    const parentSquare = e.currentTarget.closest('.square');

    if (parentSquare instanceof HTMLElement) {
      const position = getPrevPosition(parentSquare);
      setPrevPosition(position);
    }
  };

  return { handleDragStart };
};
