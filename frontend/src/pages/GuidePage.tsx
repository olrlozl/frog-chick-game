import GuideBalloon from 'components/guide/GuideBalloon';
import farmer from 'assets/images/farmer.png';
import pond from 'assets/images/pond.png';
import { useState } from 'react';
import { GuideOption } from 'types/guide';
import Header from 'components/common/Layout/Header';
import 'styles/pages/guide-page.scss';

const GuidePage = () => {
  const [selectedOption, setSelectedOption] = useState<GuideOption>('rule');

  const guideImage = selectedOption === 'rule' ? pond : farmer;

  const handleClickChangeOption = (nextOption: GuideOption) => {
    if (nextOption !== selectedOption)
      setSelectedOption((prev) => (prev === 'rule' ? 'control' : 'rule'));
  };

  return (
    <div className="guide-page">
      <Header title="설명" />
      <div className="page-content">
        <GuideBalloon
          guideOption={selectedOption}
          onClick={handleClickChangeOption}
        />
        <img src={guideImage} alt="구리와 농부" />
      </div>
    </div>
  );
};

export default GuidePage;
