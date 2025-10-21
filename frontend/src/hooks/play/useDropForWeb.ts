import { usePlayStore } from 'stores/playStore';
import { placeCharacter } from 'utils/placeCharacter';

export const useDropForWeb = (row: number, col: number) => {
  const { turn, player1, player2, curSelectedCharacter, prevPosition } =
    usePlayStore();

  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    if (curSelectedCharacter) {
      const isCurrentPlayerCharacter =
        (turn === 'player1' &&
          curSelectedCharacter.characterOption === player1.characterOption) ||
        (turn === 'player2' &&
          curSelectedCharacter.characterOption === player2.characterOption);

      if (!isCurrentPlayerCharacter) return;

      placeCharacter(row, col, curSelectedCharacter, prevPosition);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return { handleDrop, handleDragOver };
};
