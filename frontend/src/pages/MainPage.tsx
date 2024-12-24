import StartButton from 'components/common/Button/StartButton';
import { NavBar } from 'components/common/NavBar/NavBar';
import Balloon from 'components/user/Balloon';
import { useState } from 'react';
import 'styles/pages/main-page.scss';
import { GameType } from 'types/user';

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState<GameType>('friend');

  const handleClickChangeOption = (option: GameType) => {
    setSelectedOption(option);
  }

  return (
    <div className='main-page'>
      <div className='start-button-box'>
        <StartButton option='stranger' onClick={() => handleClickChangeOption('friend')} isSelected={selectedOption === 'stranger'} />
        <StartButton option='friend' onClick={() => handleClickChangeOption('stranger')} isSelected={selectedOption === 'friend'}/>
      </div>
      <Balloon option={selectedOption}/>
      <NavBar />
    </div>
  );
};

export default MainPage;
