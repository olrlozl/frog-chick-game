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
      const { characterOption, characterSize } = JSON.parse(characterData);
      updateBoard(row, col, { characterOption, characterSize });
    }

    e.dataTransfer.clearData();
  } catch (error) {
    console.error('Error parsing drag data', error);
  }
};
