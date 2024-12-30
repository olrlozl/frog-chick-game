import 'styles/components/play/character-list.scss';
import { CharacterOptionType } from 'types/play';
import Character from './Character';

interface CharacterProps {
  option: CharacterOptionType;
}

const CharacterList = ({ option }: CharacterProps) => {
  return (
    <div className="character-list">
      <Character option={option} size="large"></Character>
      <Character option={option} size="large"></Character>
      <Character option={option} size="middle"></Character>
      <Character option={option} size="middle"></Character>
      <Character option={option} size="small"></Character>
      <Character option={option} size="small"></Character>
    </div>
  );
};

export default CharacterList;
