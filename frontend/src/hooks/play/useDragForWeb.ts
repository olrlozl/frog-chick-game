import { CharacterInfoInterface } from 'types/play';
import { usePlayStore } from 'stores/playStore';
import { getPrevPosition } from 'utils/getPrevPosition';

export const useDragForWeb = (characterInfo: CharacterInfoInterface) => {
  const { selectedCharacter, setSelectedCharacter, setPrevPosition } =
    usePlayStore();

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    setSelectedCharacter(characterInfo);

    const parentSquare = e.currentTarget.closest('.square');

    if (parentSquare instanceof HTMLElement) {
      const position = getPrevPosition(parentSquare);
      setPrevPosition(position);
    }
  };

  return { handleDragStart };
};
