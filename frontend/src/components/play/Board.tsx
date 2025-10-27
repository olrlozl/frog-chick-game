import { usePlayStore } from 'stores/playStore';
import Square from './Square';
import 'styles/components/play/board.scss';

const Board = () => {
  const { board } = usePlayStore();

  return (
    <div className="board">
      {board.map((col, colIndex) => (
        <div className="board-col" key={colIndex}>
          {col.map((_, rowIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
