import { useState } from 'react';
import { CharacterOptionType, CharacterSizeType } from 'types/play';

export const useBoard = () => {
  const [board, setBoard] = useState<
    ({
      characterOption: CharacterOptionType;
      characterSize: CharacterSizeType;
    } | null)[][]
  >(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );

  const handleUpdateBoard = (
    row: number,
    col: number,
    character: {
      characterOption: CharacterOptionType;
      characterSize: CharacterSizeType;
    }
  ) => {
    setBoard((prevBoard) => {
      const updatedBoard = [...prevBoard];
      updatedBoard[col][row] = character;
      return updatedBoard;
    });
  };

  return { board, handleUpdateBoard };
};
