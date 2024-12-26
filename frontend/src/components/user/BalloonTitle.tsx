import 'styles/components/user/balloon-title.scss';

interface BalloonTitleProps {
  title: string;
}

const BalloonTitle = ({ title }: BalloonTitleProps) => {
  return (
    <div className="balloon-title">
      <label>{title}</label>
    </div>
  );
};

export default BalloonTitle;
