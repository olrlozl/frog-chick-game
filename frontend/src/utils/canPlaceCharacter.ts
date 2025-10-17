import { CharacterInfoInterface, BoardCell, sizeRank } from 'types/play';

export const canPlaceCharacter = (
  boardCell: BoardCell,
  characterInfo: CharacterInfoInterface
): boolean => {
  return boardCell.every(
    (c) => sizeRank[c.characterSize] < sizeRank[characterInfo.characterSize]
  );
};
