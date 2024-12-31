import { CharacterInfoInterface } from 'types/play';

// 웹 드롭 처리
export const handleDropCharacter = (
  e: React.DragEvent<HTMLDivElement>,
  prevPosition: { row: number | null; col: number | null },
  nextPosition: { row: number; col: number },
  updateBoard: (
    prevPosition: { row: number | null; col: number | null },
    nextPosition: { row: number; col: number },
    characterInfo: CharacterInfoInterface
  ) => void
) => {
  e.preventDefault();

  try {
    const characterData = e.dataTransfer.getData('text/plain');

    if (characterData) {
      const characterInfo = JSON.parse(characterData);
      updateBoard(prevPosition, nextPosition, characterInfo);
    }

    e.dataTransfer.clearData();
  } catch (error) {
    console.error('Error parsing drag data', error);
  }
};
