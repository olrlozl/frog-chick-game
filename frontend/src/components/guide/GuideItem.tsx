import Title from 'components/common/Title/Title';
import 'styles/components/guide/guide-item.scss';
import { TitleType } from 'types/common';
import { GuideOptionType } from 'types/guide';
import GuideText from './GuideText';

interface GuideItemProps {
  title: TitleType;
  guideOption: GuideOptionType;
}

const GuideItem = ({ title, guideOption }: GuideItemProps) => {
  return (
    <div className="guide-item">
      <Title title={title} />
      <GuideText guideOption={guideOption} />
    </div>
  );
};

export default GuideItem;
