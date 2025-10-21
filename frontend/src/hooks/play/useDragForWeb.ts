import { CharacterInfoInterface } from 'types/play';
import { usePlayStore } from 'stores/playStore';
import { getPrevPosition } from 'utils/getPrevPosition';

export const useDragForWeb = (characterInfo: CharacterInfoInterface) => {
  const { turn, player1, player2, setCurSelectedCharacter, setPrevPosition } =
    usePlayStore();

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    const isCurrentPlayerCharacter =
      (turn === 'player1' &&
        characterInfo.characterOption === player1.characterOption) ||
      (turn === 'player2' &&
        characterInfo.characterOption === player2.characterOption);

    if (!isCurrentPlayerCharacter) return;

    setCurSelectedCharacter(characterInfo);

    const parentSquare = e.currentTarget.closest('.square');

    if (parentSquare instanceof HTMLElement) {
      const position = getPrevPosition(parentSquare);
      setPrevPosition(position);
    }
  };

  return { handleDragStart };
};
