import 'styles/components/user/balloon-title.scss';

interface BalloonTitleProps {
  title: '친구 검색' | '친구 목록' | '받은 요청' | '낯선이를 탐색중입니다...';
}

const BalloonTitle = ({ title }: BalloonTitleProps) => {
  return (
    <div className="balloon-title">
      <label>{title}</label>
    </div>
  );
};

export default BalloonTitle;
