import StartButton from 'components/common/Button/StartButton';
import Balloon from 'components/user/Balloon';
import { useState } from 'react';
import 'styles/pages/main-page.scss';
import { GameType } from 'types/user';

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState<GameType>('friend');

  const handleClickChangeOption = (nextOption: GameType) => {
    if (nextOption !== selectedOption)
      setSelectedOption((prev) => (prev === 'friend' ? 'stranger' : 'friend'));
  };

  return (
    <div className="main-page">
      <div className="start-button-box">
        <StartButton
          option="stranger"
          onClick={handleClickChangeOption}
          isSelected={selectedOption === 'stranger'}
        />
        <StartButton
          option="friend"
          onClick={handleClickChangeOption}
          isSelected={selectedOption === 'friend'}
        />
      </div>
      <Balloon option={selectedOption} />
    </div>
  );
};

export default MainPage;
