import { usePlayStore } from 'stores/playStore';
import {
  CharacterPosition,
  CharacterInfoInterface,
  sizeRank,
} from 'types/play';
import { SoundManager } from 'utils/soundManager';

export const placeCharacter = (
  row: number,
  col: number,
  curSelectedCharacter: CharacterInfoInterface,
  prevPosition: CharacterPosition
) => {
  const {
    board,
    updateBoard,
    setLastPlacedCharacter,
    addUsedCharacter,
    setShakeCharacter,
    setPrevPosition,
    switchTurn,
  } = usePlayStore.getState();

  const targetCell = board[row][col];
  const canPlace = targetCell.every(
    (c) =>
      sizeRank[c.characterSize] < sizeRank[curSelectedCharacter.characterSize]
  );

  if (canPlace) {
    SoundManager.placeSuccess();
    const nextPosition = { row, col };
    updateBoard(prevPosition, nextPosition, curSelectedCharacter);

    if (prevPosition.row === null && prevPosition.col === null) {
      addUsedCharacter(curSelectedCharacter.characterKey);
    }
    setLastPlacedCharacter(curSelectedCharacter);
    switchTurn();
  } else {
    SoundManager.placeFail();
    setShakeCharacter(curSelectedCharacter.characterKey);
    setTimeout(() => setShakeCharacter(null), 600);
  }

  setPrevPosition({ row: null, col: null });
};
