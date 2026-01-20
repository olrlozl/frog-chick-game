import 'styles/components/user/content-title.scss';
import refresh from 'assets/images/refresh.png';

interface ContentTitleProps {
  title: string;
  showRefresh?: boolean;
  onClick?: () => void;
}

const ContentTitle = ({ title, showRefresh, onClick }: ContentTitleProps) => {
  return (
    <div className="content-title">
      <h2>{title}</h2>
      {showRefresh && <img src={refresh} alt="새로고침" onClick={onClick} />}
    </div>
  );
};

export default ContentTitle;
