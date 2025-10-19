import { usePlayStore } from 'stores/playStore';
import { placeCharacter } from 'utils/placeCharacter';

export const useDropForWeb = (row: number, col: number) => {
  const { selectedCharacter, prevPosition } = usePlayStore();

  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    if (selectedCharacter) {
      placeCharacter(row, col, selectedCharacter, prevPosition);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return { handleDrop, handleDragOver };
};
