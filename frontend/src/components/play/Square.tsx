import { CharacterInfoInterface, sizeRank } from 'types/play';
import { useTouchEndListener } from 'hooks/play/useTouchEndListener';
import { useDropForWeb } from 'hooks/play/useDropForWeb';
import Character from 'components/play/Character';
import 'styles/components/play/square.scss';
import { usePlayStore } from 'stores/playStore';

interface SquareProps {
  row: number;
  col: number;
}

const Square = ({ row, col }: SquareProps) => {
  useTouchEndListener(row, col);

  const { handleDrop, handleDragOver } = useDropForWeb(row, col);

  const { board, bingoCells } = usePlayStore();

  const cell = board[row][col];

  const largestCharacter = cell.reduce<CharacterInfoInterface | null>(
    (prev, curr) => {
      if (!prev) return curr;
      return sizeRank[curr.characterSize] > sizeRank[prev.characterSize]
        ? curr
        : prev;
    },
    null
  );

  const isHighlighted = bingoCells.some((c) => c.row === row && c.col === col);

  return (
    <div
      className={`square row-${row} col-${col} ${isHighlighted ? 'highlight' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {largestCharacter && (
        <Character characterInfo={largestCharacter} isHidden={false} />
      )}
    </div>
  );
};

export default Square;
