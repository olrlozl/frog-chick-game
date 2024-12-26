import { CharacterOptionType, CharacterSizeType } from 'types/play';
import 'styles/components/play/character.scss';
import frog from 'assets/images/frog.png';
import tadpole from 'assets/images/tadpole.png';
import greenegg from 'assets/images/green-egg.png';
import chicken from 'assets/images/chicken.png';
import chick from 'assets/images/chick.png';
import egg from 'assets/images/egg.png';

interface CharacterProps {
  option: CharacterOptionType;
  size: CharacterSizeType;
}

const Character = ({ option, size }: CharacterProps) => {
  let imageSrc;

  if (option === 'frog') {
    if (size === 'large') {
      imageSrc = frog;
    } else if (size === 'middle') {
      imageSrc = tadpole;
    } else if (size === 'small') {
      imageSrc = greenegg;
    }
  } else if (option === 'chick') {
    if (size === 'large') {
      imageSrc = chicken;
    } else if (size === 'middle') {
      imageSrc = chick;
    } else if (size === 'small') {
      imageSrc = egg;
    }
  }

  return (
    <img
      className={`character ${option} ${size}`}
      src={imageSrc}
      alt={`${option} ${size} character`}
    ></img>
  );
};

export default Character;
