import { usePlayStore } from 'stores/playStore';
import { placeCharacter } from 'utils/placeCharacter';

export const useDropForWeb = (row: number, col: number) => {
  const { turn, player1, player2, selectedCharacter, prevPosition } =
    usePlayStore();

  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    if (selectedCharacter) {
      const isCurrentPlayerCharacter =
        (turn === 'player1' &&
          selectedCharacter.characterOption === player1.characterOption) ||
        (turn === 'player2' &&
          selectedCharacter.characterOption === player2.characterOption);

      if (!isCurrentPlayerCharacter) return;

      placeCharacter(row, col, selectedCharacter, prevPosition);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return { handleDrop, handleDragOver };
};
