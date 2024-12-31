import { CharacterInfoInterface } from 'types/play';
import 'styles/components/play/square.scss';
import Character from 'components/play/Character';
import { useTouchEndListener } from 'hooks/useTouchEndListener';
import { handleDropCharacter } from 'utils/handleDropCharacter';

interface SquareProps {
  row: number;
  col: number;
  characterInfo: CharacterInfoInterface | null;
  handleUpdateBoard: (
    row: number,
    col: number,
    characterInfo: CharacterInfoInterface
  ) => void;
}

const Square = ({
  row,
  col,
  characterInfo,
  handleUpdateBoard,
}: SquareProps) => {
  useTouchEndListener(row, col, () =>
    handleDropCharacter(row, col, handleUpdateBoard)
  );

  return (
    <div className={`square row-${row} col-${col}`}>
      {characterInfo && <Character characterInfo={characterInfo} />}
    </div>
  );
};

export default Square;
