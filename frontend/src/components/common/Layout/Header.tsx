import { useNavigate } from 'react-router-dom';
import backIcon from 'assets/images/back-icon.png';
import 'styles/components/common/header.scss';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button className="back-button" onClick={() => navigate('/main')}>
        <img src={backIcon} alt="뒤로" />
      </button>
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;
