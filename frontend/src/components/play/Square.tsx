import { CharacterInfoInterface } from 'types/play';
import 'styles/components/play/square.scss';
import Character from 'components/play/Character';
import { useTouchEndListener } from 'hooks/useTouchEndListener';
import { moveCharacterToSquare } from 'utils/moveCharacterToSquare';
import { handleDropCharacter } from 'utils/handleDropCharacter';

interface SquareProps {
  row: number;
  col: number;
  characterInfo: CharacterInfoInterface | null;
  updateBoard: (
    row: number,
    col: number,
    characterInfo: CharacterInfoInterface
  ) => void;
}

const Square = ({ row, col, characterInfo, updateBoard }: SquareProps) => {
  const dropCharacter = () => moveCharacterToSquare(row, col, updateBoard);

  useTouchEndListener(row, col, dropCharacter);

  return (
    <div
      className={`square row-${row} col-${col}`}
      onDrop={(e) => handleDropCharacter(e, row, col, updateBoard)}
      onDragOver={(e) => e.preventDefault()}
    >
      {characterInfo && <Character characterInfo={characterInfo} />}
    </div>
  );
};

export default Square;
