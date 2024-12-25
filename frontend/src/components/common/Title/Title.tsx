import 'styles/components/common/Title/title.scss';
import { TitleType } from 'types/common';

interface TitleProps {
  title: TitleType;
}

const Title = ({ title }: TitleProps) => {
  return (
    <div className="title">
      <label>{title}</label>
    </div>
  );
};

export default Title;
