import Login from 'components/account/Login';
import logo from 'assets/images/logo.png';
import board from 'assets/images/board.png';
import 'styles/components/common/Button/long-button.scss';
import 'styles/pages/landing-page.scss';
const LandingPage = () => {
  
  return (
    <div className='landing-page'>
      <img className='logo' src={logo} alt="로고" />
      <img className='board' src={board} alt="게임판" />
      <Login />
    </div>
  );
};

export default LandingPage;
