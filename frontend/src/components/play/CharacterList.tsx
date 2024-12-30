import 'styles/components/play/character-list.scss';
import { CharacterOptionType } from 'types/play';
import Character from './Character';

interface CharacterProps {
  characterOption: CharacterOptionType;
}

const CharacterList = ({ characterOption }: CharacterProps) => {
  return (
    <div className="character-list">
      <Character
        characterOption={characterOption}
        characterSize="large"
      ></Character>
      <Character
        characterOption={characterOption}
        characterSize="large"
      ></Character>
      <Character
        characterOption={characterOption}
        characterSize="middle"
      ></Character>
      <Character
        characterOption={characterOption}
        characterSize="middle"
      ></Character>
      <Character
        characterOption={characterOption}
        characterSize="small"
      ></Character>
      <Character
        characterOption={characterOption}
        characterSize="small"
      ></Character>
    </div>
  );
};

export default CharacterList;
