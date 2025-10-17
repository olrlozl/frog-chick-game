import { CharacterInfoInterface, CharacterPosition } from 'types/play';
import { usePlayStore } from 'stores/playStore';
import { moveCharacterForWeb } from 'utils/moveCharacterForWeb';
import { canPlaceCharacter } from 'utils/canPlaceCharacter';

export const useDropForWeb = (row: number, col: number) => {
  const {
    board,
    selectedCharacter,
    prevPosition,
    updateBoard,
    setPrevPosition,
    addUsedCharacter,
    setShakeCharacter,
  } = usePlayStore();

  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    const targetCell = board[row][col];

    const canPlace = canPlaceCharacter(targetCell, selectedCharacter!);

    if (canPlace) {
      const nextPosition = { row, col };
      moveCharacterForWeb(e, prevPosition, nextPosition, updateBoard);

      const isFromCharacterList =
        prevPosition.row === null && prevPosition.col === null;

      if (isFromCharacterList && selectedCharacter) {
        addUsedCharacter(selectedCharacter.characterKey);
      }
    } else {
      if (selectedCharacter) {
        setShakeCharacter(selectedCharacter.characterKey);
        setTimeout(() => setShakeCharacter(null), 600);
      }
    }
    setPrevPosition({ row: null, col: null });
  };

  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return { handleDrop, handleDragOver };
};
