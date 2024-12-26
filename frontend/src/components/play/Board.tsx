import { useState } from 'react';
import Square from './Square';
import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/board.scss';

const Board = () => {
  const [board, setBoard] = useState<
    ({ option: CharacterOptionType; size: CharacterSizeType } | null)[][]
  >(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null))
  );

  return (
    <div className="board">
      {board.map((col, colIndex) => (
        <div className="board-col" key={colIndex}>
          {col.map((square, rowIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              character={square}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
