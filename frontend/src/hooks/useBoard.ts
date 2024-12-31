import { useState } from 'react';
import { CharacterInfoInterface } from 'types/play';

export const useBoard = () => {
  const [board, setBoard] = useState<(CharacterInfoInterface | null)[][]>(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );

  const handleUpdateBoard = (
    row: number,
    col: number,
    characterInfo: CharacterInfoInterface
  ) => {
    setBoard((prevBoard) => {
      const updatedBoard = [...prevBoard];
      updatedBoard[col][row] = characterInfo;
      return updatedBoard;
    });
  };

  return { board, handleUpdateBoard };
};
