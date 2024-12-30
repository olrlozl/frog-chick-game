import Square from './Square';
import 'styles/components/play/board.scss';
import { useBoard } from 'hooks/useBoard';
import { useTouchTracking } from 'hooks/useTouchTracking';

const Board = () => {
  const { board, handleUpdateBoard } = useBoard();
  useTouchTracking();

  return (
    <div className="board">
      {board.map((col, colIndex) => (
        <div className="board-col" key={colIndex}>
          {col.map((square, rowIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              characterInfo={square}
              handleUpdateBoard={handleUpdateBoard}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
