import StartButton from 'components/common/Button/StartButton';
import Balloon from 'components/user/Balloon';
import { useState } from 'react';
import 'styles/pages/main-page.scss';
import { GameOptionType } from 'types/user';
import { useNavigate } from 'react-router-dom';
import IconButton from 'components/common/Button/IconButtion';
import guideIcon from 'assets/images/guide-icon.png';
import rankIcon from 'assets/images/rank-icon.png';
import settingIcon from 'assets/images/setting-icon.png';

const MainPage = () => {
  const [selectedOption, setSelectedOption] =
    useState<GameOptionType>('friend');

  const handleClickChangeOption = (nextGameOption: GameOptionType) => {
    if (selectedOption !== nextGameOption) {
      setSelectedOption(nextGameOption);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <div className="start-button-box">
        <StartButton
          gameOption="stranger"
          onClick={() => handleClickChangeOption('stranger')}
          isSelected={selectedOption === 'stranger'}
        />
        <StartButton
          gameOption="friend"
          onClick={() => handleClickChangeOption('friend')}
          isSelected={selectedOption === 'friend'}
        />
      </div>
      <Balloon gameOption={selectedOption} />

      <div className="icon-button-container">
        <IconButton
          iconSrc={guideIcon}
          alt="설명"
          onClick={() => navigate('/main/guide')}
        />
        <IconButton
          iconSrc={rankIcon}
          alt="순위"
          onClick={() => navigate('/main/rank')}
        />
        <IconButton
          iconSrc={settingIcon}
          alt="설정"
          onClick={() => navigate('/main/setting')}
        />
      </div>
      <Balloon gameOption={selectedOption} />
    </div>
  );
};

export default MainPage;
