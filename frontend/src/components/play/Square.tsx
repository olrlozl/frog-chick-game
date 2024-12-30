import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/square.scss';
import Character from 'components/play/Character';

interface SquareProps {
  row: number;
  col: number;
  characterInfo: {
    characterOption: CharacterOptionType;
    characterSize: CharacterSizeType;
  } | null;
}

const Square = ({ row, col, characterInfo }: SquareProps) => {
  return (
    <div className={`square row-${row} col-${col}`}>
      {characterInfo && (
        <Character
          characterOption={characterInfo.characterOption}
          characterSize={characterInfo.characterSize}
        />
      )}
    </div>
  );
};

export default Square;
