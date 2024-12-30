import StartButton from 'components/common/Button/StartButton';
import Balloon from 'components/user/Balloon';
import { useState } from 'react';
import 'styles/pages/main-page.scss';
import { GameOptionType } from 'types/user';

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState<GameOptionType>('friend');

  const handleClickChangeOption = (nextGameOption: GameOptionType) => {
    setSelectedOption(nextGameOption);
  }

  return (
    <div className='main-page'>
      <div className='start-button-box'>
        <StartButton gameOption='stranger' onClick={() => handleClickChangeOption('friend')} isSelected={selectedOption === 'stranger'} />
        <StartButton gameOption='friend' onClick={() => handleClickChangeOption('stranger')} isSelected={selectedOption === 'friend'}/>
      </div>
      <Balloon gameOption={selectedOption}/>
    </div>
  );
};

export default MainPage;
