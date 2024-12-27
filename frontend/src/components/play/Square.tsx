import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/square.scss';
import Character from 'components/play/Character';

interface SquareProps {
  row: number;
  col: number;
  character: { option: CharacterOptionType; size: CharacterSizeType } | null;
}

const Square = ({ row, col, character }: SquareProps) => {
  return (
    <div className={`square row-${row} col-${col}`}>
      {character && (
        <Character option={character.option} size={character.size} />
      )}
    </div>
  );
};

export default Square;
