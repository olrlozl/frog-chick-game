import { CharacterInfoInterface } from 'types/play';
import 'styles/components/play/square.scss';
import Character from 'components/play/Character';
import { useTouchEndListener } from 'hooks/useTouchEndListener';
import { moveCharacterToSquare } from 'utils/moveCharacterToSquare';

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
    <div className={`square row-${row} col-${col}`}>
      {characterInfo && <Character characterInfo={characterInfo} />}
    </div>
  );
};

export default Square;
