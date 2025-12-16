import { useNavigate } from 'react-router-dom';
import backIcon from 'assets/images/back-icon.png';
import refreshIcon from 'assets/images/refresh-icon.png';
import 'styles/components/common/header.scss';

interface HeaderProps {
  title: string;
  showRefresh?: boolean;
  onRefresh?: () => void;
}

const Header = ({ title, showRefresh = false, onRefresh }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button className="back-button" onClick={() => navigate('/main')}>
        <img src={backIcon} alt="뒤로" />
      </button>
      <h1 className="header-title">{title}</h1>
      {showRefresh ? (
        <button className="refresh-button" onClick={onRefresh}>
          <img src={refreshIcon} alt="새로고침" />
        </button>
      ) : (
        <div className="right-placeholder" />
      )}
    </header>
  );
};

export default Header;
