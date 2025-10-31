import 'styles/pages/main-page.scss';
import logo from 'assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import GameModeButton from 'components/common/Button/GameModeButton';
import IconButton from 'components/common/Button/IconButtion';
import guideIcon from 'assets/images/guide-icon.png';
import rankIcon from 'assets/images/rank-icon.png';
import settingIcon from 'assets/images/setting-icon.png';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <img className="logo" src={logo} alt="로고" />
      <div className="game-mode-button-container">
        <GameModeButton
          gameMode="local"
          onClick={() => navigate('/local-mode/play')}
        />
        <GameModeButton
          gameMode="friend"
          onClick={() => navigate('/friend-mode')}
        />
        <GameModeButton
          gameMode="random"
          onClick={() => navigate('/random-mode')}
        />
      </div>

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
    </div>
  );
};

export default MainPage;
