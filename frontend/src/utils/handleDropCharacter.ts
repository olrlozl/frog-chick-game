// 웹 드롭 처리
export const handleDropCharacter = (
  e: React.DragEvent<HTMLDivElement>,
  row: number,
  col: number,
  updateBoard: Function
) => {
  e.preventDefault();

  try {
    const characterData = e.dataTransfer.getData('text/plain');

    if (characterData) {
      const characterInfo = JSON.parse(characterData);
      updateBoard(row, col, characterInfo);
    }

    e.dataTransfer.clearData();
  } catch (error) {
    console.error('Error parsing drag data', error);
  }
};
