import { usePlayStore } from 'stores/playStore';
import Square from './Square';
import 'styles/components/play/board.scss';

const Board = () => {
  const { board } = usePlayStore();

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <Square
            key={`${colIndex}-${rowIndex}`}
            col={colIndex}
            row={rowIndex}
          />
        ))
      )}
    </div>
  );
};

export default Board;
