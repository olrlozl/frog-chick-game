import { usePlayStore } from 'stores/playStore';
import {
  CharacterPosition,
  CharacterInfoInterface,
  sizeRank,
} from 'types/play';

export const placeCharacter = (
  row: number,
  col: number,
  selectedCharacter: CharacterInfoInterface,
  prevPosition: CharacterPosition
) => {
  const {
    board,
    updateBoard,
    addUsedCharacter,
    setShakeCharacter,
    setPrevPosition,
    switchTurn,
  } = usePlayStore.getState();

  const targetCell = board[row][col];
  const canPlace = targetCell.every(
    (c) => sizeRank[c.characterSize] < sizeRank[selectedCharacter.characterSize]
  );

  if (canPlace) {
    const nextPosition = { row, col };
    updateBoard(prevPosition, nextPosition, selectedCharacter);

    if (prevPosition.row === null && prevPosition.col === null) {
      addUsedCharacter(selectedCharacter.characterKey);
    }
    switchTurn();
  } else {
    setShakeCharacter(selectedCharacter.characterKey);
    setTimeout(() => setShakeCharacter(null), 600);
  }

  setPrevPosition({ row: null, col: null });
};
